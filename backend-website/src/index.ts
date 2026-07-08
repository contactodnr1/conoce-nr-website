export default {
  register({ strapi }: any) {},

  async bootstrap({ strapi }: any) {
    const db = strapi.db.connection;
    const client = strapi.config.get('database.connection.client');

    if (client === 'postgres') {
      const indexes = [
        `CREATE INDEX IF NOT EXISTS idx_businesses_slug ON businesses(slug)`,
        `CREATE INDEX IF NOT EXISTS idx_businesses_active ON businesses(active)`,
        `CREATE INDEX IF NOT EXISTS idx_businesses_featured ON businesses(featured)`,
        `CREATE INDEX IF NOT EXISTS idx_businesses_created_at ON businesses(created_at)`,
        `CREATE INDEX IF NOT EXISTS idx_areas_slug ON areas(slug)`,
        `CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug)`,
      ];

      for (const sql of indexes) {
        try {
          await db.raw(sql);
        } catch (e: any) {
          console.warn(`[bootstrap] Index already exists or failed: ${sql}`, e.message);
        }
      }

      console.log('[bootstrap] Database indexes verified.');
    }
  },
};
