'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { X, Printer, ShieldCheck } from 'lucide-react'
import { formatDate, formatCurrency } from '@/lib/formatters'
import { useTranslations, useLocale } from 'next-intl'

interface OfferDocumentProps {
  offer: any;
  request: any;
  onClose: () => void;
}

export function OfferDocument({ offer, request, onClose }: OfferDocumentProps) {
  const t = useTranslations('dashboard.offerDocument');
  const tp = useTranslations('sourcing.steps.form.paymentTerms');
  const locale = useLocale();
  if (!offer || !request) return null;

  const handlePrint = () => {
    window.print();
  }

  const parseQuantity = (q: any): number => {
    if (typeof q === 'number') return q;
    if (typeof q !== 'string') return 1;
    const match = q.match(/\d+/);
    return match ? parseInt(match[0]) : 1;
  };

  const currencySymbol = offer.currency === 'TRY' ? '₺' : (offer.currency === 'EUR' ? '€' : '$');
  const numericQuantity = parseQuantity(request.quantity);
  const totalPrice = Number(offer.price || 0) * numericQuantity;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-3xl overflow-y-auto"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 0; }
          html, body { 
            width: 210mm !important;
            height: 297mm !important;
            margin: 0 !important; 
            padding: 0 !important;
            background: white !important;
            overflow: hidden !important;
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
          }
          body { 
            visibility: hidden !important; 
          }
          .print-section { 
            visibility: visible !important;
            position: fixed !important; 
            left: 0 !important; 
            top: 0 !important; 
            width: 210mm !important;
            height: 297mm !important;
            padding: 20mm !important;
            margin: 0 !important;
            background: white !important;
            color: black !important;
            display: block !important;
            z-index: 9999999 !important;
            overflow: hidden !important;
          }
          .print-section * { visibility: visible !important; }
          .no-print { display: none !important; }
        }
      `}} />
      <div className="absolute top-6 right-6 flex items-center gap-4 z-50 no-print">
        <button 
          onClick={handlePrint}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/10 transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
        >
          <Printer className="w-4 h-4" /> {t('print')}
        </button>
        <button 
          onClick={onClose}
          className="p-4 bg-rose-500/10 hover:bg-rose-500 text-white rounded-2xl border border-rose-500/20 transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="w-full max-w-[800px] bg-white text-zinc-900 p-12 md:p-20 shadow-2xl relative overflow-hidden print-section">
         {/* 1. Header Section */}
         <div className="flex justify-between items-start border-b-4 border-zinc-900 pb-10 mb-12">
            <div className="space-y-4">
               <div className="inline-flex px-3 py-1 bg-zinc-900 text-white text-[9px] font-black uppercase tracking-[0.3em] rounded">
                  {t('officialDoc')}
               </div>
               <h1 className="text-4xl font-black tracking-tighter italic uppercase leading-none text-zinc-900">
                  PROCURE<span className="text-zinc-400">OS</span>
               </h1>
            </div>
            <div className="text-right">
               <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">{t('docNo')}</p>
               <p className="text-lg font-black text-zinc-900">OFF-{offer.id.slice(0,8).toUpperCase()}</p>
               <p className="text-[9px] text-zinc-500 font-bold mt-1 uppercase">{formatDate(new Date(), locale)} / {t('locationFallback')}</p>
            </div>
         </div>

         {/* 2. Company Info Section */}
         <div className="grid grid-cols-2 gap-16 mb-16">
            <div className="space-y-6">
               <div className="space-y-2">
                  <p className="text-[9px] text-zinc-400 font-black uppercase tracking-widest border-b border-zinc-100 pb-1">{t('sellerInfo')} (Seller)</p>
                  <p className="text-[11px] font-black text-zinc-900 uppercase">
                     {offer.company?.company_name || t('supplierFirm')}
                  </p>
                  {offer.company?.contact_person && (
                     <p className="text-[9px] text-zinc-600 font-bold uppercase italic">
                        {t('authorized')}: {offer.company.contact_person}
                     </p>
                  )}
                  <div className="space-y-1">
                     <p className="text-[9px] text-zinc-500 font-bold uppercase">
                        {t('taxNo')}: {offer.company?.tax_number || 'TR 0000000000'}
                     </p>
                     <p className="text-[9px] text-zinc-500 font-medium uppercase leading-tight">
                        {offer.company?.billing_address || offer.company?.address || t('countryFallback')}
                     </p>
                     <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 border-t border-zinc-50 mt-2">
                        <p className="text-[8px] text-zinc-400 font-bold uppercase">📞 {offer.company?.contact_phone || offer.company?.phone || '-'}</p>
                        <p className="text-[8px] text-zinc-400 font-bold uppercase">✉️ {offer.company?.contact_email || offer.company?.email || '-'}</p>
                        {offer.company?.website && <p className="text-[8px] text-zinc-400 font-bold uppercase">🌐 {offer.company.website}</p>}
                     </div>
                  </div>
               </div>
            </div>

            <div className="space-y-6">
               <div className="space-y-2">
                  <p className="text-[9px] text-zinc-400 font-black uppercase tracking-widest border-b border-zinc-100 pb-1">{t('buyerInfo')} (Buyer)</p>
                  <p className="text-[11px] font-black text-zinc-900 uppercase">
                     {request.buyer?.company_name || t('buyerFirm')}
                  </p>
                  <div className="space-y-1">
                     <p className="text-[9px] text-zinc-500 font-bold uppercase">
                        {t('taxNo')}: {request.buyer?.tax_id || 'TR 0000000000'}
                     </p>
                     <div className="flex flex-col gap-1 mt-2">
                        <p className="text-[8px] text-zinc-400 font-bold uppercase leading-tight">📍 {request.buyer?.address_full || '-'}</p>
                        <p className="text-[8px] text-zinc-400 font-bold uppercase">✉️ {request.buyer?.email || '-'}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* 3. Items Table */}
         <div className="mb-16">
            <table className="w-full">
               <thead>
                  <tr className="bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest">
                     <th className="py-4 px-6 text-left">{t('description')}</th>
                     <th className="py-4 px-6 text-center">{t('quantity')}</th>
                     <th className="py-4 px-6 text-right">{t('unitPrice')}</th>
                     <th className="py-4 px-6 text-right">{t('totalPrice')}</th>
               </tr>
               </thead>
               <tbody className="divide-y divide-zinc-100">
                  <tr>
                     <td className="py-8 px-6">
                        <p className="text-sm font-black text-zinc-900 uppercase italic mb-1">{request.title}</p>
                        <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-tighter">
                           {t('category')}: {request.category}
                        </p>
                     </td>
                     <td className="py-8 px-6 text-center text-sm font-bold">{request.quantity || `1 ${t('unitAdet')}`}</td>
                     <td className="py-8 px-6 text-right text-sm font-black">{formatCurrency(offer.price, offer.currency, locale)}</td>
                     <td className="py-8 px-6 text-right text-sm font-black">{formatCurrency(totalPrice, offer.currency, locale)}</td>
                  </tr>
               </tbody>
               <tfoot>
                  <tr className="border-t-4 border-zinc-900">
                     <td colSpan={2} className="py-6 italic text-[10px] text-zinc-400 font-bold">
                        {t('digitalNotice')}
                     </td>
                     <td className="py-6 px-6 text-right text-[10px] font-black uppercase tracking-widest text-zinc-500">{t('grandTotal')}</td>
                     <td className="py-6 px-6 text-right font-black text-2xl italic text-zinc-900">
                        {formatCurrency(totalPrice, offer.currency, locale)}
                     </td>
                  </tr>
               </tfoot>
            </table>
         </div>

         {/* 4. Notes & Footer */}
         <div className="grid grid-cols-2 gap-12 pt-10 border-t border-zinc-100">
            <div className="space-y-4">
               <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">{t('paymentTerms')}</p>
                <div className="space-y-2 text-[10px] text-zinc-600 font-medium uppercase">
                  <p className="flex justify-between">
                    <span>{t('paymentTermLabel')}:</span> 
                    <span className="font-black text-zinc-900">
                      {request.payment_term === 'cash' ? tp('cash') : 
                       request.payment_term === '30days' ? tp('30days') : 
                       request.payment_term === '60days' ? tp('60days') : 
                       (request.payment_term || t('cash'))}
                    </span>
                  </p>
                  <p className="flex justify-between"><span>{t('deliveryTermLabel')}:</span> <span className="font-black text-emerald-600">{offer.delivery_days} {t('workingDays')}</span></p>
                  {offer.metadata?.note && (
                     <div className="mt-4 p-4 bg-zinc-50 border-l-4 border-zinc-900 italic lowercase first-letter:uppercase">
                        "{offer.metadata.note}"
                     </div>
                  )}
               </div>
            </div>
            <div className="flex flex-col items-center justify-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100">
               <ShieldCheck className="w-12 h-12 text-zinc-900 mb-4" />
               <p className="text-[9px] font-black uppercase tracking-widest">{t('digitalVerification')}</p>
               <p className="text-[8px] text-zinc-400 mt-1 font-mono uppercase">SECURE-ID: {offer.id.slice(0,12)}</p>
            </div>
         </div>

         <div className="mt-20 pt-10 border-t border-zinc-50 flex justify-between items-center text-[8px] font-black text-zinc-300 uppercase tracking-widest">
            <span>ProcureOS Smart Procurement Engine</span>
            <span>{t('page')} 1 / 1</span>
         </div>
      </div>
    </motion.div>
  )
}
