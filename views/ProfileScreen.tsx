import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { TRANSLATIONS } from '../constants';

interface ProfileScreenProps {
  onBack: () => void;
  onLogout: () => void;
  language: 'en' | 'bn';
  setLanguage: (lang: 'en' | 'bn') => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack, onLogout, language, setLanguage }) => {
  const { isInstallable, installPWA } = usePWAInstall();
  const t = TRANSLATIONS[language];

  // State for user data
  const [userData, setUserData] = useState(() => {
    const auth = JSON.parse(localStorage.getItem('rs_auth') || '{}');
    return {
      name: auth.name || "Tanvir Rahman",
      phone: auth.phone || "017XXXXXXXX",
      email: auth.email || "tanvir@premium.com",
      nid: auth.nid || "1994XXXXXXX"
    };
  });

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [editingData, setEditingData] = useState(userData);

  // Security Toggles
  const [toggles, setToggles] = useState({
    twoFactor: true,
    cloud: true,
    biometric: false
  });

  const history = JSON.parse(localStorage.getItem('rs_history') || '[]');

  const handleUpdateProfile = () => {
    setUserData(editingData);
    localStorage.setItem('rs_auth', JSON.stringify({ ...JSON.parse(localStorage.getItem('rs_auth') || '{}'), ...editingData }));
    setActiveModal(null);
  };

  const userName = userData.name;
  const userPhone = userData.phone;

  return (
    <div className="min-h-full w-full pt-6 pb-24 relative">
      {/* Modals Layer */}
      {activeModal === 'personal' && (
        <div className="absolute inset-0 z-[200] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setActiveModal(null)} />
          <div className="glass-container relative z-10 w-full rounded-t-[40px] p-8 border-t border-white/20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] animate-slide-up max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8" />
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-[900] uppercase tracking-widest">{t.personal_info}</h2>
              <button onClick={() => setActiveModal(null)} className="w-10 h-10 glass-card rounded-xl flex items-center justify-center border-white/10">
                <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="space-y-5">
              {[
                { label: t.name, field: 'name', value: editingData.name, icon: 'user' },
                { label: t.phone, field: 'phone', value: editingData.phone, icon: 'phone' },
                { label: t.email, field: 'email', value: editingData.email, icon: 'mail' },
                { label: t.nid, field: 'nid', value: editingData.nid, icon: 'shield' },
              ].map((item) => (
                <div key={item.field} className="glass-card p-5 rounded-2xl border-white/5 bg-white/[0.02]">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 block">{item.label}</label>
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => setEditingData({ ...editingData, [item.field]: e.target.value })}
                    className="bg-transparent w-full text-base font-black outline-none text-emerald-400"
                  />
                </div>
              ))}

              <button
                onClick={handleUpdateProfile}
                className="w-full bg-emerald-500 text-black py-5 rounded-2xl font-black text-sm uppercase tracking-widest mt-4 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all"
              >
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'payment' && (
        <div className="absolute inset-0 z-[200] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setActiveModal(null)} />
          <div className="glass-container relative z-10 w-full rounded-t-[40px] p-8 border-t border-white/20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] animate-slide-up">
            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8" />
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-[900] uppercase tracking-widest">{t.payment_methods}</h2>
              <button onClick={() => setActiveModal(null)} className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center border-white/10">
                <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="space-y-3">
              {[
                { type: 'bKash', details: 'Primary • 017****4521', color: 'bg-[#D12053]', icon: '৳' },
                { type: 'Nagad', details: 'Backup • 019****9902', color: 'bg-[#F7931E]', icon: '৳' },
                { type: 'Visa Premium', details: '**** 4242', color: 'bg-[#1a1a1a]', icon: '💳' },
              ].map((item, idx) => (
                <div key={idx} className="glass-card p-5 rounded-2xl border-white/5 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center text-lg font-bold shadow-lg`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-black text-sm text-white">{item.type}</p>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">{item.details}</p>
                    </div>
                  </div>
                  <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              ))}
              <button className="w-full py-5 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-widest text-zinc-400 hover:border-emerald-500/30 hover:text-emerald-500 transition-all mt-4">
                + Add New Payment Method
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'security' && (
        <div className="fixed inset-0 z-[200] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setActiveModal(null)} />
          <div className="glass-container relative z-10 w-full rounded-t-[40px] p-8 border-t border-white/20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] animate-slide-up">
            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8" />
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-[900] uppercase tracking-widest">Privacy Settings</h2>
              <button onClick={() => setActiveModal(null)} className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center border-white/10">
                <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Two-Factor auth', field: 'twoFactor', icon: 'shield-check' },
                { label: 'Cloud Ticketing', field: 'cloud', icon: 'cloud' },
                { label: 'Biometric Unlock', field: 'biometric', icon: 'fingerprint' },
              ].map((item, idx) => (
                <div key={idx} className="glass-card p-5 rounded-2xl border-white/5 flex items-center justify-between">
                  <span className="text-sm font-bold text-zinc-300">{item.label}</span>
                  <button
                    onClick={() => setToggles(prev => ({ ...prev, [item.field]: !prev[item.field as keyof typeof toggles] }))}
                    className={`w-12 h-7 rounded-full transition-all p-1 flex ${toggles[item.field as keyof typeof toggles] ? 'bg-emerald-500 justify-end' : 'bg-zinc-800 justify-start'}`}
                  >
                    <div className="w-5 h-5 bg-white rounded-full shadow-lg transition-all" />
                  </button>
                </div>
              ))}
              <button className="w-full py-5 bg-emerald-500/10 rounded-2xl text-xs font-black uppercase tracking-widest text-emerald-500 mt-4 border border-emerald-500/20 active:scale-[0.98] transition-all">
                Update Privacy Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'help' && (
        <div className="fixed inset-0 z-[200] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setActiveModal(null)} />
          <div className="glass-container relative z-10 w-full rounded-t-[40px] p-8 border-t border-white/20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] animate-slide-up">
            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8" />
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-[900] uppercase tracking-widest">Concierge</h2>
              <button onClick={() => setActiveModal(null)} className="w-10 h-10 glass-card rounded-xl flex items-center justify-center border-white/10">
                <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Direct Helpline', value: '16124', icon: '📞' },
                { label: 'Elite Support', value: 'premium@br.gov.bd', icon: '✉️' },
              ].map((item, idx) => (
                <div key={idx} className="glass-card p-5 rounded-2xl border-white/5 flex items-center justify-between active:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-lg">{item.icon}</div>
                    <div>
                      <p className="font-bold text-sm text-white">{item.label}</p>
                      <p className="text-xs text-zinc-500">{item.value}</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <header className="px-6 flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center border-white/10 active:scale-90 transition-transform shadow-xl">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-[1000] tracking-tighter uppercase tracking-[0.1em]">{t.account}</h1>
        </div>
        <button onClick={onLogout} className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-2.5 rounded-2xl text-red-500 active:scale-95 transition-all shadow-lg shadow-red-500/5">
          <span className="text-[10px] font-black uppercase tracking-widest">{t.logout}</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>
        </button>
      </header>

      <div className="px-6 space-y-6">
        {/* Profile Card */}
        <div className="glass-container rounded-[32px] p-6 text-center border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-4 right-4 group">
            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2 by-1 rounded-full">
              <svg className="w-2.5 h-2.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
              <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest leading-none py-1.5">{t.verified}</span>
            </div>
          </div>

          <div
            onClick={() => { setActiveModal('personal'); setEditingData(userData); }}
            className="w-28 h-28 mx-auto mb-5 p-1 rounded-[40px] bg-gradient-to-tr from-emerald-500 to-zinc-800 shadow-2xl cursor-pointer active:scale-95 transition-all relative group"
          >
            <div className="absolute inset-0 bg-black/40 rounded-[36px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 border border-emerald-500/50">
               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
               </svg>
            </div>
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
              className="w-full h-full rounded-[36px] bg-zinc-900 object-cover"
              alt="User"
            />
          </div>

          <h2 className="text-3xl font-[1000] tracking-tighter">{userName}</h2>
          <p className="text-emerald-500/60 font-black text-[11px] uppercase tracking-[0.3em] mt-1.5">{userPhone}</p>

          <div className="mt-8 grid grid-cols-2 gap-3">
             <div className="glass-card rounded-2xl p-4 border-white/5 bg-white/[0.02]">
                <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mb-0.5">{t.trips}</p>
                <p className="text-xl font-[900] text-emerald-500 leading-none">{history.length}</p>
             </div>
             <div className="glass-card rounded-2xl p-4 border-white/5 bg-white/[0.02]">
                <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mb-0.5">{t.points}</p>
                <p className="text-xl font-[900] text-emerald-500 leading-none">{history.length * 150}</p>
             </div>
          </div>
        </div>

        {/* Global Settings */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-4">
            <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em]">Management</label>
            <div className="flex bg-zinc-900/50 rounded-full p-1 border border-white/5">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-[9px] font-black transition-all ${language === 'en' ? 'bg-emerald-500 text-black' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-3 py-1 rounded-full text-[9px] font-black transition-all ${language === 'bn' ? 'bg-emerald-500 text-black' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                বাংলা
              </button>
            </div>
          </div>
          <div className="glass-container rounded-3xl overflow-hidden border-white/10">
            {[
              { id: 'personal', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', label: t.personal_info },
              { id: 'payment', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: t.payment_methods },
              { id: 'security', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: t.security },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveModal(item.id);
                  if (item.id === 'personal') setEditingData(userData);
                }}
                className="w-full flex items-center justify-between p-5 hover:bg-white/[0.03] active:bg-white/[0.05] transition-all border-b border-white/5 last:border-0 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 glass-card rounded-lg flex items-center justify-center border-white/5 text-emerald-500 group-hover:scale-110 transition-transform">
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-zinc-300">{item.label}</span>
                </div>
                <svg className="w-4 h-4 text-zinc-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="space-y-4">
          <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em] ml-4">Advanced</label>
          <div className="space-y-3">
            {isInstallable && (
              <button
                onClick={installPWA}
                className="w-full glass-card rounded-[28px] p-5 flex items-center justify-between border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 active:scale-[0.98] transition-all shadow-xl shadow-emerald-500/5"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-[1000] text-white uppercase tracking-wider">{t.install}</p>
                    <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest">Optimized Web Experience</p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </button>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: "RailSheba Premium",
                      text: "Experience premium train travel in Bangladesh!",
                      url: window.location.origin,
                    });
                  }
                }}
                className="glass-card rounded-[28px] p-6 flex flex-col items-center gap-4 border-white/5 active:bg-white/5 active:scale-95 transition-all shadow-xl"
              >
                <div className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center text-emerald-500 border-white/10 shadow-inner">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <span className="text-[11px] font-[1000] uppercase tracking-widest text-zinc-400">{t.share}</span>
              </button>

              <button
                onClick={() => setActiveModal('help')}
                className="glass-card rounded-[28px] p-6 flex flex-col items-center gap-4 border-white/5 active:bg-white/5 active:scale-95 transition-all shadow-xl"
              >
                <div className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center text-emerald-500 border-white/10 shadow-inner">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.172-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <span className="text-[11px] font-[1000] uppercase tracking-widest text-zinc-400">{t.help}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 text-center space-y-2 opacity-30">
           <p className="text-[7px] text-zinc-400 font-black uppercase tracking-[0.6em]">Premium Rail Sheha</p>
           <p className="text-[7px] text-zinc-500 font-black uppercase tracking-[0.2em]">Build 24.1.19 • v2.0</p>
        </div>
      </div>
    </div>
  );
};
