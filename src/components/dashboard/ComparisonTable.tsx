'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ShieldCheck, Clock, Tag, Trophy, MapPin } from 'lucide-react'

interface ComparisonTableProps {
  offers: any[];
  onAccept: (offerId: string) => void;
  requestStatus: string;
  targetPrice?: number;
}

export function ComparisonTable({ offers, onAccept, requestStatus, targetPrice }: ComparisonTableProps) {
  const t = useTranslations('dashboard.comparison');
  if (!offers || offers.length === 0) return null;

  // 🏆 Analiz: En iyileri bul
  const minPrice = Math.min(...offers.map(o => o.price));
  const minDelivery = Math.min(...offers.map(o => o.delivery_days));
  const maxReliability = Math.max(...offers.map(o => o.company?.reliability_score || 0));

  // 🧠 AIP-103 Compliant Weighted Scoring
  // Price: 70% | Speed: 20% | Trust: 10%
  const valueScores = offers.map(o => {
    const priceScore = minPrice / o.price; // 1.0 (cheapest) -> 0.x
    const deliveryScore = minDelivery / (o.delivery_days || 1); // 1.0 (fastest) -> 0.x
    const reliabilityScore = (o.company?.reliability_score || 0) / 100; // 0.x

    const totalScore = (priceScore * 0.7) + (deliveryScore * 0.2) + (reliabilityScore * 0.1);
    return { id: o.id, score: totalScore };
  });

  const bestValueId = valueScores.reduce((prev, curr) => prev.score > curr.score ? prev : curr).id;

  return (
    <div className="w-full overflow-hidden">
      <div className="overflow-x-auto pb-6 custom-scrollbar -mx-6 px-6">
        <div className="min-w-[1000px] grid grid-cols-[240px_repeat(auto-fit,minmax(220px,1fr))] gap-6">
          {/* Header Column */}
          <div className="space-y-4 pt-24 sticky left-0 bg-[#09090b] z-10 pr-4">
            <div className="h-20 flex items-center text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] border-b border-white/5">{t('headers.supplierProfile')}</div>
            <div className="h-16 flex items-center text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] border-b border-white/5">{t('headers.unitPriceOffer')}</div>
            <div className="h-16 flex items-center text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] border-b border-white/5">{t('headers.logisticsTermin')}</div>
            <div className="h-16 flex items-center text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] border-b border-white/5">{t('headers.supplierSecurity')}</div>
            <div className="h-16 flex items-center text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">{t('headers.decisionAction')}</div>
          </div>

          {/* Offer Columns */}
          {offers.map((offer) => {
            const isBestPrice = offer.price === minPrice;
            const isBestDelivery = offer.delivery_days === minDelivery;
            const isBestReliability = (offer.company?.reliability_score || 0) === maxReliability && maxReliability > 0;
            const isBestValue = offer.id === bestValueId;

            return (
              <motion.div 
                key={offer.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`relative p-6 rounded-[2.5rem] border transition-all duration-500 ${
                  isBestValue ? 'bg-blue-600/10 border-blue-500/40 shadow-2xl shadow-blue-600/10' : 
                  isBestPrice ? 'bg-emerald-600/5 border-emerald-500/20' : 'bg-white/[0.02] border-white/5'
                }`}
              >
                {/* Badge Area */}
                <div className="h-20 mb-4 flex flex-col gap-1.5 justify-end">
                  {isBestValue && (
                    <motion.span 
                      initial={{ y: 5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="bg-blue-600 text-white text-[8px] font-black px-3 py-1 rounded-full w-fit uppercase tracking-widest flex items-center gap-1.5 shadow-lg shadow-blue-600/20 border border-blue-400/30"
                    >
                      <Trophy className="w-3 h-3" /> {t('badges.mostAdvantageous')}
                    </motion.span>
                  )}
                  <div className="flex flex-wrap gap-1">
                     {isBestPrice && (
                       <span className="bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 text-[7px] font-black px-2 py-0.5 rounded-full w-fit uppercase tracking-tighter flex items-center gap-1">
                         <Tag className="w-2.5 h-2.5" /> {t('badges.cheapest')}
                       </span>
                     )}
                     {isBestDelivery && (
                       <span className="bg-amber-500/20 text-amber-500 border border-amber-500/30 text-[7px] font-black px-2 py-0.5 rounded-full w-fit uppercase tracking-tighter flex items-center gap-1">
                         <Clock className="w-2.5 h-2.5" /> {t('badges.fastest')}
                       </span>
                     )}
                     {offer.price <= (targetPrice || 0) && targetPrice && (
                       <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[7px] font-black px-2 py-0.5 rounded-full w-fit uppercase tracking-tighter flex items-center gap-1">
                         <ShieldCheck className="w-2.5 h-2.5" /> {t('badges.belowTarget')}
                       </span>
                     )}
                  </div>
                </div>

                {/* Data Rows */}
                <div className="h-20 flex flex-col justify-center border-b border-white/5">
                  <div className="font-black text-white italic truncate text-base tracking-tight uppercase">{offer.company?.company_name}</div>
                  <div className="text-[9px] text-zinc-500 font-bold flex items-center gap-1 uppercase tracking-widest mt-1">
                    <MapPin className="w-3 h-3" /> {offer.company?.location || 'Turkey'}
                  </div>
                </div>

                <div className="h-16 flex items-center border-b border-white/5">
                  <span className={`text-2xl font-black italic ${isBestPrice ? 'text-emerald-400' : 'text-white'}`}>
                    {offer.price.toLocaleString()} <span className="text-[10px] font-black not-italic ml-1 opacity-60 uppercase">{offer.currency || 'USD'}</span>
                  </span>
                </div>

                <div className="h-16 flex items-center border-b border-white/5">
                  <div className="flex flex-col">
                     <span className={`text-sm font-black ${isBestDelivery ? 'text-amber-400' : 'text-zinc-300'}`}>
                       {t('labels.workingDays', { days: offer.delivery_days })}
                     </span>
                     <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-tighter">{t('labels.doorToDoor')}</span>
                  </div>
                </div>

                <div className="h-16 flex items-center border-b border-white/5">
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${isBestReliability ? 'bg-blue-500' : 'bg-zinc-600'}`} 
                        style={{ width: `${offer.company?.reliability_score || 0}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-black text-white">%{offer.company?.reliability_score || 0}</span>
                  </div>
                </div>

                <div className="h-16 flex items-center">
                  <button
                    onClick={() => onAccept(offer.id)}
                    disabled={requestStatus === 'awarded' || offer.status === 'rejected'}
                    className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      offer.status === 'accepted' 
                        ? 'bg-emerald-500 text-black shadow-xl shadow-emerald-500/20' 
                        : 'bg-white text-black hover:bg-blue-600 hover:text-white shadow-xl hover:shadow-blue-600/20 disabled:opacity-30 active:scale-95'
                    }`}
                  >
                    {offer.status === 'accepted' ? t('actions.selected') : (isBestValue ? t('actions.selectBest') : t('actions.accept'))}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-zinc-500">
         <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
         <p className="text-[8px] font-black uppercase tracking-widest">{t('labels.aiDecisionActive')}</p>
      </div>
    </div>
  );
}
