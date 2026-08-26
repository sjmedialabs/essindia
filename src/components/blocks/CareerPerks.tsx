'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PerkItem {
  text?: string;
}

interface CareerPerksProps {
  content?: {
    title?: string;
    tag?: string;
    perks?: PerkItem[];
  };
}

export default function CareerPerks({ content }: CareerPerksProps) {
  const {
    title = 'Perks & Benefits',
    tag = 'We care about our people so they can take care of our clients',
    perks = [
      { text: "Health & Wellness Benefits" },
      { text: "Performance Bonuses" },
      { text: "Life Skill Certification Support" },
      { text: "International Project Exposure" },
      { text: "Flexible Work Arrangements" },
      { text: "Fast-Track Growth Path" }
    ]
  } = content || {};

  return (
    <section className="py-16 md:py-24 px-6 bg-gradient-to-br from-[#F5F0FF] via-[#EDE9FE] via-purple-100/50 to-[#E0E7FF] relative overflow-hidden font-sans border-y border-purple-200/60">
      {/* Light Ambient Radial Glow Spot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-purple-300/35 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-300/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10 text-center">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            {title}
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg font-normal leading-relaxed">
            {tag}
          </p>
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {perks.map((perk: PerkItem, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.05
              }}
              className="bg-white/95 backdrop-blur-md px-6 py-6.5 rounded-2xl border border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] relative overflow-hidden flex items-center justify-center text-center min-h-[96px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#4B2A63]/80 hover:shadow-[0_20px_40px_rgba(75,42,99,0.2)] group cursor-pointer transform-gpu"
            >
              {/* Ultra-Smooth Slow Background Gradient Crossfade Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#4B2A63] via-[#5B3179] to-[#6B3A8E] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />

              {/* Perk Text */}
              <span className="font-bold text-slate-800 text-base md:text-[17px] leading-snug group-hover:text-white transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-10 select-none">
                {typeof perk.text === 'string' ? perk.text.replace(/<[^>]*>/g, '') : perk.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
