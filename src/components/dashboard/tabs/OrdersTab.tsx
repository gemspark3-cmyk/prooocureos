'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Truck, 
  Search, 
  Download, 
  Clock, 
  Package, 
  CheckCircle2, 
  TrendingDown, 
  History, 
  ShieldCheck, 
  MapPin,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Order } from '@/types/buyer'
import { formatCurrency, formatDate } from '@/lib/formatters'
import { ORDER_STATUS_STEPS } from '@/lib/constants'
import { EmptyState } from '../../ui/EmptyState'
import { useTranslations, useLocale } from 'next-intl'

interface OrdersTabProps {
  myOrders: Order[];
  ordersTotal: number;
  ordersPage: number;
  fetchOrders: (page: number, search?: string) => void;
  ordersSearch: string;
  setOrdersSearch: (s: string) => void;
  onRateOrder: (order: Order) => void;
  setSelectedShipmentOrder: (order: Order) => void;
  exportData: (type: 'orders') => void;
  setActiveTab: (tab: any) => void;
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

export function OrdersTab({
  myOrders,
  ordersTotal,
  ordersPage,
  fetchOrders,
  ordersSearch,
  setOrdersSearch,
  onRateOrder,
  setSelectedShipmentOrder,
  exportData,
  setActiveTab
}: OrdersTabProps) {
  const t = useTranslations('dashboard.orders');
  const ts = useTranslations('dashboard.status');
  const locale = useLocale();

  const getRFQTitle = (rfq: any) => {
    if (!rfq) return t('unnamedRequest');
    if (rfq.title) return rfq.title;
    if (rfq.metadata?.title) return rfq.metadata.title;
    return t('requestDetail');
  };

  const renderStepper = (order: Order) => {
    const status = order.status;
    const steps = ORDER_STATUS_STEPS.default;
    const currentIndex = steps.findIndex((s: any) => s.id === status);
    
    return (
      <div className="flex items-center w-full max-w-md gap-0 mt-4 px-2">
        {steps.map((step: any, idx: number) => {
          const isCompleted = idx <= currentIndex;
          const isActive = idx === currentIndex;
          const StepIcon = idx === 0 ? Package : idx === steps.length - 1 ? CheckCircle2 : Truck;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center relative group">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isCompleted ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-white/5 text-zinc-600'
                } ${isActive ? 'ring-4 ring-blue-600/20 scale-110' : ''}`}>
                   <StepIcon className="w-4 h-4" />
                </div>
                <span className={`text-[7px] font-black uppercase tracking-tighter mt-2 absolute -bottom-4 whitespace-nowrap transition-colors ${
                  isCompleted ? 'text-blue-500' : 'text-zinc-600'
                }`}>
                  {ts(step.id)}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className="flex-1 h-[2px] bg-white/5 mx-2 relative top-[-8px]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: isCompleted && idx < currentIndex ? '100%' : '0%' }}
                    className="h-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.5)]"
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h3 className="text-xl font-black text-[var(--foreground)] italic uppercase tracking-tighter">{t('title')}</h3>
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text"
              placeholder={t('searchPlaceholder')}
              value={ordersSearch}
              onChange={(e) => setOrdersSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchOrders(1, ordersSearch)}
              className="w-full bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl py-3 pl-12 pr-4 text-[10px] text-[var(--foreground)] font-bold uppercase tracking-widest focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
            />
          </div>
          <button 
             onClick={() => exportData('orders')}
             className="px-4 py-3 bg-[var(--foreground)]/5 hover:bg-[var(--foreground)]/10 text-zinc-500 hover:text-[var(--foreground)] rounded-xl text-[10px] font-black uppercase tracking-widest border border-[var(--foreground)]/5 transition-all flex items-center gap-2 shrink-0"
          >
            <Download className="w-3.5 h-3.5" /> {t('report')}
          </button>
        </div>
      </div>
      {!myOrders || myOrders.length === 0 ? (
        <EmptyState 
          icon={Truck}
          title={t('emptyTitle')} 
          description={t('emptyDescription')} 
          actionLabel={t('actionLabel')}
          onAction={() => setActiveTab('requests')}
        />
      ) : (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6">
            {myOrders.map((order: Order) => (
              <div 
                key={order.id} 
                className="p-8 bg-[var(--foreground)]/[0.02] border border-[var(--foreground)]/5 rounded-[3rem] hover:bg-[var(--foreground)]/[0.04] transition-all group relative overflow-hidden"
              >
                <div className="flex flex-col xl:flex-row justify-between gap-10">
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-[var(--foreground)]/5 rounded-2xl flex items-center justify-center border border-[var(--foreground)]/10 font-black text-zinc-500 text-xl group-hover:text-blue-500 transition-colors overflow-hidden">
                          {order.supplier?.logo_url ? (
                            <img src={order.supplier.logo_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            order.supplier?.company_name?.[0] || 'O'
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                             <span className="text-[9px] font-black text-blue-500/60 uppercase tracking-widest">{getRFQTitle(order.rfq)}</span>
                          </div>
                          <h4 className="text-2xl font-black text-[var(--foreground)] italic uppercase tracking-tighter">{order.supplier?.company_name || t('supplier')}</h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-2">
                              <Clock className="w-3 h-3" /> {formatDate(order.created_at, locale)}
                            </span>
                            <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                            <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">PO#{order.id.slice(0,8).toUpperCase()}</span>
                            <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{(order.warehouse?.country || 'TR').toUpperCase()} / {(order.warehouse?.city || 'ISTANBUL').toUpperCase()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">{t('totalAmount')}</p>
                        <p className="text-2xl font-black text-[var(--foreground)] italic">{formatCurrency(order.total_amount || 0, order.currency || 'USD', locale)}</p>
                      </div>
                    </div>

                     <div className="flex flex-col md:flex-row gap-6">
                       <div className="flex-1 bg-white/[0.02] border border-white/5 p-6 rounded-[2rem]">
                         <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-6">{t('currentStatus')}</p>
                         {renderStepper(order)}
                       </div>

                        {(order.offer?.metadata?.negotiation_history || order.offer?.metadata?.original_price) ? (
                         <div className="w-full md:w-80 bg-blue-600/5 border border-blue-500/20 p-6 rounded-[2rem] relative overflow-hidden group/neg">
                           <div className="absolute top-0 right-0 p-4 opacity-10">
                              <TrendingDown className="w-12 h-12 text-blue-500" />
                           </div>
                           <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                             <History className="w-3 h-3" /> {t('negotiationHistory')}
                           </p>
                           <div className="space-y-3">
                              {order.offer.metadata.original_price && (
                                <div className="flex justify-between items-center">
                                  <span className="text-[10px] text-zinc-500 font-bold uppercase">{t('initialOffer')}:</span>
                                  <span className="text-[10px] text-zinc-400 font-black line-through">{formatCurrency(order.offer.metadata.original_price, order.currency, locale)}</span>
                                </div>
                              )}
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] text-zinc-500 font-bold uppercase">{t('agreedPrice')}:</span>
                                <span className="text-xs text-blue-400 font-black">{formatCurrency(order.total_amount, order.currency, locale)}</span>
                              </div>
                              {order.offer.metadata.original_price && (
                                <div className="pt-2 border-t border-blue-500/10 mt-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-[10px] text-emerald-500 font-black uppercase tracking-tighter italic">{t('netGain')}:</span>
                                    <span className="text-[10px] text-emerald-400 font-black">
                                      {formatCurrency(Number(order.offer.metadata.original_price) - Number(order.total_amount), order.currency, locale)}
                                    </span>
                                  </div>
                                </div>
                              )}
                           </div>
                         </div>
                       ) : (
                         <div className="w-full md:w-80 bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] flex flex-col items-center justify-center text-center group/none">
                            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center mb-3 group-hover/none:scale-110 transition-transform">
                              <ShieldCheck className="w-5 h-5 text-zinc-700" />
                            </div>
                            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest leading-relaxed">
                              {t('processCompleted')}<br/>
                              <span className="text-zinc-500">{t('initialPriceOrder')}</span>
                            </p>
                         </div>
                       )}
                     </div>
                  </div>

                  <div className="xl:w-72 flex flex-col justify-between gap-4 border-t xl:border-t-0 xl:border-l border-white/5 pt-8 xl:pt-0 xl:pl-8">
                    <div className="space-y-4">
                      <button 
                        onClick={() => setSelectedShipmentOrder(order)}
                        className="w-full py-4 bg-[var(--foreground)]/5 hover:bg-[var(--foreground)]/10 text-[var(--foreground)] rounded-2xl text-[10px] font-black uppercase tracking-widest border border-[var(--foreground)]/10 transition-all flex items-center justify-center gap-3"
                      >
                        <Truck className="w-4 h-4" /> {t('shipmentDetail')}
                      </button>
                      <button 
                        onClick={() => onRateOrder(order)}
                        disabled={order.status !== 'delivered'}
                        className="w-full py-4 bg-emerald-600/10 hover:bg-emerald-600 text-emerald-500 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 transition-all flex items-center justify-center gap-3 disabled:opacity-20 disabled:cursor-not-allowed"
                      >
                        <ShieldCheck className="w-4 h-4" /> {t('rateExperience')}
                      </button>
                    </div>
                    
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                       <div className="flex items-center gap-3 mb-2">
                          <MapPin className="w-3.5 h-3.5 text-zinc-600" />
                          <span className="text-[9px] font-black text-zinc-500 uppercase">{t('deliveryAddress')}</span>
                       </div>
                       <p className="text-[10px] text-zinc-400 font-medium leading-relaxed italic line-clamp-2">
                         {order.delivery_address || t('registeredAddress')}
                       </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination total={ordersTotal} page={ordersPage} pageSize={5} onPageChange={(p: number) => fetchOrders(p, ordersSearch)} />
        </div>
      )}
    </div>
  )
}
