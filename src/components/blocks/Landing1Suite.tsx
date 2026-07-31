'use client';

import React from 'react';
import Link from 'next/link';

export interface SuiteModuleItem {
  name: string;
  desc: string;
  image: string;
  highlighted?: boolean;
}

export interface Landing1SuiteContent {
  badge?: string;
  title?: string;
  description?: string;
  modules?: SuiteModuleItem[];
  ctaText?: string;
  ctaUrl?: string;
}

const DEFAULT_MODULES: SuiteModuleItem[] = [
  {
    name: 'Finance',
    desc: 'Capture leads, manage opportunities, and track every customer interaction in one place. Build stronger relationships and close deals with confidence.',
    image: '/Landing page1/assets/Clip path group.png'
  },
  {
    name: 'CRM',
    desc: 'Capture leads, manage opportunities, and track every customer interaction in one place. Build stronger relationships and close deals with confidence.',
    image: '/Landing page1/assets/Group.png',
    highlighted: true
  },
  {
    name: 'Sales',
    desc: 'Create quotations, process sales orders, manage pricing, and track deliveries effortlessly. Streamline your complete sales cycle from inquiry to invoice.',
    image: '/Landing page1/assets/Frame 1618872982.png'
  },
  {
    name: 'Manufacturing',
    desc: 'Plan production, manage BOMs, routing, work orders, and shop-floor activities with ease. Improve efficiency through real-time production planning.',
    image: '/Landing page1/assets/Frame 1618872983.png'
  },
  {
    name: 'Inventory',
    desc: 'Track inventory across multiple warehouses with batch and serial control. Maintain accurate stock levels through real-time inventory management.',
    image: '/Landing page1/assets/Frame 1618872984.png'
  },
  {
    name: 'Business Intelligence',
    desc: 'Turn business data into actionable insights with interactive dashboards and reports. Monitor KPIs and make faster, data-driven decisions across your organization.',
    image: '/Landing page1/assets/Frame 1618872981.png'
  }
];

const DEFAULT_CONTENT: Landing1SuiteContent = {
  badge: 'INDUSTRIES',
  title: 'Everything Your Business Runs On, In One Suite',
  description: '13 Deeply Integrated Modules, Use What You Need Today, Switch On The Rest As You Scale-Without Ever Migrating Data.',
  modules: DEFAULT_MODULES,
  ctaText: 'Explore More',
  ctaUrl: '/contact'
};

export function Landing1Suite({ content }: { content?: Landing1SuiteContent }) {
  const data = { ...DEFAULT_CONTENT, ...content };

  return (
    <section className="py-20 bg-slate-50 text-slate-900 font-sans select-none border-b border-slate-200">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          {data.badge && (
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
              {data.badge}
            </span>
          )}
          {data.title && (
            <h2 className="text-3xl md:text-[40px] font-extrabold tracking-tight text-slate-900 leading-tight">
              {data.title}
            </h2>
          )}
          {data.description && (
            <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              {data.description}
            </p>
          )}
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.modules?.map((item, idx) => {
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden transition-all duration-300 flex flex-col h-full border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[16/10] bg-slate-100/50 flex items-center justify-center overflow-hidden border-b border-slate-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
                
                {/* Text Content */}
                <div className="p-6 flex flex-col flex-grow space-y-3">
                  <h4 className="text-lg font-bold text-slate-900 tracking-wide">
                    {item.name}
                  </h4>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed flex-grow">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Button */}
        {data.ctaText && (
          <div className="text-center pt-14">
            <Link
              href={data.ctaUrl || '#'}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-[#5D38F0] hover:bg-[#4B2A63] transition-all shadow-md hover:shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20"
            >
              <span>{data.ctaText}</span>
              <span>→</span>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
