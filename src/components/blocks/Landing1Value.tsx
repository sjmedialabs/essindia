'use client';

import React from 'react';

export interface Landing1ValueContent {
  value1?: string;
  title1?: string;
  value2?: string;
  title2?: string;
  value3?: string;
  title3?: string;
}

const DEFAULT_CONTENT: Landing1ValueContent = {
  value1: '1000+',
  title1: 'Customers',
  value2: '30+',
  title2: 'Years Experience',
  value3: '25+',
  title3: 'Industries',
};

export function Landing1Value({ content }: { content?: Landing1ValueContent }) {
  const data = { ...DEFAULT_CONTENT, ...content };

  return (
    <section className="py-8 bg-white border-b border-slate-100 font-sans select-none">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="grid grid-cols-3 gap-4 md:gap-8 text-center items-center justify-center">
          
          {/* Stat 1 */}
          <div className="space-y-1">
            {data.value1 && (
              <div className="text-xl md:text-3xl font-extrabold text-[#002B80] tracking-tight">
                {data.value1}
              </div>
            )}
            {data.title1 && (
              <div className="text-xs md:text-sm text-slate-500 font-medium tracking-wide">
                {data.title1}
              </div>
            )}
          </div>

          {/* Stat 2 */}
          <div className="space-y-1">
            {data.value2 && (
              <div className="text-xl md:text-3xl font-extrabold text-[#002B80] tracking-tight">
                {data.value2}
              </div>
            )}
            {data.title2 && (
              <div className="text-xs md:text-sm text-slate-500 font-medium tracking-wide">
                {data.title2}
              </div>
            )}
          </div>

          {/* Stat 3 */}
          <div className="space-y-1">
            {data.value3 && (
              <div className="text-xl md:text-3xl font-extrabold text-[#002B80] tracking-tight">
                {data.value3}
              </div>
            )}
            {data.title3 && (
              <div className="text-xs md:text-sm text-slate-500 font-medium tracking-wide">
                {data.title3}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
