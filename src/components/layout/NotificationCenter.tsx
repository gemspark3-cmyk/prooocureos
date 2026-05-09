'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, BellRing, Check, Clock, Info, AlertTriangle, Package, Zap, ExternalLink } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { procureos } from '@/lib/api'
import { formatDate } from '@/lib/formatters'
import { toast } from 'react-hot-toast'

export function NotificationCenter() {
  const t = useTranslations('dashboard.notifications');
  const tc = useTranslations('common.notifications');
  const tCommon = useTranslations('common');
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const unreadCount = notifications.filter(n => !n.is_read).length;

  const fetchNotifications = async () => {
    try {
      const res = await procureos.auth.listNotifications();
      if (res.items) {
        setNotifications(res.items);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await procureos.auth.markNotificationRead(id);
      setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
    } catch (error) {
      toast.error(tc('markFailed'));
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'order_update': return <Package className="w-4 h-4 text-blue-500" />;
      case 'new_offer': return <Zap className="w-4 h-4 text-amber-500" />;
      case 'alert': return <AlertTriangle className="w-4 h-4 text-rose-500" />;
      default: return <Info className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group"
      >
        {unreadCount > 0 ? (
          <BellRing className="w-5 h-5 text-blue-500 animate-pulse" />
        ) : (
          <Bell className="w-5 h-5 text-zinc-500 group-hover:text-white" />
        )}
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#020203]" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-4 w-96 max-h-[32rem] bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl z-50 overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div>
                  <h4 className="text-sm font-black text-white uppercase italic tracking-tighter">{t('title') || 'Notification Center'}</h4>
                  <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-1">{tc('systemFlow')}</p>
                </div>
                {unreadCount > 0 && (
                  <span className="px-2 py-1 bg-blue-600/10 text-blue-500 rounded-md text-[8px] font-black">{unreadCount} {tc('new')}</span>
                )}
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                {notifications.length === 0 ? (
                  <div className="py-12 text-center">
                    <Bell className="w-8 h-8 text-zinc-800 mx-auto mb-4" />
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{tc('noNotifications')}</p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div 
                      key={n.id}
                      onClick={() => !n.is_read && markAsRead(n.id)}
                      className={`p-4 rounded-2xl transition-all mb-1 cursor-pointer group flex items-start gap-4 ${
                        n.is_read ? 'opacity-50 hover:opacity-100' : 'bg-white/[0.03] hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className={`mt-1 p-2 rounded-xl ${n.is_read ? 'bg-zinc-800' : 'bg-blue-600/10'}`}>
                        {getIcon(n.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className={`text-[11px] font-black uppercase tracking-tight ${n.is_read ? 'text-zinc-400' : 'text-white'}`}>
                            {n.title}
                          </p>
                          {!n.is_read && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />}
                        </div>
                        <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed font-medium">
                          {n.message}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <span className="text-[8px] text-zinc-600 font-bold uppercase flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" /> {formatDate(n.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-4 border-t border-white/5 bg-white/[0.01]">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 text-[9px] font-black text-zinc-500 hover:text-white uppercase tracking-widest transition-colors"
                >
                  {tCommon('close')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
