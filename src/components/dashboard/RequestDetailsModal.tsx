'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search, Clock, ShieldCheck, MapPin, FileText, LayoutList, Columns, Zap, CheckCircle2, UserPlus } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { OfferDocument } from './OfferDocument'
import { ComparisonTable } from './ComparisonTable'
import { formatDate, formatCurrency } from '@/lib/formatters'

interface RequestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: any;
  buyerData: any;
  loading: boolean;
  onAcceptOffer: (rfqId: string, offerId: string) => void;
  onRejectOffer: (rfqId: string, offerId: string) => void;
  onCounterOffer: (rfqId: string, offerId: string, data: any) => void;
  onRegisterSupplier?: (companyId: string) => void;
}

export function RequestDetailsModal({
  isOpen,
  onClose,
  request,
  buyerData,
  loading,
  onAcceptOffer,
  onRejectOffer,
  onCounterOffer,
  onRegisterSupplier
}: RequestDetailsModalProps) {
  const t = useTranslations('dashboard.requestDetails');
  const locale = useLocale();
  const [viewingOffer, setViewingOffer] = React.useState<any>(null);
  const [viewMode, setViewMode] = React.useState<'list' | 'compare' | 'logs'>('list');
  const [negotiatingOffer, setNegotiatingOffer] = React.useState<any>(null);
  const [counterData, setCounterData] = React.useState({ price: '', days: '', note: '' });

  if (!request) return null;

  const generateTimeline = (req: any) => {
    if (!req) return [];
    const logs: any[] = [];

    // 1. RFQ Created
    logs.push({
      action: t('timeline.created'),
      date: formatDate(req.created_at, locale),
      timestamp: new Date(req.created_at).getTime(),
      icon: <FileText className="w-4 h-4 text-zinc-400" />
    });

    // 2. Offers / Negotiations
    if (req.offers && req.offers.length > 0) {
      req.offers.forEach((offer: any) => {
        // Offer received
        logs.push({
          action: t('timeline.offerReceived', { supplier: offer.company?.company_name || t('timeline.unknownSupplier'), price: formatCurrency(offer.price, offer.currency || 'USD', locale) }),
          date: formatDate(offer.created_at || req.created_at, locale),
          timestamp: new Date(offer.created_at || req.created_at).getTime() + 1000,
          icon: <Zap className="w-4 h-4 text-blue-500" />
        });

        // Status updates
        if (offer.status === 'accepted') {
          logs.push({
            action: t('timeline.offerAccepted', { supplier: offer.company?.company_name || t('timeline.supplier') }),
            date: formatDate(offer.updated_at || new Date().toISOString(), locale),
            timestamp: new Date(offer.updated_at || new Date().toISOString()).getTime() + 2000,
            icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          });
        } else if (offer.status === 'rejected') {
          logs.push({
            action: t('timeline.offerRejected', { supplier: offer.company?.company_name || t('timeline.supplier') }),
            date: formatDate(offer.updated_at || new Date().toISOString(), locale),
            timestamp: new Date(offer.updated_at || new Date().toISOString()).getTime() + 2000,
            icon: <X className="w-4 h-4 text-rose-500" />
          });
        } else if (offer.approval_status === 'pending_approval') {
          logs.push({
            action: t('timeline.pendingApproval', { supplier: offer.company?.company_name || t('timeline.supplier') }),
            date: formatDate(offer.updated_at || new Date().toISOString(), locale),
            timestamp: new Date(offer.updated_at || new Date().toISOString()).getTime() + 2000,
            icon: <Clock className="w-4 h-4 text-amber-500" />
          });
        }
      });
    }

    return logs.sort((a, b) => b.timestamp - a.timestamp); // newest first
  };

  const renderSpecifications = () => {
    if (typeof request.specifications === 'string') {
      if (request.specifications.startsWith('{')) {
        try {
          const s = JSON.parse(request.specifications);
          return (
            <div className="space-y-2">
              <p className="font-bold text-white text-base">{s.item || s.description || t('details.itemDetail')}</p>
              {s.quantity && <p className="text-zinc-500">{t('details.quantity')}: <span className="text-white">{s.quantity}</span></p>}
              {s.note && <p className="text-zinc-400 italic">"{s.note}"</p>}
            </div>
          );
        } catch {
          return <p className="text-zinc-300">{request.specifications}</p>;
        }
      }
      return <p className="text-zinc-300">{request.specifications}</p>;
    }
    return <p className="text-zinc-300">{t('details.noDetail')}</p>;
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="w-full max-w-6xl bg-[#09090b] border border-white/10 p-6 md:p-10 rounded-[2rem] md:rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[95vh] md:max-h-[92vh]"
            >
              {/* Premium Glow Effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4 border-b border-white/5 pb-6 md:pb-8">
                <div>
                  <h2 className="text-2xl md:text-4xl font-black text-white italic uppercase tracking-tighter">{request.title}</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[9px] md:text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em]">
                      {request.category}
                    </span>
                    <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                    <span className="text-[9px] md:text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em]">
                      {formatDate(request.created_at, locale)}
                    </span>
                    <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                      request.status === 'open' ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20' : 
                      request.status === 'awarded' ? 'bg-emerald-600/10 text-emerald-500 border border-emerald-500/20' : 
                      'bg-zinc-600/10 text-zinc-500 border border-zinc-500/20'
                    }`}>
                      {request.status === 'open' ? t('status.open') : t('status.completed')}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="bg-white/5 p-1 rounded-2xl border border-white/10 flex flex-1 md:flex-none">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2 ${viewMode === 'list' ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-zinc-500 hover:text-white'}`}
                    >
                      <LayoutList className="w-4 h-4" /> {t('tabs.list')}
                    </button>
                    <button
                      onClick={() => setViewMode('compare')}
                      className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2 ${viewMode === 'compare' ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-zinc-500 hover:text-white'}`}
                    >
                      <Columns className="w-4 h-4" /> {t('tabs.compare')}
                    </button>
                    <button
                      onClick={() => setViewMode('logs')}
                      className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2 ${viewMode === 'logs' ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-zinc-500 hover:text-white'}`}
                    >
                      <Clock className="w-4 h-4" /> {t('tabs.audit')}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5"
                  >
                    <X className="w-5 h-5 text-zinc-500" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 md:pr-6 custom-scrollbar space-y-10 md:space-y-14">
                {/* Request Context Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                  <div className="lg:col-span-2 p-6 md:p-8 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
                    <p className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">{t('details.title')}</p>
                    <div className="text-zinc-400 text-sm md:text-base leading-relaxed">
                      {renderSpecifications()}
                    </div>

                    {request.decision_logs?.[0]?.ai_reasoning && (
                      <div className="mt-6 p-5 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                        <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                          <Zap className="w-3.5 h-3.5 fill-blue-400" /> {t('aiAnalysis')}
                        </p>
                        <p className="text-sm text-blue-300/80 italic leading-relaxed">
                          {request.decision_logs[0].ai_reasoning}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 md:p-8 bg-white/[0.03] border border-white/5 rounded-3xl flex flex-col justify-between gap-6">
                    <p className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">{t('details.quickInfo')}</p>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <span className="text-[8px] md:text-[9px] font-black text-zinc-600 uppercase block mb-1">{t('details.quantity')}</span>
                        <span className="text-sm font-black text-white">{request.quantity || '—'}</span>
                      </div>
                      <div>
                        <span className="text-[8px] md:text-[9px] font-black text-zinc-600 uppercase block mb-1">{t('details.paymentTerm')}</span>
                        <span className="text-sm font-black text-white">
                          {request.payment_term === 'cash' ? useTranslations('sourcing.steps.form.paymentTerms')('cash') : 
                           request.payment_term === '30days' ? useTranslations('sourcing.steps.form.paymentTerms')('30days') : 
                           request.payment_term === '60days' ? useTranslations('sourcing.steps.form.paymentTerms')('60days') : 
                           (request.payment_term || '—')}
                        </span>
                      </div>
                      <div>
                        <span className="text-[8px] md:text-[9px] font-black text-zinc-600 uppercase block mb-1">{t('details.currency')}</span>
                        <span className="text-sm font-black text-white">{request.preferred_currency || 'USD'}</span>
                      </div>
                      <div>
                        <span className="text-[8px] md:text-[9px] font-black text-zinc-600 uppercase block mb-1">{t('details.targetPrice')}</span>
                        <span className="text-sm font-black text-emerald-500">{request.target_price_total ? formatCurrency(request.target_price_total, request.preferred_currency, locale) : t('details.openOffer')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Offers Section */}
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <h3 className="text-xl md:text-2xl font-black text-white italic uppercase tracking-tighter">{t('offers.title')}</h3>
                      <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black text-zinc-400 border border-white/5">
                        {request.offers?.length || 0} {t('offers.countSuffix')}
                      </span>
                    </div>
                    {request.status === 'open' && request.offers?.length > 1 && (
                      <button
                        onClick={() => {
                          setNegotiatingOffer({ id: 'batch' });
                          setCounterData({ price: '', days: '', note: t('offers.batchNoteDefault') });
                        }}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 flex items-center gap-2"
                      >
                        <Zap className="w-4 h-4 fill-white" /> {t('offers.batchNegotiation')}
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    {!request.offers || request.offers.length === 0 ? (
                      <div className="py-24 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                           <Search className="w-8 h-8 text-zinc-700" />
                        </div>
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] max-w-xs mx-auto">
                          {t('offers.noOffers')}
                        </p>
                      </div>
                    ) : viewMode === 'logs' ? (
                      <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[3rem] space-y-8">
                        <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                          <ShieldCheck className="w-6 h-6 text-blue-500" />
                          <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">{t('audit.title')}</h3>
                        </div>
                        <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
                          {generateTimeline(request).map((log, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="relative pl-12">
                              <div className="absolute left-[11px] top-1.5 w-2 h-2 bg-blue-600 rounded-full ring-4 ring-[#09090b]" />
                              <div className="flex flex-col gap-1">
                                <p className="text-sm text-zinc-300 font-medium leading-snug">{log.action}</p>
                                <div className="flex items-center gap-3">
                                  <span className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">{log.date}</span>
                                  <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                                  <div className="flex items-center gap-1.5">
                                    {log.icon}
                                    <span className="text-[8px] text-zinc-700 font-black uppercase tracking-tighter">{t('audit.verified')}</span>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ) : viewMode === 'compare' ? (
                      <ComparisonTable
                        offers={request.offers}
                        onAccept={(offerId) => onAcceptOffer(request.id, offerId)}
                        requestStatus={request.status}
                        targetPrice={request.target_price_total}
                      />
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        {request.offers.map((offer: any, i: number) => (
                          <motion.div 
                            key={offer.id} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`p-6 md:p-8 bg-white/[0.03] border border-white/5 rounded-[2rem] md:rounded-[3rem] group hover:bg-white/[0.06] transition-all relative overflow-hidden flex flex-col xl:flex-row xl:items-center gap-8 ${offer.status === 'accepted' ? 'border-emerald-500/30 bg-emerald-500/[0.02]' : ''}`}
                          >
                            {i === 0 && (
                              <div className="absolute top-0 left-0 bg-blue-600 text-white px-4 py-1.5 text-[8px] font-black uppercase tracking-widest rounded-br-2xl shadow-lg">{t('offers.bestMatch')}</div>
                            )}

                            {/* Left: Supplier Info */}
                            <div className="flex items-center gap-6 xl:w-1/3">
                              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-2xl md:rounded-[2rem] flex items-center justify-center font-black text-2xl text-zinc-800 group-hover:text-blue-500 transition-colors border border-white/5 shrink-0 overflow-hidden relative">
                                {offer.company?.logo_url ? (
                                  <img src={offer.company.logo_url} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  offer.company?.company_name?.[0] || 'T'
                                )}
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-black text-white italic uppercase tracking-tighter truncate">
                                  {offer.company?.company_name || `${t('offers.supplierFallback')} #${offer.id.slice(0, 4)}`}
                                </h4>
                                <div className="flex flex-wrap items-center gap-3 mt-1.5">
                                  <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
                                    <MapPin className="w-3 h-3 text-zinc-700" /> {offer.company?.location || t('details.locationFallback')}
                                  </p>
                                  <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                                  <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
                                    <ShieldCheck className="w-3 h-3" /> %{offer.company?.reliability_score || 0} {t('offers.trust')}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Center: Quote Details */}
                            <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-8 border-t xl:border-t-0 xl:border-l border-white/5 pt-8 xl:pt-0 xl:pl-8">
                              <div>
                                <p className="text-[8px] md:text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1.5">{t('offers.amount')}</p>
                                <p className="text-2xl md:text-3xl font-black text-white italic tracking-tighter">
                                  {formatCurrency(offer.price, offer.currency || 'USD', locale)}
                                </p>
                                <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-tighter mt-1">{t('offers.unitPrice')}</p>
                              </div>
                              <div>
                                <p className="text-[8px] md:text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1.5">{t('offers.deliveryTime')}</p>
                                <p className="text-sm md:text-base font-black text-white uppercase">{offer.delivery_days} {t('offers.workingDays')}</p>
                                <p className="text-[8px] text-emerald-500 font-bold uppercase tracking-tighter mt-1">{t('offers.expressDelivery')}</p>
                              </div>
                              <div className="hidden lg:block">
                                <p className="text-[8px] md:text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1.5">{t('offers.statusHeader')}</p>
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                  offer.status === 'accepted' ? 'bg-emerald-600/20 text-emerald-500' :
                                  offer.status === 'rejected' ? 'bg-rose-600/20 text-rose-500' :
                                  offer.negotiation_status === 'countered' ? 'bg-amber-600/20 text-amber-500' :
                                  'bg-blue-600/10 text-blue-500'
                                }`}>
                                  {offer.status === 'accepted' ? t('offers.selected') :
                                   offer.status === 'rejected' ? t('offers.rejected') :
                                   offer.negotiation_status === 'countered' ? t('offers.inNegotiation') :
                                   t('offers.activeOffer')}
                                </span>
                              </div>
                            </div>

                            {/* Right: Actions */}
                            <div className="flex flex-wrap items-center gap-3 xl:w-auto shrink-0 border-t xl:border-t-0 pt-8 xl:pt-0">
                              {request.status === 'open' && (
                                <>
                                  {onRegisterSupplier && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onRegisterSupplier(offer.company_id);
                                      }}
                                      className="p-3.5 bg-white/5 text-zinc-400 rounded-2xl hover:bg-blue-600/10 hover:text-blue-500 transition-all border border-white/5"
                                      title={t('offers.saveSupplier')}
                                    >
                                      <UserPlus className="w-4 h-4" />
                                    </button>
                                  )}
                                  
                                  <button
                                    onClick={() => {
                                      setNegotiatingOffer(offer);
                                      setCounterData({ price: offer.price.toString(), days: offer.delivery_days.toString(), note: '' });
                                    }}
                                    disabled={loading || offer.status === 'rejected' || offer.status === 'accepted'}
                                    className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest text-[9px] rounded-2xl border border-white/10 transition-all flex items-center gap-2 disabled:opacity-30"
                                  >
                                    <Zap className="w-3.5 h-3.5" /> {t('offers.negotiation')}
                                  </button>
                                </>
                              )}

                              <button
                                onClick={() => setViewingOffer(offer)}
                                className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest text-[9px] rounded-2xl border border-white/10 transition-all flex items-center gap-2"
                              >
                                <FileText className="w-4 h-4" /> {t('offers.details')}
                              </button>

                              {request.status === 'open' && offer.status !== 'rejected' && (
                                <button
                                  onClick={() => onAcceptOffer(request.id, offer.id)}
                                  disabled={loading || offer.approval_status === 'pending_approval' || offer.status === 'accepted'}
                                  className={`px-8 py-3.5 font-black uppercase tracking-widest text-[9px] rounded-2xl transition-all shadow-xl disabled:opacity-50 ${
                                    offer.approval_status === 'pending_approval' ? 'bg-amber-500 text-black shadow-amber-500/20' :
                                    offer.status === 'accepted' ? 'bg-emerald-500 text-black' :
                                    'bg-white text-black hover:bg-blue-600 hover:text-white shadow-blue-600/5'
                                  }`}
                                >
                                  {offer.status === 'accepted' ? t('offers.selected') :
                                   offer.approval_status === 'pending_approval' ? t('offers.pendingApproval') :
                                   (buyerData?.approval_limit_usd && offer.price >= buyerData.approval_limit_usd ? t('offers.sendToApproval') : t('offers.accept'))}
                                </button>
                              )}

                              {request.status === 'open' && offer.status !== 'rejected' && offer.status !== 'accepted' && (
                                <button
                                  onClick={() => onRejectOffer(request.id, offer.id)}
                                  className="p-3.5 bg-rose-600/10 text-rose-500 rounded-2xl hover:bg-rose-600 hover:text-white transition-all border border-rose-500/10"
                                  title={t('offers.reject')}
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {negotiatingOffer && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="w-full max-w-lg bg-[#0c0c0e] border border-white/10 p-8 md:p-10 rounded-[3rem] shadow-3xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />
              
              <h3 className="text-2xl md:text-3xl font-black text-white italic uppercase mb-2 tracking-tighter">
                {negotiatingOffer.id === 'batch' ? t('negotiationModal.batchTitle') : t('negotiationModal.singleTitle')}
              </h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mb-8 leading-relaxed">
                {negotiatingOffer.id === 'batch'
                  ? t('negotiationModal.batchDesc', { count: request.offers?.length || 0 })
                  : t('negotiationModal.singleDesc', { supplier: negotiatingOffer.company?.company_name })}
              </p>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">{t('negotiationModal.targetPrice')}</label>
                    <div className="relative">
                       <input
                        type="number"
                        value={counterData.price}
                        onChange={(e) => setCounterData({ ...counterData, price: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white font-black italic focus:border-blue-500 transition-all outline-none pl-10"
                        placeholder="0.00"
                      />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 font-black text-xs">$</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">{t('negotiationModal.targetDays')}</label>
                    <input
                      type="number"
                      value={counterData.days}
                      onChange={(e) => setCounterData({ ...counterData, days: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white font-black focus:border-blue-500 transition-all outline-none"
                      placeholder={t('negotiationModal.daysPlaceholder')}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">{t('negotiationModal.noteLabel')}</label>
                  <textarea
                    value={counterData.note}
                    onChange={(e) => setCounterData({ ...counterData, note: e.target.value })}
                    placeholder={t('negotiationModal.notePlaceholder')}
                    className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white text-xs min-h-[120px] focus:border-blue-500 transition-all outline-none resize-none leading-relaxed"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setNegotiatingOffer(null)}
                    className="flex-1 py-4 bg-white/5 text-zinc-500 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:text-white transition-all border border-white/5"
                  >
                    {t('negotiationModal.cancel')}
                  </button>
                  <button
                    onClick={() => {
                      onCounterOffer(request.id, negotiatingOffer.id, counterData);
                      setNegotiatingOffer(null);
                    }}
                    className={`flex-[2] py-4 font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all ${negotiatingOffer.id === 'batch' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'bg-white text-black hover:bg-blue-600 hover:text-white'
                      }`}
                  >
                    {negotiatingOffer.id === 'batch' ? t('negotiationModal.sendBatch') : t('negotiationModal.sendSingle')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {viewingOffer && (
          <OfferDocument
            offer={viewingOffer}
            request={{ ...request, buyer: buyerData }}
            onClose={() => setViewingOffer(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
