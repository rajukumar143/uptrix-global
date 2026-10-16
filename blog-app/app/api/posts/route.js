import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin, getPublishedPosts, getPostBySlug, uploadBlogImage } from "@/lib/supabase-admin";
import { verifySession, COOKIE_NAME } from "@/lib/auth";

// Input validation schema with Zod
const postInputSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(250),
  content: z.string().min(10, "Content must be at least 10 characters"),
  meta_description: z.string().max(160, "Meta description cannot exceed 160 characters").optional().default(""),
  meta_title: z.string().max(250).optional(),
  meta_keywords: z.string().max(300).optional().default(""),
  published: z.boolean().default(false),
});

/**
 * Helper to convert title string into URL-friendly slug
 */
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

/**
 * PUBLIC GET: Retrieve published posts or a single post by slug
 * URL: /api/posts or /api/posts?slug=my-first-post
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const post = await getPostBySlug(slug);
      if (!post) {
        return NextResponse.json({ error: "Post not found." }, { status: 404 });
      }
      return NextResponse.json(post);
    }

    const posts = await getPublishedPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("[api/posts] GET error:", error.message);
    return NextResponse.json({ error: "Failed to retrieve posts." }, { status: 500 });
  }
}

/**
 * ADMIN-ONLY POST: Create a new post from multipart form data
 */
export async function POST(request) {
  try {
    // 1. Verify session cookie
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const session = await verifySession(token);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    // 2. Parse multipart form data
    const formData = await request.formData();
    const rawTitle = formData.get("title");
    const rawContent = formData.get("content");
    const rawMetaDesc = formData.get("meta_description") || "";
    const rawMetaTitle = formData.get("meta_title") || rawTitle || "";
    const rawMetaKeywords = formData.get("meta_keywords") || "";
    const rawPublished = formData.get("published") === "true" || formData.get("published") === "on";
    const imageFile = formData.get("image");

    // 3. Validate fields with Zod
    const validation = postInputSchema.safeParse({
      title: typeof rawTitle === "string" ? rawTitle.trim() : "",
      content: typeof rawContent === "string" ? rawContent.trim() : "",
      meta_description: typeof rawMetaDesc === "string" ? rawMetaDesc.trim() : "",
      meta_title: typeof rawMetaTitle === "string" ? rawMetaTitle.trim() : "",
      meta_keywords: typeof rawMetaKeywords === "string" ? rawMetaKeywords.trim() : "",
      published: rawPublished,
    });

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid form input. Please verify all required fields." },
        { status: 400 }
      );
    }

    const validatedData = validation.data;

    // 4. Handle image upload to Supabase storage if provided
    let imageUrl = null;
    if (imageFile && typeof imageFile === "object" && imageFile.size > 0) {
      try {
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        imageUrl = await uploadBlogImage(buffer, imageFile.name, imageFile.type);
      } catch (uploadErr) {
        console.error("[api/posts] Image upload failed:", uploadErr);
        return NextResponse.json(
          { error: "Failed to upload image. Please try again." },
          { status: 500 }
        );
      }
    }

    // 5. Generate and ensure unique slug
    let baseSlug = slugify(validatedData.title);
    if (!baseSlug) baseSlug = `post-${Date.now()}`;

    // Check if slug already exists
    let finalSlug = baseSlug;
    const { data: existing } = await supabaseAdmin
      .from("posts")
      .select("id")
      .eq("slug", finalSlug)
      .maybeSingle();

    if (existing) {
      finalSlug = `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`;
    }

    // 6. Save post to Supabase database
    const newPost = {
      title: validatedData.title,
      slug: finalSlug,
      content: validatedData.content,
      meta_title: validatedData.meta_title || validatedData.title,
      meta_description: validatedData.meta_description,
      meta_keywords: validatedData.meta_keywords,
      cover_image_url: imageUrl,
      og_image_url: imageUrl,
      published: validatedData.published,
    };

    const { data: insertedPost, error: dbError } = await supabaseAdmin
      .from("posts")
      .insert(newPost)
      .select()
      .single();

    if (dbError) {
      console.error("[api/posts] Database insert error:", dbError.message);
      return NextResponse.json(
        { error: "Failed to create post in database." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, post: insertedPost },
      { status: 201 }
    );
  } catch (error) {
    console.error("[api/posts] Unexpected POST error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
