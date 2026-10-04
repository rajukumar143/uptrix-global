#!/usr/bin/env bash
# Pull the latest code from GitHub, rebuild and restart the site.
# Run on the server from the project folder:  bash deploy/update.sh
# Your saved website text (CONTENT_DIR) and .env.local are not touched.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "→ Getting the latest code"
git pull --ff-only

echo "→ Installing packages"
npm ci

echo "→ Building"
npm run build

echo "→ Restarting"
pm2 reload uptrix --update-env || pm2 start deploy/ecosystem.config.cjs
pm2 save

echo "✓ Done. The site is running the latest version."
