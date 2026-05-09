
'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, X, CheckCircle2, ShieldCheck, MessageSquare, Truck, Package, Heart } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { procureos } from '@/lib/api'
import { useTranslations } from 'next-intl'

interface RatingModalProps {
  orderId: string;
  supplierName: string;
  onClose: () => void;
  onSuccess: () => void;
  supplierId?: string;
}

export const RatingModal: React.FC<RatingModalProps> = ({ orderId, supplierName, onClose, onSuccess, supplierId }) => {
  const t = useTranslations('dashboard.rating')
  const tCommon = useTranslations('common')
  const [step, setStep] = useState<'form' | 'submitting' | 'success'>('form')
  const [ratings, setRatings] = useState({
    total: 0,
    quality: 0,
    delivery: 0,
    communication: 0
  })
  const [comment, setComment] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (ratings.total === 0) {
      setError(t('errors.overallRating'))
      return
    }

    setStep('submitting')
    try {
      await procureos.auth.submitReview({
        order_id: orderId,
        rating_total: ratings.total,
        rating_quality: ratings.quality || ratings.total,
        rating_delivery: ratings.delivery || ratings.total,
        rating_communication: ratings.communication || ratings.total,
        comment
      })
      setStep('success')
      setTimeout(() => {
        onSuccess()
        onClose()
      }, 2000)
    } catch (err: any) {
      setError(err.message || t('errors.submitFailed'))
      setStep('form')
    }
  }

  const RatingStars = ({ value, onChange, label, icon: Icon }: any) => (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-zinc-500" />
        <span className="text-xs font-black uppercase tracking-widest text-zinc-400">{label}</span>
      </div>

      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onChange(star)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              star <= value 
              ? 'bg-blue-600 text-white scale-110 shadow-lg shadow-blue-600/20' 
              : 'bg-white/5 text-zinc-600 hover:bg-white/10'
            }`}
          >
            <Star className={`w-5 h-5 ${star <= value ? 'fill-current' : ''}`} />
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-[#0a0a0b] border border-white/10 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative"
      >
        {step === 'form' && (
          <>
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-blue-600/10 to-transparent">
              <div>
                <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white">{t('title')}</h2>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">{supplierName}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                <X className="w-6 h-6 text-zinc-500" />
              </button>
            </div>

            <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold uppercase tracking-wider text-center">
                  {error}
                </div>
              )}

              <RatingStars 
                value={ratings.total} 
                onChange={(v: number) => setRatings({...ratings, total: v})} 
                label={t('labels.overall')} 
                icon={ShieldCheck} 
              />
              
              <div className="grid grid-cols-1 gap-2 border-t border-white/5 pt-6 mt-6">
                <RatingStars 
                  value={ratings.quality} 
                  onChange={(v: number) => setRatings({...ratings, quality: v})} 
                  label={t('labels.quality')} 
                  icon={Package} 
                />
                <RatingStars 
                  value={ratings.delivery} 
                  onChange={(v: number) => setRatings({...ratings, delivery: v})} 
                  label={t('labels.delivery')} 
                  icon={Truck} 
                />
                <RatingStars 
                  value={ratings.communication} 
                  onChange={(v: number) => setRatings({...ratings, communication: v})} 
                  label={t('labels.communication')} 
                  icon={MessageSquare} 
                />
              </div>

              <div className="mt-6">
                <span className="text-xs font-black uppercase tracking-widest text-zinc-400 block mb-2">{t('labels.feedback')}</span>
                <textarea 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={t('placeholders.feedback')}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors h-32 resize-none"
                />
              </div>

              <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[10px] text-zinc-500 font-medium leading-relaxed text-center">
                  <span className="text-blue-500 font-black">{tCommon('info')}:</span> {t('info')}
                </p>
              </div>
            </div>

            <div className="p-8 bg-white/[0.02] border-t border-white/5">
              <button 
                onClick={handleSubmit}
                className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95"
              >
                {t('submit')}
              </button>
            </div>
          </>
        )}

        {step === 'submitting' && (
          <div className="p-20 text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <p className="text-sm font-black uppercase tracking-widest text-zinc-400">{t('submitting')}</p>
          </div>
        )}

        {step === 'success' && (
          <div className="p-20 text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/20"
            >
              <CheckCircle2 className="w-10 h-10 text-white" />
            </motion.div>
            <h3 className="text-2xl font-black italic uppercase text-white mb-2 tracking-tight text-emerald-400">{t('success.title')}</h3>
            <p className="text-sm font-medium text-zinc-500 mb-8">{t('success.message')}</p>
            
            {supplierId && (
              <button 
                onClick={async () => {
                   try {
                     await procureos.auth.registerSupplier(supplierId);
                     toast.success(t('messages.added'));
                   } catch (e) {}
                   onSuccess();
                   onClose();
                }}
                className="w-full py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2"
              >
                <Star className="w-4 h-4 fill-blue-500 text-blue-500" /> {t('addToFavorites')}
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}
