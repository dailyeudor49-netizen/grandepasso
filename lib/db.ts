import { neon } from "@neondatabase/serverless";

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_r08mklvnFgXH@ep-empty-butterfly-adojp2uj-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const sql = neon(DATABASE_URL);

let migrated = false;

async function migrate() {
  if (migrated) return;

  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      product TEXT NOT NULL,
      phone TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT now()`;
  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS upsell BOOLEAN NOT NULL DEFAULT false`;

  migrated = true;
}

export async function phoneExists(phone: string): Promise<boolean> {
  await migrate();
  const rows = await sql`SELECT 1 FROM orders WHERE phone = ${phone} LIMIT 1`;
  return rows.length > 0;
}

export async function registerOrder(product: string, phone: string, upsell = false) {
  await migrate();
  await sql`INSERT INTO orders (product, phone, upsell) VALUES (${product}, ${phone}, ${upsell})`;
}

export async function updatePhone(oldPhone: string, newPhone: string): Promise<boolean> {
  await migrate();
  const rows = await sql`UPDATE orders SET phone = ${newPhone} WHERE phone = ${oldPhone} RETURNING id`;
  return rows.length > 0;
}

/* ── Admin stats ── */

export async function getOrderStats(from?: string, to?: string) {
  await migrate();

  const hasRange = from && to;

  const [totalRows, byProductRows, byDayRows, byHourRows, upsellRows] = await Promise.all([
    hasRange
      ? sql`SELECT COUNT(*)::int AS count FROM orders WHERE (created_at AT TIME ZONE 'Europe/Rome')::date >= ${from}::date AND (created_at AT TIME ZONE 'Europe/Rome')::date <= ${to}::date`
      : sql`SELECT COUNT(*)::int AS count FROM orders`,

    hasRange
      ? sql`SELECT product, COUNT(*)::int AS count FROM orders WHERE (created_at AT TIME ZONE 'Europe/Rome')::date >= ${from}::date AND (created_at AT TIME ZONE 'Europe/Rome')::date <= ${to}::date GROUP BY product ORDER BY count DESC`
      : sql`SELECT product, COUNT(*)::int AS count FROM orders GROUP BY product ORDER BY count DESC`,

    hasRange
      ? sql`SELECT (created_at AT TIME ZONE 'Europe/Rome')::date AS day, COUNT(*)::int AS count FROM orders WHERE (created_at AT TIME ZONE 'Europe/Rome')::date >= ${from}::date AND (created_at AT TIME ZONE 'Europe/Rome')::date <= ${to}::date GROUP BY day ORDER BY day DESC LIMIT 60`
      : sql`SELECT (created_at AT TIME ZONE 'Europe/Rome')::date AS day, COUNT(*)::int AS count FROM orders GROUP BY day ORDER BY day DESC LIMIT 60`,

    hasRange
      ? sql`SELECT EXTRACT(HOUR FROM created_at AT TIME ZONE 'Europe/Rome')::int AS hour, COUNT(*)::int AS count FROM orders WHERE (created_at AT TIME ZONE 'Europe/Rome')::date >= ${from}::date AND (created_at AT TIME ZONE 'Europe/Rome')::date <= ${to}::date GROUP BY hour ORDER BY hour`
      : sql`SELECT EXTRACT(HOUR FROM created_at AT TIME ZONE 'Europe/Rome')::int AS hour, COUNT(*)::int AS count FROM orders GROUP BY hour ORDER BY hour`,

    hasRange
      ? sql`SELECT COUNT(*)::int AS count FROM orders WHERE upsell = true AND (created_at AT TIME ZONE 'Europe/Rome')::date >= ${from}::date AND (created_at AT TIME ZONE 'Europe/Rome')::date <= ${to}::date`
      : sql`SELECT COUNT(*)::int AS count FROM orders WHERE upsell = true`,
  ]);

  return {
    total: totalRows[0]?.count ?? 0,
    byProduct: byProductRows as { product: string; count: number }[],
    byDay: byDayRows as { day: string; count: number }[],
    byHour: byHourRows as { hour: number; count: number }[],
    upsellCount: upsellRows[0]?.count ?? 0,
  };
}
