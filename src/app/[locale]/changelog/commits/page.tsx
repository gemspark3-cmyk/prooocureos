'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  GitCommit, 
  GitBranch, 
  GitPullRequest, 
  User, 
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  Zap,
  Code
} from 'lucide-react'

import { useTranslations } from 'next-intl'

export default function CommitsPage() {
  const t = useTranslations('changelog')
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')

  const commits = [
    {
      id: "a1b2c3d",
      version: "AIP-103.6",
      type: "feat",
      message: "integrated xlsx-js-style for high-fidelity financial reporting",
      author: "ProcureOS Core",
      date: "Today",
      details: "Excel export engine now supports background coloring, auto-column sizing and potential savings calculation logic."
    },
    {
      id: "e4f5g6h",
      version: "AIP-103.6",
      type: "fix",
      message: "corrected schema mapping for rfq.specifications in order list",
      author: "ProcureOS Core",
      date: "Today",
      details: "Fixed 500 error when fetching orders by removing invalid reference to 'title' column in join query."
    },
    {
      id: "i7j8k9l",
      version: "AIP-103.6",
      type: "perf",
      message: "optimized dashboard initial load with SWR background revalidation",
      author: "ProcureOS Core",
      date: "Yesterday",
      details: "Implemented SWR for all dashboard endpoints to enable instantaneous UI response while data refreshes in background."
    },
    {
      id: "m0n1p2q",
      version: "AIP-103.5",
      type: "refactor",
      message: "decoupled embedding generation from rfq creation flow",
      author: "AIP-Worker-1",
      date: "3 days ago",
      details: "Heavy embedding compute moved to background worker. RFQ creation is now non-blocking and recovers gracefully from worker delays."
    },
    {
      id: "r3s4t5u",
      version: "AIP-103.5",
      type: "feat",
      message: "implemented debounced search for marketplace query input",
      author: "UX Engine",
      date: "3 days ago",
      details: "Reduced API load by 60% by implementing 500ms debounce on search input."
    },
    {
      id: "v6w7x8y",
      version: "AIP-103.5",
      type: "style",
      message: "standardized location format across all dashboard views",
      author: "UX Engine",
      date: "4 days ago",
      details: "Enforced 'COUNTRY / CITY' uppercase format for all address displays (Warehouse, Profile, PO)."
    },
    {
      id: "z9a0b1c",
      version: "AIP-103",
      type: "security",
      message: "enforced RLS for client_portal_buyers and warehouses",
      author: "Security Core",
      date: "1 week ago",
      details: "Critical security patch: Isolated all buyer data at database level using Supabase Row Level Security."
    },
    {
      id: "d2e3f4g",
      version: "AIP-103",
      type: "perf",
      message: "achieved sub-500ms semantic match latency",
      author: "AIP-Match",
      date: "1 week ago",
      details: "Optimized pgvector index parameters for better performance on large catalog datasets."
    },
    {
      id: "h5i6j7k",
      version: "AIP-102",
      type: "feat",
      message: "initial implementation of vector-based supplier search",
      author: "AIP-Match",
      date: "November 2025",
      details: "Migration from keyword-based search to full semantic matching using OpenAI embeddings."
    },
    {
      id: "l8m9n0o",
      version: "AIP-101",
      type: "feat",
      message: "multi-language support for RFQ processing",
      author: "NLP Engine",
      date: "June 2025",
      details: "Integration with translation layer to support 72 languages in technical specifications."
    }
  ]

  const filteredCommits = commits.filter(c => {
    const matchType = filter === 'ALL' || c.type.toUpperCase() === filter;
    const matchSearch = c.message.toLowerCase().includes(search.toLowerCase()) || 
                        c.version.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  })

  const typeColors: Record<string, string> = {
    feat: "text-emerald-600 bg-emerald-50 border-emerald-100",
    fix: "text-rose-600 bg-rose-50 border-rose-100",
    perf: "text-blue-600 bg-blue-50 border-blue-100",
    security: "text-amber-600 bg-amber-50 border-amber-100",
    refactor: "text-purple-600 bg-purple-50 border-purple-100",
    style: "text-slate-600 bg-slate-50 border-slate-100"
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* Top Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/changelog" className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <GitCommit className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-slate-900">{t('commitsTitle')}</span>
              <span className="text-slate-300">/</span>
              <span className="text-sm text-slate-500 font-medium">{t('fullLog')}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="hidden md:flex items-center gap-1 px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest">
               <GitBranch className="w-3 h-3" /> main
             </div>
             <div className="w-px h-4 bg-slate-200 mx-2" />
             <Link href="/" className="text-sm font-semibold text-blue-600 hover:text-blue-700">{t('backToDashboard')}</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Header Area */}
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">{t('historyTitle')}</h1>
          <p className="text-slate-500 font-medium">{t('historySubtitle')}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
           <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input 
               type="text"
               placeholder={t('searchPlaceholder')}
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
             />
           </div>
           <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
             {['ALL', 'FEAT', 'FIX', 'PERF', 'SECURITY', 'REFACTOR'].map(t => (
               <button
                 key={t}
                 onClick={() => setFilter(t)}
                 className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${
                   filter === t ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                 }`}
               >
                 {t}
               </button>
             ))}
           </div>
        </div>

        {/* Commit List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredCommits.map((commit) => (
              <motion.div 
                key={commit.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="group bg-white border border-slate-200 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all overflow-hidden"
              >
                <div className="p-5 flex items-start gap-4">
                  <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                    <Code className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1 gap-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded border uppercase tracking-widest ${typeColors[commit.type]}`}>
                          {commit.type}
                        </span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                          {commit.version}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-300">
                        {commit.id}
                      </span>
                    </div>
                    <h3 className="text-[15px] font-bold text-slate-900 mb-2 truncate">
                      {commit.message}
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                        <User className="w-3.5 h-3.5" /> {commit.author}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                        <Calendar className="w-3.5 h-3.5" /> {commit.date}
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 leading-relaxed hidden group-hover:block animate-in slide-in-from-top-1 duration-200">
                       {commit.details}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredCommits.length === 0 && (
             <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-3xl">
                <Filter className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{t('noResults')}</p>
             </div>
          )}
        </div>
      </main>

      <footer className="py-20 border-t border-slate-200 bg-white text-center">
         <div className="flex flex-col items-center gap-4">
            <GitPullRequest className="w-8 h-8 text-slate-200" />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">AIP Core Repository Integrity Verified</p>
         </div>
      </footer>
    </div>
  )
}
