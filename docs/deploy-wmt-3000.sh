#!/usr/bin/env bash
set -euo pipefail

# Deploy WMT static site to http://www.mls-home.com:3000/wmt
# without impacting http://www.mls-home.com:1311

APP_DIR="/data/PeCoLab/WMT/wmt-website/app"
DEPLOY_DIR="/var/www/wmt"
NGINX_SNIPPET_SRC="/data/PeCoLab/WMT/docs/nginx-wmt-subpath-3000.conf"
TARGET_HOST="www.mls-home.com"
TARGET_PORT="3000"

echo "[PRECHECK] Resolve target host"
TARGET_IP="$(getent hosts "$TARGET_HOST" | awk 'NR==1{print $1}')"
LOCAL_IP="$(hostname -I | awk '{print $1}')"

echo "[PRECHECK] target host: $TARGET_HOST -> ${TARGET_IP:-unknown}"
echo "[PRECHECK] local host ip: ${LOCAL_IP:-unknown}"

if [[ -n "${TARGET_IP:-}" && -n "${LOCAL_IP:-}" && "$TARGET_IP" != "$LOCAL_IP" ]]; then
	echo "[ERROR] Current machine is not the target production host for $TARGET_HOST."
	echo "[ERROR] Please run this script on the server that owns IP $TARGET_IP."
	exit 1
fi

# 1) Build
cd "$APP_DIR"
npm ci
npm run build

# 2) Sync static files
sudo mkdir -p "$DEPLOY_DIR"
sudo rsync -av --delete dist/ "$DEPLOY_DIR/"

# 3) Backup nginx config
sudo cp -a /etc/nginx "/etc/nginx.backup.$(date +%F-%H%M%S)"

echo "\n[INFO] Next step: merge snippet below into the server block that listens on 3000:" 
cat "$NGINX_SNIPPET_SRC"

echo "\n[INFO] After merging, run:" 
echo "sudo nginx -t && sudo systemctl reload nginx"

echo "\n[INFO] Verify nginx is listening on port 3000:" 
echo "sudo ss -lntp | grep :3000"

echo "\n[INFO] Verify both endpoints:" 
echo "curl -I http://www.mls-home.com:3000/wmt/"
echo "curl -I http://www.mls-home.com:1311/"
