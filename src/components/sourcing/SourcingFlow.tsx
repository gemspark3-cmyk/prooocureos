'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Package, 
  ArrowRight, 
  Building, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2,
  Globe,
  Truck
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useTranslations } from 'next-intl'

interface SourcingFlowProps {
  step: number;
  setStep: (s: number) => void;
  loading: boolean;
  selectedSupplier: any;
  request: any;
  setRequest: (r: any) => void;
  matches: any[];
  profileData: any;
  warehouses?: any[];
  handleSourcingSearch: () => void;
  handleSendRFQ: () => void;
  setCurrentView: (v: any) => void;
  fetchDashboardData: () => void;
}

export function SourcingFlow({
  step,
  setStep,
  loading,
  selectedSupplier,
  request,
  setRequest,
  matches,
  profileData,
  warehouses = [],
  handleSourcingSearch,
  handleSendRFQ,
  setCurrentView,
  fetchDashboardData
}: SourcingFlowProps) {
  const t = useTranslations('sourcing')
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showWarehouseSelector, setShowWarehouseSelector] = useState(false);

  useEffect(() => {
    if (profileData?.preferred_currency) {
      setRequest((prev: any) => ({ ...prev, preferred_currency: profileData.preferred_currency }));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (matches && matches.length > 0) {
      setSelectedIds(matches.map(m => m.id));
    }
  }, [matches]);

  const handleConfirmWithSelection = () => {
    if (selectedIds.length === 0) {
      toast.error(t('errors.selectSupplier'));
      return;
    }
    handleSendRFQ();
  };

  const selectedWarehouse = warehouses.find(w => w.id === request.warehouse_id);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-4 mb-16">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border transition-all ${step >= s ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white/5 border-white/10 text-zinc-600'}`}>
              {s}
            </div>
            {s < 3 && <div className={`w-12 h-[1px] ${step > s ? 'bg-blue-600' : 'bg-white/10'}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9] uppercase italic">
                {selectedSupplier ? (
                  <>
                    <span className="text-blue-500">{selectedSupplier.company_name || selectedSupplier.name}</span> <br />
                    <span className="text-white">{t('steps.form.title')}</span>
                  </>
                ) : (
                  <>
                    {t('steps.form.subtitle').split('?')[0]}? <br />
                    <span className="text-zinc-800">{t('steps.form.subtitle').split('?')[1]}</span>
                  </>
                )}
              </h1>
              <p className="text-zinc-500 text-lg font-medium max-w-xl mx-auto">
                {selectedSupplier 
                  ? t('steps.form.descriptionSingle')
                  : t('steps.form.descriptionMulti')
                }
              </p>
            </div>

            <div className="glass-premium p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Package className="w-32 h-32" />
              </div>
              
              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('steps.form.labels.title')}</label>
                  <textarea 
                    placeholder={t('steps.form.placeholders.title')}
                    maxLength={200}
                    className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 px-8 text-xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[150px] resize-none"
                    value={request.title}
                    onChange={e => setRequest({...request, title: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('steps.form.labels.note')}</label>
                    <textarea 
                      placeholder={t('steps.form.placeholders.note')}
                      maxLength={2000}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[100px] resize-none italic"
                      value={request.buyer_note || ''}
                      onChange={e => setRequest({...request, buyer_note: e.target.value})}
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Teslimat Adresi</label>
                    <div className="relative">
                      <button 
                        type="button"
                        onClick={() => setShowWarehouseSelector(!showWarehouseSelector)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-left flex items-center justify-between group/addr"
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <div>
                            <p className="text-white font-bold">{selectedWarehouse ? selectedWarehouse.name : t('address.mainCompany')}</p>
                            <p className="text-[10px] text-zinc-500 line-clamp-1">
                              {selectedWarehouse ? `${selectedWarehouse.country?.toUpperCase()} / ${selectedWarehouse.city?.toUpperCase()}` : `${profileData.country?.toUpperCase()} / ${profileData.city?.toUpperCase()}`}
                            </p>
                          </div>
                        </div>
                        <div className="text-[8px] font-black text-blue-500 uppercase tracking-widest bg-blue-500/10 px-2 py-1 rounded-md group-hover/addr:bg-blue-500/20 transition-colors">{t('address.change')}</div>
                      </button>

                      <AnimatePresence>
                        {showWarehouseSelector && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute inset-x-0 top-full mt-2 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl z-20 p-2 overflow-hidden"
                          >
                            <div className="max-h-48 overflow-y-auto custom-scrollbar">
                              <button
                                type="button"
                                onClick={() => {
                                  setRequest({...request, addressType: 'profile', warehouse_id: '', newAddress: ''});
                                  setShowWarehouseSelector(false);
                                }}
                                className="w-full text-left px-4 py-3 hover:bg-white/5 rounded-xl transition-all"
                              >
                                <p className="text-xs font-black text-white uppercase italic">{t('address.mainCompany')}</p>
                                <p className="text-[10px] text-zinc-500">{profileData.address_full}</p>
                              </button>
                              {warehouses.map(w => (
                                <button
                                  key={w.id}
                                  type="button"
                                  onClick={() => {
                                    setRequest({
                                      ...request, 
                                      addressType: 'warehouse', 
                                      warehouse_id: w.id, 
                                      newAddress: `${w.address_full} - ${w.city} / ${w.country}`
                                    });
                                    setShowWarehouseSelector(false);
                                  }}
                                  className="w-full text-left px-4 py-3 hover:bg-white/5 rounded-xl transition-all"
                                >
                                  <p className="text-xs font-black text-white uppercase italic">{w.name}</p>
                                  <p className="text-[10px] text-zinc-500">{w.address_full}</p>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {request.addressType === 'manual' && (
                      <textarea 
                        placeholder="Alternatif Teslimat Adresi..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500 mt-2 min-h-[80px] resize-none"
                        value={request.newAddress}
                        onChange={e => setRequest({...request, newAddress: e.target.value})}
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('steps.form.labels.quantity')}</label>
                    <input 
                      type="text"
                      placeholder={t('steps.form.placeholders.quantity')}
                      maxLength={50}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
                      value={request.quantity}
                      onChange={e => setRequest({...request, quantity: e.target.value})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Para Birimi</label>
                    <div className="flex gap-2">
                      <select 
                        className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-zinc-400 outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                        value={['USD', 'EUR', 'TRY', 'GBP', 'CNY', 'JPY', 'CAD', 'AUD', 'CHF', 'INR', 'SGD'].includes(request.preferred_currency) ? request.preferred_currency : 'OTHER'}
                        onChange={e => {
                          if (e.target.value === 'OTHER') {
                            setRequest({...request, preferred_currency: ''});
                          } else {
                            setRequest({...request, preferred_currency: e.target.value});
                          }
                        }}
                      >
                        <option value="USD" className="bg-zinc-900 text-white">USD ($)</option>
                        <option value="EUR" className="bg-zinc-900 text-white">EUR (€)</option>
                        <option value="TRY" className="bg-zinc-900 text-white">TRY (₺)</option>
                        <option value="GBP" className="bg-zinc-900 text-white">GBP (£)</option>
                        <option value="CNY" className="bg-zinc-900 text-white">CNY (¥)</option>
                        <option value="JPY" className="bg-zinc-900 text-white">JPY (¥)</option>
                        <option value="CAD" className="bg-zinc-900 text-white">CAD ($)</option>
                        <option value="AUD" className="bg-zinc-900 text-white">AUD ($)</option>
                        <option value="CHF" className="bg-zinc-900 text-white">CHF (Fr)</option>
                        <option value="INR" className="bg-zinc-900 text-white">INR (₹)</option>
                        <option value="SGD" className="bg-zinc-900 text-white">SGD ($)</option>
                        <option value="OTHER" className="bg-zinc-900 text-white">{t('common.other') || 'Other'}</option>
                      </select>
                      {!['USD', 'EUR', 'TRY', 'GBP', 'CNY', 'JPY', 'CAD', 'AUD', 'CHF', 'INR', 'SGD'].includes(request.preferred_currency) && (
                        <input
                          type="text"
                          placeholder={t('steps.form.placeholders.currency')}
                          className="w-1/2 bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                          value={request.preferred_currency === 'OTHER' ? '' : request.preferred_currency}
                          onChange={e => setRequest({...request, preferred_currency: e.target.value.toUpperCase()})}
                          maxLength={3}
                        />
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Hedef Birim Fiyat (Opsiyonel)</label>
                    <input 
                      type="number"
                      placeholder="Örn: 500"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500 font-black italic"
                      value={request.target_price_total || ''}
                      onChange={e => setRequest({...request, target_price_total: e.target.value})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('steps.form.labels.paymentTerm')}</label>
                    <select 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-zinc-400 outline-none"
                      value={request.payment_term}
                      onChange={e => setRequest({...request, payment_term: e.target.value})}
                    >
                      <option value="Peşin">{t('steps.form.paymentTerms.cash')}</option>
                      <option value="30 Gün Vadeli">{t('steps.form.paymentTerms.30days')}</option>
                      <option value="60 Gün Vadeli">{t('steps.form.paymentTerms.60days')}</option>
                    </select>
                  </div>
                </div>

                <button 
                  onClick={handleSourcingSearch}
                  disabled={loading}
                  className="w-full py-6 bg-blue-600 text-white font-black uppercase tracking-widest rounded-3xl hover:bg-blue-500 transition-all shadow-[0_20px_40px_rgba(37,99,235,0.2)] active:scale-[0.98] flex items-center justify-center gap-4"
                >
                  {loading ? t('steps.form.buttons.processing') : (selectedSupplier ? t('steps.form.buttons.prepare') : t('steps.form.buttons.listSuppliers'))}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-10"
          >
            <div className="flex items-end justify-between">
              <div>
                 <h2 className="text-4xl font-black tracking-tight uppercase italic">{selectedSupplier ? t('steps.matches.titleReady') : t('steps.matches.titleMatches')}</h2>
                 <p className="text-zinc-500 text-sm font-medium mt-2">
                   {selectedSupplier 
                     ? t('steps.matches.descriptionSingle', { name: selectedSupplier.company_name || selectedSupplier.name })
                     : t('steps.matches.descriptionMulti')
                   }
                 </p>
              </div>
              <button onClick={() => setStep(1)} className="text-[10px] font-black text-zinc-500 hover:text-white uppercase tracking-widest">{t('steps.matches.back')}</button>
            </div>

            <div className="space-y-4">
              {!matches || matches.length === 0 ? (
                <div className="glass-premium p-20 text-center rounded-[3rem]">
                   <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">{t('steps.matches.noSuppliers')}</p>
                </div>
              ) : (
                matches.map((m) => (
                  <div key={m.id} className="glass-premium p-8 rounded-[2.5rem] flex items-center justify-between group hover:bg-white/[0.05] transition-all">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 transition-all">
                        <Building className="w-8 h-8 text-zinc-600 group-hover:text-blue-500 transition-colors" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-black text-white">{m.name}</h3>
                          {m.verified && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                           <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                             <MapPin className="w-3 h-3" /> {m.location}
                           </div>
                           <div className="w-1 h-1 rounded-full bg-white/10" />
                           <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                             <Clock className="w-3 h-3" /> {m.delivery_estimate}
                           </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                       <div className="text-xs font-black text-blue-500 mb-2">{t('steps.matches.trustScore', { score: m.rating })}</div>
                       <input 
                        type="checkbox" 
                        checked={selectedIds.includes(m.id)} 
                        onChange={() => {
                          setSelectedIds(prev => 
                            prev.includes(m.id) ? prev.filter(id => id !== m.id) : [...prev, m.id]
                          );
                        }}
                        className="w-5 h-5 rounded-lg border-white/10 bg-white/5 text-blue-600 focus:ring-0 cursor-pointer" 
                       />
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Document View */}
            <div className="bg-white text-zinc-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl space-y-10 border border-zinc-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/[0.03] rounded-bl-[120px] pointer-events-none" />
              
              <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-zinc-100 pb-10">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 text-white rounded-lg text-[8px] font-black uppercase tracking-widest">
                    {t('steps.matches.officialRequest')}
                  </div>
                  <h3 className="text-3xl font-black tracking-tighter text-zinc-900 uppercase italic leading-none">
                    {profileData?.company_name || (useTranslations('common')('myAccount'))}
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-zinc-400 font-black uppercase tracking-widest">{t('steps.matches.docNo')}</p>
                  <p className="text-[11px] font-black text-blue-600 tracking-wider">PRQ-{new Date().getFullYear()}{Math.floor(100000 + Math.random() * 900000)}</p>
                </div>
              </div>

              <div className="space-y-8 bg-zinc-50/50 p-8 rounded-3xl border border-zinc-100">
                 <h4 className="text-2xl font-black tracking-tight text-zinc-900 italic uppercase">{request.title}</h4>
                 <div className="grid grid-cols-3 gap-8">
                    <div>
                      <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">{t('steps.matches.targetQuantity')}</p>
                      <p className="text-xl font-black text-zinc-900">{request.quantity || (useTranslations('common')('notSpecified'))}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">{t('steps.matches.targetCurrency')}</p>
                      <p className="text-xl font-black text-zinc-900">{request.preferred_currency}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">{t('steps.matches.paymentTerm')}</p>
                      <p className="text-xl font-black text-blue-600 uppercase">{request.payment_term}</p>
                    </div>
                 </div>
              </div>

              <button 
                onClick={handleConfirmWithSelection}
                disabled={loading || selectedIds.length === 0}
                className="w-full py-6 bg-zinc-900 text-white font-black uppercase tracking-widest rounded-3xl hover:bg-blue-600 transition-all shadow-2xl flex items-center justify-center gap-4 disabled:opacity-50"
              >
                {loading ? t('steps.matches.sending') : t('steps.matches.sendRequest')}
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/20 rounded-[2rem] flex items-center justify-center mx-auto mb-10">
              <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            </div>
            <h2 className="text-5xl font-black tracking-tighter mb-6">{t('steps.success.title')}</h2>
            <p className="text-zinc-500 text-lg font-medium max-w-md mx-auto mb-12">
              {t('steps.success.message')}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <button onClick={() => { setCurrentView('marketplace'); setStep(1); }} className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
                {t('steps.success.backToMarketplace')}
              </button>
              <button 
                onClick={() => { setStep(1); setCurrentView('dashboard'); fetchDashboardData(); }}
                className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 transition-all flex items-center gap-2"
              >
                {t('steps.success.viewMyRequests')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <Globe className="w-6 h-6" />, title: t('features.global.title'), desc: t('features.global.desc') },
          { icon: <Truck className="w-6 h-6" />, title: t('features.logistics.title'), desc: t('features.logistics.desc') },
          { icon: <ShieldCheck className="w-6 h-6" />, title: t('features.standard.title'), desc: t('features.standard.desc') }
        ].map((feat, i) => (
          <div key={i} className="p-10 glass-premium rounded-[3rem] hover:bg-white/[0.03] transition-all group">
            <div className="p-3 bg-blue-600/10 text-blue-500 rounded-2xl border border-blue-500/20 w-fit mb-6 group-hover:scale-110 transition-transform">
              {feat.icon}
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight mb-4">{feat.title}</h3>
            <p className="text-xs text-zinc-500 leading-relaxed font-medium">{feat.desc}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
