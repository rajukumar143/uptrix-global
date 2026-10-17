// Server-only Supabase client and storage helper for Uptrix Global
import "server-only";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "https://uzyhjpginrwcztsisihx.supabase.co";

let _cachedClient: SupabaseClient | null = null;

/**
 * Lazy initialization of the Supabase Admin Client.
 * If the environment key is missing during build time (e.g. Next.js page data collection),
 * it returns a safe mock/stub to prevent build aborts.
 */
export function getSupabaseAdmin(): SupabaseClient {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!key) {
    // In build phase or when key is absent, avoid throwing at compile time
    return createClient(supabaseUrl, "sb_temp_build_key_placeholder", {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  if (!_cachedClient) {
    _cachedClient = createClient(supabaseUrl, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (url, options = {}) => {
          return fetch(url, {
            ...options,
            signal: options?.signal || AbortSignal.timeout(10000),
          });
        },
      },
    });
  }

  return _cachedClient;
}

/**
 * Proxy object for supabaseAdmin.
 * Allows existing code like `supabaseAdmin.from(...)` and `supabaseAdmin.storage...`
 * to work without executing createClient() at module import time.
 */
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabaseAdmin();
    const value = (client as any)[prop];
    return typeof value === "function" ? value.bind(client) : value;
  },
});

/**
 * Upload an image buffer directly to the Supabase Storage bucket 'blog-images'.
 * Returns the public CDN URL.
 */
export async function uploadImageToSupabase(
  fileName: string,
  buffer: Buffer,
  contentType = "image/webp"
): Promise<string> {
  const client = getSupabaseAdmin();
  const { data, error } = await client.storage
    .from("blog-images")
    .upload(fileName, buffer, {
      contentType,
      upsert: true,
    });

  if (error) {
    console.error("[supabase-storage] Error uploading image:", error.message);
    throw new Error(`Failed to upload image to Supabase: ${error.message}`);
  }

  const { data: publicUrlData } = client.storage
    .from("blog-images")
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}
