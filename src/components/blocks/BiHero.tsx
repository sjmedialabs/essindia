'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCtaAction, type CtaFormType } from '@/hooks/useCtaAction';
import { HeroTitle } from '@/components/ui/HeroTitle';
import { getHeroBackgroundStyles } from '@/lib/utils';

interface BiHeroContent {
  gradientColor1?: string;
  gradientColor2?: string;
  gradientColor3?: string;
  bgColor?: string;
  badgeBgColor?: string;
  badgeBorderColor?: string;
  badgeText?: string;
  badgeTextColor?: string;
  title?: string;
  titleColor?: string;
  description?: string;
  descriptionColor?: string;
  button1BgColor?: string;
  button1HoverBgColor?: string;
  button1BorderColor?: string;
  button1Text?: string;
  button1TextColor?: string;
  button1HoverTextColor?: string;
  button1Url?: string;
  button1FormType?: string;
  button1PdfUrl?: string;
  button2BgColor?: string;
  button2HoverBgColor?: string;
  button2BorderColor?: string;
  button2Text?: string;
  button2TextColor?: string;
  button2HoverTextColor?: string;
  button2Url?: string;
  button2FormType?: string;
  button2PdfUrl?: string;
  image?: string;
}

export function BiHero({ content }: { content?: BiHeroContent }) {
  const [isBtn1Hovered, setIsBtn1Hovered] = React.useState(false);
  const [isBtn2Hovered, setIsBtn2Hovered] = React.useState(false);

  const bgColor = content?.bgColor || '#f3f6fc';
  const badgeBgColor = content?.badgeBgColor || '#5e35b1';
  const badgeBorderColor = content?.badgeBorderColor || 'transparent';
  const badgeText = content?.badgeText || 'Power BI consulting for enterprise teams';
  const badgeTextColor = content?.badgeTextColor || '#ffffff';

  const title = content?.title || 'Turn scattered\nbusiness data into\nreal-time decisions.';
  const titleColor = content?.titleColor || '#301c5c';
  const description = content?.description || 'ESS India helps enterprises design Power BI dashboards, predictive analytics, KPI reporting, and AI-driven insights that simplify decisions across departments.';
  const descriptionColor = content?.descriptionColor || '#4b5563';

  const button1BgColor = content?.button1BgColor || '#ffca28';
  const button1HoverBgColor = content?.button1HoverBgColor;
  const button1BorderColor = content?.button1BorderColor || '#ffca28';
  const button1Text = content?.button1Text || 'Book your Demo';
  const button1TextColor = content?.button1TextColor || '#000000';
  const button1HoverTextColor = content?.button1HoverTextColor;
  const button1Url = content?.button1Url || '#';
  const button1FormType = (content?.button1FormType || '') as CtaFormType;

  const button2BgColor = content?.button2BgColor || '#5e35b1';
  const button2HoverBgColor = content?.button2HoverBgColor;
  const button2BorderColor = content?.button2BorderColor || '#5e35b1';
  const button2Text = content?.button2Text || 'Case studies';
  const button2TextColor = content?.button2TextColor || '#ffffff';
  const button2HoverTextColor = content?.button2HoverTextColor;
  const button2Url = content?.button2Url || '#';
  const button2FormType = (content?.button2FormType || '') as CtaFormType;

  const rightImage = content?.image || '/Business intilligence/Frame 211.png';

  const { handleClick: handleBtn1Click, modalNode: modal1 } = useCtaAction(button1Url, button1FormType, content?.button1PdfUrl);
  const { handleClick: handleBtn2Click, modalNode: modal2 } = useCtaAction(button2Url, button2FormType, content?.button2PdfUrl);

  const isGradient = bgColor.includes('gradient') || bgColor.includes('rgba') || bgColor.startsWith('linear') || bgColor.startsWith('radial');

  const bgStyles = getHeroBackgroundStyles(
    {
      gradientColor1: content?.gradientColor1,
      gradientColor2: content?.gradientColor2,
      gradientColor3: content?.gradientColor3,
    },
    isGradient
      ? { backgroundImage: bgColor }
      : content?.bgColor
      ? { backgroundColor: bgColor }
      : { backgroundImage: 'linear-gradient(135deg, #f3f6fc 0%, #eef3fc 100%)' }
  );

  return (
    <section
      className="relative min-h-[80vh] flex items-center py-14 px-6 overflow-hidden text-slate-800"
      style={bgStyles}
    >
      {/* Soft decorative background circles */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex-1 text-left space-y-6 lg:max-w-2xl"
          >
            {badgeText && (
              <motion.span
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="inline-block px-5 py-2 rounded-full text-xs font-semibold tracking-wide border shadow-sm"
                style={{
                  backgroundColor: badgeBgColor,
                  borderColor: badgeBorderColor,
                  color: badgeTextColor,
                }}
              >
                {badgeText}
              </motion.span>
            )}

            {((content as any)?.titleGradientFrom || (content as any)?.titleGradientTo) && (content as any)?.enableTitleGradientAnimation !== false ? (
              <HeroTitle
                as="h1"
                title={title}
                gradientFrom={(content as any)?.titleGradientFrom}
                gradientTo={(content as any)?.titleGradientTo}
                enableAnimation={(content as any)?.enableTitleGradientAnimation}
                className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] mb-6 whitespace-pre-line text-left"
              />
            ) : (
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] mb-6 whitespace-pre-line"
                style={{ color: titleColor }}
              >
                {title}
              </motion.h1>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-base sm:text-lg leading-relaxed font-light mb-8 max-w-xl opacity-90"
              style={{ color: descriptionColor }}
            >
              {typeof description === 'string' && (description.includes('<p>') || description.includes('<')) ? (
                <span dangerouslySetInnerHTML={{ __html: description }} />
              ) : (
                description
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              {button1Text && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  {button1FormType ? (
                    <button
                      onClick={handleBtn1Click}
                      onMouseEnter={() => setIsBtn1Hovered(true)}
                      onMouseLeave={() => setIsBtn1Hovered(false)}
                      className="inline-block px-6 py-3 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all border text-center min-w-[140px] cursor-pointer"
                      style={{
                        backgroundColor: isBtn1Hovered && button1HoverBgColor ? button1HoverBgColor : button1BgColor,
                        borderColor: button1BorderColor,
                        color: isBtn1Hovered && button1HoverTextColor ? button1HoverTextColor : button1TextColor,
                      }}
                    >
                      {button1Text}
                    </button>
                  ) : (
                    <Link
                      href={button1Url}
                      onMouseEnter={() => setIsBtn1Hovered(true)}
                      onMouseLeave={() => setIsBtn1Hovered(false)}
                      className="inline-block px-6 py-3 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all border text-center min-w-[140px] cursor-pointer"
                      style={{
                        backgroundColor: isBtn1Hovered && button1HoverBgColor ? button1HoverBgColor : button1BgColor,
                        borderColor: button1BorderColor,
                        color: isBtn1Hovered && button1HoverTextColor ? button1HoverTextColor : button1TextColor,
                      }}
                    >
                      {button1Text}
                    </Link>
                  )}
                </motion.div>
              )}

              {button2Text && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  {button2FormType ? (
                    <button
                      onClick={handleBtn2Click}
                      onMouseEnter={() => setIsBtn2Hovered(true)}
                      onMouseLeave={() => setIsBtn2Hovered(false)}
                      className="inline-block px-6 py-3 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all border text-center min-w-[140px] cursor-pointer"
                      style={{
                        backgroundColor: isBtn2Hovered && button2HoverBgColor ? button2HoverBgColor : button2BgColor,
                        borderColor: button2BorderColor,
                        color: isBtn2Hovered && button2HoverTextColor ? button2HoverTextColor : button2TextColor,
                      }}
                    >
                      {button2Text}
                    </button>
                  ) : (
                    <Link
                      href={button2Url}
                      onMouseEnter={() => setIsBtn2Hovered(true)}
                      onMouseLeave={() => setIsBtn2Hovered(false)}
                      className="inline-block px-6 py-3 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all border text-center min-w-[140px] cursor-pointer"
                      style={{
                        backgroundColor: isBtn2Hovered && button2HoverBgColor ? button2HoverBgColor : button2BgColor,
                        borderColor: button2BorderColor,
                        color: isBtn2Hovered && button2HoverTextColor ? button2HoverTextColor : button2TextColor,
                      }}
                    >
                      {button2Text}
                    </Link>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Right Image Column */}
          {rightImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex-1 w-full max-w-lg lg:max-w-xl relative flex justify-center"
            >
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/40">
                <Image
                  src={rightImage}
                  alt={title || 'Power BI Consulting'}
                  fill
                  className="object-contain p-2"
                  priority
                />
              </div>
            </motion.div>
          )}

        </div>
      </div>
      {modal1}
      {modal2}
    </section>
  );
}
