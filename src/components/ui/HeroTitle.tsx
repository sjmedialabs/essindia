'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HeroTitleProps {
  title: string;
  gradientFrom?: string;
  gradientTo?: string;
  enableAnimation?: boolean;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p';
  delay?: number;
}

export function HeroTitle({
  title,
  gradientFrom,
  gradientTo,
  enableAnimation = true,
  className = '',
  as: Component = 'h1',
  delay = 0,
}: HeroTitleProps) {
  const hasGradient = Boolean(gradientFrom || gradientTo);
  const fromColor = gradientFrom || '#1D68C8';
  const toColor = gradientTo || '#54A0FF';

  const gradientStyle: React.CSSProperties = hasGradient
    ? {
        backgroundImage: `linear-gradient(135deg, ${fromColor} 0%, ${toColor} 50%, ${fromColor} 100%)`,
        backgroundSize: '200% 200%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
        display: 'inline-block',
        transition: 'all 0.3s ease',
      }
    : {};

  return (
    <Component className={`${className} cursor-default`}>
      <motion.span
        initial={{ y: '30%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: delay,
        }}
        style={hasGradient ? gradientStyle : undefined}
        className={`inline-block transition-all duration-300 ${
          hasGradient && enableAnimation !== false ? 'animate-hero-gradient-loop' : ''
        }`}
      >
        {title}
      </motion.span>
    </Component>
  );
}
