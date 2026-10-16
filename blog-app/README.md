# Next.js Supabase Blog & Admin Studio

A production-ready, security-first Next.js (App Router) blog platform with an administrative publishing studio and comprehensive SEO automation, engineered for deployment on **Hostinger Node.js Hosting** and powered by **Supabase**.

---

## 🏛️ Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Browser                           │
│  (NEVER connects to Supabase - Zero Client Key Exposure)   │
└──────────────────────────────┬──────────────────────────────┘
                               │
               HTTPS / Next.js API Routes & Pages
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                  Next.js Server Runtime                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ lib/supabase-admin.js (SUPABASE_SERVICE_ROLE_KEY only) │ │
│  │ lib/auth.js (jose HS256 Sliding JWT Sessions)          │ │
│  │ lib/rate-limit.js (Upstash Redis 10 req/min/IP)        │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────┬──────────────────────────────┘
                               │ Service Role Key (Bypasses RLS)
┌──────────────────────────────▼──────────────────────────────┐
│                    Supabase Backend                         │
│  • posts table (RLS enabled, NO public policies)            │
│  • login_attempts table (RLS enabled, NO public policies)   │
│  • blog-images storage bucket (public read, server write)   │
└─────────────────────────────────────────────────────────────┘
```

1. **Zero Client Supabase Exposure**: The browser never connects to Supabase directly. There are NO `NEXT_PUBLIC_SUPABASE_*` keys. All database queries and storage uploads are proxied through server-side Next.js API routes and Server Components using `lib/supabase-admin.js`.
2. **Database Row Level Security (RLS)**: Both `posts` and `login_attempts` have RLS enabled with **zero public policies**. Only the server-side Service Role key can read or mutate records.
3. **Admin Authentication**:
   - Username verified against `ADMIN_USERNAME`.
   - Passwords compared with `bcryptjs` against `ADMIN_PASSWORD_HASH` (no plaintext passwords anywhere).
   - Signed JWT (`jose`, algorithm `HS256`, 30-minute expiration) in an `httpOnly`, `secure`, `sameSite=strict` cookie.
   - **Sliding Inactivity Timeout**: The Next.js middleware automatically validates the token and re-issues a fresh 30-minute token on each authenticated request.
4. **Rate Limiting**: Integrated **Upstash Redis** rate limiter on the login endpoint (10 requests per minute per IP address).
5. **Security Audit Logging**: Every login attempt (IP address, success/failure, timestamp) is logged in Supabase and visible at `/admin/security`.
6. **Client-Side Image Optimization**: Before sending images over the wire, `/admin/upload` compresses them in the browser via `browser-image-compression` (max 300 KB, max 1600 px).

---

## 📦 Project Structure

```
blog-app/
├── app/
│   ├── admin/
│   │   ├── layout.js          # Admin secondary header & navigation
│   │   ├── login/page.js      # Admin login form with rate-limit handling
│   │   ├── security/page.js   # Audit logs & failed login counter
│   │   └── upload/page.js     # Post editor with browser image compression
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.js # Login handler with Upstash rate limit & bcrypt
│   │   │   └── logout/route.js# Cookie invalidation endpoint
│   │   └── posts/route.js     # Public GET & Admin-only multipart POST
│   ├── blog/
│   │   ├── page.js            # Public blog listing
│   │   └── [slug]/page.js     # Single post with dynamic SEO metadata
│   ├── globals.css            # Dark mode theme & markdown prose styles
│   ├── layout.js              # Global site layout & navigation
│   ├── page.js                # Public homepage with featured posts
│   ├── robots.js              # Disallows /admin, allows public pages
│   └── sitemap.js             # Dynamic sitemap pulling posts from Supabase
├── lib/
│   ├── auth.js                # JWT signing & verification (jose HS256)
│   ├── rate-limit.js          # Upstash Redis rate limiting
│   └── supabase-admin.js      # Server-only Supabase client (service role)
├── middleware.js              # Route protection & sliding 30-min JWT renewal
├── scripts/
│   └── hash-password.js       # CLI tool to generate bcrypt password hashes
├── supabase/
│   └── schema.sql             # Complete SQL migration script
├── .env.example               # Template for environment variables
├── .gitignore                 # Excludes .env.local and node_modules
├── package.json
└── README.md
```

---

## 🚀 Quick Start (Local Development)

### 1. Database Setup in Supabase
1. Create a project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Open `supabase/schema.sql` and run the script. This will:
   - Create the `posts` table with SEO fields.
   - Create the `login_attempts` table.
   - Enable RLS on both tables with no public access.
   - Create the `blog-images` public storage bucket.

### 2. Environment Variables Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Generate your admin password hash using the included helper:
```bash
node scripts/hash-password.js mySecurePassword123
```

Fill in `.env.local`:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJh...your-service-role-key-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2b$12$...your-generated-hash-here
SESSION_SECRET=a_very_long_random_string_at_least_32_chars_long
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-upstash-token-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```

Visit:
- Public Homepage: [http://localhost:3000](http://localhost:3000)
- Blog Listing: [http://localhost:3000/blog](http://localhost:3000/blog)
- Admin Login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Admin Upload: [http://localhost:3000/admin/upload](http://localhost:3000/admin/upload)
- Security Audit: [http://localhost:3000/admin/security](http://localhost:3000/admin/security)
- Sitemap: [http://localhost:3000/sitemap.xml](http://localhost:3000/sitemap.xml)
- Robots: [http://localhost:3000/robots.txt](http://localhost:3000/robots.txt)

---

## 🌐 Deploying on Hostinger Node.js Hosting

Hostinger provides Node.js application hosting on their Cloud Hosting, Business Web Hosting, and VPS plans.

### Method A: Hostinger hPanel Node.js Application Manager

1. **Log into Hostinger hPanel**:
   - Navigate to **Websites** → Select your domain → Click **Manage**.
   - Search for **Node.js** in the search bar.

2. **Configure Node.js Application**:
   - **Node.js version**: Choose `v20.x` or `v18.x` (LTS recommended).
   - **Application mode**: `Production`.
   - **Application root**: `public_html` (or your subdirectory).
   - **Application startup file**: `server.js` or use npm scripts.

3. **Upload Application Code**:
   - Clone your Git repository or upload the files via Git / SSH / File Manager.
   - *Ensure `.env.local` is NOT committed; you will set variables in the panel.*

4. **Add Environment Variables in Hostinger hPanel**:
   In the **Node.js Application Settings**, add:
   - `NODE_ENV` = `production`
   - `PORT` = (Hostinger default port assigned to your app)
   - `SUPABASE_URL` = `https://your-project.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` = `eyJh...`
   - `ADMIN_USERNAME` = `admin`
   - `ADMIN_PASSWORD_HASH` = `your_bcrypt_hash`
   - `SESSION_SECRET` = `your_32_char_secret`
   - `UPSTASH_REDIS_REST_URL` = `https://...`
   - `UPSTASH_REDIS_REST_TOKEN` = `your_token`
   - `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com`

5. **Build and Start**:
   Open the **SSH Console** or Terminal in Hostinger:
   ```bash
   cd ~/public_html
   npm install
   npm run build
   ```

   In Hostinger hPanel, click **Restart Application**.

---

### Method B: Hostinger VPS with PM2 (Recommended for maximum performance)

If using Hostinger VPS (Ubuntu 22.04 / 24.04):

```bash
# 1. Install Node.js 20 LTS & PM2
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2

# 2. Clone repository & install
git clone https://github.com/your-username/your-repo.git /var/www/blog
cd /var/www/blog
npm install

# 3. Create .env.production
nano .env.production # Paste your environment variables

# 4. Build Next.js
npm run build

# 5. Start with PM2
pm2 start npm --name "next-blog" -- start
pm2 save
pm2 startup
```

Configure Nginx reverse proxy to forward port `3000` to port `80`/`443` with SSL (Certbot).

---

## 💾 Weekly Automated Supabase Backup (`pg_dump`)

To safeguard your blog posts and audit logs against accidental loss, set up a weekly automated backup using `pg_dump`.

### 1. Direct Backup Command

In your Supabase project settings, go to **Settings** → **Database** → **Connection string** (URI format):
```bash
# Run manually:
pg_dump "postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres" \
  --schema=public \
  --file="backup_$(date +%Y%m%d_%H%M%S).sql"
```

### 2. Automated Weekly Cron Job Script

Create `scripts/backup.sh` on your server:

```bash
#!/usr/bin/env bash
set -e

# Configuration
BACKUP_DIR="/var/backups/supabase-blog"
DB_URL="postgresql://postgres.[PROJECT-REF]:[YOUR_PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/supabase_backup_${DATE}.sql.gz"

mkdir -p "$BACKUP_DIR"

# Perform compressed dump of the public schema
echo "Starting Supabase backup: $DATE"
pg_dump "$DB_URL" --schema=public --clean --if-exists | gzip > "$BACKUP_FILE"

# Keep only the last 4 weekly backups (delete older than 30 days)
find "$BACKUP_DIR" -type f -name "supabase_backup_*.sql.gz" -mtime +30 -exec rm {} \;

echo "Backup completed successfully: $BACKUP_FILE"
```

Make the script executable:
```bash
chmod +x scripts/backup.sh
```

### 3. Schedule Weekly Cron

Run `crontab -e` and add the following entry (runs every Sunday at 3:00 AM):

```cron
0 3 * * 0 /var/www/blog/scripts/backup.sh >> /var/log/supabase-backup.log 2>&1
```

---

## 🔒 Security Best Practices Implemented

- ✅ **No Public Database Access**: RLS prevents any unauthorized client from querying posts or reading logs directly.
- ✅ **Sliding JWT Sessions**: Inactive admin sessions expire in 30 minutes; active admins maintain seamless access without abrupt logouts.
- ✅ **Bcrypt Hashing**: Passwords are never stored or compared in plaintext.
- ✅ **Zero Service Key Leakage**: Service role key is confined exclusively to Node.js server processes.
- ✅ **Upstash Anti-Brute-Force**: Login attempts exceeding 10 per minute per IP are blocked at the edge.
- ✅ **Client-Side Compression**: Prevents server payload exhaustion and optimizes CDN bandwidth.
- ✅ **Sanitized SEO Metadata**: OpenGraph, dynamic Twitter cards, canonical sitemaps, and robots exclusion rules are configured out of the box.
