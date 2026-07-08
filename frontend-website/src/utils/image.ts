// src/utils/image.ts
// Utilidad compartida para resolver URLs de imágenes de Strapi.
// Centraliza la lógica que estaba duplicada en +7 archivos.

const API_URL = import.meta.env.PUBLIC_STRAPI_URL ?? "";

/**
 * Resuelve una URL de imagen de Strapi a una URL absoluta.
 * - Si la URL ya es absoluta (http/https), la retorna tal cual.
 * - Si es una ruta relativa de Strapi (ej. /uploads/...), antepone PUBLIC_STRAPI_URL.
 * - Si la URL está vacía o es nula, retorna el fallback.
 */
export function resolveImageUrl(
  url: string | null | undefined,
  fallback = "/images/placeholder.svg",
): string {
  if (!url) return fallback;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${API_URL}${url}`;
}
