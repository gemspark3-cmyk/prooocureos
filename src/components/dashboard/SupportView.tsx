'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LifeBuoy, 
  MessageSquare, 
  Plus, 
  Send, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  Bot,
  User,
  Loader2,
  X
} from 'lucide-react'
import { procureos } from '../../lib/api'
import { toast } from 'react-hot-toast'
import { formatDate } from '@/lib/formatters'
import useSWR, { mutate } from 'swr'
import { useTranslations, useLocale } from 'next-intl'

export function SupportView() {
  const t = useTranslations('dashboard.support')
  const locale = useLocale()
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [sending, setSending] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [showArchived, setShowArchived] = useState(false)
  
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: 'general',
    priority: 'medium',
    message: ''
  })

  // ⚡ SWR for Tickets: Instant loading & caching
  const { data: ticketsData, mutate: mutateTickets, isLoading: ticketsLoading } = useSWR('support_tickets', () => procureos.auth.listTickets(), {
    refreshInterval: 20000 
  })

  const tickets = ticketsData?.tickets || []

  useEffect(() => {
    if (selectedTicket) {
      const updated = tickets.find((t: any) => t.id === selectedTicket.id)
      if (updated && JSON.stringify(updated.messages) !== JSON.stringify(selectedTicket.messages)) {
        setSelectedTicket(updated)
      }
    }
  }, [tickets, selectedTicket?.id])

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      await procureos.auth.createTicket(newTicket)
      toast.success(t('messages.created'))
      setShowCreateForm(false)
      setNewTicket({ subject: '', category: 'general', priority: 'medium', message: '' })
      mutateTickets()
    } catch (err: any) {
      toast.error(err.message || t('messages.error'))
    } finally {
      setSending(false)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedTicket) return
    
    setSending(true)
    try {
      await procureos.auth.addTicketMessage(selectedTicket.id, newMessage)
      setNewMessage('')
      const res = await procureos.auth.getTicketDetails(selectedTicket.id)
      setSelectedTicket(res.ticket)
      mutateTickets()
    } catch (err: any) {
      toast.error(t('messages.sendError'))
    } finally {
      setSending(false)
    }
  }

  const handleCloseTicket = async (id: string) => {
    if (!confirm(t('chat.confirmClose'))) return
    try {
      await procureos.auth.updateTicketStatus(id, 'closed')
      await procureos.auth.addTicketMessage(id, t('chat.closedByUser'))
      toast.success(t('messages.closed'))
      setSelectedTicket(null)
      mutateTickets()
    } catch (err) {
      toast.error(t('messages.error'))
    }
  }

  const filteredTickets = tickets.filter((t: any) => 
    showArchived ? t.status === 'closed' || t.status === 'resolved' : t.status !== 'closed' && t.status !== 'resolved'
  );

  if (ticketsLoading && !ticketsData) return (
    <div className="flex items-center justify-center h-96">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-zinc-500 font-black uppercase tracking-widest text-[10px]">{t('connecting')}</p>
      </div>
    </div>
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[700px]">
      {/* Sidebar / Ticket List */}
      <div className="lg:col-span-4 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black italic tracking-tighter uppercase flex items-center gap-3">
            <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
            {t('title')}
          </h2>
          <button 
            onClick={() => {
              setShowCreateForm(true)
              setSelectedTicket(null)
            }}
            className="p-3 bg-blue-600 hover:bg-blue-500 rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="flex gap-2 mb-4 bg-white/[0.03] p-1 rounded-2xl border border-white/5 backdrop-blur-md">
          <button 
            onClick={() => setShowArchived(false)}
            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${!showArchived ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-zinc-500 hover:text-white'}`}
          >
            {t('active')}
          </button>
          <button 
            onClick={() => setShowArchived(true)}
            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${showArchived ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-white'}`}
          >
            {t('archived')}
          </button>
        </div>

        <div className="space-y-3">
          {filteredTickets.length === 0 ? (
            <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-12 text-center">
              <MessageSquare className="w-16 h-16 text-zinc-800 mx-auto mb-4" />
              <p className="text-zinc-500 font-black uppercase tracking-widest text-[10px] italic">
                {showArchived ? t('emptyStateArchived') : t('emptyStateActive')}
              </p>
            </div>
          ) : (
            filteredTickets.map((ticket: any) => (
              <motion.div
                key={ticket.id}
                onClick={() => {
                  setSelectedTicket(ticket)
                  setShowCreateForm(false)
                }}
                whileHover={{ x: 4 }}
                className={`p-6 rounded-[2rem] cursor-pointer transition-all border relative overflow-hidden group ${
                  selectedTicket?.id === ticket.id 
                    ? 'bg-blue-600/10 border-blue-500/50 shadow-2xl shadow-blue-600/10' 
                    : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-md ${
                    ticket.status === 'open' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                    ticket.status === 'in_progress' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                    ticket.status === 'resolved' ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20' :
                    'bg-white/5 text-zinc-500 border border-white/10'
                  }`}>
                    {ticket.status === 'open' ? t('status.open') : 
                     ticket.status === 'in_progress' ? t('status.inProgress') : 
                     ticket.status === 'resolved' ? t('status.resolved') : t('status.closed')}
                  </span>
                  <span className="text-[9px] text-zinc-600 font-bold uppercase">
                    {formatDate(ticket.updated_at, locale)}
                  </span>
                </div>
                <h3 className="font-black text-sm italic tracking-tighter uppercase text-white truncate group-hover:text-blue-400 transition-colors">{ticket.subject}</h3>
                <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest mt-1">
                  {ticket.category === 'general' ? t('createForm.categories.general') :
                   ticket.category === 'technical' ? t('createForm.categories.technical') :
                   ticket.category === 'billing' ? t('createForm.categories.billing') :
                   ticket.category === 'product' ? t('createForm.categories.product') : ticket.category}
                </p>
                
                {selectedTicket?.id === ticket.id && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-full" 
                  />
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-8 glass-premium border border-white/5 rounded-[3rem] overflow-hidden flex flex-col relative shadow-2xl">
        <AnimatePresence mode="wait">
          {showCreateForm ? (
            <motion.div 
              key="create-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-10 h-full overflow-y-auto custom-scrollbar"
            >
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white">{t('createForm.title')}</h2>
                  <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] mt-2">{t('createForm.subtitle')}</p>
                </div>
                <button onClick={() => setShowCreateForm(false)} className="p-3 hover:bg-white/5 rounded-2xl transition-colors">
                  <X className="w-6 h-6 text-zinc-500" />
                </button>
              </div>

              <form onSubmit={handleCreateTicket} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">{t('createForm.subject')}</label>
                    <input 
                      required
                      maxLength={100}
                      value={newTicket.subject}
                      onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                      placeholder={t('createForm.placeholderSubject')}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">{t('createForm.category')}</label>
                    <select 
                      value={newTicket.category}
                      onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-6 text-sm text-white focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="general">{t('createForm.categories.general')}</option>
                      <option value="technical">{t('createForm.categories.technical')}</option>
                      <option value="billing">{t('createForm.categories.billing')}</option>
                      <option value="product">{t('createForm.categories.product')}</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">{t('createForm.message')}</label>
                  <textarea 
                    required
                    maxLength={3000}
                    value={newTicket.message}
                    onChange={(e) => setNewTicket({...newTicket, message: e.target.value})}
                    placeholder={t('createForm.placeholderMessage')}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-6 text-sm text-white h-48 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                  />
                </div>

                <div className="pt-4">
                  <button 
                    disabled={sending}
                    className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all shadow-2xl shadow-blue-600/30 disabled:opacity-50 active:scale-95"
                  >
                    {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    {t('createForm.submit')}
                  </button>
                </div>
              </form>
            </motion.div>
          ) : selectedTicket ? (
            <motion.div 
              key={`ticket-${selectedTicket.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col h-full"
            >
              {/* Ticket Header */}
              <div className="p-8 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                     <LifeBuoy className="w-7 h-7 text-blue-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black italic tracking-tighter uppercase text-white leading-tight">{selectedTicket.subject}</h2>
                    <div className="flex items-center gap-2 mt-1">
                       <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">ID: {selectedTicket.id.slice(0,12)}</span>
                       <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                       <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">
                         {selectedTicket.category === 'general' ? t('createForm.categories.general') :
                          selectedTicket.category === 'technical' ? t('createForm.categories.technical') :
                          selectedTicket.category === 'billing' ? t('createForm.categories.billing') :
                          selectedTicket.category === 'product' ? t('createForm.categories.product') : selectedTicket.category}
                       </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                    selectedTicket.priority === 'high' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                  }`}>
                    {t('chat.priority', { priority: selectedTicket.priority.toUpperCase() })}
                  </div>
                  {selectedTicket.status !== 'closed' && (
                    <button 
                      onClick={() => handleCloseTicket(selectedTicket.id)}
                      className="px-4 py-2 bg-white/5 hover:bg-rose-600 hover:text-white text-zinc-500 text-[9px] font-black uppercase tracking-widest rounded-xl border border-white/10 transition-all"
                    >
                      {t('chat.closeTicket')}
                    </button>
                  )}
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-gradient-to-b from-transparent to-white/[0.01]">
                {selectedTicket.messages?.map((msg: any) => (
                  <div 
                    key={msg.id}
                    className={`flex gap-5 ${msg.sender_role === 'admin' || msg.sender_role === 'ai_assistant' ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all relative ${
                      msg.sender_role === 'ai_assistant' ? 'bg-purple-600 border-purple-400 shadow-xl shadow-purple-600/30' :
                      msg.sender_role === 'admin' ? 'bg-blue-600 border-blue-400 shadow-xl shadow-blue-600/30' :
                      'bg-zinc-800 border-white/10'
                    }`}>
                       {msg.sender_role === 'admin' ? <span className="text-[8px] font-black text-white absolute -top-5 left-0 uppercase tracking-widest whitespace-nowrap">{t('chat.supportTeam')}</span> : null}
                       {msg.sender_role === 'ai_assistant' ? <Bot className="w-6 h-6 text-white" /> :
                        msg.sender_role === 'admin' ? <User className="w-6 h-6 text-white" /> :
                        <User className="w-6 h-6 text-white" />}
                    </div>
                    <div className={`max-w-[75%] space-y-2 ${msg.sender_role === 'admin' || msg.sender_role === 'ai_assistant' ? '' : 'flex flex-col items-end'}`}>
                      <div className={`p-6 rounded-[2rem] text-sm leading-relaxed shadow-xl ${
                        msg.sender_role === 'ai_assistant' ? 'bg-purple-600/10 text-white border border-purple-500/30 rounded-tl-none' :
                        msg.sender_role === 'admin' ? 'bg-blue-600/10 text-white border border-blue-500/30 rounded-tl-none' :
                        'bg-white/[0.03] text-zinc-100 border border-white/5 rounded-tr-none'
                      }`}>
                        {msg.message}
                      </div>
                      <span className="text-[9px] text-zinc-600 font-black uppercase tracking-widest px-2">
                        {formatDate(msg.created_at, locale)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-8 border-t border-white/5 bg-white/[0.02] backdrop-blur-md">
                <form onSubmit={handleSendMessage} className="relative group">
                  <div className="absolute inset-0 bg-blue-600/5 blur-2xl group-focus-within:bg-blue-600/10 transition-all" />
                  <input 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={t('chat.placeholder')}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-8 pr-20 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all relative z-10"
                  />
                  <button 
                    disabled={sending || !newMessage.trim() || selectedTicket.status === 'closed'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all disabled:opacity-30 z-20 shadow-lg shadow-blue-600/20 active:scale-95"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full text-center p-20"
            >
              <div className="w-32 h-32 bg-white/[0.02] border border-white/5 rounded-[3rem] flex items-center justify-center mb-8 relative group">
                <div className="absolute inset-0 bg-blue-600/5 rounded-[3rem] blur-2xl group-hover:bg-blue-600/10 transition-all" />
                <LifeBuoy className="w-16 h-16 text-zinc-800 relative z-10 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white mb-3">{t('main.title')}</h2>
              <p className="text-zinc-500 max-w-sm text-xs font-medium leading-relaxed">
                {t('main.description')}
              </p>
              <button 
                onClick={() => setShowCreateForm(true)}
                className="mt-10 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all active:scale-95"
              >
                {t('main.newRequest')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
