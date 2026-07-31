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
        title: 'The Most Comprehensive Project Management Software',
        subtitle: 'The preferred project management application of more than a million businesses.',
        badges: [
          { text: '4-day free trial' },
          { text: 'No credit card required' },
          { text: 'No credit card required' }
        ],
        primaryCtaText: 'GET STARTED',
        primaryCtaUrl: '#form',
        secondaryCtaText: 'BOOK A FREE DEMO',
        secondaryCtaUrl: '/contact-us',
        formTitle: 'Get a Free Trial',
        formSubtitle: 'Get Started in less than 30 seconds',
        formButtonText: 'REGISTER FOR FREE',
        formButtonBgColor: '#e52528'
      },
      order: 10
    },
    {
      type: 'landing2-intro',
      content: {
        badgeText: 'AI-Powered ERP That Unifies Your Entire Business',
        title: 'Transform operations, automate workflows, and make smarter decisions from a single platform.',
        description: 'Manage finance, inventory, manufacturing, sales, procurement, HR, and customer relationships with an intelligent ERP designed to improve productivity, reduce costs, and accelerate business growth.',
        ctaText: 'TALK TO AN ERP EXPERT',
        ctaUrl: '/contact-us'
      },
      order: 20
    },
    {
      type: 'landing2-modules',
      content: {
        title: 'Easy-to-integrate Modules',
        modules: [
          { title: 'Planning & Production', iconType: 'planning', href: '/contact-us' },
          { title: 'Production & Configuration', iconType: 'production', href: '/contact-us' },
          { title: 'Total Quality Management', iconType: 'quality', href: '/contact-us' },
          { title: 'Dashboard & Alerts', iconType: 'dashboard', href: '/contact-us' },
          { title: 'CRM & Order Processing', iconType: 'crm', href: '/contact-us' },
          { title: 'Finance Management', iconType: 'finance', href: '/contact-us' },
          { title: 'Purchase Management', iconType: 'purchase', href: '/contact-us' },
          { title: 'Inventory Management', iconType: 'inventory', href: '/contact-us' }
        ],
        ctaText: 'REQUEST A DEMO',
        ctaUrl: '/contact-us'
      },
      order: 30
    },
    {
      type: 'landing2-carousel',
      content: {
        slides: [
          {
            badge: 'THE ENTERPRISE ADVANTAGE',
            title: 'Work smarter.\nGrow faster.',
            description: 'Business growth shouldn\'t mean more manual work. With ESS India ERP, AI-powered automation, real-time insights, and connected business processes help your organization operate efficiently, reduce costs, and scale with confidence.',
            mediaUrl: '/Landing Page-2/assets/63e39c93deb059f6e6a6bccf_Bsh.svg.png',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          },
          {
            badge: 'AUTOMATED WORKFLOWS',
            title: 'Streamline.\nAccelerate.',
            description: 'Eliminate departmental silos and manual entry errors with unified real-time data flows across inventory, sales, finance, and human resources.',
            mediaUrl: '/Landing Page-2/assets/63e39c93deb059f6e6a6bccf_Bsh.svg.png',
          },
          {
            badge: 'REAL-TIME ANALYTICS',
            title: 'Predictable.\nProfitable.',
            description: 'Gain complete operational visibility with interactive dashboards, automated executive alerts, and predictive business intelligence tools.',
            mediaUrl: '/Landing Page-2/assets/63e39c93deb059f6e6a6bccf_Bsh.svg.png',
          }
        ]
      },
      order: 40
    },
    {
      type: 'landing2-boosting',
      content: {
        sectionTitle: 'Boosting Business. Today\nand Tomorrow.',
        badge: 'EXPENSES',
        title: 'Optimise expense\nManagement as a team',
        description: 'Bring harmony to team expenses with budget limits and real-time monitoring. Freedom for your staff. Peace of mind for you.',
        image: '/Landing Page-2/assets/Frame 1618872989.png',
        ctaText: 'Explore more',
        ctaUrl: '/contact-us'
      },
      order: 50
    },
    {
      type: 'landing2-accounting',
      content: {
        badge: 'ACCOUNTING',
        title: 'Real-time accounting\nat your fingertips.',
        description: 'Take the pain out of book keeping! Wave goodbye to mountains of paperwork and endless email reminders. There\'s now a new way of accounting.',
        image: '/Landing Page-2/assets/Frame 1618872988.png',
        ctaText: 'Explore more',
        ctaUrl: '/contact-us'
      },
      order: 60
    },
    {
      type: 'landing2-brands',
      content: {
        title: 'Trusted by over 50,000 companies of all sizes',
        logos: [
          '/Landing Page-2/assets/jnj.png',
          '/Landing Page-2/assets/bsh.png',
          '/Landing Page-2/assets/microsoft.png',
          '/Landing Page-2/assets/bestseller.png'
        ]
      },
      order: 70
    },
    {
      type: 'landing2-capabilities',
      content: {
        badge: 'USE CASES',
        title: 'Core ERP capabilities',
        tabs: [
          { name: 'Financial management', image: '/Landing Page-2/assets/image 365.png' },
          { name: 'Sales order management', image: '/Landing Page-2/assets/image 365.png' },
          { name: 'CRM', image: '/Landing Page-2/assets/image 365.png' },
          { name: 'Analytics & reporting', image: '/Landing Page-2/assets/image 365.png' },
          { name: 'Marketing', image: '/Landing Page-2/assets/image 365.png' }
        ],
        ctaText: 'TALK WITH OUR EXPERTS',
        ctaUrl: '/contact-us'
      },
      order: 80
    },
    {
      type: 'landing2-industries',
      content: {
        badge: 'INDUSTRIES',
        title: 'Wide Array of Industries',
        industries: [
          { name: 'Steel', image: '/Landing Page-2/assets/Rectangle 18110.png', href: '/industry-solutions' },
          { name: 'Pharma', image: '/Landing Page-2/assets/Rectangle 18111.png', href: '/industry-solutions' },
          { name: 'Corrugated Boxes', image: '/Landing Page-2/assets/Rectangle 18112.png', href: '/industry-solutions' },
          { name: 'Trading Flour Mill', image: '/Landing Page-2/assets/Rectangle 18113.png', href: '/industry-solutions' },
          { name: 'Retail', image: '/Landing Page-2/assets/Rectangle 18114.png', href: '/solutions/retail' },
          { name: 'Food And Beverage', image: '/Landing Page-2/assets/Rectangle 18115.png', href: '/industry-solutions' },
          { name: 'FMCG', image: '/Landing Page-2/assets/Rectangle 18116.png', href: '/solutions/fmcg/fmcg-overview' },
          { name: 'Oil & Gas', image: '/Landing Page-2/assets/Rectangle 18117.png', href: '/industry-solutions' },
          { name: 'Manufacturing', image: '/Landing Page-2/assets/Rectangle 18119.png', href: '/industry-solutions/manufacturing' },
          { name: 'Printing & Publishing', image: '/Landing Page-2/assets/Rectangle 18120.png', href: '/industry-solutions' },
          { name: 'Construction', image: '/Landing Page-2/assets/Rectangle 18121.png', href: '/industry-solutions' },
          { name: 'Engineering', image: '/Landing Page-2/assets/Rectangle 18118.png', href: '/industry-solutions' }
        ]
      },
      order: 90
    },
    {
      type: 'landing2-integrations',
      content: {
        badge: 'INTEGRATIONS',
        title: 'Embed your videos into\nyour favorite tools',
        logos: [
          '/Landing Page-2/assets/integration-intercom.png',
          '/Landing Page-2/assets/integration-moodle.png',
          '/Landing Page-2/assets/integration-powerpoint.png',
          '/Landing Page-2/assets/integration-hubspot.png',
          '/Landing Page-2/assets/integration-notion.png',
          '/Landing Page-2/assets/integration-blackbox.png',
          '/Landing Page-2/assets/integration-docebo.png',
          '/Landing Page-2/assets/integration-articulate.png',
          '/Landing Page-2/assets/integration-360.png'
        ]
      },
      order: 100
    },
    {
      type: 'landing2-testimonials',
      content: {
        title: 'See what our customers are saying',
        subtitle: '2,157 people have said how good we are',
        testimonials: [
          {
            quote: '“This is the best sales experience I have ever had!”',
            author: 'Dianne Russell',
            role: 'Founder, ExtendSales',
            image: '/Landing Page-2/assets/3ddf828267cb844171aaad94b1f6da3e7949acbd.png',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          },
          {
            quote: '“I can’t tell how easy it was to grow my small shop with it”',
            author: 'Jenny Wilson',
            role: 'Founder, ExtendSales',
            image: '/Landing Page-2/assets/BG.png',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          }
        ]
      },
      order: 110
    },
    {
      type: 'landing2-why-ess',
      content: {
        badge: 'WHY ESS',
        title: 'Integrated ERP Modules for Smarter\nBusiness Management',
        features: [
          {
            title: 'Cost-Saving',
            description: 'Reduce operational costs and increase profitability with an efficient ERP.',
            iconType: 'rupee'
          },
          {
            title: 'Complete Security',
            description: 'Enterprise-grade security to protect your data and ensure business continuity.',
            iconType: 'security'
          },
          {
            title: 'Flexibility',
            description: 'Adapt and scale your ERP as your business evolves and grows.',
            iconType: 'flexibility'
          },
          {
            title: 'Scalability',
            description: 'Easily scale operations, users, and modules without compromising performance.',
            iconType: 'analytics'
          },
          {
            title: 'Peace of Mind Ensured',
            description: 'Reliable, automated, and always available – so you can focus on what matters.',
            iconType: 'user'
          },
          {
            title: 'Faster Time to Value',
            description: 'Quick implementation and faster adoption to deliver results from day one.',
            iconType: 'time'
          }
        ],
        ctaText: 'GET FREE DEMO',
        ctaUrl: '/contact-us'
      },
      order: 120
    },
    {
      type: 'landing2-footer-banner',
      content: {
        logo: '/Landing Page-2/assets/logo.png',
        navLinks: [
          { label: 'Industries', href: '/industry-solutions' },
          { label: 'Products', href: '/products' },
          { label: 'Solutions', href: '/solutions/retail' },
          { label: 'Platform', href: '/solutions/rpa' },
          { label: 'Services', href: '/services' },
          { label: 'Partners', href: '/contact-us' },
          { label: 'About', href: '/about-us' }
        ],
        socialLinks: [
          { icon: '/Landing Page-2/assets/Social Media.png', url: 'https://facebook.com' },
          { icon: '/Landing Page-2/assets/Social Media-1.png', url: 'https://x.com' },
          { icon: '/Landing Page-2/assets/Social Media-2.png', url: 'https://threads.net' },
          { icon: '/Landing Page-2/assets/Social Media-3.png', url: 'https://instagram.com' },
          { icon: '/Landing Page-2/assets/Social Media-4.png', url: 'https://linkedin.com' }
        ],
        ctaText: 'Contact Us',
        ctaUrl: '/contact-us'
      },
      order: 130
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
