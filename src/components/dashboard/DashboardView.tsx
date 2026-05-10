'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Clock, 
  Users,
  Cpu,
  CheckCircle2,
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { SupportView } from './SupportView'
import { RegisteredSuppliersView } from './RegisteredSuppliersView'
import { useSystemHealth } from '../../lib/hooks'
import { ShipmentDetailsModal } from './ShipmentDetailsModal'
import { useTranslations, useLocale } from 'next-intl'
import { formatDate, formatCurrency } from '../../lib/formatters'

// Modular Components
import { StatsCards } from './StatsCards'
import { RequestsTab } from './tabs/RequestsTab'
import { OrdersTab } from './tabs/OrdersTab'
import { ProfileTab } from './tabs/ProfileTab'

// Types
import { Buyer, RFQ, Order, Warehouse, BuyerStats } from '@/types/buyer'

interface DashboardViewProps {
  user: Buyer | null;
  activeTab: 'requests' | 'orders' | 'profile' | 'suppliers' | 'support' | 'team' | 'integrations';
  setActiveTab: (tab: any) => void;
  myRequests: RFQ[];
  requestsTotal: number;
  requestsPage: number;
  fetchRequests: (page: number, search?: string) => void;
  requestsSearch: string;
  setRequestsSearch: (s: string) => void;
  myOrders: Order[];
  ordersTotal: number;
  ordersPage: number;
  fetchOrders: (page: number, search?: string) => void;
  ordersSearch: string;
  setOrdersSearch: (s: string) => void;
  registeredSuppliers: any[];
  suppliersTotal: number;
  suppliersPage: number;
  fetchSuppliers: (page: number, search?: string) => void;
  suppliersSearch: string;
  setSuppliersSearch: (s: string) => void;
  myStats?: BuyerStats;
  onRefresh: () => void;
  onSelectRequest: (req: RFQ) => void;
  onRateOrder: (order: Order) => void;
  setCurrentView: (view: any) => void;
  profileData: Buyer;
  setProfileData: (data: Buyer) => void;
  handleUpdateProfile: (e: React.FormEvent) => void;
  isProfileDirty: boolean;
  setIsProfileDirty: (dirty: boolean) => void;
  loading: boolean;
  warehouses: Warehouse[];
  onRefreshWarehouses: () => void;
  onDeleteWarehouse?: (id: string) => void;
}

export function DashboardView({
  user,
  activeTab,
  setActiveTab,
  myRequests,
  requestsTotal,
  requestsPage,
  fetchRequests,
  myOrders,
  ordersTotal,
  ordersPage,
  fetchOrders,
  registeredSuppliers,
  suppliersTotal,
  suppliersPage,
  fetchSuppliers,
  myStats,
  onRefresh,
  onSelectRequest,
  onRateOrder,
  setCurrentView,
  profileData,
  setProfileData,
  handleUpdateProfile,
  isProfileDirty,
  setIsProfileDirty,
  loading,
  requestsSearch,
  setRequestsSearch,
  ordersSearch,
  setOrdersSearch,
  suppliersSearch,
  setSuppliersSearch,
  warehouses,
  onRefreshWarehouses,
  onDeleteWarehouse
}: DashboardViewProps) {
  const [selectedShipmentOrder, setSelectedShipmentOrder] = useState<Order | null>(null);
  const { isOnline } = useSystemHealth();
  const t = useTranslations('dashboard');
  const tc = useTranslations('common');
  const locale = useLocale();

  const exportData = async (type: 'requests' | 'orders') => {
    if (type === 'requests' && (!myRequests || myRequests.length === 0)) {
      toast.error(t('messages.noDataToExport'));
      return;
    }
    if (type === 'orders' && (!myOrders || myOrders.length === 0)) {
      toast.error(t('messages.noDataToExport'));
      return;
    }

    try {
      const XLSX = await import('xlsx-js-style');
      const wb = XLSX.utils.book_new();
      
      let wsData: any[] = [];
      let headerColor = "2563EB"; // Default Blue

      if (type === 'requests') {
        headerColor = "2563EB";
        wsData = myRequests.map(item => {
          const offers = item.offers || [];
          const bestOffer = offers.length > 0 ? Math.min(...offers.map((o: any) => Number(o.price) || Infinity)) : 0;
          const targetPrice = Number(item.target_price_total) || 0;
          const savings = targetPrice > 0 && bestOffer > 0 ? Math.max(0, ((targetPrice - bestOffer) / targetPrice) * 100).toFixed(1) : "0";
          
          return {
            [t('export.id')]: item.id.slice(0, 8).toUpperCase(),
            [t('export.date')]: formatDate(item.created_at, locale),
            [t('export.title')]: item.title,
            [t('export.category')]: tc(`categories.${item.category}`)?.toUpperCase() || item.category?.toUpperCase() || t('categories.general'),
            [t('export.quantity')]: item.quantity || '---',
            [t('export.status')]: tc(`statuses.${item.status}`)?.toUpperCase() || item.status?.toUpperCase(),
            [t('export.offersCount')]: offers.length,
            [t('export.bestOffer')]: bestOffer > 0 ? formatCurrency(bestOffer, item.preferred_currency || 'USD') : '---',
            [t('export.targetPrice')]: targetPrice > 0 ? formatCurrency(targetPrice, item.preferred_currency || 'USD') : '---',
            [t('export.savings')]: `%${savings}`
          };
        });
      } else {
        headerColor = "10B981"; // Green for Orders
        wsData = myOrders.map(item => ({
          [t('export.orderNo')]: `PO#${item.id.slice(0, 8).toUpperCase()}`,
          [t('export.date')]: formatDate(item.created_at, locale),
          [t('export.supplier')]: item.supplier?.company_name || '---',
          [t('export.amount')]: formatCurrency(item.total_amount || 0, item.currency || 'USD', locale),
          [t('export.status')]: tc(`statuses.${item.status}`)?.toUpperCase() || item.status?.toUpperCase(),
          [t('export.deliveryAddress')]: item.warehouse?.name || item.delivery_address || '---',
          [t('export.estDelivery')]: item.estimated_delivery ? formatDate(item.estimated_delivery, locale) : '---',
          [t('export.trackingNo')]: item.tracking_number || '---'
        }));
      }

      const ws = XLSX.utils.json_to_sheet(wsData);

      // 🎨 Apply Header Styling
      const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const address = XLSX.utils.encode_col(C) + "1";
        if (!ws[address]) continue;
        ws[address].s = {
          fill: { fgColor: { rgb: headerColor } },
          font: { color: { rgb: "FFFFFF" }, bold: true },
          alignment: { horizontal: "center", vertical: "center" },
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } }
          }
        };
      }

      // 📏 Auto-size columns
      const colWidths = Object.keys(wsData[0]).map(key => ({
        wch: Math.max(key.length, ...wsData.map(row => String(row[key]).length)) + 5
      }));
      ws['!cols'] = colWidths;

      XLSX.utils.book_append_sheet(wb, ws, type === 'requests' ? t('tabs.requests') : t('tabs.orders'));
      XLSX.writeFile(wb, `procureos_${type}_${new Date().toISOString().split('T')[0]}.xlsx`);
      toast.success(t('export.success'));
    } catch (err: any) {
      console.error("Export error:", err);
      toast.error(t('export.error'));
    }
  };

  const stats: BuyerStats = {
    activeRfqs: myStats?.activeRfqs || 0,
    estimatedSavings: myStats?.estimatedSavings || 0,
    avgResponseTime: myStats?.avgResponseTime || '---',
    totalSpent: myStats?.totalSpent || 0
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic text-[var(--foreground)] flex items-center gap-4">
             <div className="w-2 h-10 bg-blue-600 rounded-full" />
             {activeTab === 'requests' ? t('sections.opsCenter') : 
              activeTab === 'orders' ? t('sections.logistics') : 
              activeTab === 'team' ? t('sections.team') : 
              activeTab === 'integrations' ? t('sections.erp') : t('sections.identity')}
             
             <div className="flex items-center gap-2 ml-4 px-3 py-1 bg-[var(--foreground)]/5 rounded-full border border-[var(--foreground)]/5">
                <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">
                  AIP CORE {isOnline ? (t('online') || 'ONLINE') : (t('offline') || 'OFFLINE')}
                </span>
             </div>
           </h1>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2 ml-6">
            {activeTab === 'requests' ? t('descriptions.opsCenter') : 
             activeTab === 'orders' ? t('descriptions.logistics') :
             activeTab === 'team' ? t('descriptions.team') :
             activeTab === 'integrations' ? t('descriptions.erp') :
             t('descriptions.identity')}
          </p>
        </div>
        <div className="flex flex-wrap bg-[var(--foreground)]/5 p-1 rounded-2xl border border-[var(--foreground)]/10 gap-1 self-start md:self-auto backdrop-blur-md">
          {[
            { id: 'requests', label: t('tabs.requests') },
            { id: 'orders', label: t('tabs.orders') },
            { id: 'suppliers', label: t('tabs.mySuppliers') },
            { id: 'team', label: t('tabs.team') },
            { id: 'integrations', label: t('tabs.integrations') },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-zinc-500 hover:text-[var(--foreground)]'}`}
            >
              {tab.label}
            </button>
          ))}
          <a 
            href={profileData?.custom_fx_url || "https://www.tcmb.gov.tr/kurlar/today.xml"}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-xl text-[10px] font-black text-blue-400 bg-blue-500/5 hover:bg-blue-500/10 border border-blue-500/10 transition-all flex items-center gap-2"
          >
            {t('fxTracking')}
          </a>
          <button 
            onClick={() => setActiveTab('support')}
            className={`px-6 py-2 rounded-xl text-[10px] font-black transition-all ${activeTab === 'support' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-zinc-500 hover:text-white'}`}
          >
            {t('tabs.support')}
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-2 rounded-xl text-[10px] font-black transition-all ${activeTab === 'profile' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-zinc-500 hover:text-white'}`}
          >
            {t('tabs.profile')} {isProfileDirty && <span className="ml-1 w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />}
          </button>
          <button onClick={onRefresh} className="p-3 text-zinc-500 hover:text-[var(--foreground)] transition-colors">
             <Clock className="w-4 h-4" />
          </button>
        </div>
      </div>

      <StatsCards 
        stats={stats} 
        profileData={profileData} 
        setCurrentView={setCurrentView} 
      />

      <div className="mt-12">
        <AnimatePresence mode="wait">
          {activeTab === 'requests' && (
            <motion.div key="requests" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <RequestsTab 
                myRequests={myRequests}
                requestsTotal={requestsTotal}
                requestsPage={requestsPage}
                fetchRequests={fetchRequests}
                requestsSearch={requestsSearch}
                setRequestsSearch={setRequestsSearch}
                onSelectRequest={onSelectRequest}
                exportData={exportData}
                setCurrentView={setCurrentView}
              />
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div key="orders" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <OrdersTab 
                myOrders={myOrders}
                ordersTotal={ordersTotal}
                ordersPage={ordersPage}
                fetchOrders={fetchOrders}
                ordersSearch={ordersSearch}
                setOrdersSearch={setOrdersSearch}
                onRateOrder={onRateOrder}
                setSelectedShipmentOrder={setSelectedShipmentOrder}
                exportData={exportData}
                setActiveTab={setActiveTab}
              />
            </motion.div>
          )}

          {activeTab === 'suppliers' && (
            <motion.div key="suppliers" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <RegisteredSuppliersView 
                suppliers={registeredSuppliers}
                total={suppliersTotal}
                page={suppliersPage}
                onPageChange={(p: number) => fetchSuppliers(p, suppliersSearch)}
                onRefresh={() => fetchSuppliers(suppliersPage, suppliersSearch)}
                search={suppliersSearch}
                onSearchChange={setSuppliersSearch}
              />
            </motion.div>
          )}

          {activeTab === 'team' && (
            <motion.div key="team" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
               <div className="p-12 text-center border-2 border-dashed border-[var(--foreground)]/5 rounded-[4rem] bg-[var(--foreground)]/[0.01] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-transparent pointer-events-none" />
                  <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-blue-500/20 relative z-10">
                     <Users className="w-10 h-10 text-blue-500" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-3xl font-black text-[var(--foreground)] italic uppercase tracking-tighter mb-4">{t('team.title')}</h3>
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-6">{t('team.roadmap')}</p>
                    <p className="text-zinc-500 max-w-lg mx-auto font-medium leading-relaxed italic mb-8 text-sm">
                      {t('team.description')}
                    </p>
                    <div className="flex justify-center gap-4">
                       <span className="px-5 py-2 bg-white/5 rounded-full text-[9px] font-black text-zinc-400 border border-white/10 uppercase tracking-widest">{t('team.multiUser')}</span>
                       <span className="px-5 py-2 bg-white/5 rounded-full text-[9px] font-black text-zinc-400 border border-white/10 uppercase tracking-widest">{t('team.workflows')}</span>
                    </div>
                  </div>
               </div>
            </motion.div>
          )}

          {activeTab === 'integrations' && (
            <motion.div key="integrations" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-12">
               <div className="p-16 text-center border-2 border-dashed border-[var(--foreground)]/5 rounded-[4rem] bg-[var(--foreground)]/[0.01] relative overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/5 blur-[100px] -mt-48 rounded-full" />
                  <div className="w-24 h-24 bg-indigo-600/10 rounded-[2rem] flex items-center justify-center mx-auto mb-10 relative z-10 border border-indigo-500/10">
                     <Cpu className="w-12 h-12 text-indigo-500" />
                  </div>
                  <div className="relative z-10 max-w-2xl mx-auto">
                    <h3 className="text-4xl font-black text-[var(--foreground)] italic uppercase tracking-tighter mb-4">{t('integrations.title')}</h3>
                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-8">{t('integrations.roadmap')}</p>
                    <p className="text-zinc-400 font-medium leading-relaxed mb-12 italic text-lg">
                      {t('integrations.description')}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                       {['SAP S/4HANA', 'Oracle ERP', 'MS Dynamics', 'Logo / Mikro'].map(erp => (
                         <div key={erp} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center gap-3 hover:bg-white/[0.05] transition-all group">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/5 border border-indigo-500/10 group-hover:border-indigo-500/30 transition-all flex items-center justify-center">
                               <Cpu className="w-4 h-4 text-indigo-500/40 group-hover:text-indigo-500 transition-all" />
                            </div>
                            <span className="text-[10px] font-black text-zinc-500 group-hover:text-zinc-300 uppercase tracking-widest">{erp}</span>
                         </div>
                       ))}
                    </div>
                  </div>
               </div>
            </motion.div>
          )}

          {activeTab === 'support' && (
            <motion.div key="support" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <SupportView />
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <ProfileTab 
                user={user}
                profileData={profileData}
                setProfileData={setProfileData}
                handleUpdateProfile={handleUpdateProfile}
                isProfileDirty={isProfileDirty}
                setIsProfileDirty={setIsProfileDirty}
                loading={loading}
                warehouses={warehouses}
                onRefreshWarehouses={onRefreshWarehouses}
                onDeleteWarehouse={onDeleteWarehouse}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedShipmentOrder && (
          <ShipmentDetailsModal 
            isOpen={!!selectedShipmentOrder}
            onClose={() => setSelectedShipmentOrder(null)}
            order={selectedShipmentOrder}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
