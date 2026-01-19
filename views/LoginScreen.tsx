import React, { useState } from 'react';
import { TRANSLATIONS } from '../constants';

interface LoginScreenProps {
  language: 'en' | 'bn';
  onBack: () => void;
  onSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ language, onBack, onSuccess }) => {
  const t = TRANSLATIONS[language];
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-full w-full flex flex-col p-8 pb-12">
      <header className="pt-10 mb-12">
        <button onClick={onBack} className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center border-white/20 active:scale-90 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </header>

      <div className="flex-1">
        <h2 className="text-4xl font-[900] tracking-tighter mb-2 uppercase">{t.welcome_back}</h2>
        <p className="text-zinc-500 font-bold mb-12 uppercase tracking-widest text-xs">{t.sign_in_desc}</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="glass-card p-5 rounded-3xl border-white/10 focus-within:border-emerald-500/50 transition-all">
              <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-2 block">{t.mobile_email}</label>
              <input
                required
                type="text"
                placeholder="017XXXXXXX"
                className="bg-transparent w-full font-black text-xl outline-none placeholder:text-zinc-800"
              />
            </div>

            <div className="glass-card p-5 rounded-3xl border-white/10 focus-within:border-emerald-500/50 transition-all">
              <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-2 block">{t.password}</label>
              <input
                required
                type="password"
                placeholder="••••••••"
                className="bg-transparent w-full font-black text-xl outline-none placeholder:text-zinc-800"
              />
            </div>
          </div>

          <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest ml-auto block hover:text-emerald-400">
            {t.forgot_password}
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 text-black py-6 rounded-3xl font-black text-lg shadow-xl shadow-emerald-500/20 active:scale-95 transition-all mt-8 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              t.secure_access
            )}
          </button>
        </form>
      </div>

      <div className="mt-auto py-8 text-center">
        <p className="text-zinc-600 text-[8px] font-black uppercase tracking-[0.4em]">
          {t.secured_by}
        </p>
      </div>
    </div>
  );
};
