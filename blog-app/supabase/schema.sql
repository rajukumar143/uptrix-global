-- ==============================================================================
-- Supabase Schema for Next.js Blog & Admin Panel
-- ==============================================================================

-- 1. Enable pgcrypto for UUID generation if not already enabled
create extension if not exists "pgcrypto";

-- 2. Create 'posts' table
create table if not exists public.posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  content text not null,
  cover_image_url text,
  meta_title text,
  meta_description text,
  meta_keywords text,
  og_image_url text,
  published boolean default false,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Index for fast slug lookups on the public blog
create index if not exists idx_posts_slug on public.posts (slug);
create index if not exists idx_posts_published_created on public.posts (published, created_at desc);

-- 3. Create 'login_attempts' table
create table if not exists public.login_attempts (
  id uuid default gen_random_uuid() primary key,
  ip_address text not null,
  success boolean not null,
  attempted_at timestamptz default now() not null
);

-- Index for security audit log filtering
create index if not exists idx_login_attempts_attempted_at on public.login_attempts (attempted_at desc);

-- 4. Enable Row Level Security (RLS) on both tables
alter table public.posts enable row level security;
alter table public.login_attempts enable row level security;

-- NOTE: By enabling RLS with NO public policies defined, public/anon users 
-- cannot query or modify these tables directly from the browser. 
-- Only the server-side Next.js backend using SUPABASE_SERVICE_ROLE_KEY 
-- (which bypasses RLS) can access and mutate data.

-- 5. Trigger to automatically update updated_at on posts
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_posts_updated_at on public.posts;
create trigger set_posts_updated_at
  before update on public.posts
  for each row
  execute function public.handle_updated_at();

-- 6. Create public storage bucket 'blog-images'
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do update set public = true;

-- Policy: Allow public read access to uploaded blog images
create policy "Public can view blog images"
  on storage.objects for select
  using (bucket_id = 'blog-images');

-- Note: Storage uploads, updates, and deletes are performed by the server
-- using the Supabase Service Role key which bypasses storage RLS.
