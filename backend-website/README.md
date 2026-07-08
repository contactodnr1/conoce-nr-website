# Descubre NR — Backend (Strapi CMS 5)

Backend headless CMS para el directorio hiperlocal de Nicolás Romero, Estado de México.

## Requisitos

- Node.js >= 20
- PostgreSQL 14+
- Cuenta en [Cloudinary](https://cloudinary.com) (para imágenes)

## Variables de entorno

Copia `.env.example` a `.env` y completa los valores:

```bash
cp .env.example .env
```

Variables requeridas:

| Variable | Descripción |
|---|---|
| `HOST` | Host del servidor (default: `0.0.0.0`) |
| `PORT` | Puerto del servidor (default: `1337`) |
| `APP_KEYS` | 4 claves separadas por coma (32+ chars base64 c/u) |
| `API_TOKEN_SALT` | Salt para tokens de API |
| `ADMIN_JWT_SECRET` | Secreto JWT del panel admin |
| `JWT_SECRET` | Secreto JWT de la API pública |
| `DATABASE_URL` | Connection string de PostgreSQL |
| `DATABASE_SSL` | `true` para producción |
| `CLOUDINARY_CLOUD_NAME` | Nombre del cloud en Cloudinary |
| `CLOUDINARY_API_KEY` | API Key de Cloudinary |
| `CLOUDINARY_API_SECRET` | API Secret de Cloudinary |

> ⚠️ Genera secretos seguros con: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`

## Comandos

```bash
# Desarrollo (con autoreload)
pnpm develop

# Producción
pnpm build
pnpm start

# Actualizar Strapi
pnpm upgrade
```

## API REST

Endpoints públicos (requieren permisos `find` y `findOne` en Roles → Public):

- `GET /api/businesses` — Negocios
- `GET /api/businesses/:id` — Negocio por ID
- `GET /api/areas` — Áreas
- `GET /api/areas/:id` — Área por ID
- `GET /api/categories` — Categorías
- `GET /api/categories/:id` — Categoría por ID

## Base de datos

- PostgreSQL vía [Neon.tech](https://neon.tech)
- Pool: min 2, max 10 conexiones
- SSL habilitado en producción (`rejectUnauthorized: false`)
- Índices creados automáticamente al iniciar:
  - `businesses(slug, active, featured, created_at)`
  - `areas(slug)`
  - `categories(slug)`

## Imágenes (Cloudinary)

Las imágenes se almacenan en Cloudinary. Las URLs devueltas por la API son absolutas (`https://res.cloudinary.com/...`).

### Migrar imágenes existentes

Si hay imágenes en `public/uploads/` antes de configurar Cloudinary:

1. Configurar variables de Cloudinary en `.env`
2. Reiniciar Strapi — las subidas nuevas irán a Cloudinary
3. Para migrar las existentes:
   - Opción A: Usar script personalizado que re-subía cada archivo via API de Strapi
   - Opción B: Volver a subir manualmente desde el panel admin
   - Opción C: Usar `strapi export` / `strapi import`

## Despliegue (Fly.io)

```bash
fly launch
fly secrets set $(cat .env | grep -v '^#' | xargs)
fly deploy
```

## Seguridad

- **CORS**: Solo `nicolasromero.mx`, `*.pages.dev` y `localhost:4321`
- **Rate limit**: 100 requests/minuto por IP
- **CSP**: Solo fuentes permitidas para imágenes (`res.cloudinary.com`, `strapi.io`)
- **Permisos públicos**: SOLO `find` y `findOne` para cada content type
