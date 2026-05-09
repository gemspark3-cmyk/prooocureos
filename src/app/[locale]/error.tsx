'use client'

import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Zap } from 'lucide-react'
import { monitoring } from '@/lib/monitoring'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('globalError');
  
  useEffect(() => {
    // 🛡️ Log the error automatically to our monitoring system
    monitoring.error(error, { type: 'global_render_error' })
  }, [error])

  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md space-y-8"
      >
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-rose-600/10 rounded-[2.5rem] flex items-center justify-center border border-rose-500/20 shadow-2xl relative group">
             <div className="absolute inset-0 bg-rose-600/20 blur-2xl transition-all rounded-full" />
             <AlertTriangle className="w-10 h-10 text-rose-500 relative z-10" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none">{t('title')}</h1>
          <h2 className="text-xl font-black text-zinc-400 uppercase tracking-widest italic">{t('subtitle')}</h2>
          <p className="text-zinc-500 font-medium">
            {t('description')}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            onClick={() => reset()}
            className="w-full py-5 bg-white text-black rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all shadow-xl active:scale-95"
          >
            <RefreshCw className="w-4 h-4" /> {t('retry')}
          </button>
          <div className="flex items-center justify-center gap-2 text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em]">
             <Zap className="w-3 h-3 fill-zinc-700" /> SYSTEM RECOVERY ACTIVE
          </div>
        </div>
      </motion.div>
    </div>
  )
}
