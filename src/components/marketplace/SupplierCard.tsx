'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, CheckCircle2, ChevronRight, ShieldCheck, Heart, Zap } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { toast } from 'react-hot-toast'
import { Supplier } from '../../types/buyer'

interface SupplierCardProps {
  supplier: Supplier;
  index: number;
  isLoggedIn: boolean;
  searchQuery: string;
  onSelect: (supplier: Supplier) => void;
  isSelected?: boolean;
  isFavorite?: boolean;
  onToggle?: () => void;
  onRegister?: (id: string) => void;
}

export function SupplierCard({ supplier, index, isLoggedIn, searchQuery, onSelect, isSelected, isFavorite, onToggle, onRegister }: SupplierCardProps) {
  const t = useTranslations('marketplace.supplierCard');
  const tc = useTranslations('common');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`group relative bg-[#09090b] border ${isSelected ? 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : 'border-white/5 shadow-xl'} rounded-[2.5rem] overflow-hidden transition-all duration-500 cursor-pointer hover:border-white/10`}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'BUTTON' && !target.closest('button') && onToggle) {
          onToggle();
        }
      }}
    >
      {isSelected && (
        <div className="absolute top-6 right-6 z-20 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-600/30">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      )}

      {/* Quick Action Overlay */}
      {isLoggedIn && !isSelected && (
        <div className="absolute top-6 right-6 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (onRegister) onRegister(supplier.id);
            }}
            className={`p-3 rounded-2xl border transition-all ${isFavorite ? 'bg-rose-500 border-rose-400 text-white shadow-lg shadow-rose-500/20' : 'bg-white/5 border-white/10 text-zinc-500 hover:bg-white/10 hover:text-rose-500'}`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
          </button>
        </div>
      )}

      {/* Blur Overlay for Guests */}
      {!isLoggedIn && (
        <div className="absolute inset-0 z-30 backdrop-blur-[16px] bg-black/50 flex flex-col items-center justify-center p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-white/5 rounded-[2rem] flex items-center justify-center text-zinc-400 border border-white/10 shadow-2xl">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-sm italic">{t('accessRestricted')}</h4>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed max-w-[200px] mx-auto">
              {t('loginToSeeDetails')}
            </p>
          </div>
          <Link 
            href="/login"
            className="px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-blue-600 hover:text-white transition-all w-full flex items-center justify-center gap-3 shadow-2xl active:scale-95"
          >
            {t('loginButton')} <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      <div className="p-8 space-y-8">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
             <div className="flex items-center gap-2">
                <h4 className={`text-2xl font-black text-white italic tracking-tighter uppercase ${!isLoggedIn ? 'blur-md select-none' : ''}`}>
                  {supplier.name || supplier.company_name}
                </h4>
                {isLoggedIn && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />}
             </div>
            <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5 text-zinc-700" /> {supplier.location || 'Global Network'}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md uppercase tracking-widest flex items-center gap-1.5 border border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3" /> {t('verified')}
            </div>
            <div className="mt-2 text-white font-black text-xl italic tracking-tighter">
              {supplier.rating ? `${supplier.rating}%` : '---'} <span className="text-[8px] font-bold text-zinc-600 uppercase not-italic ml-0.5">PERF</span>
            </div>
          </div>
        </div>

        {/* Detailed Trust Scores */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: t('scores.price'), val: supplier.price_score || 0, color: 'text-blue-500', bg: 'bg-blue-500/5' },
            { label: t('scores.speed'), val: supplier.speed_score || 0, color: 'text-purple-500', bg: 'bg-purple-500/5' },
            { label: t('scores.trust'), val: supplier.trust_score || 0, color: 'text-emerald-500', bg: 'bg-emerald-500/5' }
          ].map((s, i) => (
            <div key={i} className={`p-3 ${s.bg} border border-white/5 rounded-[1.5rem] text-center group/score hover:border-white/10 transition-colors`}>
              <div className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-1.5 group-hover/score:text-zinc-400 transition-colors">{s.label}</div>
              <div className={`text-xs font-black ${s.color}`}>{s.val > 0 ? `${s.val}%` : '---'}</div>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">{t('protocolCategory')}</p>
            <p className="text-xs font-black text-white uppercase italic tracking-tight truncate">
              {tc(`categories.${supplier.category}`) || supplier.category || t('generalSupplier')}
            </p>
          </div>
          <button 
            disabled={!isLoggedIn}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(supplier);
            }}
            className="px-8 py-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 active:scale-95 disabled:opacity-30 flex items-center gap-2 shrink-0"
          >
            <Zap className="w-4 h-4 fill-white" /> {t('getQuote')}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
