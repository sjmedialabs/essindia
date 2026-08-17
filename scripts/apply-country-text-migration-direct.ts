import postgres from 'postgres';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

function loadEnv() {
  const envPath = resolve(process.cwd(), '.env');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
const sql = postgres(connectionString!, { prepare: false, idle_timeout: 5 });

async function run() {
  try {
    // Terminate any hanging locks on navigation_menus table
    await sql`SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE pid <> pg_backend_pid() AND query LIKE '%navigation_menus%';`.catch(() => {});
    await sql`ALTER TABLE navigation_menus ADD COLUMN IF NOT EXISTS country_dropdown_text varchar(255) DEFAULT 'Select Country';`;
    console.log('--- DIRECT ALTER TABLE SUCCESSFUL ---');
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    await sql.end();
  }
}

run();
