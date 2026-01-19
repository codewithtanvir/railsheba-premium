import React, { useState } from 'react';
import { TRANSLATIONS } from '../constants';

interface NIDVerificationScreenProps {
  language: 'en' | 'bn';
  onBack: () => void;
  onSuccess: () => void;
}

export const NIDVerificationScreen: React.FC<NIDVerificationScreenProps> = ({ language, onBack, onSuccess }) => {
  const t = TRANSLATIONS[language];
  const [verifying, setVerifying] = useState(false);

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="min-h-full w-full flex flex-col p-8 pb-12 bg-black/40 backdrop-blur-md">
      <header className="pt-10 mb-8">
        <button onClick={onBack} className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center border-white/20">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </header>

      <div className="flex-1 text-center">
        <div className="w-24 h-24 bg-emerald-500/10 rounded-[32px] flex items-center justify-center mx-auto mb-8 border border-emerald-500/20">
           <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
           </svg>
        </div>

        <h2 className="text-3xl font-[900] tracking-tighter mb-4 uppercase">{t.nid_verification}</h2>
        <p className="text-zinc-400 text-sm font-medium leading-relaxed mb-10">
          {t.nid_policy}
        </p>

        <div className="space-y-6">
          <div className="glass-card p-6 rounded-[32px] border-white/10 text-left">
            <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-3 block">{t.nid}</label>
            <input
              type="text"
              placeholder="199XXXXXXXXXXXX"
              className="bg-transparent w-full font-black text-2xl outline-none text-emerald-400 placeholder:text-zinc-800"
            />
          </div>

          <div className="glass-card p-8 rounded-[40px] border-dashed border-white/20 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-white/5 transition-all">
             <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
             </div>
             <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t.scan_upload}</p>
          </div>
        </div>

        <button
          onClick={handleVerify}
          disabled={verifying}
          className="w-full bg-emerald-500 text-black py-6 rounded-3xl font-black text-lg shadow-xl shadow-emerald-500/20 active:scale-95 transition-all mt-10 flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {verifying ? (
             <div className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin" />
          ) : t.verify_now}
        </button>
      </div>

      <div className="py-6 text-center">
         <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.2em]">{t.verified_by_ec}</p>
      </div>
    </div>
  );
};
