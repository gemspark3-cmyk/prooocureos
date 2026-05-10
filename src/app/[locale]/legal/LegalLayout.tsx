'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function LegalLayout({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <main className="min-h-screen mesh-bg text-[var(--foreground)] font-sans selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto pt-24 pb-32 px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 text-sm font-semibold tracking-tight">
          <ArrowLeft className="w-4 h-4" /> Back to Marketplace
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">{title}</h1>
            <p className="text-zinc-500 font-medium">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
          
          <div className="prose prose-invert prose-zinc max-w-none 
            prose-h2:text-2xl prose-h2:font-black prose-h2:tracking-tight prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-white
            prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-[15px]
            prose-li:text-zinc-400 prose-li:leading-relaxed prose-li:mb-2 prose-li:text-[15px]
            prose-strong:text-white prose-strong:font-bold
          ">
            {children}
          </div>
        </motion.div>
      </div>
    </main>
  )
}
