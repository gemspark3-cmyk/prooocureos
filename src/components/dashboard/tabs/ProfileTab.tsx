'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Settings, 
  ShieldCheck, 
  MapPin, 
  Trash2, 
  Building
} from 'lucide-react'
import { Buyer, Warehouse } from '@/types/buyer'
import { COUNTRIES } from '@/lib/constants'
import { toast } from 'react-hot-toast'
import { useTranslations } from 'next-intl'

interface ProfileTabProps {
  user: Buyer | null;
  profileData: any;
  setProfileData: (data: any) => void;
  handleUpdateProfile: (e: React.FormEvent) => void;
  isProfileDirty: boolean;
  setIsProfileDirty: (dirty: boolean) => void;
  loading: boolean;
  warehouses: Warehouse[];
  onRefreshWarehouses: () => void;
  onDeleteWarehouse?: (id: string) => void;
}

export function ProfileTab({
  user,
  profileData,
  setProfileData,
  handleUpdateProfile,
  isProfileDirty,
  setIsProfileDirty,
  loading,
  warehouses,
  onRefreshWarehouses,
  onDeleteWarehouse
}: ProfileTabProps) {
  const t = useTranslations('dashboard.profile');
  const [showAddWarehouse, setShowAddWarehouse] = useState(false);
  const [newWarehouse, setNewWarehouse] = useState({
    name: '',
    address_full: '',
    city: '',
    country: 'TR',
    postal_code: '',
    contact_person: '',
    contact_phone: ''
  });
  const [isAddingWarehouse, setIsAddingWarehouse] = useState(false);

  const handleAddWarehouse = async () => {
    if (!newWarehouse.name || !newWarehouse.address_full) {
      return toast.error(t('messages.fillRequired'));
    }
    setIsAddingWarehouse(true);
    try {
      const { procureos } = await import('@/lib/api');
      await procureos.auth.addWarehouse(newWarehouse);
      toast.success(t('messages.warehouseAdded'));
      setNewWarehouse({
        name: '',
        address_full: '',
        city: '',
        country: 'TR',
        postal_code: '',
        contact_person: '',
        contact_phone: ''
      });
      setShowAddWarehouse(false);
      onRefreshWarehouses();
    } catch (err: any) {
      toast.error(err.message || t('messages.error'));
    } finally {
      setIsAddingWarehouse(false);
    }
  };

  const handleDeleteWarehouse = async (id: string) => {
    if (!window.confirm(t('messages.confirmDelete'))) return;
    try {
      const { procureos } = await import('@/lib/api');
      await procureos.auth.deleteWarehouse(id);
      toast.success(t('messages.warehouseDeleted'));
      if (onDeleteWarehouse) onDeleteWarehouse(id);
      onRefreshWarehouses();
    } catch (err: any) {
      toast.error(err.message || t('messages.error'));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/[0.02] border border-white/5 p-10 md:p-16 rounded-[4rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] -mr-32 -mt-32 rounded-full" />
        
        <div className="flex flex-col md:flex-row items-center gap-10 mb-16 pb-16 border-b border-white/5">
          <div className="w-32 h-32 bg-white/5 rounded-[2.5rem] flex items-center justify-center text-4xl font-black text-zinc-800 border border-white/10 shadow-2xl relative group">
            {profileData?.company_name?.[0] || 'A'}
            <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem] flex items-center justify-center">
               <Settings className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none mb-2">{profileData?.company_name || '—'}</h3>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">{user?.email}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
               <span className="px-4 py-1.5 bg-blue-600/10 text-blue-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-blue-500/20">{t('corporateAccount')}</span>
               <span className="px-4 py-1.5 bg-emerald-600/10 text-emerald-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-500/20 italic">{t('aipVerified')}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-16">
          {/* Section 1: Kurumsal Bilgiler */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">{t('sections.corporate')}</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('fields.companyName')}</label>
                <input 
                  type="text" 
                  value={profileData?.company_name || ''}
                  onChange={(e) => {
                    setProfileData({ ...profileData, company_name: e.target.value });
                    setIsProfileDirty(true);
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white font-black italic focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('fields.website')}</label>
                <input 
                  type="url" 
                  value={profileData?.website || ''}
                  onChange={(e) => {
                    setProfileData({ ...profileData, website: e.target.value });
                    setIsProfileDirty(true);
                  }}
                  placeholder={t('placeholders.website')}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('fields.taxId')}</label>
                  <input 
                    type="text" 
                    value={profileData?.tax_id || ''}
                    onChange={(e) => {
                      setProfileData({ ...profileData, tax_id: e.target.value });
                      setIsProfileDirty(true);
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('fields.taxOffice')}</label>
                  <input 
                    type="text" 
                    value={profileData?.tax_office || ''}
                    onChange={(e) => {
                      setProfileData({ ...profileData, tax_office: e.target.value });
                      setIsProfileDirty(true);
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('fields.tradeRegistry')}</label>
                  <input 
                    type="text" 
                    value={profileData?.trade_registry_number || ''}
                    onChange={(e) => {
                      setProfileData({ ...profileData, trade_registry_number: e.target.value });
                      setIsProfileDirty(true);
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('fields.mersis')}</label>
                  <input 
                    type="text" 
                    value={profileData?.mersis_number || ''}
                    onChange={(e) => {
                      setProfileData({ ...profileData, mersis_number: e.target.value });
                      setIsProfileDirty(true);
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('fields.industry')}</label>
                <input 
                  type="text" 
                  value={profileData?.industry || ''}
                  onChange={(e) => {
                    setProfileData({ ...profileData, industry: e.target.value });
                    setIsProfileDirty(true);
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('fields.employeeCount')}</label>
                <select 
                  value={profileData?.employee_count || ''}
                  onChange={(e) => {
                    setProfileData({ ...profileData, employee_count: e.target.value });
                    setIsProfileDirty(true);
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-zinc-900 text-white">{t('select')}</option>
                  <option value="1-10" className="bg-zinc-900 text-white">1-10</option>
                  <option value="11-50" className="bg-zinc-900 text-white">11-50</option>
                  <option value="51-250" className="bg-zinc-900 text-white">51-250</option>
                  <option value="251-1000" className="bg-zinc-900 text-white">251-1000</option>
                  <option value="1000+" className="bg-zinc-900 text-white">1000+</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('fields.establishmentYear')}</label>
                <input 
                  type="text" 
                  value={profileData?.year_established || ''}
                  onChange={(e) => {
                    setProfileData({ ...profileData, year_established: e.target.value });
                    setIsProfileDirty(true);
                  }}
                  placeholder={t('placeholders.establishmentYear')}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('fields.fullAddress')}</label>
              <textarea 
                value={profileData?.address_full || ''}
                onChange={(e) => {
                  setProfileData({ ...profileData, address_full: e.target.value });
                  setIsProfileDirty(true);
                }}
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none italic leading-relaxed"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('fields.city')}</label>
                <input 
                  type="text" 
                  value={profileData?.city || ''}
                  onChange={(e) => {
                    setProfileData({ ...profileData, city: e.target.value });
                    setIsProfileDirty(true);
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('fields.country')}</label>
                <select 
                  value={profileData?.country || 'TR'}
                  onChange={(e) => {
                    setProfileData({ ...profileData, country: e.target.value });
                    setIsProfileDirty(true);
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer"
                >
                  {COUNTRIES.map((c: any) => (
                    <option key={c.code} value={c.code} className="bg-zinc-900 text-white">
                      {c.name} ({c.code})
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('fields.postalCode')}</label>
                <input 
                  type="text" 
                  value={profileData?.postal_code || ''}
                  onChange={(e) => {
                    setProfileData({ ...profileData, postal_code: e.target.value });
                    setIsProfileDirty(true);
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 2: İletişim Bilgileri */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-6 bg-emerald-600 rounded-full" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">{t('sections.contact')}</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('fields.contactPerson')}</label>
                <input 
                  type="text" 
                  value={profileData?.contact_person || ''}
                  onChange={(e) => {
                    setProfileData({ ...profileData, contact_person: e.target.value });
                    setIsProfileDirty(true);
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('fields.phone')}</label>
                <input 
                  type="tel" 
                  value={profileData?.phone || ''}
                  onChange={(e) => {
                    setProfileData({ ...profileData, phone: e.target.value });
                    setIsProfileDirty(true);
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Finansal Ayarlar */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-6 bg-purple-600 rounded-full" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">{t('sections.financial')}</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('fields.approvalLimit')}</label>
                <input 
                  type="number" 
                  value={profileData?.approval_limit_usd || 0}
                  onChange={(e) => {
                    setProfileData({ ...profileData, approval_limit_usd: Number(e.target.value) });
                    setIsProfileDirty(true);
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white font-black italic focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('fields.preferredCurrency')}</label>
                <div className="flex gap-2">
                  <select 
                    value={['USD', 'EUR', 'TRY', 'GBP', 'CNY', 'JPY', 'CAD', 'AUD', 'CHF', 'INR', 'SGD'].includes(profileData?.preferred_currency) ? profileData?.preferred_currency : (profileData?.preferred_currency ? 'OTHER' : 'USD')}
                    onChange={(e) => {
                      const val = e.target.value === 'OTHER' ? '' : e.target.value;
                      setProfileData({ ...profileData, preferred_currency: val });
                      setIsProfileDirty(true);
                    }}
                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white font-black focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="USD" className="bg-zinc-900 text-white">USD ($)</option>
                    <option value="EUR" className="bg-zinc-900 text-white">EUR (€)</option>
                    <option value="TRY" className="bg-zinc-900 text-white">TRY (₺)</option>
                    <option value="GBP" className="bg-zinc-900 text-white">GBP (£)</option>
                    <option value="CNY" className="bg-zinc-900 text-white">CNY (¥)</option>
                    <option value="JPY" className="bg-zinc-900 text-white">JPY (¥)</option>
                    <option value="CAD" className="bg-zinc-900 text-white">CAD ($)</option>
                    <option value="AUD" className="bg-zinc-900 text-white">AUD ($)</option>
                    <option value="CHF" className="bg-zinc-900 text-white">CHF (Fr)</option>
                    <option value="INR" className="bg-zinc-900 text-white">INR (₹)</option>
                    <option value="SGD" className="bg-zinc-900 text-white">SGD ($)</option>
                    <option value="OTHER" className="bg-zinc-900 text-white">{t('fields.otherCurrency')}</option>
                  </select>
                  {(!['USD', 'EUR', 'TRY', 'GBP', 'CNY', 'JPY', 'CAD', 'AUD', 'CHF', 'INR', 'SGD'].includes(profileData?.preferred_currency) || profileData?.preferred_currency === '') && (
                    <input
                      type="text"
                      placeholder="---"
                      className="w-1/3 bg-white/5 border border-white/10 rounded-2xl py-5 px-4 text-white font-black focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                      value={profileData?.preferred_currency || ''}
                      onChange={(e) => {
                        setProfileData({ ...profileData, preferred_currency: e.target.value.toUpperCase() });
                        setIsProfileDirty(true);
                      }}
                      maxLength={3}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Depo Yönetimi */}
          <div className="space-y-8 pt-8 border-t border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">{t('sections.warehouse')}</h4>
              </div>
              <button 
                type="button"
                onClick={() => setShowAddWarehouse(!showAddWarehouse)}
                className="px-4 py-2 bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white rounded-xl text-[8px] font-black uppercase tracking-widest border border-blue-500/20 transition-all flex items-center gap-2"
              >
                {showAddWarehouse ? t('buttons.cancel') : t('buttons.addWarehouse')}
              </button>
            </div>

            <AnimatePresence>
              {showAddWarehouse && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] space-y-6 overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="space-y-3">
                       <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{t('fields.warehouseName')}</label>
                       <input 
                         type="text"
                         value={newWarehouse.name}
                         onChange={(e) => setNewWarehouse({...newWarehouse, name: e.target.value})}
                         placeholder={t('placeholders.warehouseName')}
                         className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white text-xs outline-none focus:ring-1 focus:ring-blue-500/50"
                       />
                     </div>
                     <div className="space-y-3">
                       <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{t('fields.city')}</label>
                       <input 
                         type="text"
                         value={newWarehouse.city}
                         onChange={(e) => setNewWarehouse({...newWarehouse, city: e.target.value})}
                         placeholder={t('placeholders.city')}
                         className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white text-xs outline-none focus:ring-1 focus:ring-blue-500/50"
                       />
                     </div>
                     <div className="space-y-3">
                       <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{t('fields.country')}</label>
                       <select 
                         value={newWarehouse.country}
                         onChange={(e) => setNewWarehouse({...newWarehouse, country: e.target.value})}
                         className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white text-xs outline-none focus:ring-1 focus:ring-blue-500/50 appearance-none cursor-pointer"
                       >
                         {COUNTRIES.map((c: any) => (
                           <option key={c.code} value={c.code} className="bg-zinc-900 text-white">{c.name} ({c.code})</option>
                         ))}
                       </select>
                     </div>
                  </div>
                  <div className="space-y-3">
                     <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{t('fields.fullAddress')}</label>
                     <textarea 
                       value={newWarehouse.address_full}
                       onChange={(e) => setNewWarehouse({...newWarehouse, address_full: e.target.value})}
                       rows={2}
                       className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white text-xs outline-none focus:ring-1 focus:ring-blue-500/50 resize-none"
                     />
                  </div>
                  <div className="flex justify-end">
                     <button 
                       type="button"
                       disabled={isAddingWarehouse}
                       onClick={handleAddWarehouse}
                       className="px-8 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all flex items-center gap-2"
                     >
                       {isAddingWarehouse ? t('buttons.saving') : t('buttons.saveWarehouse')}
                     </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {warehouses.length === 0 ? (
                <div className="col-span-full py-10 text-center border border-dashed border-white/5 rounded-[2rem]">
                   <MapPin className="w-8 h-8 text-zinc-800 mx-auto mb-2" />
                   <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{t('messages.noWarehouses')}</p>
                </div>
              ) : (
                warehouses.map((w: Warehouse) => (
                  <div key={w.id} className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl flex items-start justify-between group">
                     <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500">
                           <Building className="w-5 h-5" />
                        </div>
                        <div>
                           <h5 className="text-[11px] font-black text-white uppercase italic">{w.name}</h5>
                           <p className="text-[9px] text-zinc-500 mt-1 leading-relaxed line-clamp-2">{w.address_full}</p>
                           <div className="flex items-center gap-2 mt-2">
                              <span className="text-[8px] font-black text-zinc-600 uppercase">{(w.country || '').toUpperCase()} / {(w.city || '').toUpperCase()}</span>
                              {w.is_default && <span className="text-[8px] font-black text-blue-500 uppercase tracking-tighter px-2 py-0.5 bg-blue-500/10 rounded-full border border-blue-500/20">{t('default')}</span>}
                           </div>
                        </div>
                     </div>
                     <button 
                       type="button"
                       onClick={() => handleDeleteWarehouse(w.id)}
                       className="p-2 text-zinc-700 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100"
                     >
                       <Trash2 className="w-4 h-4" />
                     </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-10">
            <button 
              type="submit"
              disabled={loading || !isProfileDirty}
              className="w-full py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] transition-all shadow-2xl shadow-blue-600/30 disabled:opacity-30 flex items-center justify-center gap-4"
            >
               <ShieldCheck className="w-5 h-5" /> {t('buttons.saveProfile')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
