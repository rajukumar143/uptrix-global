# Admin dashboard

Edit the text on every page at **/admin**. Changes go live as soon as you press **Save changes**.

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

- **Keep the `content/` folder.** Saved text lives in `content/site.json`, with the last 30 versions in
  `content/backups/`. Don't delete or overwrite it when you upload a new version of the code. The server
  needs permission to write to it. To store it elsewhere, set `CONTENT_DIR=/path/to/folder`.
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
