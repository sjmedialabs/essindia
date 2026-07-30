'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface TabItem {
  name: string;
  title: string;
  desc: string;
  image: string;
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
}

export interface Landing1ShowcaseContent {
  title?: string;
  tabs?: TabItem[];
}

const DEFAULT_TABS: TabItem[] = [
  {
    name: 'Production Planning',
    title: 'Production Planning',
    desc: 'The Production Planning Module In Our Manufacturing ERP Software Runs On An Intelligent MRP Engine That Responds To Real-Time Demand, Machine Capacity, And Material Availability, Ensuring Your Shop Floor Stays Efficient And On Track Without Constant Manual Effort.',
    image: '/Landing page1/assets/Frame 1618872978.png',
    primaryCtaText: 'Read More',
    primaryCtaUrl: '#',
    secondaryCtaText: 'Get free Demo',
    secondaryCtaUrl: '/contact',
  },
  {
    name: 'CRM',
    title: 'Customer Relationship Management',
    desc: 'Manage leads, pipeline opportunities, and client communication metrics natively connected with sales order booking workflows.',
    image: '/Landing page1/assets/Frame 1618872978.png',
    primaryCtaText: 'Read More',
    primaryCtaUrl: '#',
    secondaryCtaText: 'Get free Demo',
    secondaryCtaUrl: '/contact',
  },
  {
    name: 'HRMS',
    title: 'Human Resource Management System',
    desc: 'Unify payroll, attendance tracking, appraisal evaluations, and leave management seamlessly across all operational sites.',
    image: '/Landing page1/assets/Frame 1618872978.png',
    primaryCtaText: 'Read More',
    primaryCtaUrl: '#',
    secondaryCtaText: 'Get free Demo',
    secondaryCtaUrl: '/contact',
  },
  {
    name: 'Finance Management',
    title: 'Finance & Accounts Management',
    desc: 'Automate accounting entries, manage cash flow metrics, run multi-company balance sheets, and handle audits with zero spreadsheet dependencies.',
    image: '/Landing page1/assets/Frame 1618872978.png',
    primaryCtaText: 'Read More',
    primaryCtaUrl: '#',
    secondaryCtaText: 'Get free Demo',
    secondaryCtaUrl: '/contact',
  },
  {
    name: 'Inventory Management',
    title: 'Smart Inventory & Warehousing',
    desc: 'Real-time multi-location stock tracking, barcode/RFID integrations, minimum-stock notifications, and automated supply orders.',
    image: '/Landing page1/assets/Frame 1618872978.png',
    primaryCtaText: 'Read More',
    primaryCtaUrl: '#',
    secondaryCtaText: 'Get free Demo',
    secondaryCtaUrl: '/contact',
  },
  {
    name: 'Sales',
    title: 'Sales & Dispatch Control',
    desc: 'Manage sales orders, check credit limits, automate billing, and schedule delivery dispatches from a single clean screen.',
    image: '/Landing page1/assets/Frame 1618872978.png',
    primaryCtaText: 'Read More',
    primaryCtaUrl: '#',
    secondaryCtaText: 'Get free Demo',
    secondaryCtaUrl: '/contact',
  },
  {
    name: 'Purchase',
    title: 'Strategic Purchase Management',
    desc: 'Track vendor quotations, automate purchase orders, handle multi-currency conversions, and audit supplier performance lists.',
    image: '/Landing page1/assets/Frame 1618872978.png',
    primaryCtaText: 'Read More',
    primaryCtaUrl: '#',
    secondaryCtaText: 'Get free Demo',
    secondaryCtaUrl: '/contact',
  },
];

const DEFAULT_CONTENT: Landing1ShowcaseContent = {
  title: '7 Modules One Powerful Manufacturing Software',
  tabs: DEFAULT_TABS,
};

export function Landing1Showcase({ content }: { content?: Landing1ShowcaseContent }) {
  const data = { ...DEFAULT_CONTENT, ...content };
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-14 bg-[#F5F7FC] font-sans select-none border-b border-slate-100">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Title */}
        {data.title && (
          <h2 className="text-2xl md:text-4xl font-bold text-[#0D265C] text-center mb-12">
            {data.title}
          </h2>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 min-h-[580px]">
          {/* Left Navigation Tabs */}
          <div className="lg:col-span-3 border-r border-slate-100 flex flex-col divide-y divide-slate-100/60 bg-slate-50/20">
            {data.tabs?.map((t, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full py-5 px-6 text-left font-medium text-sm transition-all relative flex items-center ${
                    isActive
                      ? 'bg-[#E3DCF5]/60 text-[#3F226D] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{t.name}</span>
                  {isActive && (
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#3F226D]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Active Tab Content */}
          {data.tabs && data.tabs[activeTab] && (
            <div className="lg:col-span-9 p-8 md:p-12 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Active Tab Title */}
                <h3 className="text-3xl font-bold text-[#0D265C]">
                  {data.tabs[activeTab].title}
                </h3>
                {/* Active Tab Desc */}
                <p className="text-slate-500 text-sm leading-relaxed max-w-4xl">
                  {data.tabs[activeTab].desc}
                </p>
                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {data.tabs[activeTab].primaryCtaText && (
                    <Link
                      href={data.tabs[activeTab].primaryCtaUrl || '#'}
                      className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#3F226D] hover:bg-[#321A58] transition-colors shadow-sm"
                    >
                      {data.tabs[activeTab].primaryCtaText}
                    </Link>
                  )}
                  {data.tabs[activeTab].secondaryCtaText && (
                    <Link
                      href={data.tabs[activeTab].secondaryCtaUrl || '#'}
                      className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-black hover:bg-slate-900 transition-colors shadow-sm"
                    >
                      {data.tabs[activeTab].secondaryCtaText}
                    </Link>
                  )}
                </div>
              </div>

              {/* Graphic Mockup with Play Overlay */}
              <div className="relative w-full aspect-[16/8] mt-6 rounded-xl overflow-hidden shadow-md border border-slate-100 group cursor-pointer bg-slate-50">
                <Image
                  src={data.tabs[activeTab].image}
                  alt={data.tabs[activeTab].title}
                  fill
                  className="object-cover object-top"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 hover:bg-black/10 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-200">
                    <svg className="w-7 h-7 text-white fill-current ml-1" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
