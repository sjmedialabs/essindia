#!/usr/bin/env bash
# Run AFTER DNS A/AAAA for essindia.com + www.essindia.com point to this server.
set -euo pipefail

SERVER_IP="$(curl -s --max-time 5 ifconfig.me || true)"
DOMAIN_IP="$(getent ahostsv4 essindia.com | awk '{print $1; exit}')"

echo "Server IP:  ${SERVER_IP}"
echo "Domain IP:  ${DOMAIN_IP}"

if [[ -z "${SERVER_IP}" || -z "${DOMAIN_IP}" || "${SERVER_IP}" != "${DOMAIN_IP}" ]]; then
  echo "ERROR: DNS for essindia.com must point to this server before issuing SSL."
  exit 1
fi

certbot --nginx -d essindia.com -d www.essindia.com \
  --non-interactive --agree-tos --email admin@essindia.com --redirect

# Re-enable HTTPS canonicalization in the app
cd /var/www/essindia
python3 - <<'PY'
from pathlib import Path
for name in ['.env', '.env.production']:
    p = Path(name)
    lines = []
    for line in p.read_text().splitlines():
        if line.startswith('FORCE_HTTPS='):
            lines.append('FORCE_HTTPS=true')
        elif line.startswith('ENABLE_HOST_REDIRECTS='):
            lines.append('ENABLE_HOST_REDIRECTS=true')
        else:
            lines.append(line)
    p.write_text('\n'.join(lines) + '\n')
PY

pm2 restart essindia --update-env
systemctl reload nginx
certbot renew --dry-run
echo "SSL enabled. Test: curl -I https://essindia.com/"
