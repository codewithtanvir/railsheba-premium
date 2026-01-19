import React from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { TRANSLATIONS } from '../constants';

interface WelcomeScreenProps {
  language: 'en' | 'bn';
  onLogin: () => void;
  onSignup: () => void;
  onGuest: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ language, onLogin, onSignup, onGuest }) => {
  const t = TRANSLATIONS[language];
  const { isInstallable, installPWA } = usePWAInstall();

  return (
    <div className="relative min-h-full w-full flex flex-col justify-between p-8 pb-12 pt-4 overflow-hidden">
      <div className="flex flex-col items-center animate-fade-in py-6">
        <div className="w-16 h-16 rounded-[22px] bg-emerald-500 flex items-center justify-center shadow-[0_15px_30px_rgba(16,185,129,0.25)] mb-3">
          <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
          </svg>
        </div>
        <span className="text-[12px] font-black uppercase tracking-[0.4em] text-white/80">RailSheba</span>
      </div>

      <div className="animate-slide-up">
        {isInstallable && (
          <div className="flex justify-center mb-6">
            <button
              onClick={installPWA}
              className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-5 py-2.5 rounded-full font-black text-[9px] uppercase tracking-[0.2em] hover:bg-emerald-500/20 active:scale-95 transition-all group"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>{t.install}</span>
            </button>
          </div>
        )}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-[900] leading-tight tracking-tighter uppercase mb-3">
            {t.travel_refined}
          </h1>
          <p className="text-zinc-500 text-sm font-semibold tracking-wide whitespace-pre-line">
            {t.premium_desc}
          </p>
        </div>

        <div className="glass-container p-6 rounded-[40px] border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col gap-3">
            <button
              onClick={onLogin}
              className="w-full bg-white text-black py-4 rounded-[22px] font-[900] text-sm hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              {t.login}
            </button>

            <button
              onClick={onSignup}
              className="w-full bg-white/5 text-white py-4 rounded-[22px] font-[900] text-sm hover:bg-white/10 transition-all active:scale-95 border border-white/20"
            >
              {t.signup}
            </button>

            <button
              onClick={onGuest}
              className="w-full text-zinc-600 hover:text-emerald-500 py-2 font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 mt-2"
            >
              {t.guest_explorer}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]"></div>
          <div className="w-1 h-1 rounded-full bg-white/10"></div>
          <div className="w-1 h-1 rounded-full bg-white/10"></div>
        </div>
      </div>

      <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />
    </div>
  );
};
