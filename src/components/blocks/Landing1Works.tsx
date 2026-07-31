'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface WorkItem {
  category: string;
  title: string;
  date: string;
  image: string;
  link?: string;
}

export interface Landing1WorksContent {
  badge?: string;
  title?: string;
  description?: string;
  works?: WorkItem[];
}

const DEFAULT_WORKS: WorkItem[] = [
  {
    category: 'Category Name',
    title: "Ghana's leading Producer of Wood Products opts ebizframe ERP",
    date: 'December 18, 2025',
    image: '/Landing page1/assets/image 103.png',
    link: '#'
  },
  {
    category: 'Category Name',
    title: 'Top Cosmetics Manufacturers in DRC opts for ebizframe ERP',
    date: 'December 18, 2025',
    image: '/Landing page1/assets/image 103-1.png',
    link: '#'
  },
  {
    category: 'Category Name',
    title: 'Thika Motors, Kenya chooses ebizframe ERP for their country wide operations',
    date: 'December 18, 2025',
    image: '/Landing page1/assets/image 103-2.png',
    link: '#'
  }
];

const DEFAULT_CONTENT: Landing1WorksContent = {
  badge: 'OUR WORKS',
  title: 'Built For Every Industry',
  description: '25+ Industry-Specific Configurations Out Of The Box. Pre-Built Workflows, Reports And Compliance — Tuned To How Your Sector Actually Works.',
  works: DEFAULT_WORKS
};

export function Landing1Works({ content }: { content?: Landing1WorksContent }) {
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

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.works?.map((item, idx) => (
            <Link
              key={idx}
              href={item.link || '#'}
              className="bg-white rounded-[32px] overflow-hidden p-5 border border-indigo-900/5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.04)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full cursor-pointer group"
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-slate-100 shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col flex-grow">
                {/* Category Pill */}
                <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-semibold text-indigo-600 bg-indigo-55/10 border border-indigo-100/50 uppercase w-fit mb-3.5 tracking-wide">
                  {item.category}
                </span>

                {/* Title */}
                <h4 className="text-base font-extrabold text-slate-900 leading-snug tracking-tight mb-4 flex-grow line-clamp-3">
                  {item.title}
                </h4>

                {/* Footer with date and arrow */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-50 shrink-0">
                  <span className="text-xs text-slate-400 font-medium tracking-wide">
                    {item.date}
                  </span>
                  <ArrowRight className="w-5 h-5 text-indigo-600 group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
