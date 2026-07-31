'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { validatePhoneNumber } from '@/lib/phone-validation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ALL_COUNTRIES_LIST } from '@/lib/countries';
import countryCodesList from 'country-codes-list';

const DIAL_CODES = (countryCodesList.customArray({
  name: '{countryNameEn}',
  code: '{countryCode}',
  dialCode: '+{countryCallingCode}'
}) as any as Array<{ name: string; code: string; dialCode: string }>).map(c => ({
  ...c,
  code: c.code.toLowerCase()
})).filter((c, index, self) =>
  index === self.findIndex((t) => t.dialCode === c.dialCode)
);

export interface BadgeItem {
  text: string;
}

export interface Landing2HeroContent {
  gradientColor1?: string;
  gradientColor2?: string;
  gradientColor3?: string;
  bgColor?: string;
  title?: string;
  subtitle?: string;
  badges?: BadgeItem[];
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  formTitle?: string;
  formSubtitle?: string;
  dataNotice?: string;
  formButtonText?: string;
  formButtonBgColor?: string;
  industries?: string[];
}

const DEFAULT_CONTENT: Landing2HeroContent = {
  title: 'The Most Comprehensive Project Management Software',
  subtitle: 'The preferred project management application of more than a million businesses.',
  badges: [
    { text: '4-day free trial' },
    { text: 'No credit card required' },
    { text: 'No credit card required' }
  ],
  primaryCtaText: 'GET STARTED',
  primaryCtaUrl: '#form',
  secondaryCtaText: 'BOOK A FREE DEMO',
  secondaryCtaUrl: '/contact-us',
  formTitle: 'Get a Free Trial',
  formSubtitle: 'Get Started in less than 30 seconds',
  dataNotice: 'Your data will be stored in the US data center.',
  formButtonText: 'REGISTER FOR FREE',
  formButtonBgColor: '#e52528',
  industries: [
    'Manufacturing',
    'Construction & Real Estate',
    'FMCG & Retail',
    'Healthcare & Pharma',
    'Logistics & Supply Chain',
    'IT & Services',
    'Finance & Banking',
    'Other'
  ]
};

import { getHeroBackgroundStyles } from '@/lib/utils';

export function Landing2Hero({ content }: { content?: Landing2HeroContent }) {
  const data = { ...DEFAULT_CONTENT, ...content };

  const [formData, setFormData] = useState({
    company: '',
    industry: '',
    email: '',
    password: '',
    phone: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [selectedDialCode, setSelectedDialCode] = useState<string>('us');
  const [searchDialQuery, setSearchDialQuery] = useState<string>('');
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const filteredDialCodes = DIAL_CODES.filter(c =>
    c.name.toLowerCase().includes(searchDialQuery.toLowerCase()) || c.dialCode.includes(searchDialQuery)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      toast.error('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }

    if (!formData.company.trim()) {
      toast.error('Please enter your company name.');
      return;
    }

    if (!formData.industry) {
      toast.error('Please select an industry.');
      return;
    }

    if (!formData.email.trim()) {
      toast.error('Please enter your email address.');
      return;
    }

    const validation = validatePhoneNumber(formData.phone, selectedDialCode);
    if (!validation.isValid) {
      toast.error(validation.message);
      return;
    }

    setIsSubmitting(true);
    try {
      const dialInfo = DIAL_CODES.find((c) => c.code === selectedDialCode);
      const fullPhone = dialInfo && formData.phone ? `${dialInfo.dialCode} ${formData.phone}` : formData.phone;

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.company,
          email: formData.email,
          phone: fullPhone,
          company: formData.company,
          country: dialInfo?.name || '',
          message: `Industry: ${formData.industry}`,
          formType: 'landing2-trial',
          pageName: 'Landing Page 2 Hero',
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit registration');
      }

      toast.success('Registration submitted successfully! Our team will contact you shortly.');
      setFormData({ company: '', industry: '', email: '', password: '', phone: '' });
      setAcceptedTerms(false);
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const badgesList = data.badges && data.badges.length > 0 ? data.badges : DEFAULT_CONTENT.badges!;
  const industriesList = data.industries && data.industries.length > 0 ? data.industries : DEFAULT_CONTENT.industries!;

  const heroStyles = getHeroBackgroundStyles(data, { backgroundColor: data.bgColor || '#3f1885' });

  return (
    <section
      className="relative overflow-hidden py-14 px-6 font-sans text-white flex items-center"
      style={heroStyles}
    >
      {/* Wave Background Pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)`
        }}
      />

      <div className="container mx-auto max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Heading, Subtitle, Checkmark Badges, CTAs */}
        <div className="lg:col-span-7 space-y-4 text-left">
          {/* Main Title */}
          {data.title && (
            <h1 className="text-white text-3xl md:text-5xl font-bold tracking-tight leading-[1.15]">
              {data.title}
            </h1>
          )}

          {/* Subtitle */}
          {data.subtitle && (
            <p className="text-white/90 text-base md:text-lg font-medium leading-normal max-w-2xl">
              {data.subtitle}
            </p>
          )}

          {/* Badges with Green Checkmarks */}
          {badgesList.length > 0 && (
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {badgesList.map((badge, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 bg-white text-slate-900 px-3.5 py-1.5 rounded-md shadow-sm font-semibold text-xs md:text-sm"
                >
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {data.primaryCtaText && (
              <a
                href={data.primaryCtaUrl || '#form'}
                className="bg-[#f5c234] hover:bg-[#e0b028] text-slate-900 px-8 py-3.5 rounded-md font-bold text-xs md:text-sm tracking-wider uppercase transition-colors shadow-md text-center"
              >
                {data.primaryCtaText}
              </a>
            )}
            {data.secondaryCtaText && (
              <Link
                href={data.secondaryCtaUrl || '/contact-us'}
                className="bg-[#f5c234] hover:bg-[#e0b028] text-slate-900 px-8 py-3.5 rounded-md font-bold text-xs md:text-sm tracking-wider uppercase transition-colors shadow-md text-center"
              >
                {data.secondaryCtaText}
              </Link>
            )}
          </div>
        </div>

        {/* Right Column: Registration Form Card */}
        <div id="form" className="lg:col-span-5 w-full">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-900 max-w-md mx-auto border border-slate-100">
            {/* Form Title & Subtitle */}
            <div className="text-center mb-6 space-y-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2e1466] tracking-tight">
                {data.formTitle || 'Get a Free Trial'}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-[#3b177d]">
                {data.formSubtitle || 'Get Started in less than 30 seconds'}
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Company Input */}
              <div>
                <input
                  type="text"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#3f1885] transition-colors"
                />
              </div>

              {/* Industry Select Dropdown */}
              <div>
                <select
                  name="industry"
                  required
                  value={formData.industry}
                  onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm text-slate-700 bg-white focus:outline-none focus:border-[#3f1885] transition-colors cursor-pointer"
                >
                  <option value="" disabled>Select Industry</option>
                  {industriesList.map((ind, idx) => (
                    <option key={idx} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              {/* Email Input */}
              <div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#3f1885] transition-colors"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#3f1885] transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone Input with Dial Code Selector */}
              <div className="flex rounded-lg border border-slate-200 overflow-hidden">
                <Select value={selectedDialCode} onValueChange={(v) => setSelectedDialCode(v || '')} onOpenChange={(open) => !open && setSearchDialQuery('')}>
                  <SelectTrigger className="w-[110px] px-3 !h-[44px] rounded-r-none border-0 border-r border-slate-200 focus-visible:outline-none focus-visible:ring-0 text-sm bg-slate-50 shadow-none z-10">
                    <SelectValue>
                      {selectedDialCode && (
                        <span className="flex items-center gap-1 font-semibold text-slate-700">
                          {DIAL_CODES.find((c) => c.code === selectedDialCode)?.dialCode}
                        </span>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="w-[260px] max-h-60 p-0" alignItemWithTrigger={false} side="bottom">
                    <div className="p-2 sticky top-0 bg-white z-10 border-b border-slate-100">
                      <input
                        type="text"
                        placeholder="Search code..."
                        className="w-full px-3 py-1.5 text-xs outline-none border border-slate-200 rounded-md focus:border-[#3f1885]"
                        value={searchDialQuery}
                        onChange={(e) => setSearchDialQuery(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <div className="p-1">
                      {filteredDialCodes.map((c) => (
                        <SelectItem key={c.code} value={c.code} className="cursor-pointer text-xs">
                          <span className="text-slate-500 w-10">{c.dialCode}</span>
                          <span className="truncate">{c.name}</span>
                        </SelectItem>
                      ))}
                    </div>
                  </SelectContent>
                </Select>
                <input
                  type="text"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  className="flex-1 px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none"
                />
              </div>

              {/* Disclaimer & Terms */}
              <div className="space-y-2 pt-1 text-[11px] text-slate-500">
                {data.dataNotice && <p className="text-slate-400">{data.dataNotice}</p>}
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="hero-terms"
                    required
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#3f1885] focus:ring-[#3f1885] cursor-pointer"
                  />
                  <label htmlFor="hero-terms" className="cursor-pointer leading-tight text-slate-600">
                    I agree to the{' '}
                    <Link href="/terms-of-service" className="underline font-semibold text-slate-700">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy-policy" className="underline font-semibold text-slate-700">
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-lg text-white font-bold text-sm tracking-wider uppercase transition-all shadow-md hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer"
                  style={{ backgroundColor: data.formButtonBgColor || '#e52528' }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      SUBMITTING...
                    </>
                  ) : (
                    data.formButtonText || 'REGISTER FOR FREE'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

