# Admin dashboard

Edit the text on every page at **/admin**. After pressing **Save changes**, the site refreshes the
affected pages; a CDN may take up to a minute to show the update.

## Menu, case studies and videos

- **Top menu:** one menu is shared by every page. Edit it in **Page text → Top menu**: the Products drop-down
  (Uptrix CRM with EduTech and Real Estate underneath, and Uptrix HRMS), the other links and the demo button.
- **College page:** open **Page text → College page** to edit the SEO fields, hero, trust strip, section headings
  and copy, feature lists, management metrics, case studies (including the implementation dialog), testimonials,
  reviews, FAQs, demo form text and final calls to action.
- **Case studies:** each story gets its own page at `/case-studies/<slug>`. The starter stories are marked
  *Example* and hidden from Google. Replace them with real customers and turn off **Is example**.
- **Video testimonials:** upload the video to YouTube and paste its link. Videos without a link stay hidden;
  until there is one, the page shows "coming soon".

## Blog (for Google rankings)

**Admin → Blog posts → + New post.** Write in the editor using the toolbar (H2, H3, bold, links, lists, images).
Paste a screenshot straight into the text to upload it. **Preview** shows how the post will look.

- **SEO panel:** set a focus keyword and watch the score and checklist update as you write. Aim for green
  (80+). The Google preview shows how the result will look in search.
- **Publish** makes it live; **Save draft** keeps it private. Set a future publish date to schedule a post (it appears within a couple of minutes of that time).
- Images are automatically resized and converted to WebP, so pages stay fast.
- Each post automatically gets SEO title and description tags, Open Graph tags (for sharing on LinkedIn and
  WhatsApp), Article and breadcrumb structured data, a table of contents, related articles, a sitemap entry
  (`/sitemap.xml`) and an RSS entry (`/blog/rss.xml`).
- **After going live:** add your site in Google Search Console and submit `https://yourdomain.com/sitemap.xml`.

## Login

The username and password are set in `.env.local` (never commit or share this file):

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=...
ADMIN_SESSION_SECRET=...   # 32+ random characters; changing it signs everyone out
```

To change the password, edit `ADMIN_PASSWORD` and restart the site. Five wrong passwords lock that
address out for 15 minutes.

## Running it on your server

```
npm install
npm run build
npm start          # serves on port 3000 by default
```

- **Keep content on persistent storage.** Saved text lives in `content/site.json` (last 30 versions in
  `content/backups/`), blog posts in `content/blog/`, and uploaded images in `content/uploads/`. Don't delete or
  overwrite it when deploying new code. The server needs permission to write to it. Set `CONTENT_DIR` to a
  persistent folder on production, and make sure both the admin save process and public page process use that
  same folder. If the College fields do not appear on the live page after saving, deploy the latest site code as
  well; saving content does not deploy code changes.
- **Use HTTPS.** The login cookie is only sent over HTTPS in production. If the site runs on plain http
  (not recommended), set `ADMIN_ALLOW_HTTP=true`.
- **Run one copy of the site.** Login lockouts and page caches are kept per process. If you use PM2,
  run in fork mode, not cluster mode.

## How it works

- The original text for each page is in `src/content/*.ts`. That file also defines which fields exist.
  Saved edits are laid over it, so any field you never edit keeps its original text.
- Design, colours, icons and layout stay in the code; only the text, links, prices and lists are editable.
- **Version history** on the dashboard restores the text as it was before any save.
- **Reset this page** on each editor puts that page back to its original text.
