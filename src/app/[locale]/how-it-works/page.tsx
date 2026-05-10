'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { 
  Zap, 
  Search, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  Clock,
  ArrowLeft,
  Bot,
  Layers,
  Cpu,
  MapPin,
  Send,
  Truck,
  Users
} from 'lucide-react'

const SearchSimulator = () => {
  const t = useTranslations('howItWorks.simulator')
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedSuppliers, setSelectedSuppliers] = useState<number[]>([]);
  const [location, setLocation] = useState('');
  const [isSent, setIsSent] = useState(false);

  const demoSuppliersRaw = t.raw('demo.suppliers') as Array<{ name: string, location: string, speed: string }>;
  const demoSuppliers = demoSuppliersRaw.map((sup, idx) => ({
    id: idx + 1,
    name: sup.name,
    location: sup.location,
    speed: sup.speed,
    rating: [4.8, 4.5, 4.2, 4.7][idx],
    match: ['98%', '92%', '85%', '90%'][idx],
    price: idx === 0 ? `$120/${t('unit')}` : idx === 1 ? `$115/${t('unit')}` : idx === 2 ? `$105/${t('unit')}` : `$110/${t('unit')}`
  }));

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query) return;
    setIsSearching(true);
    setHasSearched(false);
    setSelectedSuppliers([]);
    setIsSent(false);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 1500);
  };

  const toggleSupplier = (id: number) => {
    setSelectedSuppliers(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const fillDemo = () => {
    setQuery(t('demo.query'));
    setLocation(t('demo.location'));
  };

  return (
    <div className="w-full max-w-5xl mx-auto mb-32 p-8 bg-white/[0.02] border border-white/10 rounded-[3rem] shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
      
      <div className="mb-12 text-center">
         <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
           {t('badge')}
         </div>
         <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-2">{t('title')}</h2>
         <p className="text-zinc-500 text-sm italic">{t('desc')}</p>
      </div>

      {/* Arama Alanı */}
      <form onSubmit={handleSearch} className="relative mb-12">
        <div className="relative flex flex-col md:flex-row items-stretch bg-[#09090b] border border-white/10 rounded-[2.5rem] p-2 focus-within:border-blue-500/50 transition-all shadow-2xl">
          <div className="flex-[2] flex items-center min-w-0">
             <div className="pl-6 text-zinc-500 shrink-0">
               <Search className="w-6 h-6" />
             </div>
             <input 
               type="text" 
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder={t('searchPlaceholder')}
               className="flex-1 bg-transparent py-5 px-4 outline-none text-white font-bold placeholder:text-zinc-600 min-w-0 italic text-lg"
             />
          </div>
          
          <div className="hidden md:block w-[1px] h-12 bg-white/10 self-center mx-2" />
          
          <div className="flex-1 flex items-center min-w-0 relative">
             <div className="pl-6 md:pl-4 text-zinc-500 shrink-0">
               <MapPin className="w-6 h-6" />
             </div>
             <input 
               type="text"
               value={location}
               onChange={(e) => setLocation(e.target.value)}
               placeholder={t('locationPlaceholder')}
               className="flex-1 bg-transparent py-5 px-4 pr-4 outline-none text-white font-medium placeholder:text-zinc-600 min-w-0 italic"
             />
          </div>
          <button type="submit" disabled={isSearching || !query} className="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest px-10 py-4 rounded-[2rem] transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2 md:mt-0 shadow-lg shadow-blue-600/20">
            {isSearching ? t('searching') : t('searchButton')}
          </button>
        </div>
        {!hasSearched && !isSearching && (
           <button type="button" onClick={fillDemo} className="mt-4 ml-6 text-[10px] text-blue-400 font-black uppercase tracking-widest hover:text-blue-300 flex items-center gap-2">
             <Zap className="w-3 h-3 fill-blue-400" /> {t('exampleScenario')}
           </button>
        )}
      </form>

      {/* Sonuçlar */}
      {isSearching && (
        <div className="flex flex-col items-center justify-center py-20 gap-6">
           <div className="relative">
              <Zap className="w-12 h-12 text-blue-500 animate-pulse" />
              <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse" />
           </div>
           <span className="text-sm font-black text-zinc-400 uppercase tracking-[0.3em] animate-pulse italic">{t('scanning')}</span>
        </div>
      )}

      {hasSearched && !isSent && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4">
            <h3 className="text-sm font-black text-zinc-300 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              {t('matchedSuppliers', { count: demoSuppliers.length })}
            </h3>
            <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest">
              {t('selectFirms', { count: selectedSuppliers.length })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {demoSuppliers.map((sup) => (
                  <div key={sup.id} 
                       onClick={() => toggleSupplier(sup.id)}
                       className={`p-6 rounded-[2rem] cursor-pointer border-2 transition-all relative group ${selectedSuppliers.includes(sup.id) ? 'bg-blue-600/10 border-blue-500 shadow-xl' : 'bg-black/40 border-white/5 hover:border-white/20'}`}>
                    
                    {selectedSuppliers.includes(sup.id) && (
                      <div className="absolute top-4 right-4">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 fill-blue-500/20" />
                      </div>
                    )}

                    <div className="mb-6">
                       <h4 className="font-black text-white italic uppercase tracking-tighter mb-1 text-sm">{sup.name}</h4>
                       <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold">
                         <MapPin className="w-3 h-3" /> {sup.location}
                       </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] font-black text-zinc-600 uppercase">{t('supplierCard.match')}</span>
                         <span className="text-[10px] font-black text-emerald-400">{sup.match}</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] font-black text-zinc-600 uppercase">{t('supplierCard.speed')}</span>
                         <span className="text-[10px] font-black text-blue-400">{sup.speed}</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] font-black text-zinc-600 uppercase">{t('supplierCard.score')}</span>
                         <span className="text-amber-400 flex items-center gap-1 text-[10px]">★ {sup.rating}</span>
                      </div>
                    </div>
                  </div>
              ))}
          </div>

          {/* Toplu Teklif Formu */}
          {selectedSuppliers.length > 0 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-12">
                 <div className="bg-[#09090b] p-10 rounded-[3rem] border border-blue-500/30 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/[0.03] rounded-bl-[200px] pointer-events-none" />
                    
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-white/10 pb-8 mb-8">
                      <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-amber-500/20">
                          {t('form.badge')}
                        </div>
                        <h3 className="text-3xl font-black tracking-tighter text-white uppercase italic leading-none">
                          {t('form.title')}
                        </h3>
                        <p className="text-zinc-500 text-xs font-medium italic">{t('form.desc', { count: selectedSuppliers.length })}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">{t('form.docGroup')}</p>
                        <p className="text-xs font-black text-blue-500 tracking-wider">AIP-BULK-{Math.floor(1000 + Math.random() * 9000)}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-8">
                        <div className="space-y-3">
                          <label className="text-[11px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('form.details')}</label>
                          <textarea 
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-none font-medium italic"
                            defaultValue={query}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                           <div className="space-y-3">
                             <label className="text-[11px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('form.quantity')}</label>
                             <input type="text" defaultValue={t('demo.quantity')} className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500 font-black italic" />
                           </div>
                           <div className="space-y-3">
                             <label className="text-[11px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('form.currency')}</label>
                             <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-sm text-zinc-300 outline-none focus:ring-2 focus:ring-blue-500 font-black italic">
                               <option>USD ($)</option>
                               <option>EUR (€)</option>
                               <option>TRY (₺)</option>
                             </select>
                           </div>
                        </div>
                      </div>

                      <div className="space-y-8">
                         <div className="space-y-3">
                           <label className="text-[11px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('form.incoterm')}</label>
                           <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-sm text-zinc-300 outline-none focus:ring-2 focus:ring-blue-500 font-black italic">
                             {(t.raw('demo.incoterms') as string[]).map((opt, i) => (
                               <option key={i}>{opt}</option>
                             ))}
                           </select>
                         </div>
                         <div className="space-y-3">
                           <label className="text-[11px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('form.targetLocation')}</label>
                           <input type="text" defaultValue={location || t('demo.location')} className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500 font-black italic" />
                         </div>
                         <div className="space-y-3">
                           <label className="text-[11px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('form.validity')}</label>
                           <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-sm text-zinc-300 outline-none focus:ring-2 focus:ring-blue-500 font-black italic">
                             {(t.raw('demo.validityPeriods') as string[]).map((opt, i) => (
                               <option key={i}>{opt}</option>
                             ))}
                           </select>
                         </div>
                      </div>
                    </div>

                    <div className="mt-12 pt-10 border-t border-white/10">
                       <button 
                         type="button"
                         onClick={() => {
                           setIsSent(true);
                           setTimeout(() => setHasSearched(false), 5000);
                         }}
                         className="w-full py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-3xl font-black uppercase tracking-[0.3em] transition-all shadow-[0_15px_40px_rgba(37,99,235,0.4)] flex items-center justify-center gap-4 group"
                       >
                          <Send className="w-6 h-6 group-hover:translate-x-2 transition-transform" /> {t('form.submit', { count: selectedSuppliers.length })}
                       </button>
                    </div>
                 </div>
              </motion.div>
          )}
        </motion.div>
      )}

      {isSent && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-20 text-center">
           <div className="w-24 h-24 bg-emerald-500/20 text-emerald-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border-2 border-emerald-500/30">
              <CheckCircle2 className="w-12 h-12" />
           </div>
           <h3 className="text-4xl font-black italic tracking-tighter uppercase mb-4">{t('success.title')}</h3>
           <p className="text-zinc-500 text-lg italic max-w-xl mx-auto mb-10">{t('success.desc', { count: selectedSuppliers.length })}</p>
           <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link href="/register" className="w-full md:w-auto">
                 <button className="w-full md:w-auto px-10 py-5 bg-white text-black rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all">
                    {t('success.register')}
                 </button>
              </Link>
              <button onClick={() => { setIsSent(false); setHasSearched(false); setQuery(''); }} className="text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:text-white transition-colors">
                {t('success.newSimulation')}
              </button>
           </div>
        </motion.div>
      )}
    </div>
  );
}

const DashboardExplanation = () => {
  const t = useTranslations('dashboard')
  const tabs = [
    {
      id: 'ops',
      title: t('ops.title'),
      desc: t('ops.desc'),
      icon: <Zap className="w-5 h-5" />,
      features: [t('ops.f1'), t('ops.f2'), t('ops.f3')]
    },
    {
      id: 'log',
      title: t('log.title'),
      desc: t('log.desc'),
      icon: <Truck className="w-5 h-5" />,
      features: [t('log.f1'), t('log.f2'), t('log.f3')]
    },
    {
      id: 'team',
      title: t('team_ext.title'),
      desc: t('team_ext.desc'),
      icon: <Users className="w-5 h-5" />,
      features: [t('team_ext.f1'), t('team_ext.f2'), t('team_ext.f3')]
    },
    {
      id: 'erp',
      title: t('erp_ext.title'),
      desc: t('erp_ext.desc'),
      icon: <Cpu className="w-5 h-5" />,
      features: [t('erp_ext.f1'), t('erp_ext.f2'), t('erp_ext.f3')]
    }
  ];

  return (
    <div className="py-32 space-y-20">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none">{t('title').split(' ').map((word, i) => (
           <span key={i} className={['OPERASYON', 'OPERATION', 'PANELİ', 'PANEL'].includes(word.toUpperCase()) ? "text-blue-500" : ""}>{word} </span>
        ))}</h2>
        <p className="text-zinc-500 text-lg max-w-2xl mx-auto font-medium">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tabs.map(tab => (
          <div key={tab.id} className="p-10 bg-white/[0.02] border border-white/5 rounded-[3.5rem] hover:border-white/10 transition-all flex flex-col h-full relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-600/10 text-blue-500 rounded-2xl flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                {tab.icon}
              </div>
              <h3 className="text-xl font-black italic tracking-tighter text-white uppercase">{tab.title}</h3>
            </div>

            <p className="text-zinc-500 font-medium leading-relaxed italic mb-10 flex-1">{tab.desc}</p>

            <div className="space-y-3">
              {tab.features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-blue-500 rounded-full" />
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{f}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function HowItWorks() {
  const t = useTranslations('howItWorks')
  const steps = [
    {
      title: t('steps.step1.title'),
      description: t('steps.step1.desc'),
      icon: <Search className="w-6 h-6" />,
      color: "bg-blue-500/10 text-blue-500",
      delay: 0.1
    },
    {
      title: t('steps.step2.title'),
      description: t('steps.step2.desc'),
      icon: <Cpu className="w-6 h-6" />,
      color: "bg-purple-500/10 text-purple-500",
      delay: 0.2
    },
    {
      title: t('steps.step3.title'),
      description: t('steps.step3.desc'),
      icon: <MessageSquare className="w-6 h-6" />,
      color: "bg-emerald-500/10 text-emerald-500",
      delay: 0.3
    },
    {
      title: t('steps.step4.title'),
      description: t('steps.step4.desc'),
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "bg-amber-500/10 text-amber-500",
      delay: 0.4
    }
  ]

  return (
    <div className="min-h-screen bg-[#020203] text-white selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-8 bg-black/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <Link href="/" className="group flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/20 group-hover:scale-110 transition-all">
                    <Zap className="w-5 h-5 text-white fill-white" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xl font-black italic tracking-tighter leading-none">PROCUREOS</span>
                    <span className="text-[8px] font-black tracking-[0.3em] text-blue-500 uppercase">{t('usageGuide')}</span>
                </div>
            </Link>
            <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
                {t('backToHome')}
            </Link>
        </div>
      </nav>

      <main className="pt-48 pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-24">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
            >
              <Bot className="w-3 h-3" /> {t('guide')}
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.8] mb-10"
            >
              {t('title').split(' ').map((word, i) => (
                 <span key={i} className={i === t('title').split(' ').length - 1 ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500" : ""}>{word} </span>
              ))}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-zinc-500 text-xl max-w-3xl mx-auto font-medium leading-relaxed italic"
            >
              {t('subtitle')}
            </motion.p>
          </div>

          {/* Simulator */}
          <SearchSimulator />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: step.delay }}
                className="p-10 bg-white/[0.02] border border-white/5 rounded-[4rem] hover:border-blue-500/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] rounded-bl-full pointer-events-none" />
                <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  {step.icon}
                </div>
                <h3 className="text-2xl font-black italic mb-4 tracking-tighter uppercase">{step.title}</h3>
                <p className="text-zinc-500 font-medium leading-relaxed italic">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Dashboard Detailed Explanation */}
          <DashboardExplanation />

          {/* Strategic Questions Section */}
          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                q: t('questions.q1.title'),
                a: t('questions.q1.desc'),
                icon: <Zap className="w-5 h-5 text-blue-500" />
              },
              {
                q: t('questions.q2.title'),
                a: t('questions.q2.desc'),
                icon: <Layers className="w-5 h-5 text-purple-500" />
              },
              {
                q: t('questions.q3.title'),
                a: t('questions.q3.desc'),
                icon: <Globe className="w-5 h-5 text-emerald-500" />
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-10 bg-white/[0.01] border border-white/5 rounded-[3rem]"
              >
                <div className="mb-8">{item.icon}</div>
                <h4 className="text-lg font-black italic uppercase tracking-tighter text-white mb-6 leading-tight">{item.q}</h4>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed italic">{item.a}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-48 text-center pb-32">
             <Link href="/register">
                <button className="px-16 py-8 bg-blue-600 hover:bg-blue-500 text-white rounded-[3rem] text-xs font-black uppercase tracking-[0.3em] transition-all shadow-[0_20px_50px_rgba(37,99,235,0.4)] flex items-center gap-6 mx-auto group">
                   {t('cta')} <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
             </Link>
          </div>
        </div>
      </main>

      <footer className="py-20 border-t border-white/5 text-center bg-black/40">
         <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">
            PROCUREOS CORE • AUTONOMOUS PROCUREMENT PROTOCOL • 2026-2027
         </p>
      </footer>
    </div>
  )
}
