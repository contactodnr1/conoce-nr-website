// src/env.ts
// Validación de variables de entorno al inicio.
// Si falta PUBLIC_STRAPI_URL, el servidor falla rápido con un mensaje claro.

const REQUIRED_ENV = ["PUBLIC_STRAPI_URL"] as const;

for (const key of REQUIRED_ENV) {
  if (!import.meta.env[key]) {
    throw new Error(
      `[descubre-nr] Variable de entorno requerida no encontrada: ${key}\n` +
        `Asegúrate de tener un archivo .env con:\n  ${key}=http://localhost:1337`,
    );
  }
}

export const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL as string;
