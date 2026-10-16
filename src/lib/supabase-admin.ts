// Server-only Supabase client and storage helper for Uptrix Global
import "server-only";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "https://uzyhjpginrwcztsisihx.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseServiceKey) {
  console.warn("[supabase-admin] SUPABASE_SERVICE_ROLE_KEY is missing in environment variables.");
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
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
  const { data, error } = await supabaseAdmin.storage
    .from("blog-images")
    .upload(fileName, buffer, {
      contentType,
      upsert: true,
    });

  if (error) {
    console.error("[supabase-storage] Error uploading image:", error.message);
    throw new Error(`Failed to upload image to Supabase: ${error.message}`);
  }

  const { data: publicUrlData } = supabaseAdmin.storage
    .from("blog-images")
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}
