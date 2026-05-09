'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  Search, 
  Download, 
  ChevronRight,
  ChevronLeft
} from 'lucide-react'
import { RFQ } from '@/types/buyer'
import { formatDate } from '@/lib/formatters'
import { EmptyState } from '../../ui/EmptyState'
import { useTranslations, useLocale } from 'next-intl'

interface RequestsTabProps {
  myRequests: RFQ[];
  requestsTotal: number;
  requestsPage: number;
  fetchRequests: (page: number, search?: string) => void;
  requestsSearch: string;
  setRequestsSearch: (s: string) => void;
  onSelectRequest: (req: RFQ) => void;
  exportData: (type: 'requests') => void;
  setCurrentView: (view: any) => void;
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

export function RequestsTab({
  myRequests,
  requestsTotal,
  requestsPage,
  fetchRequests,
  requestsSearch,
  setRequestsSearch,
  onSelectRequest,
  exportData,
  setCurrentView
}: RequestsTabProps) {
  const t = useTranslations('dashboard.requests');
  const locale = useLocale();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">{t('title')}</h3>
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text"
              placeholder={t('searchPlaceholder')}
              value={requestsSearch}
              onChange={(e) => setRequestsSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchRequests(1, requestsSearch)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-[10px] text-white font-bold uppercase tracking-widest focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
            />
          </div>
          <button 
            onClick={() => exportData('requests')}
            className="px-4 py-3 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5 transition-all flex items-center gap-2 shrink-0"
          >
            <Download className="w-3.5 h-3.5" /> {t('report')}
          </button>
        </div>
      </div>
      {!myRequests || myRequests.length === 0 ? (
        <EmptyState 
          icon={Package}
          title={t('emptyTitle')} 
          description={t('emptyDescription')} 
          actionLabel={t('actionLabel')}
          onAction={() => setCurrentView('marketplace')}
        />
      ) : (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4">
            {myRequests.map((req: RFQ) => (
              <div 
                key={req.id} 
                onClick={() => onSelectRequest(req)}
                className="p-6 bg-white/[0.03] border border-white/5 rounded-[2rem] hover:bg-white/[0.06] transition-all group cursor-pointer flex flex-col gap-4"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                      <Search className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white italic uppercase tracking-tighter">{req.title}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">{req.category}</span>
                        <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">{formatDate(req.created_at, locale)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">{t('offersReceived')}</p>
                      <p className="text-sm font-black text-white">{req.offers?.length || 0} {t('offersUnit')}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                      req.status === 'open' ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20' : 
                      req.status === 'awarded' ? 'bg-emerald-600/10 text-emerald-500 border border-emerald-500/20' :
                      'bg-zinc-600/10 text-zinc-500 border border-zinc-500/20'
                    }`}>
                      {req.status === 'open' ? t('statusOpen') : t('statusCompleted')}
                    </div>
                    <ChevronRight className="w-5 h-5 text-zinc-700 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>

                {req.decision_logs?.[0]?.ai_reasoning && (
                  <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                    <p className="text-[10px] text-blue-400/80 italic leading-relaxed">
                      ✨ <strong className="text-blue-400 font-black uppercase tracking-tighter mr-1">{t('aiAnalysis')}:</strong> {req.decision_logs[0].ai_reasoning}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <Pagination total={requestsTotal} page={requestsPage} pageSize={5} onPageChange={(p: number) => fetchRequests(p, requestsSearch)} />
        </div>
      )}
    </div>
  )
}
