'use client';

import React from 'react';
import Link from 'next/link';
import {
  PieChart,
  FileText,
  Search,
  Gauge,
  Handshake,
  IndianRupee,
  ShoppingCart,
  Boxes,
  ChevronRight
} from 'lucide-react';

export interface ModuleCardItem {
  title: string;
  iconType?: string;
  href?: string;
}

export interface Landing2ModulesContent {
  title?: string;
  modules?: ModuleCardItem[];
  ctaText?: string;
  ctaUrl?: string;
}

const DEFAULT_MODULES: ModuleCardItem[] = [
  { title: 'Planning & Production', iconType: 'planning', href: '/contact-us' },
  { title: 'Production & Configuration', iconType: 'production', href: '/contact-us' },
  { title: 'Total Quality Management', iconType: 'quality', href: '/contact-us' },
  { title: 'Dashboard & Alerts', iconType: 'dashboard', href: '/contact-us' },
  { title: 'CRM & Order Processing', iconType: 'crm', href: '/contact-us' },
  { title: 'Finance Management', iconType: 'finance', href: '/contact-us' },
  { title: 'Purchase Management', iconType: 'purchase', href: '/contact-us' },
  { title: 'Inventory Management', iconType: 'inventory', href: '/contact-us' },
];

const DEFAULT_CONTENT: Landing2ModulesContent = {
  title: 'Easy-to-integrate Modules',
  modules: DEFAULT_MODULES,
  ctaText: 'REQUEST A DEMO',
  ctaUrl: '/contact-us',
};

const renderIcon = (type?: string) => {
  const iconClass = "w-7 h-7 text-[#7c52f6] stroke-[1.75]";
  switch (type) {
    case 'planning':
      return <PieChart className={iconClass} />;
    case 'production':
      return <FileText className={iconClass} />;
    case 'quality':
      return <Search className={iconClass} />;
    case 'dashboard':
      return <Gauge className={iconClass} />;
    case 'crm':
      return <Handshake className={iconClass} />;
    case 'finance':
      return <IndianRupee className={iconClass} />;
    case 'purchase':
      return <ShoppingCart className={iconClass} />;
    case 'inventory':
    default:
      return <Boxes className={iconClass} />;
  }
};

export function Landing2Modules({ content }: { content?: Landing2ModulesContent }) {
  const data = { ...DEFAULT_CONTENT, ...content };
  const moduleList = data.modules && data.modules.length > 0 ? data.modules : DEFAULT_MODULES;

  return (
    <section className="py-14 bg-[#fafafd] font-sans select-none px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        {data.title && (
          <h2 className="text-[#09090b] text-3xl md:text-4xl font-bold text-center tracking-tight mb-12">
            {data.title}
          </h2>
        )}

        {/* 4x2 Grid of Module Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {moduleList.map((mod, idx) => {
            const cardContent = (
              <div className="bg-white rounded-2xl p-5 border border-slate-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(124,82,246,0.08)] hover:border-[#7c52f6]/30 transition-all duration-300 flex items-center justify-between group h-full">
                <div className="flex items-center gap-4">
                  {/* Light Lavender Icon Container */}
                  <div className="w-14 h-14 rounded-2xl bg-[#f4f0ff] flex items-center justify-center shrink-0 group-hover:bg-[#ebe3ff] transition-colors">
                    {renderIcon(mod.iconType)}
                  </div>
                  {/* Module Name */}
                  <span className="font-bold text-slate-800 text-sm md:text-[15px] leading-tight group-hover:text-[#462294] transition-colors">
                    {mod.title}
                  </span>
                </div>

                {/* Right Arrow Chevron */}
                <ChevronRight className="w-5 h-5 text-[#462294] group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
              </div>
            );

            return mod.href ? (
              <Link key={idx} href={mod.href} className="block cursor-pointer">
                {cardContent}
              </Link>
            ) : (
              <div key={idx}>{cardContent}</div>
            );
          })}
        </div>

        {/* Central Purple CTA Button */}
        {data.ctaText && (
          <div className="text-center">
            <Link
              href={data.ctaUrl || '/contact-us'}
              className="inline-flex items-center justify-center bg-[#462294] hover:bg-[#381a79] text-white px-9 py-3.5 rounded-md font-bold text-xs md:text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              {data.ctaText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
