import type { Business } from "../../types/business";

const API_URL = import.meta.env.PUBLIC_STRAPI_URL;

export async function getBusinessBySlug(slug: string): Promise<Business | null> {
  const url =
    `${API_URL}/api/businesses?` +
    `filters[slug][$eq]=${encodeURIComponent(slug)}&` +
    "populate[logo]=true&" +
    "populate[coverImage]=true&" +
    "populate[gallery]=true&" +
    "populate[area]=true&" +
    "populate[categories]=true&" +
    "populate[contact]=true&" +
    "populate[location]=true&" +
    "populate[schedule]=true&" +
    "populate[socialLinks]=true";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Error obteniendo negocio por slug (${slug}): status ${response.status}`);
      return null;
    }

    const json = await response.json();

    if (!json.data || !json.data.length) {
      return null;
    }

    return mapBusiness(json.data[0]);
  } catch (error) {
    console.error(`Excepción en getBusinessBySlug (${slug}):`, error);
    return null;
  }
}

function mapBusiness(item: any): Business {
  return {
    documentId: item.documentId,

    name: item.name,
    slug: item.slug,

    shortDescription: item.shortDescription,
    description: item.description,

    type: item.type,

    active: item.active,
    verified: item.verified,
    featured: item.featured,

    businessModel: item.businessModel,

    acceptsCard: item.acceptsCard,
    homeDelivery: item.homeDelivery,

    logo: item.logo
      ? {
          url: item.logo.url,
          alternativeText: item.logo.alternativeText,
        }
      : undefined,

    coverImage: item.coverImage
      ? {
          url: item.coverImage.url,
          alternativeText: item.coverImage.alternativeText,
        }
      : undefined,

    gallery:
      item.gallery?.map((image: any) => ({
        url: image.url,
        alternativeText: image.alternativeText,
      })) ?? [],

    contact: item.contact,
    location: item.location,
    schedule: item.schedule,
    socialLinks: item.socialLinks,

    area: item.area
      ? {
          documentId: item.area.documentId,
          name: item.area.name,
          slug: item.area.slug,
        }
      : undefined,

    categories:
      item.categories?.map((category: any) => ({
        documentId: category.documentId,
        name: category.name,
        slug: category.slug,
      })) ?? [],
  };
}