'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CapabilityItem {
  title: string;
  description: string;
  icon?: string;
}

export interface RpaCapabilitiesContent {
  title?: string;
  primaryTitleColor?: string;
  secondaryTitleColor?: string;
  description?: string;
  hubSubtitle?: string;
  hubTitle?: string;
  items?: CapabilityItem[];
}

function renderFormattedTitle(titleText: string, primaryColor: string, secondaryColor: string) {
  if (!titleText) return null;
  const words = titleText.trim().split(/\s+/);
  if (words.length <= 1) {
    return <span style={{ color: primaryColor }}>{titleText}</span>;
  }
  const splitIndex = words.length >= 4 ? 3 : Math.ceil(words.length / 2);
  const primaryText = words.slice(0, splitIndex).join(' ');
  const secondaryText = words.slice(splitIndex).join(' ');

  return (
    <>
      <span style={{ color: primaryColor }}>{primaryText}</span>{' '}
      <span style={{ color: secondaryColor }}>{secondaryText}</span>
    </>
  );
}

export function RpaCapabilities({ content }: { content?: RpaCapabilitiesContent }) {
  const title = content?.title || 'Our RPA Expertise Across the Automation Lifecycle';
  const primaryTitleColor = content?.primaryTitleColor || '#6B21A8';
  const secondaryTitleColor = content?.secondaryTitleColor || '#1E1B4B';
  const description =
    content?.description ||
    "We don't force your processes into a rigid automation template. Our AI automation solutions are built around the way you already work, where RPA and AI operate as a spectrum, not a choice.";

  const hubSubtitle = content?.hubSubtitle !== undefined && content?.hubSubtitle !== '' ? content.hubSubtitle : 'ESS INDIA';
  const hubTitle = content?.hubTitle !== undefined && content?.hubTitle !== '' ? content.hubTitle : 'RPA Core Offerings';

  const defaultItems: CapabilityItem[] = [
    {
      title: 'ERP-Agnostic Execution',
      description: 'Works seamlessly across your ERP, CRM, and enterprise systems without requiring changes to your existing setup.',
      icon: '/RPA-Robotic Process Automation (RPA)/problem-process-solution_svgrepo.com.png',
    },
    {
      title: 'Enterprise Monitoring & Governance',
      description: 'Provides complete visibility with audit trails, executive dashboards, role-based access, and process analytics.',
      icon: '/RPA-Robotic Process Automation (RPA)/time-progress_svgrepo.com.png',
    },
    {
      title: 'Business-First Automation Approach',
      description: 'Designed around real business processes, ensuring automation aligns with your goals, teams, and customers.',
      icon: '/RPA-Robotic Process Automation (RPA)/exchange-personel_svgrepo.com.png',
    },
    {
      title: 'Scalable Automation',
      description: 'Deploy individual AI Agents or automate multiple business functions while maintaining consistency across operations.',
      icon: '/RPA-Robotic Process Automation (RPA)/exchange-personel_svgrepo.com.png',
    },
    {
      title: 'AI-Enhanced Automation',
      description: 'Combines the reliability of rule-based automation with intelligent decision-making, delivering AI-powered workflow automation that keeps processes moving without manual intervention.',
      icon: '/RPA-Robotic Process Automation (RPA)/problem-process-solution_svgrepo.com.png',
    },
    {
      title: 'Proven Delivery Framework',
      description: 'From process discovery to implementation and scale, driven by a structured approach focused on measurable outcomes.',
      icon: '/RPA-Robotic Process Automation (RPA)/time-progress_svgrepo.com.png',
    },
  ];

  const rawItems = content?.items && content.items.length > 0 ? content.items : defaultItems;
  const items = Array.from({ length: 6 }, (_, i) => rawItems[i] || defaultItems[i] || defaultItems[0]);

  const topCenterItem = items[0];
  const leftTopItem = items[1];
  const rightTopItem = items[2];
  const leftBottomItem = items[3];
  const bottomCenterItem = items[4];
  const rightBottomItem = items[5];

  return (
    <section className="py-14 bg-[#FAFAFD] font-sans border-b overflow-hidden relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">

        {/* Header Block */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-14 md:mb-20">
          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-2xl sm:text-3xl md:text-[38px] font-extrabold tracking-tight leading-tight"
            >
              {renderFormattedTitle(title, primaryTitleColor, secondaryTitleColor)}
            </motion.h2>
          )}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-slate-500 font-normal text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Desktop View: Perfectly Aligned 6-Orbital Hub & Spoke Layout */}
        <div className="hidden lg:block relative w-full max-w-[1020px] h-[680px] mx-auto select-none">

          {/* SVG Connecting Lines Overlay */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 1020 680" fill="none">
              {/* Line 1: Center (510, 340) -> Top Center Card Bottom (510, 180) */}
              <line x1="510" y1="340" x2="510" y2="180" stroke="#C084FC" strokeWidth="1.5" strokeDasharray="5 5" />
              <circle cx="510" cy="180" r="4.5" fill="#9333EA" stroke="#F3E8FF" strokeWidth="2" />

              {/* Line 2: Center (510, 340) -> Left Top Card Right (320, 210) */}
              <line x1="510" y1="340" x2="320" y2="210" stroke="#C084FC" strokeWidth="1.5" strokeDasharray="5 5" />
              <circle cx="320" cy="210" r="4.5" fill="#9333EA" stroke="#F3E8FF" strokeWidth="2" />

              {/* Line 3: Center (510, 340) -> Right Top Card Left (700, 210) */}
              <line x1="510" y1="340" x2="700" y2="210" stroke="#C084FC" strokeWidth="1.5" strokeDasharray="5 5" />
              <circle cx="700" cy="210" r="4.5" fill="#9333EA" stroke="#F3E8FF" strokeWidth="2" />

              {/* Line 4: Center (510, 340) -> Left Bottom Card Right (320, 470) */}
              <line x1="510" y1="340" x2="320" y2="470" stroke="#C084FC" strokeWidth="1.5" strokeDasharray="5 5" />
              <circle cx="320" cy="470" r="4.5" fill="#9333EA" stroke="#F3E8FF" strokeWidth="2" />

              {/* Line 5: Center (510, 340) -> Bottom Center Card Top (510, 500) */}
              <line x1="510" y1="340" x2="510" y2="500" stroke="#C084FC" strokeWidth="1.5" strokeDasharray="5 5" />
              <circle cx="510" cy="500" r="4.5" fill="#9333EA" stroke="#F3E8FF" strokeWidth="2" />

              {/* Line 6: Center (510, 340) -> Right Bottom Card Left (700, 470) */}
              <line x1="510" y1="340" x2="700" y2="470" stroke="#C084FC" strokeWidth="1.5" strokeDasharray="5 5" />
              <circle cx="700" cy="470" r="4.5" fill="#9333EA" stroke="#F3E8FF" strokeWidth="2" />
            </svg>
          </div>

          {/* Center Hub Node */}
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-white border border-purple-150 shadow-[0_0_40px_rgba(147,51,234,0.12)] flex flex-col items-center justify-center p-4 text-center z-20 group hover:scale-105 transition-transform duration-300">
            {hubSubtitle && (
              <span className="text-[10px] uppercase font-black tracking-widest text-[#9333EA] mb-1">
                {hubSubtitle}
              </span>
            )}
            {hubTitle && (
              <h3 className="text-lg font-black text-[#1E1B4B] leading-tight text-center">
                {hubTitle}
              </h3>
            )}
          </div>

          {/* Card 1: Top Center */}
          <div className="absolute top-0 left-[50%] -translate-x-1/2 z-10 w-[340px] h-[180px]">
            <OrbitalCard item={topCenterItem} index={1} />
          </div>

          {/* Card 2: Left Top */}
          <div className="absolute top-[120px] left-0 z-10 w-[320px] h-[180px]">
            <OrbitalCard item={leftTopItem} index={2} />
          </div>

          {/* Card 3: Right Top */}
          <div className="absolute top-[120px] right-0 z-10 w-[320px] h-[180px]">
            <OrbitalCard item={rightTopItem} index={3} />
          </div>

          {/* Card 4: Left Bottom */}
          <div className="absolute bottom-[120px] left-0 z-10 w-[320px] h-[180px]">
            <OrbitalCard item={leftBottomItem} index={4} />
          </div>

          {/* Card 5: Bottom Center */}
          <div className="absolute bottom-0 left-[50%] -translate-x-1/2 z-10 w-[340px] h-[180px]">
            <OrbitalCard item={bottomCenterItem} index={5} />
          </div>

          {/* Card 6: Right Bottom */}
          <div className="absolute bottom-[120px] right-0 z-10 w-[320px] h-[180px]">
            <OrbitalCard item={rightBottomItem} index={6} />
          </div>

        </div>

        {/* Mobile & Tablet View: Clean Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden">
          {/* Mobile Center Hub Banner */}
          <div className="sm:col-span-2 bg-gradient-to-r from-purple-900 to-indigo-950 rounded-2xl p-6 text-center text-white shadow-lg mb-2">
            {hubSubtitle && (
              <span className="text-[10px] uppercase font-black tracking-widest text-purple-300 block mb-1">
                {hubSubtitle}
              </span>
            )}
            {hubTitle && (
              <h3 className="text-xl font-extrabold text-white">
                {hubTitle}
              </h3>
            )}
          </div>

          {items.map((item, idx) => (
            <div key={idx} className="h-[200px]">
              <OrbitalCard item={item} index={idx + 1} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function OrbitalCard({ item, index }: { item: CapabilityItem; index: number }) {
  const iconSrc = typeof item?.icon === 'string' ? item.icon.trim() : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white rounded-2xl p-5 border border-purple-100/80 shadow-[0_8px_25px_-5px_rgba(107,33,168,0.06)] relative overflow-hidden flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_20px_40px_-5px_rgba(107,33,168,0.14)] hover:-translate-y-1 group z-10 h-full justify-between"
    >
      {/* Icon Box */}
      <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-2.5 shadow-sm group-hover:scale-110 group-hover:bg-purple-100/60 transition-all duration-300 shrink-0">
        {iconSrc ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={encodeURI(iconSrc)}
            alt={item.title || 'Capability Icon'}
            className="w-5 h-5 object-contain"
          />
        ) : (
          <DefaultCapabilityIcon index={index} />
        )}
      </div>

      {/* Title & Description */}
      <div className="space-y-1 mb-1 flex-1 flex flex-col justify-center">
        <h4 className="text-sm font-extrabold text-slate-900 leading-snug line-clamp-1">
          {item.title}
        </h4>
        <p className="text-xs text-slate-500 font-normal leading-relaxed line-clamp-3">
          {item.description}
        </p>
      </div>

      {/* Absolute Bottom Purple Gradient Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-700 rounded-b-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

function DefaultCapabilityIcon({ index }: { index: number }) {
  const iconPaths = [
    <path key="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />,
    <path key="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
    <path key="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
    <path key="4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
    <path key="5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
    <path key="6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />,
  ];

  return (
    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {iconPaths[(index - 1) % iconPaths.length]}
    </svg>
  );
}

export default RpaCapabilities;
