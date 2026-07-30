'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';

export interface Landing2HeroContent {
  title?: string;
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  image?: string;
}

const DEFAULT_CONTENT: Landing2HeroContent = {
  title: 'Tackling The Lack Of Clear ERP Information, One Guide At A Time.',
  primaryCtaText: 'Book Free Demo',
  primaryCtaUrl: '/contact',
  secondaryCtaText: 'Watch Product Tour',
  secondaryCtaUrl: '#',
  image: '/Landing page1/assets/RecehTok Crypto.jpg',
};

export function Landing2Hero({ content }: { content?: Landing2HeroContent }) {
  const data = { ...DEFAULT_CONTENT, ...content };

  return (
    <section className="relative overflow-hidden bg-[#462294] pt-20 pb-0 flex flex-col items-center select-none font-sans text-white">
      {/* Curved background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40 z-0">
        <div className="absolute -left-[10%] -top-[20%] w-[60%] h-[80%] rounded-full bg-gradient-to-br from-purple-800/30 to-indigo-900/30 blur-3xl" />
        <div className="absolute -right-[15%] top-[10%] w-[50%] h-[70%] rounded-full bg-gradient-to-br from-indigo-800/30 to-purple-900/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
        {/* Title */}
        {data.title && (
          <h1 className="text-white text-3xl md:text-[54px] font-medium tracking-tight leading-[1.2] mb-8 max-w-4xl mx-auto">
            {data.title}
          </h1>
        )}

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 mb-16">
          {data.primaryCtaText && (
            <Link
              href={data.primaryCtaUrl || '#'}
              className="px-8 py-3 rounded-full text-xs font-semibold text-[#462294] bg-white hover:bg-slate-100 transition-all shadow-sm"
            >
              {data.primaryCtaText}
            </Link>
          )}
          {data.secondaryCtaText && (
            <Link
              href={data.secondaryCtaUrl || '#'}
              className="px-7 py-3 rounded-full text-xs font-semibold text-white bg-white/10 border border-white/20 hover:bg-white/15 transition-all flex items-center gap-2 shadow-sm"
            >
              <Play className="w-3 h-3 fill-white text-white shrink-0" />
              <span>{data.secondaryCtaText}</span>
            </Link>
          )}
        </div>

        {/* Dashboard Mockup */}
        {data.image && (
          <div className="relative w-full max-w-5xl mx-auto -mb-6 md:-mb-12 aspect-[16/8] shadow-2xl rounded-t-2xl overflow-hidden border-t border-x border-white/10 bg-white">
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
