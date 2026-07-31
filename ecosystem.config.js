/**
 * PM2 ecosystem for ESS India (Next.js production)
 * App listens on 127.0.0.1:5003 internally.
 * Public HTTPS is served by Nginx on port 5002.
 */
const fs = require('fs');
const path = require('path');

const ROOT = '/var/www/essindia';
const LOG_DIR = path.join(ROOT, 'logs');

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

module.exports = {
  apps: [
    {
      name: 'essindia',
      script: './node_modules/next/dist/bin/next',
      args: 'start -H 127.0.0.1 -p 5003',
      cwd: ROOT,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      min_uptime: '10s',
      max_restarts: 20,
      restart_delay: 4000,
      kill_timeout: 5000,
      listen_timeout: 10000,
      exp_backoff_restart_delay: 100,
      merge_logs: true,
      time: true,
      error_file: path.join(LOG_DIR, 'pm2-error.log'),
      out_file: path.join(LOG_DIR, 'pm2-out.log'),
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      env: {
        NODE_ENV: 'production',
        PORT: 5003,
        HOSTNAME: '127.0.0.1',
      },
      env_file: path.join(ROOT, '.env.production'),
    },
  ],
};
