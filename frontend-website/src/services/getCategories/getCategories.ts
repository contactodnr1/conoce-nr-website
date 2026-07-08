// src/services/getCategories/getCategories.ts
// Versión Light para listados: solo campos necesarios para cards y filtros.

import type { Category } from "../../types/category";

const API_URL = import.meta.env.PUBLIC_STRAPI_URL;

export async function getCategories(): Promise<Category[]> {
  const url =
    `${API_URL}/api/categories?` +
    "fields[0]=name&" +
    "fields[1]=slug&" +
    "fields[2]=description&" +
    "populate[icon]=true&" +
    "populate[image]=true&" +
    "sort[0]=name:asc&" +
    "pagination[pageSize]=50";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Error obteniendo categorías: status ${response.status}`);
      return [];
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Excepción en getCategories:", error);
    return [];
  }
}

