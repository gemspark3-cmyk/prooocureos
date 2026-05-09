'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Truck, Calendar, Building, FileText, MapPin, Hash } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

interface ShipmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

export function ShipmentDetailsModal({ isOpen, onClose, order }: ShipmentDetailsModalProps) {
  const t = useTranslations('dashboard.orders.shipmentModal');
  const tc = useTranslations('common');
  const locale = useLocale();
  if (!order) return null;

  const details = order.metadata?.shipment_details || {};
  
  const shipmentTypeLabels: Record<string, string> = {
    'cargo': t('types.cargo'),
    'logistics': t('types.logistics'),
    'own_vehicle': t('types.ownVehicle'),
    'customer_pickup': t('types.customerPickup')
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-zinc-950 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-blue-600/10 to-transparent">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white italic uppercase tracking-tight">{t('title')}</h3>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">{t('orderNo', { no: order.po_number })}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {/* Status Banner */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t('currentStatus')}</span>
                <span className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-lg shadow-lg shadow-blue-600/10 uppercase tracking-widest">
                  {tc(`statuses.${order.status}`) || order.status}
                </span>
              </div>

              {/* Main Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                    <Truck className="w-3 h-3" /> {t('shipmentType')}
                  </label>
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-sm text-white font-bold italic">
                    {shipmentTypeLabels[details.shipment_type] || t('types.standard')}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                    <Building className="w-3 h-3" /> {t('carrier')}
                  </label>
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-sm text-white font-bold italic">
                    {details.carrier_name || tc('notSpecified')}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                    <Hash className="w-3 h-3" /> {t('trackingNo')}
                  </label>
                  <div className="p-4 bg-blue-600/5 border border-blue-500/20 rounded-2xl text-sm text-blue-400 font-black tracking-widest">
                    {order.tracking_number || tc('notSpecified')}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> {t('estDelivery')}
                  </label>
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-sm text-white font-bold italic">
                    {order.estimated_delivery ? new Date(order.estimated_delivery).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : tc('notSpecified')}
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                  <FileText className="w-3 h-3" /> {t('notes')}
                </label>
                <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-3xl text-sm text-zinc-400 leading-relaxed italic">
                  {details.notes || t('noNotes')}
                </div>
              </div>

              {/* Delivery Destination */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                  <MapPin className="w-3 h-3" /> {t('deliveryPoint')}
                </label>
                <div className="p-6 bg-blue-600/5 border border-blue-500/10 rounded-3xl">
                  {order.warehouse ? (
                    <div className="space-y-1">
                      <p className="text-white font-black uppercase italic tracking-tight">{order.warehouse.name}</p>
                      <p className="text-xs text-zinc-400 leading-relaxed">{order.warehouse.address_full}</p>
                      <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">{(order.warehouse.country || '').toUpperCase()} / {(order.warehouse.city || '').toUpperCase()}</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-white font-black uppercase italic tracking-tight">{t('defaultCompanyAddress')}</p>
                      <p className="text-xs text-zinc-400 leading-relaxed">{order.delivery_address || t('notSpecified')}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Supplier Info */}
              <div className="pt-6 border-t border-white/5 flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-zinc-500">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">{t('sender')}</p>
                  <h4 className="text-sm font-bold text-white uppercase">{order.supplier?.company_name}</h4>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 bg-white/[0.02] border-t border-white/5">
              <button
                onClick={onClose}
                className="w-full py-4 bg-white text-black text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95"
              >
                {t('close')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
