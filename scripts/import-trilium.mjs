#!/usr/bin/env node
/**
 * Import imaging projects from a Trilium markdown export.
 *
 * Usage:
 *   npm run import:trilium -- <export.zip | export-folder> [--dry-run]
 *
 * For each project note in the export this writes:
 *   src/content/projects/<slug>/index.md             project notes, equipment + acquisition progress
 *   src/content/projects/<slug>/sessions/<date>.md   one file per imaging session
 *   public/assets/images/projects/<slug>/*           every image used by the project
 *
 * Trilium is treated as the source of truth: a project's content and image
 * folders are replaced on every import.
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIR = path.join(ROOT, "src", "content", "projects");
const IMAGE_DIR = path.join(ROOT, "public", "assets", "images", "projects");
const IMAGE_URL = "/assets/images/projects";

// Child notes (matched by title, case-insensitive) that make up a project
const SECTION_TITLES = {
  notes: "object & project notes",
  sessions: "imaging sessions",
  acquisition: "acquisition",
};
// Holds the hero image; may sit under the project or under its notes
const COVER_TITLE = "cover image";

// Trilium label name -> frontmatter key
const PROJECT_LABELS = {
  projectStatus: "status",
  cameraUsed: "camera",
  mountUsed: "mount",
  telescopeUsed: "telescope",
  acquisition: "acquisitionSoftware",
};
const SESSION_LABELS = {
  sessionDate: "date",
  sessionLocation: "location",
  sessionTemperature: "temperature",
  sessionBortle: "bortle",
  moonPhase: "moonPhase",
};
const IGNORED_LABELS = new Set(["updateKanBan"]);

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|avif|svg|tiff?)$/i;

// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const source = args.find((a) => !a.startsWith("--"));

if (!source) {
  console.error("Usage: npm run import:trilium -- <export.zip | export-folder> [--dry-run]");
  process.exit(1);
}

const exportRoot = findExportRoot(resolveSource(path.resolve(source)));
const meta = JSON.parse(fs.readFileSync(path.join(exportRoot, "!!!meta.json"), "utf8"));

if (meta.formatVersion !== 2) {
  console.warn(`Warning: expected Trilium export formatVersion 2, got ${meta.formatVersion}`);
}

const imported = [];
for (const note of meta.files) walk(note, exportRoot);

if (!imported.length) {
  console.error("No projects found. A project is a note with an 'Object & Project Notes', 'Imaging Sessions' or 'Acquisition' child.");
  process.exit(1);
}
console.log(`\n${dryRun ? "[dry run] Would import" : "Imported"} ${imported.length} project(s): ${imported.join(", ")}`);

// ---------------------------------------------------------------------------
// Export discovery

function resolveSource(src) {
  if (!fs.existsSync(src)) throw new Error(`Not found: ${src}`);
  if (fs.statSync(src).isDirectory()) return src;
  if (!/\.zip$/i.test(src)) throw new Error(`Expected a .zip or a folder: ${src}`);

  const dest = fs.mkdtempSync(path.join(os.tmpdir(), "trilium-export-"));
  if (process.platform === "win32") {
    execFileSync("powershell.exe", [
      "-NoProfile", "-NonInteractive", "-Command",
      `Expand-Archive -LiteralPath '${src.replace(/'/g, "''")}' -DestinationPath '${dest.replace(/'/g, "''")}' -Force`,
    ], { stdio: "inherit" });
  } else {
    execFileSync("unzip", ["-q", src, "-d", dest], { stdio: "inherit" });
  }
  return dest;
}

// The meta file may sit at the top of the export or one folder down
function findExportRoot(dir) {
  if (fs.existsSync(path.join(dir, "!!!meta.json"))) return dir;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && fs.existsSync(path.join(dir, entry.name, "!!!meta.json"))) {
      return path.join(dir, entry.name);
    }
  }
  throw new Error(`No !!!meta.json found in ${dir}. Export from Trilium using the Markdown format.`);
}

// Projects can be exported on their own or under a parent "Projects" note
function walk(note, dir) {
  if (isProject(note)) {
    importProject(note, dir);
  } else if (note.children?.length) {
    for (const child of note.children) walk(child, childDirOf(note, dir));
  }
}

function isProject(note) {
  const titles = Object.values(SECTION_TITLES);
  return (note.children ?? []).some((c) => titles.includes(normalise(c.title)));
}

// ---------------------------------------------------------------------------
// Project import

function importProject(note, dir) {
  const slug = slugify(note.title);
  const childDir = childDirOf(note, dir);
  const projectDir = path.join(CONTENT_DIR, slug);
  const images = createImageStore(slug);

  console.log(`\n${note.title} -> ${slug}`);

  if (!dryRun) {
    fs.rmSync(projectDir, { recursive: true, force: true });
    fs.rmSync(path.join(IMAGE_DIR, slug), { recursive: true, force: true });
  }

  const children = [...(note.children ?? [])].sort(byPosition);
  const section = (key) => children.find((c) => normalise(c.title) === SECTION_TITLES[key]);
  const notesNote = section("notes");
  const sessionsNote = section("sessions");
  const acquisitionNote = section("acquisition");
  const cover = importCover(
    [
      { parent: note, dir: childDir },
      notesNote && { parent: notesNote, dir: childDirOf(notesNote, childDir) },
    ].filter(Boolean),
    images
  );

  // Body: the project note's own text, the object notes, then any extra child notes
  const bodyParts = [
    renderNote(note, dir, images),
    notesNote && renderNote(notesNote, childDir, images),
  ];
  const known = [notesNote, sessionsNote, acquisitionNote, cover.note];
  for (const extra of children.filter((c) => !known.includes(c))) {
    console.warn(`  Note "${extra.title}" isn't a known section; appending it to the project page`);
    const text = renderNote(extra, childDir, images);
    if (text) bodyParts.push(`## ${extra.title}\n\n${text}`);
  }

  const sessions = sessionsNote
    ? importSessions(sessionsNote, childDirOf(sessionsNote, childDir), slug, images)
    : [];

  const frontmatter = {
    title: note.title,
    triliumId: note.noteId,
    ...mapLabels({ ...labelsOf(note), ...(notesNote ? labelsOf(notesNote) : {}) }, PROJECT_LABELS),
    coverImage: cover.image ?? images.list[0],
    coverCaption: cover.caption,
    images: images.list,
    acquisition: acquisitionNote
      ? [...(acquisitionNote.children ?? [])].sort(byPosition).map((c) => acquisitionItem(c, childDirOf(acquisitionNote, childDir)))
      : [],
    sessionCount: sessions.length,
  };

  writeFile(path.join(projectDir, "index.md"), markdownFile(frontmatter, bodyParts.filter(Boolean).join("\n\n")));
  console.log(`  ${sessions.length} session(s), ${frontmatter.acquisition.length} acquisition item(s), ${images.list.length} image(s)`);
  imported.push(slug);
}

// The first image in the "Cover Image" note is the cover; any text is its caption
function importCover(places, images) {
  for (const { parent, dir } of places) {
    const note = (parent.children ?? []).find((c) => normalise(c.title) === COVER_TITLE);
    if (!note) continue;

    const before = images.list.length;
    const md = renderNote(note, dir, images);
    const image = images.list[before];
    if (!image) console.warn(`  "${note.title}" note has no image; using the first project image instead`);

    const caption = md
      .replace(/<figure\b[\s\S]*?<\/figure>/gi, "")
      .replace(/<img\b[^>]*>/gi, "")
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
      .trim();
    return { note, image, caption: caption || undefined };
  }
  return {};
}

function importSessions(sessionsNote, dir, slug, images) {
  const used = new Set();
  return [...(sessionsNote.children ?? [])].sort(byPosition).map((session) => {
    const fields = mapLabels(labelsOf(session), SESSION_LABELS);
    const titleDate = parseUkDate(session.title);

    if (!fields.date) fields.date = titleDate;
    if (titleDate && fields.date && titleDate !== fields.date) {
      console.warn(`  Session "${session.title}": title doesn't match sessionDate ${fields.date}; using sessionDate`);
    }

    const base = fields.date ?? slugify(session.title);
    let name = base;
    for (let i = 2; used.has(name); i++) name = `${base}-${i}`;
    used.add(name);

    const frontmatter = { title: session.title, project: slug, triliumId: session.noteId, ...fields };
    writeFile(path.join(CONTENT_DIR, slug, "sessions", `${name}.md`), markdownFile(frontmatter, renderNote(session, dir, images)));
    return name;
  });
}

// "Lum 103/100", "Green - 109/100" -> { filter, captured, planned }
// Body lines like "03/10 - 30" become a per-night log of subs captured
function acquisitionItem(note, dir) {
  const match = note.title.match(/^(.*?)[\s-]*(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)\s*$/);
  const filter = match ? match[1].trim() : note.title.trim();
  const captured = match ? Number(match[2]) : undefined;
  const log = [];
  const unparsed = [];

  for (const line of stripTitleHeading(readNote(note, dir), note.title).split("\n")) {
    const text = line.trim();
    if (!text) continue;
    const entry = text.match(/^(\d{1,2})\/(\d{1,2})\s*[-–:]\s*(\d+)$/);
    if (entry && Number(entry[2]) >= 1 && Number(entry[2]) <= 12) {
      log.push({ night: `${entry[1].padStart(2, "0")}/${entry[2].padStart(2, "0")}`, count: Number(entry[3]) });
    } else {
      unparsed.push(text);
      console.warn(`  Acquisition "${note.title}": couldn't read log line "${text}"`);
    }
  }

  const logged = log.reduce((sum, e) => sum + e.count, 0);
  if (log.length && captured !== undefined && logged !== captured) {
    console.warn(`  Acquisition "${note.title}": nightly log adds up to ${logged}, title says ${captured}`);
  }

  return {
    filter,
    captured,
    planned: match ? Number(match[3]) : undefined,
    status: labelsOf(note).status,
    log,
    notes: unparsed.length ? unparsed.join("\n") : undefined,
  };
}

// ---------------------------------------------------------------------------
// Note content and images

function childDirOf(note, dir) {
  return note.dirFileName ? path.join(dir, note.dirFileName) : dir;
}

function readNote(note, dir) {
  if (!note.dataFileName || note.type === "image") return "";
  const file = path.join(dir, note.dataFileName);
  return fs.existsSync(file)
    ? fs.readFileSync(file, "utf8").replace(/^﻿/, "").replace(/\r\n?/g, "\n")
    : "";
}

// Trilium sometimes repeats the note title as a leading H1
function stripTitleHeading(md, title) {
  const h1 = md.match(/^\s*#\s+(.+?)\s*\n/);
  return h1 && normalise(h1[1]) === normalise(title) ? md.slice(h1[0].length) : md;
}

function renderNote(note, dir, images) {
  let md = stripTitleHeading(readNote(note, dir), note.title);

  const rewrite = (src) => images.add(resolveImage(src, dir)) ?? src;
  md = md
    .replace(/(!\[[^\]]*\]\()(<[^>]+>|[^)\s]+)((?:\s+"[^"]*")?\))/g, (_, pre, src, post) => pre + rewrite(src.replace(/^<|>$/g, "")) + post)
    .replace(/(<img\b[^>]*?\bsrc=")([^"]+)(")/gi, (_, pre, src, post) => pre + rewrite(decodeEntities(src)) + post);

  // Image attachments that the text doesn't reference still belong to the project
  for (const attachment of note.attachments ?? []) {
    if (attachment.role === "image" && attachment.dataFileName) {
      images.add(path.join(dir, attachment.dataFileName));
    }
  }
  // Child notes of type "image" (images dragged into the tree)
  for (const child of note.children ?? []) {
    if (child.type === "image" && child.dataFileName) {
      images.add(path.join(childDirOf(note, dir), child.dataFileName));
    }
  }

  return md.trim();
}

function resolveImage(src, dir) {
  if (/^(https?:|data:|\/)/i.test(src)) return null;
  const file = path.resolve(dir, safeDecode(src.split(/[?#]/)[0]));
  return fs.existsSync(file) && IMAGE_EXT.test(file) ? file : null;
}

function createImageStore(slug) {
  const bySource = new Map();
  const names = new Set();
  const list = [];

  return {
    list,
    add(file) {
      if (!file || !IMAGE_EXT.test(file) || !fs.existsSync(file)) return null;
      if (bySource.has(file)) return bySource.get(file);

      const ext = path.extname(file).toLowerCase();
      const base = slugify(path.basename(file, path.extname(file))) || "image";
      let name = `${base}${ext}`;
      for (let i = 2; names.has(name); i++) name = `${base}-${i}${ext}`;
      names.add(name);

      const url = `${IMAGE_URL}/${slug}/${name}`;
      if (!dryRun) {
        fs.mkdirSync(path.join(IMAGE_DIR, slug), { recursive: true });
        fs.copyFileSync(file, path.join(IMAGE_DIR, slug, name));
      }
      console.log(`  image ${path.basename(file)} -> ${url}`);
      bySource.set(file, url);
      list.push(url);
      return url;
    },
  };
}

// ---------------------------------------------------------------------------
// Helpers

function labelsOf(note) {
  const labels = {};
  for (const attr of note.attributes ?? []) {
    // "label:xyz" entries are promoted-attribute definitions, not values
    if (attr.type === "label" && !attr.name.includes(":")) labels[attr.name] = attr.value;
  }
  return labels;
}

function mapLabels(labels, mapping) {
  const out = {};
  for (const [name, value] of Object.entries(labels)) {
    if (IGNORED_LABELS.has(name) || value === "") continue;
    out[mapping[name] ?? name] = mapping[name] === "date" ? value : coerce(value);
  }
  return out;
}

function coerce(value) {
  if (value === "true" || value === "false") return value === "true";
  return /^-?\d+(\.\d+)?$/.test(value.trim()) ? Number(value) : value;
}

// "03/10/2026" -> "2026-10-03"
function parseUkDate(text) {
  const m = text.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  return m ? `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}` : undefined;
}

function markdownFile(frontmatter, body) {
  return `---\n${toYaml(frontmatter)}\n---\n\n${body ? `${body}\n` : ""}`;
}

function toYaml(obj, indent = "") {
  return Object.entries(obj)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        if (!value.length) return `${indent}${key}: []`;
        const items = value.map((item) =>
          item && typeof item === "object"
            ? `${indent}  - ${toYaml(item, `${indent}    `).trimStart()}`
            : `${indent}  - ${yamlScalar(item)}`
        );
        return `${indent}${key}:\n${items.join("\n")}`;
      }
      if (value && typeof value === "object") return `${indent}${key}:\n${toYaml(value, `${indent}  `)}`;
      return `${indent}${key}: ${yamlScalar(value)}`;
    })
    .join("\n");
}

function yamlScalar(value) {
  return typeof value === "string" ? JSON.stringify(value) : String(value);
}

function writeFile(file, content) {
  if (dryRun) {
    console.log(`  [dry run] would write ${path.relative(ROOT, file)}`);
    return;
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function slugify(text) {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalise(text) {
  return text.trim().toLowerCase();
}

function byPosition(a, b) {
  return (a.notePosition ?? 0) - (b.notePosition ?? 0);
}

function decodeEntities(text) {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function safeDecode(text) {
  try {
    return decodeURIComponent(text);
  } catch {
    return text;
  }
}
