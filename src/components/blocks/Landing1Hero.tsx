'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';

export interface Landing1HeroContent {
  title?: string;
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  image?: string;
}

const DEFAULT_CONTENT: Landing1HeroContent = {
  title: 'Tackling The Lack Of Clear ERP Information, One Guide At A Time.',
  primaryCtaText: 'Book Free Demo',
  primaryCtaUrl: '/contact',
  secondaryCtaText: 'Watch Product Tour',
  secondaryCtaUrl: '#',
  image: '/Landing page1/assets/RecehTok Crypto.jpg',
};

export function Landing1Hero({ content }: { content?: Landing1HeroContent }) {
  const data = { ...DEFAULT_CONTENT, ...content };

  return (
    <section className="relative overflow-hidden bg-[#F6F4FC] pt-14 pb-0 flex flex-col items-center select-none font-sans">
      {/* Curved background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40 z-0">
        <div className="absolute -left-[10%] -top-[20%] w-[60%] h-[80%] rounded-full bg-gradient-to-br from-pink-200/30 to-purple-300/30 blur-3xl" />
        <div className="absolute -right-[15%] top-[10%] w-[50%] h-[70%] rounded-full bg-gradient-to-br from-purple-200/30 to-indigo-300/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
        {/* Title */}
        {data.title && (
          <h1 className="text-[#3A225D] text-3xl md:text-[54px] font-medium tracking-tight leading-[1.2] mb-8 max-w-4xl mx-auto">
            {data.title}
          </h1>
        )}

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 mb-16">
          {data.primaryCtaText && (
            <Link
              href={data.primaryCtaUrl || '#'}
              className="px-8 py-3 rounded-full text-xs font-semibold text-white bg-[#3F226D] hover:bg-[#321A58] transition-all shadow-sm"
            >
              {data.primaryCtaText}
            </Link>
          )}
          {data.secondaryCtaText && (
            <Link
              href={data.secondaryCtaUrl || '#'}
              className="px-7 py-3 rounded-full text-xs font-semibold text-slate-800 bg-white border border-slate-200/80 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
            >
              <Play className="w-3 h-3 fill-slate-800 text-slate-800 shrink-0" />
              <span>{data.secondaryCtaText}</span>
            </Link>
          )}
        </div>

        {/* Dashboard Mockup */}
        {data.image && (
          <div className="relative w-full max-w-5xl mx-auto -mb-6 md:-mb-12 aspect-[16/8] shadow-2xl rounded-t-2xl overflow-hidden border-t border-x border-white/60 bg-white">
            <Image
              src={data.image}
              alt="ERP Dashboard Mockup"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}
