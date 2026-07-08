// src/services/getFeaturedBussines/getfeaturedBussinnes.ts
// Versión Light para el feed del home. Solo campos necesarios para BusinessCard + BusinessFeed.
// NO incluye gallery, contact, location, schedule ni socialLinks.

import type { Business } from "../../types/business";

const API_URL = import.meta.env.PUBLIC_STRAPI_URL;

export async function getFeaturedBusinesses(): Promise<Business[]> {
  const url =
    `${API_URL}/api/businesses?` +
    "fields[0]=name&" +
    "fields[1]=slug&" +
    "fields[2]=shortDescription&" +
    "fields[3]=verified&" +
    "fields[4]=featured&" +
    "fields[5]=active&" +
    "fields[6]=homeDelivery&" +
    "fields[7]=acceptsCard&" +
    "populate[logo]=true&" +
    "populate[coverImage]=true&" +
    "populate[area][fields][0]=name&" +
    "populate[area][fields][1]=slug&" +
    "populate[categories][fields][0]=name&" +
    "populate[categories][fields][1]=slug&" +
    "filters[active][$eq]=true&" +
    "sort[0]=featured:desc&" +
    "sort[1]=verified:desc&" +
    "sort[2]=name:asc&" +
    "pagination[pageSize]=20";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Error obteniendo negocios destacados: status ${response.status}`);
      return [];
    }

    const json = await response.json();

    return json.data.map(mapBusiness);
  } catch (error) {
    console.error("Excepción en getFeaturedBusinesses:", error);
    return [];
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

    gallery: [],

    contact: undefined,
    location: undefined,
    schedule: undefined,
    socialLinks: undefined,

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