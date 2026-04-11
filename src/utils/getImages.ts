const allImageModules = import.meta.glob<{
  frontmatter: {
    title?: string;
    dates?: string[];
    object?: string;
    type?: string;
    constellation?: string;
    bortle?: number;
    temperature?: string;
    location?: string;
    moonIllumination?: number;
    moonAltitude? :number;
    telescope?: string;
    mount?: string;
    camera?: string;
    cameraTemperature?: string;
    filters?: {
      name: string;
      exposureLength: string;
      exposureCount: number;
      binning: string;
    }[];
    image?: string;
    thumbnail?: string;
    slug?: string;
    tags?: string[];
  };
  default: any;
}>('../content/gallery/*.md', { eager: true });

export interface ImagePost {
  title: string;
  dates: string[];
  object: string;
  type: string;
  constellation: string;
  bortle: number;
  temperature: string;
  location: string;
  moonIllumination: number;
  moonAltitude: number;
  telescope: string;
  mount: string;
  camera: string;
  cameraTemperature: string;
  filters: {
    name: string;
    exposureLength: string;
    exposureCount: number;
    binning: string;
  }[];
  image: string;
  thumbnail: string;
  slug: string;
  tags: string[];
  href: string;
  totalIntegration: string;
}

/**
 * Calculate total integration time from filters
 */
function calculateTotalIntegration(filters: {
  exposureLength: string;
  exposureCount: number;
}[]): string {
  let totalSeconds = 0;

  for (const filter of filters) {
    const seconds = parseFloat(filter.exposureLength.replace('s', ''));
    if (!isNaN(seconds)) {
      totalSeconds += seconds * filter.exposureCount;
    }
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else {
    return `${minutes}m`;
  }
}

/**
 * Get all images from the content directory
 */
export function getAllImages(): ImagePost[] {
  const images: ImagePost[] = [];

  for (const filePath in allImageModules) {
    const module = allImageModules[filePath];

    if (!module) {
      console.warn(`Failed to load module: ${filePath}`);
      continue;
    }

    const frontmatter = module.frontmatter || {};

    const pathMatch = filePath.match(/\/([^/]+)\.md$/);
    const fileName = pathMatch ? pathMatch[1] : '';

    const slug = frontmatter.slug || fileName;

    if (!slug) {
      console.warn(`No slug found for file: ${filePath}`);
      continue;
    }

    const filters = frontmatter.filters || [];

    images.push({
      title: frontmatter.title || '',
      dates: frontmatter.dates || [],
      object: frontmatter.object || '',
      type: frontmatter.type || '',
      constellation: frontmatter.constellation || '',
      bortle: frontmatter.bortle || 0,
      temperature: frontmatter.temperature || '',
      location: frontmatter.location || '',
      moonIllumination: frontmatter.moonIllumination || 0,
      moonAltitude: frontmatter.moonAltitude || 0,
      telescope: frontmatter.telescope || '',
      mount: frontmatter.mount || '',
      camera: frontmatter.camera || '',
      cameraTemperature: frontmatter.cameraTemperature || '',
      filters: filters,
      image: frontmatter.image || '',
      thumbnail: frontmatter.thumbnail || frontmatter.image || '',
      slug: slug,
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      href: `/images/${slug}`,
      totalIntegration: calculateTotalIntegration(filters),
    });
  }

  // Sort by most recent date (newest first)
  images.sort((a, b) => {
    const dateA = a.dates.length > 0 ? new Date(a.dates[a.dates.length - 1]).getTime() : 0;
    const dateB = b.dates.length > 0 ? new Date(b.dates[b.dates.length - 1]).getTime() : 0;
    return dateB - dateA;
  });

  return images;
}

/**
 * Get a single image by slug
 */
export function getImageBySlug(slug: string): {
  frontmatter: {
    title?: string;
    dates?: string[];
    object?: string;
    type?: string;
    constellation?: string;
    bortle?: number;
    temperature?: string;
    location?: string;
    moonIllumination?: number;
    moonAltitude?: number;
    telescope?: string;
    mount?: string;
    camera?: string;
    cameraTemperature?: string;
    filters?: {
      name: string;
      exposureLength: string;
      exposureCount: number;
      binning: string;
    }[];
    image?: string;
    thumbnail?: string;
    slug?: string;
    tags?: string[];
  };
  Content: any;
  slug: string;
} | null {
  for (const filePath in allImageModules) {
    const module = allImageModules[filePath];

    if (!module) continue;

    const frontmatter = module.frontmatter || {};
    const pathMatch = filePath.match(/\/([^/]+)\.md$/);
    const fileName = pathMatch ? pathMatch[1] : '';
    const fileSlug = frontmatter.slug || fileName;

    if (fileSlug === slug) {
      return {
        frontmatter,
        Content: module.default,
        slug: fileSlug,
      };
    }
  }

  return null;
}

/**
 * Get all image slugs for static generation
 */
export function getAllImageSlugs(): string[] {
  return getAllImages().map((image) => image.slug);
}