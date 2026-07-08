// src/services/businesses/getBusinesses.ts
// Versión para páginas de listado (áreas, categorías).
// Trae los datos necesarios para contar y filtrar negocios por área/categoría.
// Para datos completos de un negocio individual, usar getBusinessBySlug.

import type { Business } from "../../types/business";

const API_URL = import.meta.env.PUBLIC_STRAPI_URL;

export async function getBusinesses(): Promise<Business[]> {
  const url =
    `${API_URL}/api/businesses?` +
    "fields[0]=name&" +
    "fields[1]=slug&" +
    "fields[2]=shortDescription&" +
    "fields[3]=verified&" +
    "fields[4]=featured&" +
    "fields[5]=homeDelivery&" +
    "fields[6]=acceptsCard&" +
    "populate[logo]=true&" +
    "populate[coverImage]=true&" +
    "populate[area][fields][0]=name&" +
    "populate[area][fields][1]=slug&" +
    "populate[categories][fields][0]=documentId&" +
    "populate[categories][fields][1]=name&" +
    "populate[categories][fields][2]=slug&" +
    "sort[0]=featured:desc&" +
    "sort[1]=verified:desc&" +
    "sort[2]=name:asc&" +
    "pagination[pageSize]=100";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Error obteniendo negocios: status ${response.status}`);
      return [];
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Excepción en getBusinesses:", error);
    return [];
  }
}