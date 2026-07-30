import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { db } from '../src/lib/db';
import { templates, templateSections, categories } from '../src/lib/db/schema';
import { slugify } from '../src/lib/cms/utils';

async function seed() {
  console.log('🚀 Seeding Landing Page 2 Template...');

  const templateName = 'Landing Page Template 2';
  const slug = slugify(templateName);

  // 1. Get or create Landing Page category
  let category = await db.query.categories.findFirst({
    where: (c, { eq }) => eq(c.slug, 'landing-page'),
  });

  if (!category) {
    const [newCategory] = await db.insert(categories).values({
      name: 'Landing Page',
      slug: 'landing-page',
      description: 'Landing page templates',
      status: 'active',
    }).returning();
    category = newCategory;
    console.log('✅ Created "Landing Page" category.');
  }

  // 2. Check if template already exists
  const existingTemplate = await db.query.templates.findFirst({
    where: (t, { eq }) => eq(t.slug, slug),
  });

  if (existingTemplate) {
    console.log(`ℹ️ Template "${templateName}" already exists. Deleting it to recreate...`);
    await db.delete(templateSections).where(eq(templateSections.templateId, existingTemplate.id));
    await db.delete(templates).where(eq(templates.id, existingTemplate.id));
  }

  // 3. Create Template
  const [newTemplate] = await db.insert(templates).values({
    name: templateName,
    slug: slug,
    description: 'A dark purple themed corporate landing page with 12 modular, high-fidelity sections.',
    status: 'active',
    categoryId: category.id,
    previewThumbnail: '/Landing page1/assets/Frame 1618872987.png',
  }).returning();

  console.log(`✅ Created Template: ${newTemplate.name} (${newTemplate.id})`);

  const sections = [
    {
      type: 'landing2-hero',
      content: {
        title: 'Tackling The Lack Of Clear ERP Information, One Guide At A Time.',
        primaryCtaText: 'Book Free Demo',
        primaryCtaUrl: '/contact',
        secondaryCtaText: 'Watch Product Tour',
        secondaryCtaUrl: '#',
        image: '/Landing page1/assets/RecehTok Crypto.jpg',
      },
      order: 10
    }
  ];

  // 5. Insert Sections
  for (const section of sections) {
    await db.insert(templateSections).values({
      templateId: newTemplate.id,
      type: section.type,
      contentJson: section.content,
      orderIndex: section.order,
    });
    console.log(`✅ Seeded ${section.type} section`);
  }

  console.log('✨ Seeding completed successfully! Landing Page Template 2 is now available.');
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
