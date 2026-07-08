// src/services/getAreas/getAreaBySlug.ts
// Versión Full para página de detalle de área.

const API_URL = import.meta.env.PUBLIC_STRAPI_URL;

export interface Area {
  documentId: string;
  name: string;
  slug: string;
  description: any[];
  icon?: { url: string; alternativeText?: string | null };
  coverImage?: { url: string; alternativeText?: string | null };
  categories?: {
    documentId: string;
    name: string;
    slug: string;
  }[];
}

export async function getAreaBySlug(slug: string): Promise<Area | null> {
  const url =
    `${API_URL}/api/areas` +
    `?filters[slug][$eq]=${encodeURIComponent(slug)}` +
    `&fields[0]=name` +
    `&fields[1]=slug` +
    `&fields[2]=description` +
    `&populate[icon]=true` +
    `&populate[coverImage]=true` +
    `&populate[categories][fields][0]=name` +
    `&populate[categories][fields][1]=slug`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Error obteniendo área por slug (${slug}): status ${response.status}`);
      return null;
    }

    const json = await response.json();
    const item = json.data?.[0];

    if (!item) return null;

    return {
      documentId: item.documentId,
      name: item.name,
      slug: item.slug,
      description: item.description ?? [],
      icon: item.icon ? { url: item.icon.url, alternativeText: item.icon.alternativeText } : undefined,
      coverImage: item.coverImage ? { url: item.coverImage.url, alternativeText: item.coverImage.alternativeText } : undefined,
      categories: item.categories?.map((c: any) => ({
        documentId: c.documentId,
        name: c.name,
        slug: c.slug,
      })) ?? [],
    };
  } catch (error) {
    console.error(`Excepción en getAreaBySlug (${slug}):`, error);
    return null;
  }
}