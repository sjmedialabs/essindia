'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, X } from 'lucide-react';
import { useCtaAction, type CtaFormType } from '@/hooks/useCtaAction';

export interface TabItem {
  name: string;
  title: string;
  desc: string;
  image: string;
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  primaryCtaFormType?: string;
  primaryCtaPdfUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  secondaryCtaFormType?: string;
  secondaryCtaPdfUrl?: string;
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
    name: 'Sales Management',
    title: 'Sales Order & Quotation Control',
    desc: 'Automate sales order approvals, credit limits, pricing matrices, and real-time inventory reservation.',
    image: '/Landing page1/assets/Frame 1618872978.png',
    primaryCtaText: 'Read More',
    primaryCtaUrl: '#',
    secondaryCtaText: 'Get free Demo',
    secondaryCtaUrl: '/contact',
  },
  {
    name: 'Inventory Management',
    title: 'Batch & Serial Warehouse Tracking',
    desc: 'Multi-location warehouse visibility, barcode scanning integration, reorder point alerts, and valuation metrics.',
    image: '/Landing page1/assets/Frame 1618872978.png',
    primaryCtaText: 'Read More',
    primaryCtaUrl: '#',
    secondaryCtaText: 'Get free Demo',
    secondaryCtaUrl: '/contact',
  },
  {
    name: 'Financial Accounting',
    title: 'Real-Time Financial Reporting',
    desc: 'General ledger, AP/AR, multi-currency accounting, bank reconciliation, and audit-compliant balance sheet generation.',
    image: '/Landing page1/assets/Frame 1618872978.png',
    primaryCtaText: 'Read More',
    primaryCtaUrl: '#',
    secondaryCtaText: 'Get free Demo',
    secondaryCtaUrl: '/contact',
  },
];

const DEFAULT_CONTENT: Landing1ShowcaseContent = {
  title: 'Modules Designed To Solve Real Business Challenges',
  tabs: DEFAULT_TABS,
};

export function Landing1Showcase({ content }: { content?: Landing1ShowcaseContent }) {
  const data = { ...DEFAULT_CONTENT, ...content };
  const [activeTab, setActiveTab] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const activeTabData = data.tabs?.[activeTab];
  const activeMedia = activeTabData?.image || (activeTabData as any)?.videoUrl || '';

  const isVideoFile = (url: string) => {
    return url && (url.toLowerCase().match(/\.(mp4|webm|mov|ogg)$/) || url.startsWith('/uploads/') || url.includes('video'));
  };

  const primaryFormType = (activeTabData?.primaryCtaFormType || '') as CtaFormType;
  const secondaryFormType = (activeTabData?.secondaryCtaFormType || '') as CtaFormType;

  const { handleClick: handlePrimaryClick, modalNode: primaryModal } = useCtaAction(
    activeTabData?.primaryCtaUrl || '/contact-us',
    primaryFormType,
    activeTabData?.primaryCtaPdfUrl
  );

  const { handleClick: handleSecondaryClick, modalNode: secondaryModal } = useCtaAction(
    activeTabData?.secondaryCtaUrl || '/contact-us',
    secondaryFormType,
    activeTabData?.secondaryCtaPdfUrl
  );

  return (
    <section className="py-14 bg-[#FAF9FD] font-sans select-none border-b border-slate-100">
      <div className="container mx-auto px-6 max-w-7xl space-y-12">
        {/* Title */}
        {data.title && (
          <h2 className="text-3xl md:text-[40px] font-bold text-center text-[#0D265C] tracking-tight leading-tight max-w-4xl mx-auto">
            {data.title}
          </h2>
        )}

        {/* Tab Card Wrapper */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
          {/* Left Vertical Tab Navigation */}
          <div className="lg:col-span-3 border-r border-slate-100 flex flex-col bg-[#FAF8FC]">
            {data.tabs?.map((t, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveTab(idx);
                    setIsVideoModalOpen(false);
                  }}
                  className={`px-6 py-5 text-left text-sm font-semibold transition-all relative border-b border-slate-100 flex items-center justify-between ${
                    isActive
                      ? 'bg-white text-[#3F226D] font-bold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
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
                    <a
                      href={data.tabs[activeTab].primaryCtaUrl || '#'}
                      onClick={primaryFormType ? (e) => { e.preventDefault(); handlePrimaryClick(); } : undefined}
                      className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#3F226D] hover:bg-[#321A58] transition-colors shadow-sm cursor-pointer"
                    >
                      {data.tabs[activeTab].primaryCtaText}
                    </a>
                  )}
                  {data.tabs[activeTab].secondaryCtaText && (
                    <a
                      href={data.tabs[activeTab].secondaryCtaUrl || '#'}
                      onClick={secondaryFormType ? (e) => { e.preventDefault(); handleSecondaryClick(); } : undefined}
                      className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-black hover:bg-slate-900 transition-colors shadow-sm cursor-pointer"
                    >
                      {data.tabs[activeTab].secondaryCtaText}
                    </a>
                  )}
                </div>
              </div>

              {/* Graphic / Video Player Box */}
              <div className="relative w-full aspect-[16/8] mt-6 rounded-xl overflow-hidden shadow-md border border-slate-100 bg-slate-900 group">
                {isVideoFile(activeMedia) ? (
                  <video
                    src={activeMedia}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    onClick={() => activeMedia && setIsVideoModalOpen(true)}
                    className="relative w-full h-full cursor-pointer"
                  >
                    <Image
                      src={activeMedia || '/Landing page1/assets/Frame 1618872978.png'}
                      alt={data.tabs[activeTab].title}
                      fill
                      className="object-cover object-top"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                      <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-200">
                        <Play className="w-7 h-7 text-white fill-current ml-1" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Video Popup Modal */}
      {isVideoModalOpen && activeMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden aspect-video shadow-2xl border border-white/20">
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            {activeMedia.includes('youtube') || activeMedia.includes('vimeo') ? (
              <iframe
                src={activeMedia}
                title="Video Preview"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video src={activeMedia} controls autoPlay className="w-full h-full object-contain" />
            )}
          </div>
        </div>
      )}

      {primaryModal}
      {secondaryModal}
    </section>
  );
}
