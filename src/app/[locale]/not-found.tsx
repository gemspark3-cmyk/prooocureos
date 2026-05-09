'use client'

import React from 'react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Search, ArrowLeft, Zap } from 'lucide-react'

export default function NotFound() {
  const t = useTranslations('errors.404');
  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md space-y-8"
      >
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center border border-white/10 shadow-2xl relative group">
             <div className="absolute inset-0 bg-blue-600/20 blur-2xl group-hover:bg-blue-600/40 transition-all rounded-full" />
             <Search className="w-10 h-10 text-zinc-500 relative z-10" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-6xl font-black italic tracking-tighter text-white uppercase leading-none">404</h1>
          <h2 className="text-2xl font-black text-zinc-400 uppercase tracking-widest italic">{t('title')}</h2>
          <p className="text-zinc-500 font-medium">
            {t('description')}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Link 
            href="/"
            className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20"
          >
            <ArrowLeft className="w-4 h-4" /> {t('backHome')}
          </Link>
          <div className="flex items-center justify-center gap-2 text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em]">
             <Zap className="w-3 h-3 fill-zinc-700" /> PROCUREOS CORE
          </div>
        </div>
      </motion.div>
    </div>
  )
}
