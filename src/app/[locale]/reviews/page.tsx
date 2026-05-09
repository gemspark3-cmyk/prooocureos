'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Star, Quote, Building2, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { procureos } from '@/lib/api'
import { useTranslations } from 'next-intl'

export default function ReviewsPage() {
  const t = useTranslations('reviews')
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const STATIC_FALLBACK_REVIEWS = t.raw('static');

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await procureos.getReviews();
        if (res.reviews && res.reviews.length > 0) {
          const mapped = res.reviews.map((r: any) => ({
            name: r.buyer_name || r.buyer?.company_name || "Gizli Kullanıcı",
            role: t('roles.buyer'),
            company: r.buyer?.company_name || "ProcureOS Member",
            content: r.comment || r.content,
            rating: r.rating || 5,
            tag: r.rating >= 4 ? t('tags.highSatisfaction') : t('tags.verified')
          }));
          setReviews(mapped);
        } else {
          setReviews(STATIC_FALLBACK_REVIEWS);
        }
      } catch (error: any) {
        // Handle SUPPLIER_ID_REQUIRED or other validation errors silently by falling back
        if (error.message?.includes('SUPPLIER_ID_REQUIRED')) {
          console.log("[Reviews] Using static fallback as general reviews are not available on this node.");
        } else {
          console.error("Failed to load reviews:", error);
        }
        setReviews(STATIC_FALLBACK_REVIEWS);
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, [t, STATIC_FALLBACK_REVIEWS]);

  return (
    <div className="min-h-screen bg-[#020203] text-white flex flex-col">
      <header className="p-6">
        <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">{t('back')}</span>
        </Link>
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full py-12 px-6">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-emerald-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4"
          >
            <MessageSquare className="w-4 h-4" />
            {t('badge')}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-6"
          >
            {t('title').split(' ').map((word, i) => (
               <span key={i} className={word === 'Güvenle' || word === 'Büyüyen' || word === 'Confidence' || word === 'Growing' ? "text-emerald-500" : ""}>{word} </span>
            ))}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 font-medium max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
             <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
             <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{t('loading')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-10 bg-white/[0.02] border border-white/5 rounded-[3.5rem] relative group hover:bg-white/[0.04] transition-all"
              >
                <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-16 h-16" />
                </div>
                
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-emerald-500 text-emerald-500' : 'text-zinc-800'}`} />
                  ))}
                </div>

                <p className="text-xl font-black italic text-white leading-relaxed mb-10 tracking-tight">
                  "{review.content}"
                </p>

                <div className="flex items-center justify-between border-t border-white/5 pt-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-xl font-black text-zinc-500 border border-white/10 group-hover:text-emerald-500 transition-colors">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white uppercase italic">{review.name}</h4>
                      <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{review.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end mb-1">
                      <Building2 className="w-3 h-3 text-zinc-700" />
                      <span className="text-[9px] font-black text-zinc-500 uppercase">{review.company}</span>
                    </div>
                    <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-md text-[8px] font-black uppercase tracking-tighter">
                      {review.tag}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-24 p-12 bg-blue-600 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">{t('ctaTitle')}</h2>
            <p className="text-blue-100 font-medium">{t('ctaSubtitle')}</p>
          </div>
          <Link 
            href="/register"
            className="relative z-10 px-12 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-900/40"
          >
            {t('ctaButton')}
          </Link>
        </motion.div>
      </main>
    </div>
  )
}
