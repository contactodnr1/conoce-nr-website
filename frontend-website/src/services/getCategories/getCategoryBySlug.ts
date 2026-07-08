// src/services/getCategories/getCategoryBySlug.ts
// Versión Full para página de detalle: incluye icon e image.

const API_URL = import.meta.env.PUBLIC_STRAPI_URL;

export interface Category {
  documentId: string;
  name: string;
  slug: string;
  description: any[];
  icon?: { url: string; alternativeText?: string | null };
  image?: { url: string; alternativeText?: string | null };
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const url =
    `${API_URL}/api/categories` +
    `?filters[slug][$eq]=${encodeURIComponent(slug)}` +
    `&fields[0]=name` +
    `&fields[1]=slug` +
    `&fields[2]=description` +
    `&populate[icon]=true` +
    `&populate[image]=true`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Error obteniendo categoría por slug (${slug}): status ${response.status}`);
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
      image: item.image ? { url: item.image.url, alternativeText: item.image.alternativeText } : undefined,
    };
  } catch (error) {
    console.error(`Excepción en getCategoryBySlug (${slug}):`, error);
    return null;
  }
}