# Deploying Uptrix on Hostinger Business

Uptrix is deployed as **two Node.js apps from the same GitHub repository**:

| App | Hostname | `APP_MODE` | Build command | Start command |
|---|---|---|---|---|
| Public website | `example.com` | `public` | `npm run build:public` | `npm run start:public` |
| Admin and API | `admin.example.com` | `admin` | `npm run build:admin` | `npm run start:admin` |

Replace the example hostnames, `/home/your-user`, and app paths below with the values from your
hPanel account. Do not put real credentials in GitHub, this file, or either example environment file.

## 1. Prepare both domains

1. In hPanel, create the `admin` subdomain and connect both hostnames to their respective Node.js apps.
2. Enable Hostinger SSL for both hostnames and enable HTTPS redirects.
3. Choose one canonical public hostname (`https://example.com` or `https://www.example.com`) and use
   that exact value as the public app's `SITE_URL`. The app redirects other hostnames to its canonical URL.
4. Use `https://admin.example.com` as the admin app's `SITE_URL`. It must remain a separate hostname.

The actual domain names and DNS/SSL settings must be supplied and configured in hPanel by the site owner.

## 2. Create persistent, private content and backup folders

From Hostinger's SSH/terminal, create paths **outside both app folders and outside `public_html`**:

```bash
mkdir -p /home/your-user/content-data /home/your-user/uptrix-backups
chmod 700 /home/your-user/content-data /home/your-user/uptrix-backups
```

Both apps must run as an account that can read this same `content-data` folder. The public app reads it;
the admin app reads and writes it. `CONTENT_DIR` must have owner-only permissions (`700`). The server
checks the path, permissions, and access at runtime and reports configuration errors at `/api/health`.
Keep all content and backups out of the deployed repository and public web root.

Before deploying, confirm the plan preserves this external folder when either app is rebuilt. The
website cannot safely use separate content folders for the public and admin apps.

## 3. Connect GitHub and create the two Node.js apps

For each app in hPanel:

1. Connect `rajukumar143/uptrix-global` and select the production branch (normally `main`).
2. Set Node.js to version 20 or 22 supported by the hPanel app runtime.
3. Set the app root to a separate folder outside `public_html`, if hPanel allows it.
4. Set the app's build and start commands from the table above.
5. Configure the environment variables in the next section, then build and start the app.
6. Enable hPanel's GitHub auto-deploy for pushes to `main` if available.

In GitHub, protect `main` and require the `verify` job from `.github/workflows/ci.yml` to pass before
merging. hPanel/GitHub app linking and branch-protection settings are account-level steps and cannot be
enabled by repository code alone.

If hPanel cannot create two apps from the same repository, cannot share the persistent folder, or
replaces `CONTENT_DIR` on deployment, stop before launch and ask Hostinger support which persistent
path and app configuration are supported. Do not put `CONTENT_DIR` inside either app as a workaround.

## 4. Configure each app's environment

Use `.env.public.example` and `.env.admin.example` as the variable checklist. Enter the real values
in each app's hPanel environment settings, not in GitHub.

### Public app

Set:

```text
APP_MODE=public
SITE_URL=https://example.com
CONTENT_DIR=/home/your-user/content-data
PUBLIC_HTML_DIR=/home/your-user/public_html
API_URL=https://admin.example.com
ADMIN_API_SECRET=<same random value as on admin app>
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<Cloudflare Turnstile site key>
TURNSTILE_SECRET_KEY=<Cloudflare Turnstile secret key>
```

Set `NEXT_PUBLIC_GA4_ID` only if the analytics measurement ID is ready. Analytics is loaded only after
the visitor accepts analytics in the cookie notice. `API_URL`
is server-only; do not prefix it with `NEXT_PUBLIC_`, because the public app sends a private shared
secret to the admin API.

### Admin app

Set:

```text
APP_MODE=admin
SITE_URL=https://admin.example.com
PUBLIC_SITE_URL=https://example.com
CONTENT_DIR=/home/your-user/content-data
PUBLIC_HTML_DIR=/home/your-user/public_html
ADMIN_API_SECRET=<same random value as on public app>
ADMIN_USERNAME=<private admin username>
ADMIN_PASSWORD_HASH=<generated scrypt hash>
ADMIN_SESSION_SECRET=<at least 32 random characters>
```

Generate independent random secrets for the shared API secret and session signing secret. For example:

```bash
openssl rand -hex 32
```

Create the password hash locally or in a private terminal; enter the password without saving it in
shell history:

```bash
read -s ADMIN_PASSWORD
printf '%s' "$ADMIN_PASSWORD" | node scripts/hash-admin-password.js
unset ADMIN_PASSWORD
```

Copy the printed hash into hPanel as `ADMIN_PASSWORD_HASH`. The password must be at least 12 characters.
Do not set `ADMIN_PASSWORD` in production.

Set the same exact public origin in `PUBLIC_SITE_URL` and the `SITE_URL` of the public app. Configure
Cloudflare Turnstile for the public hostname and set its site key and secret only on the public app.

## 5. First deploy and smoke checks

Once both apps are built and started:

1. Visit `https://example.com/api/health` and confirm HTTP 200 and `status: "ok"`.
2. Visit `https://admin.example.com/api/health` and confirm HTTP 200 and that storage is writable.
3. Confirm `https://example.com/admin` and `https://example.com/api/admin/leads` return 404.
4. Confirm `https://admin.example.com/` returns 404 and `https://admin.example.com/admin/login` loads.
5. Sign in at `https://admin.example.com/admin/login`, edit a page, and save.
6. Confirm the edit appears on `https://example.com` and a new content file exists under `CONTENT_DIR`.
7. Submit a test enquiry with Turnstile enabled; confirm it appears in the admin leads screen.
8. Trigger a GitHub redeploy and confirm the saved edit remains.

The admin login cookie is host-only, HttpOnly, SameSite=Lax, and Secure in production. It is not shared
with the public hostname.

## 6. Daily backups and restore test

Install/configure `rclone` with a private off-server remote (for example Google Drive, S3, or Backblaze)
if the Hostinger account permits it. Never put rclone credentials in the repository. The script creates
a private ZIP daily, keeps the most recent 14 days locally, and copies Sunday's archive to the configured
remote:

```bash
CONTENT_DIR=/home/your-user/content-data \
BACKUP_DIR=/home/your-user/uptrix-backups \
PUBLIC_HTML_DIR=/home/your-user/public_html \
RCLONE_REMOTE=uptrix-backup:content \
bash /home/your-user/path-to-app/scripts/backup-content.sh
```

Create a **daily** hPanel Cron Job for that command, replacing paths with the actual values. Verify the
first archive exists and the weekly remote copy completes. A missing `zip`, wrong permissions, symlinks
inside the content directory, or a missing weekly rclone remote makes the script exit with an error.

**Test a restore before relying on the backup:**

```bash
mkdir -p /home/your-user/restore-test
unzip -l /home/your-user/uptrix-backups/content-YYYY-MM-DDTHH-MM-SSZ.zip
unzip /home/your-user/uptrix-backups/content-YYYY-MM-DDTHH-MM-SSZ.zip -d /home/your-user/restore-test
test -s /home/your-user/restore-test/site.json
chmod -R go-rwx /home/your-user/restore-test
```

Verify expected site, blog, lead, and upload files in the test directory; do not overwrite live data for
this test. For an actual restore, stop both apps, take a fresh copy of the current content folder, extract
the selected archive into a staging directory, verify it, then replace the contents of `CONTENT_DIR`
and restore mode `700` before restarting the apps. Keep the pre-restore copy until the site is verified.

## 7. Rollback, update, and rotate secrets

- **Rollback code:** in hPanel, redeploy the previous known-good GitHub commit for each app. Keep both
  apps on compatible commits. The content folder is outside the app and must not be rolled back with code.
- **Update code:** push the reviewed change to `main`; hPanel auto-deploys if enabled. Otherwise trigger
  the deployment for both apps from hPanel.
- **Rotate a secret:** generate the replacement privately, update the matching hPanel variables on both
  apps for `ADMIN_API_SECRET`, redeploy/restart both, then remove the old value. Rotate
  `ADMIN_SESSION_SECRET` on the admin app to invalidate all existing admin sessions. For a password
  rotation, generate a new `ADMIN_PASSWORD_HASH` and restart the admin app.
- **Restore content:** follow the tested restore steps above. Restoring content is separate from rolling
  back application code.

## Troubleshooting

| Symptom | Check |
|---|---|
| App returns 500 and says `APP_MODE` is invalid | Set exactly `public` or `admin` for each app and restart it. |
| `/api/health` returns 503 | Confirm `CONTENT_DIR` exists, is absolute, shared by both apps, outside app folders and the path in `PUBLIC_HTML_DIR`, and has mode `700`. |
| Public form fails | Check `API_URL`, matching `ADMIN_API_SECRET`, exact `PUBLIC_SITE_URL`, Turnstile keys, and admin app health. |
| Admin login returns to login page | Confirm `ADMIN_USERNAME`, generated `ADMIN_PASSWORD_HASH`, and `ADMIN_SESSION_SECRET`; use HTTPS. |
| Admin save fails | Check writable access for the admin app's process account and that the content folder remains outside the deployed app. |
| Public app does not show a saved edit | Confirm both apps use the identical `CONTENT_DIR`, then check the public app health and cache/revalidation logs. |
| Content disappears after redeploy | The configured path was not persistent or was inside an app folder; restore from an off-server backup and move it to an external persistent location. |

Hostinger-specific app limits, shared storage permissions, DNS, SSL, Turnstile keys, analytics consent,
and off-server backup credentials must be configured and verified by the site owner in hPanel.
