
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { HelpCircle, ChevronDown, Shield, Zap, Target, Search, ArrowLeft } from 'lucide-react'
import Link from 'next/link'


import { useTranslations } from 'next-intl'

export default function FAQPage() {
  const t = useTranslations('faq')
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  const faqs = [
    {
      question: t('questions.q1'),
      answer: t('questions.a1'),
      icon: Search
    },
    {
      question: t('questions.q2'),
      answer: t('questions.a2'),
      icon: Shield
    },
    {
      question: t('questions.q3'),
      answer: t('questions.a3'),
      icon: Zap
    },
    {
      question: t('questions.q4'),
      answer: t('questions.a4'),
      icon: Target
    }
  ]

  return (
    <div className="min-h-screen bg-[#020203] text-white flex flex-col">
      <header className="p-6">
        <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">{t('back')}</span>
        </Link>
      </header>
      <main className="flex-1 max-w-4xl mx-auto w-full py-12 px-6">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-blue-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4"
          >
            <HelpCircle className="w-4 h-4" />
            {t('helpCenter')}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase mb-6"
          >
            {t('title').split(' ').map((word, i) => (
               <span key={i} className={i === t('title').split(' ').length - 1 ? "text-blue-600" : ""}>{word} </span>
            ))}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 font-medium max-w-xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full text-left p-8 rounded-[2rem] border transition-all flex items-start gap-6 ${
                  openIndex === index 
                  ? 'bg-white/[0.03] border-blue-500/30 ring-1 ring-blue-500/30' 
                  : 'bg-white/[0.01] border-white/5 hover:border-white/10'
                }`}
              >
                <div className={`p-3 rounded-2xl transition-colors ${openIndex === index ? 'bg-blue-600 text-white' : 'bg-white/5 text-zinc-500'}`}>
                  <faq.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black italic tracking-tight uppercase">{faq.question}</h3>
                    <ChevronDown className={`w-5 h-5 text-zinc-600 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                  </div>
                  {openIndex === index && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-6 text-zinc-500 font-medium leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}
