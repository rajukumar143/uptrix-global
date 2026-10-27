-- ==============================================================================
-- PostgreSQL Schema for Uptrix Next.js Blog & Admin Panel
-- Run on database: uptrixglobal_db (host: 187.77.188.152)
-- ==============================================================================

-- 1. Create 'posts' table
CREATE TABLE IF NOT EXISTS public.posts (
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

-- Index for fast slug lookups on the public blog
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts (slug);
CREATE INDEX IF NOT EXISTS idx_posts_published_created ON public.posts (published, created_at DESC);

-- 2. Create 'login_attempts' table
CREATE TABLE IF NOT EXISTS public.login_attempts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address text NOT NULL,
  success boolean NOT NULL,
  attempted_at timestamptz DEFAULT now() NOT NULL
);

-- Index for security audit log filtering
CREATE INDEX IF NOT EXISTS idx_login_attempts_attempted_at ON public.login_attempts (attempted_at DESC);

-- 3. Automatic updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_posts_updated_at ON public.posts;
CREATE TRIGGER set_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
