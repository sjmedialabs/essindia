'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCtaAction, type CtaFormType } from '@/hooks/useCtaAction';

export interface ServiceCard {
  image?: string;
  title?: string;
  description?: string;
  points?: string[];
  ctaText?: string;
  ctaUrl?: string;
  ctaFormType?: string;
}

export interface UgandaServicesContent {
  badgeText?: string;
  title?: string;
  description?: string;
  cards?: ServiceCard[];
}

const DEFAULT_CARDS: ServiceCard[] = [
  {
    image: '/software_svgrepo.com.png',
    title: 'Custom Software Development',
    description: 'Robust software solutions built around your business needs to solve complex challenges.',
    points: ['Customized Solutions', 'Scalable Architecture', 'Ongoing Support'],
    ctaText: 'Learn more',
    ctaUrl: '/contact-us',
  },
  {
    image: '/smartphone-coding_svgrepo.com.png',
    title: 'Web & Mobile App Development',
    description: 'Engaging web and mobile apps designed to deliver seamless experiences on any device.',
    points: ['Responsive Design', 'Cross-platform Apps', 'User-centric UI/UX'],
    ctaText: 'Learn more',
    ctaUrl: '/contact-us',
  },
  {
    image: '/online-payment_svgrepo.com.png',
    title: 'Enterprise & ERP Solutions',
    description: 'Comprehensive enterprise solutions to streamline operations and improve business performance.',
    points: ['Process Automation', 'Data-driven Insights', 'Seamless Integration'],
    ctaText: 'Learn more',
    ctaUrl: '/contact-us',
  },
  {
    image: '/cloud-app_svgrepo.com.png',
    title: 'Cloud Application Development',
    description: 'Secure, reliable and cost-effective cloud solutions to accelerate your business in the digital era.',
    points: ['Cloud Migration', 'High Availability', 'Cost Optimization'],
    ctaText: 'Learn more',
    ctaUrl: '/contact-us',
  },
];

function CardItem({ card, index }: { card: ServiceCard; index: number }) {
  const { handleClick, modalNode } = useCtaAction(
    card.ctaUrl || '/contact-us',
    (card.ctaFormType || '') as CtaFormType
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group flex flex-col justify-between rounded-2xl bg-white p-7 text-center border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:bg-[#f0f4ff] hover:border-[#4f46e5] hover:shadow-[0_12px_30px_rgba(79,70,229,0.15)] transition-all duration-300 min-h-[460px] cursor-pointer"
    >
      <div className="flex flex-col items-center">
        {/* SVG Icon */}
        {card.image && (
          <div className="relative w-20 h-20 mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <Image
              src={card.image}
              alt={card.title || 'Service Icon'}
              fill
              className="object-contain"
              sizes="80px"
            />
          </div>
        )}

        {/* Card Title */}
        {card.title && (
          <div className="w-full mb-3">
            <h3 className="text-lg sm:text-[20px] font-bold text-[#0a1128] leading-snug">
              {card.title}
            </h3>
          </div>
        )}

        {/* Short Description */}
        {card.description && (
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal max-w-[260px]">
            {card.description}
          </p>
        )}

        {/* Feature Checkpoints */}
        {card.points && card.points.length > 0 && (
          <ul className="w-full space-y-2.5 text-left pl-1">
            {card.points.map((point, pIdx) => (
              <li key={pIdx} className="flex items-center gap-2.5 text-xs sm:text-[13px] font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#4f46e5] shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action CTA */}
      {card.ctaText && (
        <div className="mt-2 flex justify-start pl-1">
          <Link
            href={card.ctaUrl || '/contact-us'}
            onClick={card.ctaFormType ? (e) => { e.preventDefault(); handleClick(); } : undefined}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#4f46e5] hover:text-[#3730a3] transition-colors group-hover:translate-x-0.5"
          >
            <span>{card.ctaText}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      )}
      {modalNode}
    </motion.article>
  );
}

export function UgandaServices({ content }: { content?: UgandaServicesContent }) {
  const badgeText = content?.badgeText || 'OUR SERVICES';
  const title = content?.title || 'Smart digital solutions that drive real results.';
  const description = content?.description || 'We turn ideas into powerful digital experiences that help your business grow and succeed.';
  const cards = content?.cards?.length ? content.cards : DEFAULT_CARDS;

  return (
    <section className="w-full py-20 bg-[#f8fafc] border-b border-slate-100">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">

        {/* Badge Pill with lines */}
        {badgeText && (
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-indigo-600 rounded-full" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-indigo-600">
              {badgeText}
            </span>
            <span className="h-[2px] w-8 bg-indigo-600 rounded-full" />
          </div>
        )}

        {/* Section Heading */}
        {title && (
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold text-[#0a1128] tracking-tight max-w-3xl mx-auto leading-tight mb-4">
            {title}
          </h2>
        )}

        {/* Section Subheading / Description */}
        {description && (
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto mb-14 leading-relaxed font-normal">
            {description}
          </p>
        )}

        {/* 4 Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 max-w-7xl mx-auto">
          {cards.map((card, index) => (
            <CardItem key={index} card={card} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
