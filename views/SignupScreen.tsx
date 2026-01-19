import React, { useState } from 'react';
import { TRANSLATIONS } from '../constants';

interface SignupScreenProps {
  language: 'en' | 'bn';
  onBack: () => void;
  onSuccess: () => void;
}

export const SignupScreen: React.FC<SignupScreenProps> = ({ language, onBack, onSuccess }) => {
  const t = TRANSLATIONS[language];
  const [loading, setLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1200);
  };

  return (
    <div className="min-h-full w-full flex flex-col p-8 pb-12">
      <header className="pt-10 mb-10">
        <button onClick={onBack} className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center border-white/20 active:scale-90 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </header>

      <div className="flex-1">
        <h2 className="text-4xl font-[900] tracking-tighter mb-2 uppercase">{t.create_account}</h2>
        <p className="text-zinc-500 font-bold mb-10 uppercase tracking-widest text-xs">{t.join_premium}</p>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="glass-card p-5 rounded-3xl border-white/10">
            <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-2 block">{t.name}</label>
            <input required type="text" placeholder="Tanvir Rahman" className="bg-transparent w-full font-black text-lg outline-none" />
          </div>

          <div className="glass-card p-5 rounded-3xl border-white/10">
            <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-2 block">{t.phone}</label>
            <input required type="tel" placeholder="017XXXXXXXX" className="bg-transparent w-full font-black text-lg outline-none" />
          </div>

          <div className="glass-card p-5 rounded-3xl border-white/10">
            <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-2 block">{t.email}</label>
            <input required type="email" placeholder="tanvir@example.com" className="bg-transparent w-full font-black text-lg outline-none" />
          </div>

          <div className="glass-card p-5 rounded-3xl border-white/10">
            <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-2 block">{t.password}</label>
            <input required type="password" placeholder="••••••••" className="bg-transparent w-full font-black text-lg outline-none" />
          </div>

          <div className="flex items-start gap-3 px-2 py-4">
             <input type="checkbox" required className="mt-1 accent-emerald-500 w-4 h-4" />
             <p className="text-[10px] text-zinc-500 font-bold leading-relaxed uppercase tracking-wider">
               {t.terms_info}
             </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-6 rounded-3xl font-black text-lg shadow-xl active:scale-95 transition-all mt-4 disabled:opacity-50"
          >
            {loading ? t.processing : t.continue_verify}
          </button>
        </form>
      </div>

      <div className="py-8 text-center">
        <button onClick={onBack} className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
          {t.already_have_account} <span className="text-emerald-500">{t.login}</span>
        </button>
      </div>
    </div>
  );
};
