import 'dotenv/config';
import { db } from '../src/lib/db';
import { pages, pageSections } from '../src/lib/db/schema';
import { eq } from 'drizzle-orm';

async function test() {
  try {
    const blogPages = await db.query.pages.findMany({
      where: eq(pages.status, 'published'),
      with: {
        sections: {
          where: eq(pageSections.type, 'blog-detail-block'),
        },
      },
    });
    console.log('Blog pages queried successfully. Count:', blogPages.length);
  } catch (error) {
    console.error('Error querying blog pages:', error);
  }
  process.exit(0);
}

test();
