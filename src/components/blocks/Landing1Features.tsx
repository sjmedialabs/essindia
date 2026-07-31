'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export interface FeatureItem {
  icon?: string;
  title: string;
  desc: string;
}

export interface Landing1FeaturesContent {
  badge?: string;
  title?: string;
  description?: string;
  features?: FeatureItem[];
  ctaText?: string;
  ctaUrl?: string;
}

const DEFAULT_FEATURES: FeatureItem[] = [
  {
    icon: '/Landing page1/assets/bot_svgrepo.com.png',
    title: 'AI Copilot',
    desc: 'Ask anything in plain English and get instant answers, reports and actions.',
  },
  {
    icon: '/Landing page1/assets/growth_svgrepo.com.png',
    title: 'Predictive Analytics',
    desc: 'Forecast demand, revenue and churn weeks before they happen.',
  },
  {
    icon: '/Landing page1/assets/lines-graph-file_svgrepo.com.png',
    title: 'Smart Reports',
    desc: 'Auto-generated narratives explain every variance for you.',
  },
  {
    icon: '/Landing page1/assets/voice-scan_svgrepo.com.png',
    title: 'Document AI',
    desc: 'Extract data from invoices, POs and GRNs with 99% accuracy.',
  },
  {
    icon: '/Landing page1/assets/git-merge_svgrepo.com.png',
    title: 'Approval Automation',
    desc: 'Route approvals intelligently and clear bottlenecks in seconds.',
  },
  {
    icon: '/Landing page1/assets/analytics-graph-chart_svgrepo.com.png',
    title: 'Forecasting',
    desc: 'ML-driven budgets and cash flow projections you can trust.',
  },
  {
    icon: '/Landing page1/assets/message-square-01_svgrepo.com.png',
    title: 'Chat Assistant',
    desc: 'Conversational support built into every screen, 24x7.',
  },
  {
    icon: '/Landing page1/assets/search-alt_svgrepo.com.png',
    title: 'Natural Language Search',
    desc: 'Find any record, transaction or insight by just asking.',
  },
];

const DEFAULT_CONTENT: Landing1FeaturesContent = {
  badge: 'AI INSIDE',
  title: 'AI Built Into Every Business Process',
  description: "ESS ERP isn't an ERP with AI bolted on. Intelligence is woven through finance, sales, inventory and operations — so every team works faster and smarter.",
  features: DEFAULT_FEATURES,
  ctaText: 'See AI Copilot in Action',
  ctaUrl: '#',
};

export function Landing1Features({ content }: { content?: Landing1FeaturesContent }) {
  const data = { ...DEFAULT_CONTENT, ...content };

  return (
    <section className="py-14 bg-[#0b1437] text-white font-sans select-none border-b border-slate-900">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          {data.badge && (
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 uppercase">
              <Sparkles className="w-3 h-3 text-amber-400" />
              {data.badge}
            </span>
          )}
          {data.title && (
            <h2 className="text-3xl md:text-[40px] font-bold tracking-tight leading-tight">
              {data.title}
            </h2>
          )}
          {data.description && (
            <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              {data.description}
            </p>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.features?.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/[0.02] hover:bg-white/[0.04] p-6 rounded-2xl border border-white/[0.05] transition-all flex flex-col space-y-4"
            >
              {/* Icon Circle */}
              <div className="w-10 h-10 rounded-xl bg-[#2a255f] flex items-center justify-center shrink-0 border border-white/[0.05] overflow-hidden p-2">
                {item.icon ? (
                  <img src={item.icon} alt={item.title} className="w-full h-full object-contain" />
                ) : (
                  <Sparkles className="w-5 h-5 text-amber-400" />
                )}
              </div>
              <div className="space-y-2">
                {/* Title */}
                <h4 className="text-base font-bold text-white tracking-wide">{item.title}</h4>
                {/* Description */}
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        {data.ctaText && (
          <div className="text-center pt-10">
            <Link
              href={data.ctaUrl || '#'}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md hover:shadow-lg"
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
