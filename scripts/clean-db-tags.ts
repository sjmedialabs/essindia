import postgres from 'postgres';
import 'dotenv/config';

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

function cleanContentHtml(val: unknown): any {
  if (typeof val === 'string') {
    const html = val.trim();
    if (html.startsWith('<p>') && html.endsWith('</p>')) {
      const inner = html.slice(3, -4).trim();
      // Check if the inner content has any HTML tags (e.g. <strong>, <em>, <u>, <a>, <ul>, etc.)
      const hasOtherTags = inner.includes('<') && inner.includes('>');
      if (!hasOtherTags) {
        return inner;
      }
    }
    return val;
  }
  if (Array.isArray(val)) {
    return val.map(cleanContentHtml);
  }
  if (typeof val === 'object' && val !== null) {
    const res: Record<string, any> = {};
    for (const k in val) {
      res[k] = cleanContentHtml((val as any)[k]);
    }
    return res;
  }
  return val;
}

async function main() {
  console.log('Cleaning HTML tags in page_sections...');
  const pageSecs = await sql`SELECT id, content FROM page_sections`;
  let cleanPageSecs = 0;
  for (const row of pageSecs) {
    const newContent = cleanContentHtml(row.content);
    if (JSON.stringify(newContent) !== JSON.stringify(row.content)) {
      await sql`UPDATE page_sections SET content = ${sql.json(newContent)} WHERE id = ${row.id}`;
      cleanPageSecs++;
    }
  }
  console.log(`Cleaned ${cleanPageSecs} page_sections.`);

  console.log('Cleaning HTML tags in template_sections...');
  const templateSecs = await sql`SELECT id, content_json FROM template_sections`;
  let cleanTemplateSecs = 0;
  for (const row of templateSecs) {
    const newContent = cleanContentHtml(row.content_json);
    if (JSON.stringify(newContent) !== JSON.stringify(row.content_json)) {
      await sql`UPDATE template_sections SET content_json = ${sql.json(newContent)} WHERE id = ${row.id}`;
      cleanTemplateSecs++;
    }
  }
  console.log(`Cleaned ${cleanTemplateSecs} template_sections.`);

  console.log('Cleaning HTML tags in library sections...');
  const secs = await sql`SELECT id, content_json FROM sections`;
  let cleanSecs = 0;
  for (const row of secs) {
    const newContent = cleanContentHtml(row.content_json);
    if (JSON.stringify(newContent) !== JSON.stringify(row.content_json)) {
      await sql`UPDATE sections SET content_json = ${sql.json(newContent)} WHERE id = ${row.id}`;
      cleanSecs++;
    }
  }
  console.log(`Cleaned ${cleanSecs} library sections.`);

  await sql.end();
  console.log('Database cleanup completed successfully.');
}

main().catch(console.error);
