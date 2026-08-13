'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MotionSection } from '@/components/animations/MotionSection';
import { Check, Calendar, Zap, Layers, BarChart3 } from 'lucide-react';

interface ErpFeature {
  id?: string;
  icon?: string;
  image?: string;
  title?: string;
  desc?: string;
  desc2?: string;
}

interface ErpFeaturesTabContent {
  heading?: string;
  subheading?: string;
  features?: ErpFeature[];
}

interface ErpFeaturesTabProps {
  content?: ErpFeaturesTabContent;
}

const defaultIcons = [Calendar, Zap, Layers, BarChart3];

export function ErpFeaturesTab({ content }: ErpFeaturesTabProps) {
  const heading = content?.heading || 'Why 1,500+ Enterprises Chose ebizframe.ai';
  const subheading = content?.subheading || 'Select standard version or customizable version';

  const features: ErpFeature[] = (content?.features && content.features.length > 0)
    ? content.features
    : [
      {
        id: 'live-90-days',
        icon: '',
        image: '/ErpOverview/featureTav1.png',
        title: 'Go Live in 90 Days Industry average 9 months.',
        desc: 'Go Live in 90 Days; Industry average 9 months.',
        desc2: "Our average: 90 days. That's an entire quarter of ROI your competitors won't see until Q3. We've done this 1,500+ times.",
      },
      {
        id: 'shorten-adoption',
        icon: '',
        image: '/ErpOverview/ERP-2.png',
        title: 'Shorten Adoption. No Training Costs.',
        desc: 'Shorten Adoption & Eliminate Training Costs.',
        desc2: 'Intuitive AI-driven user experience ensures immediate user adoption without costly classroom training sessions.',
      },
      {
        id: 'built-for-business',
        icon: '',
        image: '/ErpOverview/ERP-3.png',
        title: 'Built to Your Business—not Against It',
        desc: 'Built to Your Business—not Against It.',
        desc2: 'Configurable workflows and modular architecture adapt directly to your enterprise operational flows.',
      },
      {
        id: 'proven-scale',
        icon: '',
        image: '/ErpOverview/ERP-4.png',
        title: 'Proven 1:1 Enterprise Scale',
        desc: 'Proven 1:1 Enterprise Scale.',
        desc2: 'Engineered for multi-entity conglomerates with multi-currency ledgers and high-velocity transaction volume.',
      },
    ];

  const [activeTabId, setActiveTabId] = useState(features[0]?.id || '0');
  const activeTab = features.find((f, idx) => (f.id || idx.toString()) === activeTabId) || features[0];

  return (
    <section className="relative w-full py-12 md:py-16 bg-[#F8F5FE] text-slate-900 overflow-hidden border-b border-purple-100 font-sans">
      {/* Background soft ambient glow */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">

        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <MotionSection variant="fadeUp">
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-slate-900 tracking-tight leading-tight mb-2.5">
              {renderFormattedHeading(heading)}
            </h2>
          </MotionSection>

          <MotionSection variant="fadeUp" delay={0.15}>
            <p className="text-slate-500 text-base md:text-lg font-normal leading-relaxed">
              {subheading}
            </p>
          </MotionSection>
        </div>

        {/* Main White Card Container */}
        <div className="max-w-6xl mx-auto bg-white rounded-[28px] p-6 sm:p-7 lg:p-8 border border-purple-100/80 shadow-[0_15px_45px_rgba(147,51,234,0.06)] relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">

          {/* Left Column: Sidebar Tab Pill Buttons */}
          <div className="lg:col-span-5 flex flex-col gap-2.5 w-full relative z-10">
            {features.map((feature, idx) => {
              const currentId = feature.id || idx.toString();
              const isActive = currentId === activeTabId;
              const iconSrc = typeof feature.icon === 'string' ? feature.icon.trim() : '';
              const DefaultIcon = defaultIcons[idx % defaultIcons.length] || Check;

              return (
                <motion.button
                  key={currentId}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  onClick={() => setActiveTabId(currentId)}
                  className={`w-full text-left p-3 md:p-3.5 rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-3 group border ${isActive
                      ? 'bg-gradient-to-r from-[#6B26D9] via-[#7E35E3] to-[#8F43EE] text-white border-purple-400/50 shadow-md shadow-purple-600/20 scale-[1.01]'
                      : 'bg-white hover:bg-purple-50/50 border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] text-slate-700'
                    }`}
                >
                  {/* Icon Badge */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isActive
                        ? 'bg-white/20 text-white backdrop-blur-xs'
                        : 'bg-purple-50 border border-purple-100 text-purple-600 group-hover:scale-105'
                      }`}
                  >
                    {iconSrc ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={encodeURI(iconSrc)}
                        alt={feature.title || 'Tab Icon'}
                        className={`w-4 h-4 object-contain ${isActive ? 'invert brightness-200' : ''}`}
                      />
                    ) : isActive ? (
                      <Check className="w-4 h-4 text-white stroke-[2.5]" />
                    ) : (
                      <DefaultIcon className="w-4 h-4 text-purple-600" />
                    )}
                  </div>

                  {/* Tab Title Text */}
                  <span className={`font-bold text-xs md:text-sm leading-snug line-clamp-2 ${isActive ? 'text-white' : 'text-slate-800'}`}>
                    {feature.title}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Right Column: Tab Active Content Pane */}
          <div className="lg:col-span-7 w-full border-t lg:border-t-0 lg:border-l border-purple-100/80 pt-6 lg:pt-0 lg:pl-10 flex flex-col justify-center min-h-[280px] relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id || activeTabId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                {/* Top Circular Illustration Container */}
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-purple-50 via-purple-100/40 to-indigo-50 border border-purple-100 flex items-center justify-center mb-4 p-3 shadow-xs shrink-0">
                  <img
                    src={activeTab?.image || '/ErpOverview/featureTav1.png'}
                    alt={activeTab.title || 'Feature Illustration'}
                    className="w-20 h-20 md:w-26 md:h-26 object-contain"
                  />
                </div>

                {/* Content Descriptions */}
                <div className="space-y-3 max-w-lg">
                  {activeTab.desc && (
                    <div className="text-slate-700 text-sm md:text-base font-normal leading-relaxed">
                      {renderHighlightedText(activeTab.desc)}
                    </div>
                  )}
                  {activeTab.desc2 && (
                    <div className="text-slate-600 text-sm md:text-base font-normal leading-relaxed">
                      {renderHighlightedText(activeTab.desc2)}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Wave Decorative Background SVG Pattern */}
          <div className="absolute bottom-0 right-0 w-80 h-32 opacity-25 pointer-events-none -mb-4 -mr-4">
            <svg viewBox="0 0 400 160" fill="none" className="w-full h-full text-purple-300">
              <path d="M0 120C100 140 200 80 300 110C400 140 500 90 600 120V160H0V120Z" fill="currentColor" opacity="0.5" />
              <path d="M0 140C120 160 240 100 360 130C480 160 600 110 720 140V160H0V140Z" fill="currentColor" opacity="0.8" />
            </svg>
          </div>

        </div>

      </div>
    </section>
  );
}

function renderFormattedHeading(text: string) {
  if (!text) return null;
  if (text.toLowerCase().includes('ebizframe.ai')) {
    const parts = text.split(/(ebizframe\.ai)/i);
    return (
      <>
        {parts.map((part, idx) =>
          part.toLowerCase() === 'ebizframe.ai' ? (
            <span key={idx} className="text-[#6B26D9]">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  }
  return text;
}

function renderHighlightedText(text: string) {
  if (!text) return null;
  if (text.includes('<p>') || text.includes('<strong>')) {
    return <div dangerouslySetInnerHTML={{ __html: text }} />;
  }

  // Highlight key metrics like 90 Days, 90 days, 1,500+ times, etc.
  const regex = /(\b90 [Dd]ays\b|\b1,500\+ times\b|\b[A-Za-z0-9]+\b)/g;
  return (
    <span>
      {text.split(/(\b90 [Dd]ays\b|\b1,500\+ times\b)/g).map((chunk, i) =>
        /(\b90 [Dd]ays\b|\b1,500\+ times\b)/i.test(chunk) ? (
          <strong key={i} className="text-[#6B26D9] font-bold">
            {chunk}
          </strong>
        ) : (
          chunk
        )
      )}
    </span>
  );
}

export default ErpFeaturesTab;
