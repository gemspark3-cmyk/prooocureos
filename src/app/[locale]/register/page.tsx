"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { procureos } from '@/lib/api';
import { 
  Building2, 
  Mail, 
  Lock, 
  UserPlus, 
  ArrowRight, 
  Loader2,
  ShieldCheck,
  Globe,
  Zap,
  Phone
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSystemError } from '../../../lib/error-handler';

export default function RegisterPage() {
  const t = useTranslations('auth.register');
  const { getErrorMessage } = useSystemError();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirm_password: '',
    company_name: '',
    contact_person: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 🛡️ Validation
    if (formData.password !== formData.confirm_password) {
      setError(t('errorMatch'));
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError(t('errorLength'));
      setLoading(false);
      return;
    }

    try {
      const { confirm_password, ...payload } = formData;
      await procureos.auth.register(payload);
      router.push('/login?registered=true');
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mesh-bg text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
      
      <div className="w-full max-w-xl relative z-10">
        <div className="glass-premium p-12 rounded-[3rem] shadow-2xl">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-blue-600/10 text-blue-500 rounded-[2rem] border border-blue-500/20">
              <UserPlus className="w-8 h-8" />
            </div>
          </div>
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black italic tracking-tighter uppercase mb-2">{t('title')}</h1>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-[0.2em]">{t('subtitle')}</p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-3 text-rose-500 text-xs font-bold uppercase">
              <Zap className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('companyNameLabel')}</label>
                <div className="relative group">
                  <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    required
                    type="text"
                    placeholder={t('companyNamePlaceholder')}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={formData.company_name}
                    onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('contactPersonLabel')}</label>
                <div className="relative group">
                  <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    required
                    type="text"
                    placeholder={t('contactPersonPlaceholder')}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={formData.contact_person}
                    onChange={(e) => setFormData({...formData, contact_person: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('phoneLabel')}</label>
                <div className="relative group">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    required
                    type="tel"
                    placeholder={t('phonePlaceholder')}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('emailLabel')}</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  required
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('passwordLabel')}</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    required
                    type="password"
                    placeholder={t('passwordPlaceholder')}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t('confirmPasswordLabel')}</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    required
                    type="password"
                    placeholder={t('confirmPasswordPlaceholder')}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={formData.confirm_password}
                    onChange={(e) => setFormData({...formData, confirm_password: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 active:scale-95 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                <>
                  {t('submit')} <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="pt-6 text-center border-t border-white/5">
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                {t('haveAccount')}{' '}
                <Link href="/login" className="text-blue-500 hover:text-blue-400 transition-colors">
                  {t('loginLink')}
                </Link>
              </p>
            </div>

            <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.1em] text-center px-4 leading-relaxed mt-4">
              {t.rich('termsText', {
                terms: (chunks) => <Link href="/legal/terms" className="text-zinc-500 hover:text-white transition-colors underline underline-offset-4">{chunks}</Link>,
                privacy: (chunks) => <Link href="/legal/privacy" className="text-zinc-500 hover:text-white transition-colors underline underline-offset-4">{chunks}</Link>
              })}
            </p>
          </form>
        </div>

        {/* Footer Features */}
        <div className="grid grid-cols-3 gap-4 mt-8 px-6">
          <div className="flex flex-col items-center gap-2 text-[8px] font-black text-zinc-600 uppercase tracking-[0.2em]">
            <Globe className="w-4 h-4" /> {t('features.global')}
          </div>
          <div className="flex flex-col items-center gap-2 text-[8px] font-black text-zinc-600 uppercase tracking-[0.2em]">
            <ShieldCheck className="w-4 h-4" /> {t('features.secure')}
          </div>
          <div className="flex flex-col items-center gap-2 text-[8px] font-black text-zinc-600 uppercase tracking-[0.2em]">
            <Zap className="w-4 h-4" /> {t('features.fast')}
          </div>
        </div>
      </div>
    </div>
  );
}
