'use client'

import { Building, Users, Trash2, Package, ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { formatDate } from '@/lib/formatters'
import { useTranslations, useLocale } from 'next-intl'

interface RegisteredSuppliersViewProps {
  suppliers: any[];
  total: number;
  page: number;
  onPageChange: (p: number) => void;
  onRefresh?: () => void;
  search?: string;
  onSearchChange?: (s: string) => void;
}

const Pagination = ({ total, page, pageSize, onPageChange }: { total: number, page: number, pageSize: number, onPageChange: (p: number) => void }) => {
  const t = useTranslations('common');
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-8 px-4">
      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
        {t('paginationTotal', { total })} • {t('paginationPage', { page, totalPages })}
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export function RegisteredSuppliersView({ suppliers, total, page, onPageChange, onRefresh, search, onSearchChange }: RegisteredSuppliersViewProps) {
  const t = useTranslations('dashboard.suppliers');
  const locale = useLocale();

  const handleUnregister = async (id: string) => {
    try {
      const { procureos } = await import('../../lib/api');
      await procureos.auth.unregisterSupplier(id);
      toast.success(t('removed'));
      onRefresh?.();
    } catch (err: any) {
      toast.error(err.message || t('error'));
    }
  };

  return (
    <div className="glass-premium p-10 rounded-[3rem] border border-white/5 shadow-2xl space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-8 gap-6">
        <div>
          <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3 text-white italic">
            <Users className="w-6 h-6 text-blue-500" /> {t('title')} ({total})
          </h3>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">{t('subtitle')}</p>
        </div>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text"
            placeholder={t('searchPlaceholder')}
            value={search}
            onChange={(e) => onSearchChange?.(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onPageChange(1)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-[10px] text-white font-bold uppercase tracking-widest focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suppliers.length === 0 ? (
          <div className="col-span-full py-20 text-center border border-dashed border-white/5 rounded-[2rem]">
             <Package className="w-10 h-10 text-zinc-700 mx-auto mb-4" />
             <p className="text-sm font-black text-zinc-500 uppercase tracking-widest italic">{t('emptyState')}</p>
          </div>
        ) : (
          suppliers.map((item: any) => (
            <div key={item.id} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl group hover:bg-white/[0.04] transition-all relative overflow-hidden">
               <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-600/10 text-blue-500 rounded-xl flex items-center justify-center">
                     <Building className="w-6 h-6" />
                  </div>
                  <button 
                    onClick={() => handleUnregister(item.id)}
                    className="p-2 text-zinc-600 hover:text-rose-500 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
               </div>
               <h4 className="text-lg font-black text-white italic tracking-tighter uppercase mb-1">{item.supplier?.company_name}</h4>
               <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest mb-4">{item.supplier?.category || t('generalSupplier')}</p>
               
               <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                  <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">{t('trustedPartner')}</span>
                  <span className="text-[8px] font-bold text-zinc-700 uppercase">{formatDate(item.created_at, locale)}</span>
               </div>
            </div>
          ))
        )}
      </div>

      <Pagination 
        total={total} 
        page={page} 
        pageSize={5} 
        onPageChange={onPageChange} 
      />
    </div>
  );
}
