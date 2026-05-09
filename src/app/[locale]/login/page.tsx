"use client";

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { procureos } from '@/lib/api';
import { 
  Mail, 
  Lock, 
  LogIn, 
  ArrowRight, 
  Loader2,
  CheckCircle2,
  Activity,
  X
} from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import { useSystemError } from '../../../lib/error-handler';

function LoginForm() {
  const t = useTranslations('auth.login');
  const tf = useTranslations('auth.forgotPassword');
  const { getErrorMessage } = useSystemError();
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password.length < 8) {
      setError(t('passwordError'));
      setLoading(false);
      return;
    }

    try {
      const res = await procureos.auth.login(formData);
      
      if (res.success) {
        localStorage.setItem('procureos_user', JSON.stringify(res.buyer));
        // 🛡️ SECURITY: Token is now handled via HttpOnly cookies in the proxy
        toast.success(t('success'));
        router.push('/');
      }
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const [showForgotModal, setShowForgotModal] = React.useState(false)
  const [forgotEmail, setForgotEmail] = React.useState('')
  const [forgotLoading, setForgotLoading] = React.useState(false)

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!forgotEmail) return
    
    setForgotLoading(true)
    try {
      await procureos.auth.forgotPassword(forgotEmail);
      toast.success(tf('success'))
      setShowForgotModal(false)
    } catch (err: any) {
      toast.error(getErrorMessage(err));
    } finally {
      setForgotLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <Toaster position="top-center" />
      
      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-[2.5rem] p-10 relative shadow-2xl">
            <button 
              onClick={() => setShowForgotModal(false)}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">{tf('title')}</h3>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-8">{tf('subtitle')}</p>
            
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">{t('emailLabel')}</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    required
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={forgotLoading}
                className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                {forgotLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : tf('submit')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="glass-premium p-12 rounded-[3rem] shadow-2xl">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-blue-600/10 text-blue-500 rounded-[2rem] border border-blue-500/20">
              <LogIn className="w-8 h-8" />
            </div>
          </div>
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black italic tracking-tighter uppercase mb-2">{t('title')}</h1>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-[0.2em]">{t('subtitle')}</p>
          </div>

          {registered && (
            <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-500 text-[10px] font-black uppercase tracking-widest italic">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              {t('registeredSuccess')}
            </div>
          )}

          {error && (
            <div className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-3 text-rose-500 text-xs font-bold uppercase">
              <Activity className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t('passwordLabel')}</label>
                <button 
                  type="button" 
                  onClick={() => setShowForgotModal(true)}
                  className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-blue-400"
                >
                  {t('forgotPassword')}
                </button>
              </div>
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

            <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.1em] text-center px-4 leading-relaxed mt-4">
              {t.rich('termsText', {
                terms: (chunks) => <Link href="/legal/terms" className="text-zinc-500 hover:text-white transition-colors underline underline-offset-4">{chunks}</Link>,
                privacy: (chunks) => <Link href="/legal/privacy" className="text-zinc-500 hover:text-white transition-colors underline underline-offset-4">{chunks}</Link>
              })}
            </p>

            <div className="pt-6 text-center border-t border-white/5 mt-8">
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                {t('noAccount')}{' '}
                <Link href="/register" className="text-blue-500 hover:text-blue-400 transition-colors">
                  {t('registerLink')}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
