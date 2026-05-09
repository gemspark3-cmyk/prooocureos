'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShieldCheck, MapPin, Globe, Activity, CheckCircle2, Building, Send } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface SupplierComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSuppliers: any[];
  onRemoveSupplier: (id: string) => void;
  onBulkQuote: () => void;
}

export function SupplierComparisonModal({ 
  isOpen, 
  onClose, 
  selectedSuppliers, 
  onRemoveSupplier, 
  onBulkQuote 
}: SupplierComparisonModalProps) {
  const t = useTranslations('marketplace.comparison');
  const tc = useTranslations('common');
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-[#09090b] border border-white/10 rounded-[3rem] w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="p-8 border-b border-white/5 flex items-center justify-between shrink-0">
            <div>
              <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">{t('title')}</h2>
              <p className="text-zinc-500 text-sm font-medium mt-2">
                {t('description', { count: selectedSuppliers.length })}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="w-12 h-12 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Comparison Area */}
          <div className="flex-1 overflow-x-auto overflow-y-auto p-8 custom-scrollbar">
            {selectedSuppliers.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4 py-20">
                <Activity className="w-12 h-12 opacity-50" />
                <p className="font-black uppercase tracking-widest text-sm">{t('noSuppliers')}</p>
              </div>
            ) : (
              <div className="flex gap-6 min-w-max">
                {/* Metrics Sidebar */}
                <div className="w-48 shrink-0 flex flex-col pt-24 space-y-6">
                  <div className="h-16 flex items-center text-[10px] font-black text-zinc-500 uppercase tracking-widest px-4 border-b border-white/5">
                    {t('trustScore')}
                  </div>
                  <div className="h-16 flex items-center text-[10px] font-black text-zinc-500 uppercase tracking-widest px-4 border-b border-white/5">
                    {t('verification')}
                  </div>
                  <div className="h-16 flex items-center text-[10px] font-black text-zinc-500 uppercase tracking-widest px-4 border-b border-white/5">
                    {tc('tabs.categories') || 'Categories'}
                  </div>
                  <div className="h-16 flex items-center text-[10px] font-black text-zinc-500 uppercase tracking-widest px-4 border-b border-white/5">
                    {tc('locationPlaceholder') || 'Location'}
                  </div>
                  <div className="h-16 flex items-center text-[10px] font-black text-zinc-500 uppercase tracking-widest px-4 border-b border-white/5">
                    {t('serviceRegions')}
                  </div>
                </div>

                {/* Supplier Columns */}
                {selectedSuppliers.map((s, idx) => (
                  <div key={s.id} className="w-80 shrink-0 flex flex-col relative group">
                    <button 
                      onClick={() => onRemoveSupplier(s.id)}
                      className="absolute -top-3 -right-3 w-8 h-8 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10"
                      title={t('removeFromList')}
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-6 flex flex-col items-center justify-center h-24 relative overflow-hidden">
                      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Building className="w-6 h-6 text-zinc-600 mb-2" />
                      <h3 className="text-white font-black text-center text-sm uppercase truncate w-full px-2">{s.name}</h3>
                    </div>

                    <div className="space-y-6">
                      <div className="h-16 flex items-center justify-center border-b border-white/5">
                        <div className="text-2xl font-black text-blue-500 italic">%{s.rating}</div>
                      </div>
                      
                      <div className="h-16 flex items-center justify-center border-b border-white/5">
                        {s.verified ? (
                          <div className="flex items-center gap-1.5 text-emerald-500 font-black text-[10px] uppercase tracking-widest bg-emerald-500/10 px-3 py-1.5 rounded-lg">
                            <ShieldCheck className="w-4 h-4" /> {t('verified')}
                          </div>
                        ) : (
                          <span className="text-zinc-600 font-bold text-xs">-</span>
                        )}
                      </div>

                      <div className="h-16 flex items-center justify-center border-b border-white/5 text-white font-bold uppercase text-xs text-center px-4">
                        {tc(`categories.${s.category}`) || s.category}
                      </div>

                      <div className="h-16 flex items-center justify-center border-b border-white/5 text-zinc-400 font-bold uppercase text-xs text-center px-4 gap-1.5">
                        <MapPin className="w-4 h-4 shrink-0" /> <span className="truncate">{s.location}</span>
                      </div>

                      <div className="h-16 flex items-center justify-center border-b border-white/5 text-zinc-400 font-bold uppercase text-[10px] text-center px-4 gap-1.5 tracking-wider">
                        <Globe className="w-4 h-4 shrink-0" />
                        <span className="line-clamp-2">
                          {s.regions?.length > 0 ? s.regions.join(", ") : "Global"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="p-8 border-t border-white/5 bg-black/50 shrink-0 flex justify-end">
            <button 
              onClick={onBulkQuote}
              disabled={selectedSuppliers.length === 0}
              className="px-10 py-4 bg-blue-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
              {t('bulkQuote', { count: selectedSuppliers.length })}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
