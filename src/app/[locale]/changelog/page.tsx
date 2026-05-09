'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Cpu, 
  Shield, 
  Zap, 
  ChevronRight, 
  CheckCircle2, 
  Activity, 
  FileSpreadsheet,
  Clock,
  Calendar,
  Lock,
  Globe,
  Database
} from 'lucide-react'

import { useTranslations } from 'next-intl'

export default function ChangelogPage() {
  const t = useTranslations('changelog')
  
  const releases = [
    {
      version: "AIP-106",
      tag: "FUTURE",
      date: "July 2027",
      title: t('releaseItems.AIP-106.title'),
      description: t('releaseItems.AIP-106.description'),
      icon: <Globe className="w-5 h-5 text-purple-500" />,
      changes: [
        {
          category: t('releaseItems.AIP-106.cat1'),
          items: [
            t('releaseItems.AIP-106.item1'),
            t('releaseItems.AIP-106.item2'),
            t('releaseItems.AIP-106.item3')
          ]
        }
      ]
    },
    {
      version: "AIP-105",
      tag: "FUTURE",
      date: "March 2027",
      title: t('releaseItems.AIP-105.title'),
      description: t('releaseItems.AIP-105.description'),
      icon: <Database className="w-5 h-5 text-orange-500" />,
      changes: [
        {
          category: t('releaseItems.AIP-105.cat1'),
          items: [
            t('releaseItems.AIP-105.item1'),
            t('releaseItems.AIP-105.item2'),
            t('releaseItems.AIP-105.item3')
          ]
        }
      ]
    },
    {
      version: "AIP-104",
      tag: "FUTURE",
      date: "November 2026",
      title: t('releaseItems.AIP-104.title'),
      description: t('releaseItems.AIP-104.description'),
      icon: <Cpu className="w-5 h-5 text-indigo-500" />,
      changes: [
        {
          category: t('releaseItems.AIP-104.cat1'),
          items: [
            t('releaseItems.AIP-104.item1'),
            t('releaseItems.AIP-104.item2'),
            t('releaseItems.AIP-104.item3')
          ]
        }
      ]
    },
    {
      version: "AIP-103.6",
      tag: "LATEST",
      date: "May 2026",
      title: t('releaseItems.AIP-103_6.title'),
      description: t('releaseItems.AIP-103_6.description'),
      icon: <FileSpreadsheet className="w-5 h-5 text-emerald-500" />,
      changes: [
        {
          category: t('releaseItems.AIP-103_6.cat1'),
          items: [
            t('releaseItems.AIP-103_6.item1'),
            t('releaseItems.AIP-103_6.item2'),
            t('releaseItems.AIP-103_6.item3')
          ]
        },
        {
          category: t('releaseItems.AIP-103_6.cat2'),
          items: [
            t('releaseItems.AIP-103_6.item4'),
            t('releaseItems.AIP-103_6.item5')
          ]
        }
      ]
    },
    {
      version: "AIP-103.5",
      tag: "STABLE",
      date: "May 2026",
      title: t('releaseItems.AIP-103_5.title'),
      description: t('releaseItems.AIP-103_5.description'),
      icon: <Zap className="w-5 h-5 text-blue-500" />,
      changes: [
        {
          category: t('releaseItems.AIP-103_5.cat1'),
          items: [
            t('releaseItems.AIP-103_5.item1'),
            t('releaseItems.AIP-103_5.item2'),
            t('releaseItems.AIP-103_5.item3')
          ]
        }
      ]
    },
    {
      version: "AIP-103",
      tag: "MAJOR",
      date: "April 2026",
      title: t('releaseItems.AIP-103.title'),
      description: t('releaseItems.AIP-103.description'),
      icon: <Lock className="w-5 h-5 text-slate-500" />,
      changes: [
        {
          category: t('releaseItems.AIP-103.cat1'),
          items: [
            t('releaseItems.AIP-103.item1'),
            t('releaseItems.AIP-103.item2')
          ]
        }
      ]
    },
    {
      version: "AIP-102",
      tag: "LEGACY",
      date: "November 2025",
      title: t('releaseItems.AIP-102.title'),
      description: t('releaseItems.AIP-102.description'),
      icon: <Database className="w-5 h-5 text-slate-400" />,
      changes: [
        {
          category: t('releaseItems.AIP-102.cat1'),
          items: [
            t('releaseItems.AIP-102.item1'),
            t('releaseItems.AIP-102.item2')
          ]
        }
      ]
    },
    {
      version: "AIP-101",
      tag: "INITIAL",
      date: "June 2025",
      title: t('releaseItems.AIP-101.title'),
      description: t('releaseItems.AIP-101.description'),
      icon: <Clock className="w-5 h-5 text-slate-400" />,
      changes: [
        {
          category: t('releaseItems.AIP-101.cat1'),
          items: [
            t('releaseItems.AIP-101.item1'),
            t('releaseItems.AIP-101.item2')
          ]
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      {/* Header / Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="font-bold tracking-tight text-slate-900">ProcureOS <span className="text-slate-400 font-normal">{t('releaseNotes')}</span></span>
            </Link>
          </div>
          <Link href="/" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            {t('backToDashboard')}
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-slate-50 border-b border-slate-200 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-16">
          {releases.map((release, i) => (
            <section key={release.version} className="relative">
              <div className="flex items-start gap-8">
                {/* Timeline Visual */}
                <div className="hidden md:flex flex-col items-center pt-2">
                  <div className={`w-10 h-10 rounded-full bg-white border-2 flex items-center justify-center ${
                    release.tag === 'LATEST' ? 'border-blue-600 shadow-lg shadow-blue-200' : 
                    release.tag === 'FUTURE' ? 'border-indigo-400 border-dashed' :
                    'border-slate-200'
                  }`}>
                    {release.tag === 'LATEST' ? <Activity className="w-5 h-5 text-blue-600" /> : 
                     release.tag === 'FUTURE' ? <Calendar className="w-5 h-5 text-indigo-400" /> :
                     <div className="w-2 h-2 rounded-full bg-slate-300" />}
                  </div>
                  {i !== releases.length - 1 && <div className="w-0.5 h-full min-h-[100px] bg-slate-100 mt-4" />}
                </div>

                {/* Content Card */}
                <div className="flex-1 pb-12">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                      release.tag === 'LATEST' ? 'bg-blue-600 text-white' : 
                      release.tag === 'FUTURE' ? 'bg-indigo-600 text-white' :
                      release.tag === 'STABLE' ? 'bg-emerald-100 text-emerald-700' : 
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {release.tag}
                    </span>
                    <span className="text-sm font-semibold text-slate-900">{release.version}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-sm text-slate-500 font-medium">{release.date}</span>
                  </div>

                  <div className={`bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
                    release.tag === 'FUTURE' ? 'border-indigo-100 bg-indigo-50/10' : 'border-slate-200'
                  }`}>
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`p-3 rounded-lg ${release.tag === 'FUTURE' ? 'bg-indigo-50' : 'bg-slate-50'}`}>
                          {release.icon}
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">{release.title}</h2>
                      </div>
                      
                      <p className="text-slate-600 mb-8 font-medium">
                        {release.description}
                      </p>

                      <div className="space-y-8">
                        {release.changes.map(group => (
                          <div key={group.category}>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                              {group.category} <div className="h-px bg-slate-100 flex-1" />
                            </h4>
                            <ul className="grid grid-cols-1 gap-3">
                              {group.items.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 group/item">
                                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 opacity-40 group-hover/item:opacity-100 transition-opacity ${
                                    release.tag === 'FUTURE' ? 'text-indigo-600' : 'text-blue-600'
                                  }`} />
                                  <span className="text-sm text-slate-700 leading-relaxed font-medium">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-slate-50 px-8 py-4 border-t border-slate-200 flex items-center justify-between">
                       <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                         {release.tag === 'FUTURE' ? 'Development Roadmap' : 'AIP Compliance Verified'}
                       </span>
                       {release.tag !== 'FUTURE' && (
                         <Link href="/changelog/commits" className="text-[10px] text-blue-600 font-bold uppercase tracking-widest hover:underline flex items-center gap-1">
                         View Full Commit History <ChevronRight className="w-3 h-3" />
                       </Link>
                       )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm text-slate-500 mb-4 font-medium">
            {t('footerNote')}
          </p>
          <div className="flex justify-center gap-4">
             <div className="w-10 h-1 bg-slate-200 rounded-full" />
             <div className="w-10 h-1 bg-slate-200 rounded-full" />
             <div className="w-10 h-1 bg-slate-200 rounded-full" />
          </div>
        </div>
      </footer>
    </div>
  )
}
