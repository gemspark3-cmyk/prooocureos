'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Activity, ArrowUpRight, ChevronDown } from 'lucide-react'
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

  return (
    <div className="space-y-16 pt-4 pb-12">
      {/* Hero Search */}
      <div className="text-center space-y-8 max-w-5xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-[0.9]">
            {t('heroTitle')} <br />
            <span className="text-zinc-800">{t('heroSubtitle')}</span>
          </h1>
          <p className="text-zinc-500 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            {t('heroDescription')}
          </p>
        </motion.div>

        <form onSubmit={onSearch} className="relative group max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-blue-600/20 blur-3xl group-focus-within:bg-blue-600/40 transition-all duration-700" />
          <div className="relative flex flex-col lg:flex-row items-stretch bg-[#09090b] border border-white/10 rounded-[2rem] p-2 focus-within:border-blue-500/50 transition-all shadow-2xl">
            
            {/* 1. Query */}
            <div className="flex-[1.5] flex items-center min-w-0 border-b lg:border-b-0 lg:border-r border-white/5">
              <div className="pl-6 text-zinc-500 shrink-0">
                <Search className="w-5 h-5" />
              </div>
              <input 
                type="text"
                placeholder={t('searchPlaceholder')}
                className="flex-1 bg-transparent py-6 px-4 outline-none text-white font-black placeholder:text-zinc-700 min-w-0 text-sm uppercase tracking-tight"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            {/* 2. Category Dropdown */}
            <div className="flex-1 flex items-center min-w-0 border-b lg:border-b-0 lg:border-r border-white/5 bg-white/[0.02] relative group/cat">
              <div className="pl-6 text-zinc-500 shrink-0">
                <Activity className="w-5 h-5 group-focus-within/cat:text-blue-500 transition-colors" />
              </div>
              <select 
                className="flex-1 bg-transparent py-6 px-4 outline-none text-zinc-400 font-black text-[10px] uppercase tracking-widest appearance-none cursor-pointer relative z-10"
                value={searchCategory}
                onChange={e => setSearchCategory(e.target.value)}
              >
                {CATEGORIES.map((c: any) => (
                  <option key={c.id} value={c.id} className="bg-[#09090b] text-white">
                    {tc(`categories.${c.id}`) || c.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            
            {/* 3. Location */}
            <div className="flex-1 flex items-center min-w-0 relative">
              <div className="pl-6 text-zinc-500 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <input 
                type="text"
                placeholder={t('locationPlaceholder')}
                className="flex-1 bg-transparent py-6 px-4 pr-32 outline-none text-white font-black placeholder:text-zinc-700 min-w-0 text-sm uppercase tracking-tight"
                value={searchLocation}
                onChange={e => setSearchLocation(e.target.value)}
              />
              {isLoggedIn && (
                <div className="absolute right-4" ref={dropdownRef}>
                  <button 
                    type="button"
                    onClick={() => {
                      if (warehouses.length > 0) {
                        setShowAddrDropdown(!showAddrDropdown);
                      } else {
                        const country = (profileCountry || '').toLocaleUpperCase('tr-TR');
                        const city = (profileCity || '').toLocaleUpperCase('tr-TR');
                        setSearchLocation(city ? `${country} / ${city}` : country);
                        onSelectWarehouse?.(null);
                      }
                    }}
                    className={`px-3 py-2 ${selectedWarehouse ? 'bg-blue-600/20 text-blue-500 border-blue-500/30' : 'bg-white/5 text-zinc-500 border-white/5'} hover:bg-blue-600/20 hover:text-blue-500 rounded-xl transition-all text-[8px] font-black uppercase tracking-tighter border flex items-center gap-2`}
                  >
                    {selectedWarehouse ? selectedWarehouse.name.toUpperCase() : 'MY ADDR'} {warehouses.length > 0 && <ChevronDown className={`w-3 h-3 transition-transform ${showAddrDropdown ? 'rotate-180' : ''}`} />}
                  </button>

                  <AnimatePresence>
                    {showAddrDropdown && warehouses.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 w-64 bg-[#09090b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 p-2"
                      >
                         <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest px-3 py-2 border-b border-white/5 mb-1">{t('warehouses.title')}</p>
                         <div className="max-h-48 overflow-y-auto custom-scrollbar">
                           <button
                             type="button"
                             onClick={() => {
                               const country = (profileCountry || '').toLocaleUpperCase('tr-TR');
                               const city = (profileCity || '').toLocaleUpperCase('tr-TR');
                               setSearchLocation(city ? `${country} / ${city}` : country);
                               setShowAddrDropdown(false);
                               onSelectWarehouse?.(null);
                             }}
                             className="w-full text-left px-3 py-3 hover:bg-white/5 rounded-xl transition-all group"
                           >
                              <p className="text-[10px] font-black text-white group-hover:text-blue-500 transition-colors uppercase italic">{t('warehouses.mainCompanyAddress')}</p>
                              <p className="text-[9px] text-zinc-500 line-clamp-1">{(profileCountry || '').toUpperCase()} / {(profileCity || '').toUpperCase()}</p>
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
                               className="w-full text-left px-3 py-3 hover:bg-white/5 rounded-xl transition-all group"
                             >
                                 <p className="text-[10px] font-black text-white group-hover:text-blue-500 transition-colors uppercase italic">{w.name}</p>
                                 <p className="text-[9px] text-zinc-500 line-clamp-1">{w.country?.toUpperCase()} / {w.city?.toUpperCase()}</p>
                             </button>
                           ))}
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            <button 
              type="submit"
              disabled={isSearching}
              className="bg-white text-black font-black uppercase tracking-widest px-10 py-4 rounded-3xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2 lg:mt-0 shadow-lg active:scale-95"
            >
              {isSearching ? <Activity className="w-4 h-4 animate-spin" /> : t('searchButton')}
            </button>
          </div>
        </form>

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

      {hasSearched && (
        <>
          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
            {searchResults.length > 0 ? searchResults.map((s, i) => (
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
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#09090b]/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-6"
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
              <h3 className="text-3xl font-black italic uppercase tracking-tighter">{t('supplierNetworkTitle')}</h3>
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
        </>
      )}
    </div>
  )
}
