'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Activity, ArrowUpRight, ChevronDown, ShieldCheck, Star, Zap } from 'lucide-react'
import { SupplierCard } from './SupplierCard'
import { CATEGORIES } from '../../lib/constants'
import { Supplier } from '../../types/buyer'
import { useTranslations } from 'next-intl'

interface MarketplaceViewProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchLocation: string;
  setSearchLocation: (l: string) => void;
  searchCategory: string;
  setSearchCategory: (c: string) => void;
  isSearching: boolean;
  onSearch: (e?: React.FormEvent) => void;
  isLoggedIn: boolean;
  profileCity?: string;
  profileCountry?: string;
  hasSearched: boolean;
  searchResults: Supplier[];
  onSelectSupplier: (s: Supplier) => void;
  selectedSuppliers: Supplier[];
  onToggleSupplier: (s: Supplier) => void;
  onCompare: () => void;
  onRegisterSupplier?: (id: string) => void;
  registeredSuppliers?: Supplier[];
  warehouses?: any[];
  onSelectWarehouse?: (w: any) => void;
}

export function MarketplaceView({
  searchQuery,
  setSearchQuery,
  searchLocation,
  setSearchLocation,
  searchCategory,
  setSearchCategory,
  isSearching,
  onSearch,
  isLoggedIn,
  profileCity,
  profileCountry,
  hasSearched,
  searchResults,
  onSelectSupplier,
  selectedSuppliers,
  onToggleSupplier,
  onCompare,
  onRegisterSupplier,
  warehouses = [],
  onSelectWarehouse,
  registeredSuppliers = []
}: MarketplaceViewProps) {
  const [showAddrDropdown, setShowAddrDropdown] = React.useState(false);
  const [filters, setFilters] = React.useState({
    minTrust: 0,
    minSpeed: 0,
    minRating: 0
  });
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const t = useTranslations('marketplace');
  const tc = useTranslations('common');

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowAddrDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedWarehouse = warehouses.find(w => 
    (w.name || '').toUpperCase() === searchLocation.toUpperCase() ||
    `${(w.country || '').toUpperCase()} / ${(w.city || '').toUpperCase()}` === searchLocation.toUpperCase()
  );

  const filteredResults = searchResults.filter(s => 
    (s.trust_score || 0) >= filters.minTrust &&
    (s.speed_score || 0) >= filters.minSpeed &&
    (s.rating || 0) >= filters.minRating
  );

  return (
    <div className="relative space-y-16 pt-4 pb-12 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      {/* Hero Search */}
      <div className="text-center space-y-8 max-w-5xl mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight select-none">
            {t('heroTitle')} <br />
            <span className="text-zinc-500 font-medium">{t('heroSubtitle')}</span>
          </h1>
          <p className="text-zinc-500 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            {t('heroDescription')}
          </p>
        </motion.div>

        <form onSubmit={onSearch} className="relative group max-w-5xl mx-auto mt-12">
          <div className="absolute inset-0 bg-blue-600/5 blur-[80px] group-focus-within:bg-blue-600/10 transition-all duration-1000" />
          <div className="relative flex flex-col lg:flex-row items-stretch bg-white rounded-[2rem] p-2 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all shadow-2xl border border-white/10">
            
            {/* 1. Query */}
            <div className="flex-[1.5] flex items-center min-w-0 border-b lg:border-b-0 lg:border-r border-zinc-100 group/item">
              <div className="pl-6 text-zinc-400 group-focus-within/item:text-blue-500 transition-colors shrink-0">
                <Search className="w-5 h-5" />
              </div>
              <div className="flex-1 flex flex-col items-start px-4">
                <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest leading-none mb-1.5 ml-0.5">{t('searchPlaceholderLabel')}</span>
                <input 
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  className="w-full bg-transparent pb-3 outline-none text-zinc-900 font-semibold placeholder:text-zinc-300 min-w-0 text-base tracking-tight"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* 2. Category Dropdown */}
            <div className="flex-1 flex items-center min-w-0 border-b lg:border-b-0 lg:border-r border-zinc-100 bg-zinc-50/50 relative group/item">
              <div className="pl-6 text-zinc-400 group-focus-within/item:text-blue-500 transition-colors shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div className="flex-1 flex flex-col items-start px-4 relative">
                <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest leading-none mb-1.5 ml-0.5">{t('categoryLabel')}</span>
                <select 
                  className="w-full bg-transparent pb-3 outline-none text-zinc-600 font-bold text-xs uppercase tracking-widest appearance-none cursor-pointer relative z-10"
                  value={searchCategory}
                  onChange={e => setSearchCategory(e.target.value)}
                >
                  {CATEGORIES.map((c: any) => (
                    <option key={c.id} value={c.id} className="bg-white text-zinc-900">
                      {tc(`categories.${c.id}`) || c.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 bottom-4 text-zinc-400 pointer-events-none">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
            
            {/* 3. Location */}
            <div className="flex-[1.2] flex items-center min-w-0 relative group/item">
              <div className="pl-6 text-zinc-400 group-focus-within/item:text-blue-500 transition-colors shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1 flex flex-col items-start px-4">
                <div className="flex items-center justify-between w-full mb-1.5">
                  <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest leading-none ml-0.5">{t('locationLabel')}</span>
                  {isLoggedIn && (
                    <div className="relative" ref={dropdownRef}>
                      <button 
                        type="button"
                        onClick={() => {
                          if (warehouses.length > 0) {
                            setShowAddrDropdown(!showAddrDropdown);
                          } else {
                            const country = (profileCountry || '').toUpperCase();
                            const city = (profileCity || '').toUpperCase();
                            setSearchLocation(city ? `${country} / ${city}` : country);
                            onSelectWarehouse?.(null);
                          }
                        }}
                        className={`px-2 py-1 ${selectedWarehouse ? 'bg-blue-600 text-white' : 'bg-zinc-900 text-white'} hover:bg-blue-500 hover:text-white rounded-md transition-all text-[8px] font-black uppercase tracking-tight border border-transparent flex items-center gap-1 shadow-sm`}
                      >
                        <span className="max-w-[50px] truncate">{selectedWarehouse ? selectedWarehouse.name.toUpperCase() : 'MY ADDR'}</span>
                        {warehouses.length > 0 && <ChevronDown className={`w-2.5 h-2.5 transition-transform ${showAddrDropdown ? 'rotate-180' : ''}`} />}
                      </button>

                      <AnimatePresence>
                        {showAddrDropdown && warehouses.length > 0 && (
                          <motion.div 
                            initial={{ opacity: 0, y: 5, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.95 }}
                            className="absolute right-0 top-full mt-2 w-64 bg-white border border-zinc-100 rounded-2xl shadow-2xl overflow-hidden z-50 p-2"
                          >
                             <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest px-3 py-2 border-b border-zinc-50 mb-1">{t('warehouses.title')}</p>
                             <div className="max-h-48 overflow-y-auto custom-scrollbar">
                               <button
                                 type="button"
                                 onClick={() => {
                                   const country = (profileCountry || '').toUpperCase();
                                   const city = (profileCity || '').toUpperCase();
                                   setSearchLocation(city ? `${country} / ${city}` : country);
                                   setShowAddrDropdown(false);
                                   onSelectWarehouse?.(null);
                                 }}
                                 className="w-full text-left px-3 py-3 hover:bg-zinc-50 rounded-xl transition-all group"
                               >
                                  <p className="text-[10px] font-bold text-zinc-900 group-hover:text-blue-600 transition-colors uppercase">{t('warehouses.mainCompanyAddress')}</p>
                                  <p className="text-[9px] text-zinc-400 line-clamp-1">{(profileCountry || '').toUpperCase()} / {(profileCity || '').toUpperCase()}</p>
                               </button>
                                {warehouses.map(w => (
                                 <button
                                   key={w.id}
                                   type="button"
                                   onClick={() => {
                                     const city = (w.city || '').toUpperCase();
                                     const country = (w.country || '').toUpperCase();
                                     setSearchLocation(city ? `${country} / ${city}` : country);
                                     setShowAddrDropdown(false);
                                     onSelectWarehouse?.(w);
                                   }}
                                   className="w-full text-left px-3 py-3 hover:bg-zinc-50 rounded-xl transition-all group"
                                 >
                                     <p className="text-[10px] font-bold text-zinc-900 group-hover:text-blue-600 transition-colors uppercase">{w.name}</p>
                                     <p className="text-[9px] text-zinc-400 line-clamp-1">{w.country?.toUpperCase()} / {w.city?.toUpperCase()}</p>
                                 </button>
                               ))}
                             </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
                <div className="relative w-full flex items-center">
                  <input 
                    type="text"
                    placeholder={t('locationPlaceholder')}
                    className="w-full bg-transparent pb-3 outline-none text-zinc-900 font-semibold placeholder:text-zinc-300 min-w-0 text-base tracking-tight"
                    value={searchLocation}
                    onChange={e => setSearchLocation(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSearching}
              className="bg-zinc-900 text-white font-bold uppercase tracking-[0.2em] px-10 py-4 rounded-[1.5rem] hover:bg-blue-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-2 lg:mt-0 active:scale-95 group/btn"
            >
              {isSearching ? <Activity className="w-5 h-5 animate-spin" /> : (
                <>
                  <span className="text-xs">{t('searchButton')}</span>
                  <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* 🚀 Advanced Filters Bar */}
        {hasSearched && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-12"
          >
            {[
              { id: 'minTrust', label: t('filters.minTrust90'), val: 90, icon: ShieldCheck },
              { id: 'minTrust', label: t('filters.minTrust80'), val: 80, icon: ShieldCheck },
              { id: 'minSpeed', label: t('filters.minSpeed80'), val: 80, icon: Zap },
              { id: 'minRating', label: t('filters.minRating90'), val: 90, icon: Star },
            ].map((f, i) => {
              const isActive = (filters as any)[f.id] === f.val;
              const Icon = f.icon;
              return (
                <button
                  key={i}
                  onClick={() => setFilters(prev => ({
                    ...prev,
                    [f.id]: isActive ? 0 : f.val
                  }))}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-500/50' 
                      : 'bg-white/5 text-zinc-500 border border-white/10 hover:bg-white/10 hover:text-zinc-300'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'animate-pulse' : ''}`} />
                  {f.label}
                </button>
              );
            })}
            
            {(filters.minTrust > 0 || filters.minSpeed > 0 || filters.minRating > 0) && (
              <button 
                onClick={() => setFilters({ minTrust: 0, minSpeed: 0, minRating: 0 })}
                className="text-[9px] font-bold text-zinc-600 hover:text-rose-500 transition-colors uppercase tracking-widest ml-2"
              >
                {t('filters.clear')}
              </button>
            )}
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-sm font-medium text-zinc-500">
            {t('registerProductsText').split('?')[0]}?{' '}
            <a 
              href={`${process.env.NEXT_PUBLIC_PROCUREOS_WEB_URL || "https://procure-os.com"}/signup?referred_by=${process.env.NEXT_PUBLIC_PARTNER_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500 hover:text-emerald-400 font-bold transition-colors inline-flex items-center gap-1 border-b border-emerald-500/30 hover:border-emerald-400 pb-0.5"
            >
              {t('registerProductsText').split('?')[1]?.trim() || t('registerProductsText')} <ArrowUpRight className="w-3 h-3" />
            </a>
          </p>
        </motion.div>
      </div>

      {/* Live Ecosystem Pulse */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{t('networkPulse.label')}: <span className="text-white">{t('networkPulse.status')}</span></span>
          </div>
          <div className="flex items-center gap-6 text-right">
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">{t('networkPulse.statusLabel')}</span>
              <span className="text-xs font-black text-emerald-500 uppercase tracking-tighter italic">{t('networkPulse.statusValue')}</span>
            </div>
          </div>
        </div>
      </div>

      {isSearching ? (
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 space-y-8 animate-pulse">
              <div className="flex justify-between">
                <div className="space-y-3">
                  <div className="h-6 w-40 bg-white/5 rounded-lg" />
                  <div className="h-3 w-24 bg-white/5 rounded-lg" />
                </div>
                <div className="h-10 w-20 bg-white/5 rounded-xl" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="h-16 bg-white/5 rounded-2xl" />
                <div className="h-16 bg-white/5 rounded-2xl" />
                <div className="h-16 bg-white/5 rounded-2xl" />
              </div>
              <div className="flex justify-between items-center pt-8 border-t border-white/5">
                <div className="h-10 w-32 bg-white/5 rounded-xl" />
                <div className="h-12 w-40 bg-white/5 rounded-2xl" />
              </div>
            </div>
          ))}
        </div>
      ) : (hasSearched && (
        <div className="space-y-12 max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-8">
            <div>
              <h2 className="text-2xl font-black text-[var(--foreground)] italic tracking-tighter uppercase">{t('differentCompanies', { count: filteredResults.length })}</h2>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">{t('aipVerifiedMatches')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResults.length > 0 ? filteredResults.map((s, i) => (
              <SupplierCard 
                key={s.id}
                supplier={s}
                index={i}
                isLoggedIn={isLoggedIn}
                searchQuery={searchQuery}
                onSelect={onSelectSupplier}
                isSelected={selectedSuppliers.some(sel => sel.id === s.id)}
                isFavorite={registeredSuppliers.some(reg => reg.id === s.id)}
                onToggle={() => onToggleSupplier(s)}
                onRegister={onRegisterSupplier}
              />
            )) : (
              <div className="col-span-full py-20 text-center space-y-4">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-zinc-700">
                  <Search className="w-8 h-8" />
                </div>
                <p className="text-zinc-500 font-medium uppercase tracking-widest text-xs">{t('noResults')}</p>
              </div>
            )}
          </div>

          {/* Floating Action Bar for Multiple Selection */}
          <AnimatePresence>
            {selectedSuppliers.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[var(--surface)]/90 backdrop-blur-xl border border-[var(--outline)]/10 p-4 rounded-2xl shadow-2xl flex items-center gap-6"
              >
                <div className="text-white font-black uppercase text-sm tracking-widest whitespace-nowrap">
                  <span className="text-blue-500">{selectedSuppliers.length}</span> {t('selection.label')}
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={onCompare}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all"
                  >
                    {t('selection.compare')}
                  </button>
                  <button 
                    onClick={() => onSelectSupplier(selectedSuppliers[0])}
                    className="px-6 py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 whitespace-nowrap"
                  >
                    {t('selection.bulkQuote')}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Supplier Network Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 p-10 bg-gradient-to-br from-emerald-600/10 to-transparent border border-emerald-500/20 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500 text-white rounded-lg text-[10px] font-black uppercase tracking-widest">
                {tc('isSeller')}
              </div>
              <h3 className="text-3xl font-black text-[var(--foreground)] italic uppercase tracking-tighter">{t('supplierNetworkTitle')}</h3>
              <p className="text-zinc-500 text-sm max-w-xl font-medium">
                {t('supplierNetworkDescription')}
              </p>
            </div>
            <a 
              href={`${process.env.NEXT_PUBLIC_PROCUREOS_WEB_URL || "https://procure-os.com"}/signup?referred_by=${process.env.NEXT_PUBLIC_PARTNER_ID}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-10 py-5 bg-emerald-500 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-emerald-400 transition-all shadow-2xl shadow-emerald-500/20 flex items-center gap-2 group"
            >
              {t('startSellingNow')}
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      ))}
    </div>
  )
}
