import { db } from '../src/lib/db/index.ts';
import { pages } from '../src/lib/db/schema.ts';

async function main() {
  const allPages = await db.query.pages.findMany({
    columns: { id: true, title: true, slug: true, fullPath: true, parentId: true }
  });
  console.log('ALL PAGES:', JSON.stringify(allPages, null, 2));
}

main().catch(console.error);
