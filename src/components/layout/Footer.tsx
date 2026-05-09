'use client'

import React from 'react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export const Footer = () => {
  const t = useTranslations('footer');
  const tc = useTranslations('common');

  return (
    <footer className="w-full bg-[#09090b] border-t border-white/5 py-12 px-6 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="text-xl font-black italic tracking-tighter">
              PROCURE<span className="text-blue-500">OS</span>
            </Link>
            <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest">
              {t('poweredBy')}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <Link href="/faq" className="text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">{t('faq')}</Link>
            <Link href="/reviews" className="text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">{t('reviews')}</Link>
            <Link href="/legal/terms" className="text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">{t('terms')}</Link>
            <Link href="/legal/privacy" className="text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">{t('privacy')}</Link>
            <Link href="/legal/cookies" className="text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">{t('cookies')}</Link>
            <div className="w-[1px] h-4 bg-white/10 hidden md:block" />
            <a 
              href={`${process.env.NEXT_PUBLIC_PROCUREOS_WEB_URL || "https://procure-os.com"}/signup?referred_by=${process.env.NEXT_PUBLIC_PARTNER_ID}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-400 transition-colors text-xs font-black uppercase tracking-widest"
            >
              {t('joinAsSupplier')}
            </a>
          </div>

          <div className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} {tc('allRightsReserved')}
          </div>
        </div>
      </div>
    </footer>
  )
}
