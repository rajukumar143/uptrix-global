# Deploying Uptrix on Hostinger

This guide puts the website live on a **Hostinger VPS** with your own domain, HTTPS and the admin
dashboard working. Allow about 45 minutes the first time. After that, updates take one command.

> **Which Hostinger plan?** Use a **VPS** plan (KVM 1 or bigger, with **Ubuntu 24.04**). The admin dashboard
> saves your edits as a file on the server, and a VPS keeps that file safe between updates. Hostinger's
> ordinary "Web Hosting" plans can't run this site. See the note at the end about their Node.js app hosting.

You'll copy and paste commands into the server's terminal. Replace **`yourdomain.com`** with your real
domain everywhere you see it.

---

## 1. Point your domain at the VPS

1. In **hPanel → VPS**, note your server's **IP address**.
2. In **hPanel → Domains → your domain → DNS / Nameservers → DNS records**:
   - Edit (or add) an **A** record: Name `@`, points to your VPS IP.
   - Edit (or add) an **A** record: Name `www`, points to your VPS IP.
   - Delete any other `@` or `www` A/CNAME records that point elsewhere.

DNS changes can take from a few minutes to a few hours. You can carry on while it updates.

## 2. Open the server terminal

In **hPanel → VPS → your server**, click **Browser terminal**, or from your computer run:

```bash
ssh root@YOUR_VPS_IP
```

## 3. Install the software

Paste these one block at a time:

```bash
apt update && apt upgrade -y
apt install -y git nginx certbot python3-certbot-nginx ufw
```

```bash
# Node.js 22 (the site needs version 20.9 or newer)
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
npm install -g pm2
node -v    # should print v22.x
```

```bash
# Firewall: allow SSH and the website only
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
```

## 4. Let the server read your private GitHub repo

Your repo is private, so give the server a read-only **deploy key**:

```bash
ssh-keygen -t ed25519 -C "uptrix-server" -f ~/.ssh/uptrix_deploy -N ""
cat ~/.ssh/uptrix_deploy.pub
```

Copy the line it prints (starts with `ssh-ed25519`). Then on GitHub:
**github.com/rajukumar143/uptrix-global → Settings → Deploy keys → Add deploy key**. Paste it, give it a
title like `Hostinger VPS`, leave **Allow write access** unticked, and click **Add key**.

Back in the terminal:

```bash
cat >> ~/.ssh/config <<'EOF'
Host github.com
  IdentityFile ~/.ssh/uptrix_deploy
  IdentitiesOnly yes
EOF
ssh -o StrictHostKeyChecking=accept-new -T git@github.com   # says "successfully authenticated" — that's fine
```

## 5. Download the code

```bash
mkdir -p /var/www
git clone git@github.com:rajukumar143/uptrix-global.git /var/www/uptrix
mkdir -p /var/www/uptrix-data/content     # where the admin dashboard saves your text
cd /var/www/uptrix
```

## 6. Settings and admin password

```bash
cp deploy/env.example .env.local
openssl rand -base64 48        # copy what it prints — this is your session secret
nano .env.local
```

In the editor, fill in:

| Setting | What to put |
|---|---|
| `SITE_URL` | `https://yourdomain.com` |
| `ADMIN_USERNAME` | the admin login name, e.g. `admin` |
| `ADMIN_PASSWORD` | a long password only you know |
| `ADMIN_SESSION_SECRET` | the random text from `openssl` above |
| `CONTENT_DIR` | leave as `/var/www/uptrix-data/content` |

Save with **Ctrl+O**, **Enter**, then exit with **Ctrl+X**.

## 7. Build and start the site

```bash
npm ci
npm run build
pm2 start deploy/ecosystem.config.cjs
pm2 save
pm2 startup        # it prints one more command — copy and run that too, so the site starts after a reboot
```

Check it's running: `pm2 status` should show **uptrix** as **online**.

## 8. Connect your domain (Nginx)

```bash
cp deploy/nginx-uptrix.conf /etc/nginx/sites-available/uptrix
sed -i 's/yourdomain.com/YOUR-REAL-DOMAIN.com/g' /etc/nginx/sites-available/uptrix
ln -s /etc/nginx/sites-available/uptrix /etc/nginx/sites-enabled/uptrix
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

`nginx -t` must say **syntax is ok** and **test is successful**.

## 9. Turn on HTTPS (free certificate)

Once your domain opens the site over `http://` (DNS has updated):

```bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com --redirect -m you@example.com --agree-tos -n
```

The certificate renews automatically. HTTPS is required for the admin login to work.

## 10. Check everything

- Open `https://yourdomain.com`: the home page.
- Open `https://yourdomain.com/crm`, `/crm/pricing`, `/crm/about` and `/crm/contact`.
- Open `https://yourdomain.com/admin`, sign in, change a word, press **Save changes**, and check the page.

You're live.

---

## Updating the site later

On your computer, after changing code:

```bash
git add -A
git commit -m "Describe the change"
git push
```

On the server:

```bash
cd /var/www/uptrix && bash deploy/update.sh
```

Text you've edited in the admin dashboard is **not** affected by updates. It lives in
`/var/www/uptrix-data/content`.

## Back up your website text

Hostinger VPS **snapshots** (hPanel → VPS → Snapshots & backups) back up the whole server. For a simple daily
copy of just the website text as well:

```bash
mkdir -p /var/backups/uptrix
( crontab -l 2>/dev/null; echo '0 2 * * * tar -czf /var/backups/uptrix/content-$(date +\%F).tar.gz -C /var/www/uptrix-data content && find /var/backups/uptrix -mtime +30 -delete' ) | crontab -
```

## If something goes wrong

| Problem | What to do |
|---|---|
| **502 Bad Gateway** | The site isn't running. `pm2 status`, then `pm2 logs uptrix --lines 50` to see why. `pm2 restart uptrix` |
| Build stops with **"killed"** or memory errors | Add swap: `fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile && echo '/swapfile none swap sw 0 0' >> /etc/fstab`, then build again |
| Admin login keeps returning to the sign-in page | Make sure you're on **https://**. HTTPS (step 9) must be done first |
| "The admin dashboard is not set up yet" | `.env.local` is missing a setting, or the secret is shorter than 32 characters. Fix it, then `pm2 restart uptrix --update-env` |
| "Could not save" in the dashboard | `mkdir -p /var/www/uptrix-data/content` and check `CONTENT_DIR` in `.env.local` |
| Domain doesn't open the site | DNS hasn't updated yet. Check the A records in step 1, wait, and try again |
| Forgot the admin password | Change `ADMIN_PASSWORD` in `/var/www/uptrix/.env.local`, then `pm2 restart uptrix --update-env` |

Useful commands: `pm2 logs uptrix` (live log), `pm2 restart uptrix`, `systemctl status nginx`.

---

### Note: Hostinger "Node.js" web hosting (instead of a VPS)

Some Hostinger Business/Cloud plans can run Node.js apps imported from GitHub, with settings entered in
hPanel. The site will run there, but check one thing first: **files saved by the app must survive a
redeploy.** If your plan rebuilds the app folder on each deploy, admin dashboard edits would be lost.
Set `CONTENT_DIR` to a folder outside the app, if the plan allows one. If you're unsure, use the VPS
route above.
