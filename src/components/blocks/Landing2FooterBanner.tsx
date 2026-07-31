'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface SocialLinkItem {
  icon: string;
  url: string;
}

export interface Landing2FooterBannerContent {
  logo?: string;
  navLinks?: NavLinkItem[];
  socialLinks?: SocialLinkItem[];
  ctaText?: string;
  ctaUrl?: string;
}

const DEFAULT_NAV_LINKS: NavLinkItem[] = [
  { label: 'Industries', href: '/industry-solutions' },
  { label: 'Products', href: '/products' },
  { label: 'Solutions', href: '/solutions/retail' },
  { label: 'Platform', href: '/solutions/rpa' },
  { label: 'Services', href: '/services' },
  { label: 'Partners', href: '/contact-us' },
  { label: 'About', href: '/about-us' },
];

const DEFAULT_SOCIAL_LINKS: SocialLinkItem[] = [
  { icon: '/Landing Page-2/assets/Social Media.png', url: 'https://facebook.com' },
  { icon: '/Landing Page-2/assets/Social Media-1.png', url: 'https://x.com' },
  { icon: '/Landing Page-2/assets/Social Media-2.png', url: 'https://threads.net' },
  { icon: '/Landing Page-2/assets/Social Media-3.png', url: 'https://instagram.com' },
  { icon: '/Landing Page-2/assets/Social Media-4.png', url: 'https://linkedin.com' },
];

const DEFAULT_CONTENT: Landing2FooterBannerContent = {
  logo: '/Landing Page-2/assets/logo.png',
  navLinks: DEFAULT_NAV_LINKS,
  socialLinks: DEFAULT_SOCIAL_LINKS,
  ctaText: 'Contact Us',
  ctaUrl: '/contact-us',
};

export function Landing2FooterBanner({ content }: { content?: Landing2FooterBannerContent }) {
  const data = { ...DEFAULT_CONTENT, ...content };
  const navs = data.navLinks && data.navLinks.length > 0 ? data.navLinks : DEFAULT_NAV_LINKS;
  const socials = data.socialLinks && data.socialLinks.length > 0 ? data.socialLinks : DEFAULT_SOCIAL_LINKS;

  return (
    <section className="py-14 bg-[#462294] font-sans select-none px-6 text-white text-center">
      <div className="container mx-auto max-w-5xl flex flex-col items-center">
        {/* Company Logo Centered */}
        <div className="relative w-48 md:w-60 h-16 md:h-20 mb-8">
          <Image
            src={data.logo || '/Landing Page-2/assets/logo.png'}
            alt="Eastern Software Solutions"
            fill
            className="object-contain brightness-0 invert"
            priority
          />
        </div>

        {/* Horizontal Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-8">
          {navs.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="text-white text-base md:text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social Media Icons Row */}
        <div className="flex items-center justify-center gap-5 mb-10">
          {socials.map((soc, idx) => (
            <a
              key={idx}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-7 h-7 md:w-8 md:h-8 hover:scale-110 transition-transform"
            >
              <Image
                src={soc.icon}
                alt={`Social ${idx + 1}`}
                fill
                className="object-contain brightness-0 invert"
              />
            </a>
          ))}
        </div>

        {/* Rounded White Pill CTA Button */}
        {data.ctaText && (
          <div>
            <Link
              href={data.ctaUrl || '/contact-us'}
              className="inline-flex items-center justify-center bg-white hover:bg-slate-100 text-[#462294] px-8 py-3.5 rounded-full font-bold text-sm md:text-base tracking-tight transition-all shadow-lg hover:shadow-xl group cursor-pointer"
            >
              <span>{data.ctaText}</span>
              <svg
                className="w-4 h-4 ml-2 fill-current group-hover:translate-x-1 transition-transform"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
