'use client';

import React from 'react';
import Image from 'next/image';

export interface Landing2BrandsContent {
  title?: string;
  logos?: string[];
}

const DEFAULT_LOGOS = [
  '/Landing Page-2/assets/jnj.png',
  '/Landing Page-2/assets/bsh.png',
  '/Landing Page-2/assets/microsoft.png',
  '/Landing Page-2/assets/bestseller.png',
];

const DEFAULT_CONTENT: Landing2BrandsContent = {
  title: 'Trusted by over 50,000 companies of all sizes',
  logos: DEFAULT_LOGOS,
};

export function Landing2Brands({ content }: { content?: Landing2BrandsContent }) {
  const data = { ...DEFAULT_CONTENT, ...content };
  const logoList = data.logos && data.logos.length > 0 ? data.logos : DEFAULT_LOGOS;

  return (
    <section className="py-14 bg-[#462294] font-sans select-none px-6 text-white text-center">
      <div className="container mx-auto max-w-6xl">
        {/* Title */}
        {data.title && (
          <h3 className="text-white text-sm md:text-base font-bold tracking-wide mb-10 opacity-95">
            {data.title}
          </h3>
        )}

        {/* Logos Flex Row */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 lg:gap-24">
          {logoList.map((logoUrl, idx) => (
            <div key={idx} className="relative h-10 md:h-12 w-36 md:w-44 flex items-center justify-center">
              <Image
                src={logoUrl}
                alt={`Client Logo ${idx + 1}`}
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
