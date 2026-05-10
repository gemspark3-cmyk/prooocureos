'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  Building, 
  Clock, 
} from 'lucide-react'
import { BuyerStats, Buyer } from '@/types/buyer'
import { formatCurrency } from '@/lib/formatters'

import { useTranslations } from 'next-intl'

interface StatsCardsProps {
  stats: BuyerStats;
  profileData: Buyer;
  setCurrentView: (view: any) => void;
}

export function StatsCards({
  stats,
  profileData,
  setCurrentView
}: StatsCardsProps) {
  const t = useTranslations('dashboard.stats');
  
  const limitPercentage = profileData.approval_limit_usd && profileData.approval_limit_usd > 0 
    ? Math.min(100, Math.round((stats.totalSpent / profileData.approval_limit_usd) * 100)) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div 
        onClick={() => stats.activeRfqs === 0 && setCurrentView('marketplace')}
        className={`glass-premium p-6 rounded-[2rem] border border-[var(--foreground)]/5 flex flex-col gap-4 group hover:border-blue-500/20 transition-all relative overflow-hidden ${stats.activeRfqs === 0 ? 'cursor-pointer' : ''}`}
      >
        <div className="flex justify-between items-start relative z-10">
          <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 shadow-xl shadow-blue-600/5 group-hover:scale-110 transition-transform">
            <Package className="w-6 h-6" />
          </div>
          {stats.activeRfqs === 0 ? (
            <span className="text-[7px] font-black text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md animate-pulse">{t('start')}</span>
          ) : (
            <span className="text-[9px] font-black text-blue-500 bg-blue-500/10 px-2 py-1 rounded-md">{t('active')}</span>
          )}
        </div>
        <div className="relative z-10">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t('pendingRequests')}</p>
          {stats.activeRfqs === 0 ? (
             <p className="text-[10px] font-black text-zinc-600 italic mt-1 uppercase tracking-tighter">{t('noRequests')}</p>
          ) : (
            <h4 className="text-3xl font-black text-[var(--foreground)] italic mt-1">{stats.activeRfqs}</h4>
          )}
        </div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 blur-[40px] -mr-12 -mt-12 rounded-full" />
      </div>

      <div className="glass-premium p-6 rounded-[2rem] border border-[var(--foreground)]/5 flex flex-col gap-4 group hover:border-emerald-500/20 transition-all relative overflow-hidden">
        <div className="flex justify-between items-start relative z-10">
          <div className="w-12 h-12 bg-emerald-600/10 rounded-2xl flex items-center justify-center text-emerald-500 shadow-xl shadow-emerald-600/5 group-hover:scale-110 transition-transform">
            <Building className="w-6 h-6" />
          </div>
          <span className="text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">OPTM</span>
        </div>
        <div className="relative z-10">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t('savings')}</p>
          <h4 className="text-3xl font-black text-[var(--foreground)] italic mt-1">{formatCurrency(Number(stats.estimatedSavings) || 0, profileData?.preferred_currency || 'USD')}</h4>
        </div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-600/5 blur-[40px] -mr-12 -mt-12 rounded-full" />
      </div>

      <div className="glass-premium p-6 rounded-[2rem] border border-[var(--foreground)]/5 flex flex-col gap-4 group hover:border-purple-500/20 transition-all relative overflow-hidden">
        <div className="flex justify-between items-start relative z-10">
          <div className="w-12 h-12 bg-purple-600/10 rounded-2xl flex items-center justify-center text-purple-500 shadow-xl shadow-purple-600/5 group-hover:scale-110 transition-transform">
            <Clock className="w-6 h-6" />
          </div>
          <span className="text-[9px] font-black text-purple-500 bg-purple-500/10 px-2 py-1 rounded-md">PERF</span>
        </div>
        <div className="relative z-10">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t('avgResponse')}</p>
          <h4 className="text-3xl font-black text-[var(--foreground)] italic mt-1">{String(stats.avgResponseTime).replace(/saat/gi, '').trim()} <span className="text-xs text-zinc-500 lowercase">{t('responseTimeUnit')}</span></h4>
        </div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/5 blur-[40px] -mr-12 -mt-12 rounded-full" />
      </div>

      <div className="glass-premium p-6 rounded-[2rem] border border-[var(--foreground)]/5 space-y-3 relative overflow-hidden group hover:border-amber-500/20 transition-all">
        <div className="flex justify-between items-center relative z-10">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t('spendingLimit')}</p>
          {profileData.approval_limit_usd && profileData.approval_limit_usd > 0 ? (
            <span className="text-[10px] font-black text-amber-500">%{limitPercentage}</span>
          ) : (
            <span className="text-[7px] font-black text-zinc-600 uppercase">{t('noLimit')}</span>
          )}
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden relative z-10">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: profileData.approval_limit_usd && profileData.approval_limit_usd > 0 ? `${limitPercentage}%` : '0%' }}
            className="h-full bg-gradient-to-r from-amber-600 to-amber-400"
          />
        </div>
        <div className="flex justify-between items-center relative z-10">
          <span className="text-[11px] font-black text-[var(--foreground)] italic">{formatCurrency(stats.totalSpent, profileData?.preferred_currency || 'USD')}</span>
          <span className={`text-[9px] font-bold uppercase tracking-tighter ${profileData.approval_limit_usd && profileData.approval_limit_usd > 0 ? 'text-zinc-600' : 'text-amber-500/50'}`}>
            {profileData.approval_limit_usd && profileData.approval_limit_usd > 0 ? `${t('limitSet')}: ${formatCurrency(profileData.approval_limit_usd, profileData?.preferred_currency || 'USD')}` : t('limitNotSet')}
          </span>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/5 blur-[50px] -mr-16 -mt-16 rounded-full group-hover:bg-amber-600/10 transition-all" />
      </div>
    </div>
  )
}
