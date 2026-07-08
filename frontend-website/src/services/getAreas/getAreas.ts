import type { Area } from "../../types/area";

const API_URL = import.meta.env.PUBLIC_STRAPI_URL;

export async function getAreas(): Promise<Area[]> {
  const url =
  `${API_URL}/api/areas?` +
  "populate[icon]=true&" +
  "populate[coverImage]=true&" +
  "sort[0]=name:asc";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Error obteniendo áreas: status ${response.status}`);
      return [];
    }

    const json = await response.json();

    return json.data.map(mapArea);
  } catch (error) {
    console.error("Excepción en getAreas:", error);
    return [];
  }
}

function mapArea(item: any): Area {
  return {
    documentId: item.documentId,

    name: item.name,
    slug: item.slug,
    description: item.description,

    icon: item.icon
      ? {
          url: item.icon.url,
          alternativeText: item.icon.alternativeText,
        }
      : undefined,

    coverImage: item.coverImage
      ? {
          url: item.coverImage.url,
          alternativeText: item.coverImage.alternativeText,
        }
      : undefined,
  };
}