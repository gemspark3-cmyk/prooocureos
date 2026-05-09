"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { procureos } from '@/lib/api';
import { useTranslations } from 'next-intl';
import { useSystemError } from '../../../lib/error-handler';

export default function ResetPasswordPage() {
  const t = useTranslations('auth.resetPassword');
  const { getErrorMessage } = useSystemError();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  // 🛡️ SECURITY: Capture token and clear URL immediately to prevent leakage
  React.useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
      // Strip token from URL without refreshing the page
      const url = new URL(window.location.href);
      url.searchParams.delete('token');
      window.history.replaceState({}, '', url.pathname + url.search);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent double-submit

    if (formData.password !== formData.confirmPassword) {
      toast.error(t('errorMismatch'));
      return;
    }

    setLoading(true);
    try {
      // 🛡️ Use SDK for consistent proxy handling
      await procureos.auth.resetPassword({ 
        token: token || '', 
        password: formData.password 
      });

      setSuccess(true);
      toast.success(t('successToast'));
      setTimeout(() => router.push('/login'), 3000);
    } catch (err: any) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">{t('successTitle')}</h1>
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">{t('successMessage')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <Toaster position="top-center" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-zinc-900/50 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl shadow-2xl">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2 italic">{t('title')}</h1>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">{t('passwordLabel')}</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">{t('confirmPasswordLabel')}</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading || !token}
              className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 active:scale-95 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                <>
                  {t('submit')} <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            
            {!token && (
              <p className="text-red-500 text-[10px] font-bold uppercase text-center mt-4">{t('errorInvalidToken')}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
