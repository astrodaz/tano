import { getCollection, type CollectionEntry } from "astro:content";

export type Project = CollectionEntry<"projects">;
export type Session = CollectionEntry<"sessions">;
export type AcquisitionItem = Project["data"]["acquisition"][number];

// Swatch colours for the common imaging filters
const FILTER_COLOURS: Record<string, string> = {
  l: "#e8e8e0",
  lum: "#e8e8e0",
  luminance: "#e8e8e0",
  r: "#ef4444",
  red: "#ef4444",
  g: "#22c55e",
  green: "#22c55e",
  b: "#3b82f6",
  blue: "#3b82f6",
  ha: "#f43f5e",
  oiii: "#2dd4bf",
  sii: "#f59e0b",
};

export function filterColour(filter: string): string {
  return FILTER_COLOURS[filter.toLowerCase().replace(/[^a-z0-9]/g, "")] ?? "#888880";
}

export type ProjectStage = "future" | "current" | "complete";

export const STAGE_LABELS: Record<ProjectStage, string> = {
  future: "Not Started",
  current: "In Progress",
  complete: "Complete",
};

// Set by the projectStatus label in Trilium; no status counts as in progress
export function projectStage(project: Project): ProjectStage {
  const status = (project.data.status ?? "").toLowerCase().replace(/[^a-z]/g, "");
  if (["complete", "completed", "done", "finished"].includes(status)) return "complete";
  if (["notstarted", "planned", "future"].includes(status)) return "future";
  return "current";
}

export function projectHref(project: Project): string {
  return `/projects/${project.id}/`;
}

export async function getProjects(): Promise<Project[]> {
  return (await getCollection("projects")).sort((a, b) => a.data.title.localeCompare(b.data.title));
}

export async function getProjectSessions(project: Project): Promise<Session[]> {
  const sessions = await getCollection("sessions", (s) => s.data.project === project.id);
  return sessions.sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());
}

export function acquisitionTotals(items: AcquisitionItem[]) {
  const captured = items.reduce((sum, i) => sum + (i.captured ?? 0), 0);
  const planned = items.reduce((sum, i) => sum + (i.planned ?? 0), 0);
  return { captured, planned, percent: planned ? Math.round((captured / planned) * 100) : 0 };
}

// Rows of filter x night sub counts, built from each filter's nightly log
export function nightlyLog(items: AcquisitionItem[]) {
  const nights = [...new Set(items.flatMap((i) => i.log.map((e) => e.night)))].sort((a, b) => {
    const [da, ma] = a.split("/").map(Number);
    const [db, mb] = b.split("/").map(Number);
    return ma - mb || da - db;
  });
  const rows = items
    .filter((i) => i.log.length)
    .map((i) => ({
      filter: i.filter,
      counts: nights.map((night) => i.log.find((e) => e.night === night)?.count),
    }));
  const totals = nights.map((_, n) => rows.reduce((sum, row) => sum + (row.counts[n] ?? 0), 0));
  return { nights, rows, totals };
}

export function formatDate(date: Date, options: Intl.DateTimeFormatOptions = {}): string {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", ...options });
}

export function sessionRange(sessions: Session[]): string {
  if (!sessions.length) return "";
  const first = sessions[0].data.date;
  const last = sessions[sessions.length - 1].data.date;
  if (first.valueOf() === last.valueOf()) return formatDate(first);
  const sameYear = first.getFullYear() === last.getFullYear();
  return `${formatDate(first, sameYear ? { year: undefined } : {})} – ${formatDate(last)}`;
}
