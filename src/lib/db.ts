import "server-only";
import { Pool, type QueryResult, type QueryResultRow } from "pg";

let _pool: Pool | null = null;
let _schemaInitialized = false;

export function getDbPool(): Pool {
  if (_pool) return _pool;

  const host = process.env.DB_HOST || "187.77.188.152";
  const port = parseInt(process.env.DB_PORT || "5432", 10);
  const database = process.env.DB_NAME || "uptrixglobal_db";
  const user = process.env.DB_USER || "uptrixglobal_user_db";
  const password = process.env.DB_PASSWORD || "uptrix@*&23";

  _pool = new Pool({
    host,
    port,
    database,
    user,
    password,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

  _pool.on("error", (err) => {
    console.error("[postgres] Unexpected error on idle client", err);
  });

  return _pool;
}

export async function initSchema(): Promise<void> {
  if (_schemaInitialized) return;
  const pool = getDbPool();
  const schema = process.env.DB_SCHEMA || "public";

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${schema}.posts (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        title text NOT NULL,
        slug text UNIQUE NOT NULL,
        content text NOT NULL,
        cover_image_url text,
        meta_title text,
        meta_description text,
        meta_keywords text,
        og_image_url text,
        published boolean DEFAULT false,
        created_at timestamptz DEFAULT now() NOT NULL,
        updated_at timestamptz DEFAULT now() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS ${schema}.login_attempts (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        ip_address text NOT NULL,
        success boolean NOT NULL,
        attempted_at timestamptz DEFAULT now() NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_posts_slug ON ${schema}.posts (slug);
      CREATE INDEX IF NOT EXISTS idx_posts_published_created ON ${schema}.posts (published, created_at DESC);
    `);
    _schemaInitialized = true;
  } catch (err) {
    console.warn("[postgres] Schema initialization warning:", err);
  }
}

export async function dbQuery<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  await initSchema();
  const pool = getDbPool();
  return pool.query<T>(text, params);
}
