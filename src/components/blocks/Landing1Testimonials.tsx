'use client';

import React from 'react';
import { Star } from 'lucide-react';

export interface TestimonialItem {
  avatar: string;
  name: string;
  rating: number; // 1-5 rating
  quote: string;
}

export interface Landing1TestimonialsContent {
  badge?: string;
  title?: string;
  description?: string;
  testimonials?: TestimonialItem[];
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    avatar: '/Landing page1/assets/unsplash_OhKElOkQ3RE.png',
    name: 'James Pattinson',
    rating: 4,
    quote: '"Lobortis leo pretium facilisis amet nisl at nec. Scelerisque risus tortor donec ipsum consequat semper consequat adipiscing ultrices."'
  },
  {
    avatar: '/Landing page1/assets/unsplash_WMD64tMfc4k.png',
    name: 'Greg Stuart',
    rating: 5,
    quote: '"Vestibulum, cum nam non amet consectetur morbi aenean condimentum eget. Ultricies integer nunc neque accumsan laoreet. Viverra nibh ultrices."'
  },
  {
    avatar: '/Landing page1/assets/unsplash_6anudmpILw4.png',
    name: 'Trevor Mitchell',
    rating: 3,
    quote: '"Ut tristique viverra sed porttitor senectus. A facilisis metus pretium ut habitant lorem. Velit vel bibendum eget aliquet sem nec, id sed. Tincidunt."'
  }
];

const DEFAULT_CONTENT: Landing1TestimonialsContent = {
  badge: 'TESTIMONIALS',
  title: 'Built For Every Industry',
  description: '25+ Industry-Specific Configurations Out Of The Box. Pre-Built Workflows, Reports And Compliance — Tuned To How Your Sector Actually Works.',
  testimonials: DEFAULT_TESTIMONIALS
};

export function Landing1Testimonials({ content }: { content?: Landing1TestimonialsContent }) {
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.testimonials?.map((test, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-[32px] border-2 border-[#FF9F1C] shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              {/* Avatar */}
              {test.avatar && (
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-slate-50 shadow-inner shrink-0 relative bg-slate-100">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Name */}
              <h4 className="text-lg font-extrabold text-[#49288a] tracking-wide mb-2">
                {test.name}
              </h4>

              {/* Star Rating */}
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(5)].map((_, starIdx) => {
                  const active = starIdx < test.rating;
                  return (
                    <Star
                      key={starIdx}
                      className={`w-5 h-5 ${active ? 'fill-[#FF8A00] text-[#FF8A00]' : 'fill-[#E2E8F0] text-[#E2E8F0]'}`}
                    />
                  );
                })}
              </div>

              {/* Quote */}
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                {test.quote}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
