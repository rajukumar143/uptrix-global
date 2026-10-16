import { createClient } from "@supabase/supabase-js";

/**
 * SERVER-ONLY SUPABASE ADMIN CLIENT
 *
 * CRITICAL SECURITY INVARIANT:
 * - This file MUST ONLY be imported and executed in server-side environments
 *   (API routes, Server Actions, Server Components).
 * - It uses SUPABASE_SERVICE_ROLE_KEY, which bypasses Row Level Security (RLS).
 * - NEVER expose SUPABASE_SERVICE_ROLE_KEY to the browser or prefix it with NEXT_PUBLIC_.
 */

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  // We log a warning on startup if credentials are missing
  console.warn(
    "[supabase-admin] Warning: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not defined in environment variables."
  );
}

export const supabaseAdmin = createClient(
  supabaseUrl || "https://placeholder-url.supabase.co",
  supabaseServiceRoleKey || "placeholder-key",
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

/**
 * Fetch all published posts ordered by publication date
 */
export async function getPublishedPosts() {
  const { data, error } = await supabaseAdmin
    .from("posts")
    .select("id, title, slug, meta_description, cover_image_url, og_image_url, created_at, updated_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[supabase-admin] Error fetching published posts:", error.message);
    throw new Error("Failed to fetch posts from database.");
  }

  return data || [];
}

/**
 * Fetch a single published post by slug
 */
export async function getPostBySlug(slug) {
  if (!slug) return null;

  const { data, error } = await supabaseAdmin
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error(`[supabase-admin] Error fetching post with slug "${slug}":`, error.message);
    throw new Error("Failed to fetch post.");
  }

  return data;
}

/**
 * Upload an image file buffer to the public 'blog-images' storage bucket
 */
export async function uploadBlogImage(fileBuffer, fileName, contentType) {
  const sanitizedFileName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9_.-]/g, "_")}`;
  const filePath = `uploads/${sanitizedFileName}`;

  const { data, error } = await supabaseAdmin.storage
    .from("blog-images")
    .upload(filePath, fileBuffer, {
      contentType: contentType || "image/jpeg",
      upsert: false,
    });

  if (error) {
    console.error("[supabase-admin] Image upload error:", error.message);
    throw new Error("Image upload failed.");
  }

  const { data: publicUrlData } = supabaseAdmin.storage
    .from("blog-images")
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}

/**
 * Log a login attempt into the 'login_attempts' table
 */
export async function logLoginAttempt(ipAddress, success) {
  try {
    const { error } = await supabaseAdmin
      .from("login_attempts")
      .insert({
        ip_address: ipAddress || "unknown",
        success: Boolean(success),
      });

    if (error) {
      console.error("[supabase-admin] Failed to record login attempt:", error.message);
    }
  } catch (err) {
    console.error("[supabase-admin] Unexpected error logging login attempt:", err);
  }
}

/**
 * Retrieve the last 50 login attempts and the total failed attempts count
 */
export async function getSecurityAuditData() {
  const [attemptsRes, failedCountRes] = await Promise.all([
    supabaseAdmin
      .from("login_attempts")
      .select("id, ip_address, success, attempted_at")
      .order("attempted_at", { ascending: false })
      .limit(50),
    supabaseAdmin
      .from("login_attempts")
      .select("id", { count: "exact", head: true })
      .eq("success", false),
  ]);

  if (attemptsRes.error) {
    console.error("[supabase-admin] Error fetching login attempts:", attemptsRes.error.message);
  }

  return {
    attempts: attemptsRes.data || [],
    failedCount: failedCountRes.count ?? 0,
  };
}
