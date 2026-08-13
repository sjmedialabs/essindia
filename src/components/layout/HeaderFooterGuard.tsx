'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

interface HeaderFooterGuardProps {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}

export function HeaderFooterGuard({ header, footer, children }: HeaderFooterGuardProps) {
  const pathname = usePathname();
  const [isLandingSectionPresent, setIsLandingSectionPresent] = React.useState(false);

  const isLandingPath = React.useMemo(() => {
    if (!pathname) return false;
    const lower = pathname.toLowerCase();
    return (
      lower.startsWith('/landing') ||
      lower.includes('/landing-') ||
      lower.includes('/landing1') ||
      lower.includes('/landing2') ||
      lower.startsWith('/lp') ||
      lower.includes('/lp-') ||
      lower.endsWith('-landing') ||
      lower.includes('/lp/')
    );
  }, [pathname]);

  React.useEffect(() => {
    const checkLandingAttribute = () => {
      const isLandingAttr = document.querySelector('[data-landing-page="true"]');
      setIsLandingSectionPresent(!!isLandingAttr);
    };

    checkLandingAttribute();

    const observer = new MutationObserver(checkLandingAttribute);
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, [pathname]);

  const hideHeaderFooter = isLandingPath || isLandingSectionPresent;

  if (hideHeaderFooter) {
    return (
      <main className="flex-1 w-full min-h-screen">
        {children}
      </main>
    );
  }

  return (
    <>
      {header}
      <main className="flex-1 pt-16">
        {children}
      </main>
      {footer}
    </>
  );
}
