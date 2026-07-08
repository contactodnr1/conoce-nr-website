// src/services/businesses/getBusinessesLight.ts
// Versión ligera para listados (explorar, áreas, categorías).
// NO trae gallery, contact, location, schedule ni socialLinks.

import type { Business } from "../../types/business";

const API_URL = import.meta.env.PUBLIC_STRAPI_URL;

export async function getBusinessesLight(): Promise<Business[]> {
  const url =
    `${API_URL}/api/businesses?` +
    "populate[logo]=true&" +
    "populate[coverImage]=true&" +
    "populate[area]=true&" +
    "populate[categories]=true&" +
    "fields[0]=name&" +
    "fields[1]=slug&" +
    "fields[2]=shortDescription&" +
    "fields[3]=verified&" +
    "fields[4]=featured&" +
    "fields[5]=homeDelivery&" +
    "fields[6]=acceptsCard&" +
    "sort[0]=featured:desc&" +
    "sort[1]=verified:desc&" +
    "sort[2]=name:asc";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Error obteniendo negocios light: status ${response.status}`);
      return [];
    }

    const json = await response.json();
    return json.data ?? [];
  } catch (error) {
    console.error("Excepción en getBusinessesLight:", error);
    return [];
  }
}