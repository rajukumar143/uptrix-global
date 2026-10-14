#!/usr/bin/env bash
set -euo pipefail

: "${CONTENT_DIR:?Set CONTENT_DIR to the persistent content directory}"
APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)"
PUBLIC_HTML_DIR="${PUBLIC_HTML_DIR:-$HOME/public_html}"
BACKUP_DIR="${BACKUP_DIR:-$HOME/uptrix-backups}"

if [[ ! "$CONTENT_DIR" = /* ]]; then
  echo "CONTENT_DIR must be an absolute path." >&2
  exit 1
fi
if [[ ! -d "$CONTENT_DIR" ]]; then
  echo "CONTENT_DIR does not exist: $CONTENT_DIR" >&2
  exit 1
fi

CONTENT_REAL="$(realpath "$CONTENT_DIR")"
mkdir -p "$BACKUP_DIR"
chmod 700 "$BACKUP_DIR"
BACKUP_REAL="$(realpath "$BACKUP_DIR")"
CONTENT_MODE="$(stat -c '%a' "$CONTENT_REAL")"
if [[ "$CONTENT_MODE" != "700" ]]; then
  echo "CONTENT_DIR must have owner-only permissions (chmod 700)." >&2
  exit 1
fi
case "$CONTENT_REAL/" in "$APP_DIR/"*) echo "CONTENT_DIR must be outside the deployed app." >&2; exit 1;; esac
case "$CONTENT_REAL/" in "$PUBLIC_HTML_DIR/"*) echo "CONTENT_DIR must be outside public_html." >&2; exit 1;; esac
case "$BACKUP_REAL/" in "$APP_DIR/"*) echo "BACKUP_DIR must be outside the deployed app." >&2; exit 1;; esac
case "$BACKUP_REAL/" in "$PUBLIC_HTML_DIR/"*) echo "BACKUP_DIR must be outside public_html." >&2; exit 1;; esac

if find "$CONTENT_REAL" -type l -print -quit | grep -q .; then
  echo "CONTENT_DIR must not contain symbolic links." >&2
  exit 1
fi
command -v zip >/dev/null || { echo "zip is required to create the content backup." >&2; exit 1; }
archive="$BACKUP_REAL/content-$(date -u +%Y-%m-%dT%H-%M-%SZ).zip"
(cd "$CONTENT_REAL" && zip -qr "$archive" .)
chmod 600 "$archive"
find "$BACKUP_REAL" -maxdepth 1 -type f -name 'content-*.zip' -mtime +13 -delete

if [[ "$(date +%u)" == "7" ]]; then
  : "${RCLONE_REMOTE:?Set RCLONE_REMOTE to an off-server rclone destination before the weekly run}"
  command -v rclone >/dev/null || { echo "rclone is required for the weekly off-server backup." >&2; exit 1; }
  rclone copy "$archive" "$RCLONE_REMOTE"
fi

echo "Created content backup: $archive"
