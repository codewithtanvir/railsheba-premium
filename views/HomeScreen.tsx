import React, { useState, useEffect } from 'react';
import { STATIONS, TRAIN_CLASSES, TRANSLATIONS } from '../constants';

interface HomeScreenProps {
  language: 'en' | 'bn';
  onSearch: (data: any) => void;
  onViewHistory: () => void;
  onTrack: () => void;
  onViewNotifications: () => void;
  hasUnreadNotifications: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  language,
  onSearch,
  onViewHistory,
  onTrack,
  onViewNotifications,
  hasUnreadNotifications
}) => {
  const t = TRANSLATIONS[language];
  const [from, setFrom] = useState('Dhaka');
  const [to, setTo] = useState('Chattogram');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [trainClass, setTrainClass] = useState('AC_S');
  const [activeModal, setActiveModal] = useState<'from' | 'to' | 'class' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Get dynamic data
  const auth = JSON.parse(localStorage.getItem('rs_auth') || '{}');
  const history = JSON.parse(localStorage.getItem('rs_history') || '[]');
  const latestTicket = history.length > 0 ? history[history.length - 1] : null;
  const userName = auth.name || "Tanvir Rahman";

  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      full: d.toISOString().split('T')[0],
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' })
    };
  });

  const filteredStations = STATIONS.filter(s =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStationSelect = (station: string) => {
    if (activeModal === 'from') setFrom(station);
    if (activeModal === 'to') setTo(station);
    setActiveModal(null);
    setSearchQuery('');
  };

  const handleClassSelect = (cls: string) => {
    setTrainClass(cls);
    setActiveModal(null);
  };

  return (
    <div className="min-h-full w-full pb-32 pt-6 animate-fade-in relative">
      {activeModal && (
        <div className="absolute inset-0 z-[200] flex flex-col justify-end bg-black/70 backdrop-blur-md">
          <div className="glass-container h-[80%] rounded-t-[40px] p-6 border-t border-white/20 flex flex-col shadow-2xl animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-[900] uppercase tracking-tighter">
                {activeModal === 'class' ? t.select_class : t.select_station}
              </h2>
              <button onClick={() => { setActiveModal(null); setSearchQuery(''); }} className="w-10 h-10 glass-card rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {activeModal !== 'class' && (
              <div className="glass-card p-4 rounded-[20px] flex items-center gap-3 mb-4 border-white/10">
                <svg className="w-5 h-5 text-emerald-500/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input autoFocus type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent w-full font-bold text-base outline-none placeholder:text-zinc-700" />
              </div>
            )}

            <div className="flex-1 overflow-y-auto no-scrollbar space-y-3">
              {activeModal === 'class' ? (
                TRAIN_CLASSES.map(cls => (
                  <button key={cls} onClick={() => handleClassSelect(cls)} className={`w-full p-5 rounded-[24px] flex items-center justify-between border transition-all ${trainClass === cls ? 'bg-emerald-500 text-black border-emerald-500 shadow-xl' : 'glass-card border-white/5'}`}>
                    <span className="font-black text-sm tracking-widest uppercase">{cls}</span>
                    {trainClass === cls && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
                  </button>
                ))
              ) : (
                filteredStations.map(station => (
                  <button key={station} onClick={() => handleStationSelect(station)} className="w-full p-5 rounded-[24px] text-left glass-card border-white/5 flex items-center justify-between group active:scale-[0.98] transition-all">
                    <span className="font-black text-base tracking-tight group-hover:text-emerald-400 uppercase">{station}</span>
                    <svg className="w-4 h-4 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <header className="px-6 flex justify-between items-center mb-8">
        <div>
          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-1">{t.welcome}</p>
          <h1 className="text-xl font-[900] tracking-tighter uppercase leading-none text-white/90">{userName}</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onViewNotifications}
            className="w-12 h-12 rounded-[18px] glass-card flex items-center justify-center border-white/20 active:scale-90 transition-transform relative"
          >
            {hasUnreadNotifications && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-rose-500 rounded-full border-2 border-black z-10" />
            )}
            <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        </div>
      </header>

      <div className="px-6">
        {latestTicket && (
          <div className="mb-8 glass-container rounded-[32px] p-6 border-white/10 relative overflow-hidden group active:scale-95 transition-all cursor-pointer" onClick={onViewHistory}>
            <div className="flex justify-between items-center mb-4">
               <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{t.upcoming}</span>
               <span className="text-[10px] font-bold text-zinc-500">{latestTicket.date}</span>
            </div>
            <div className="flex items-center gap-4">
               <h3 className="text-lg font-black">{latestTicket.from}</h3>
               <svg className="w-4 h-4 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
               <h3 className="text-lg font-black">{latestTicket.to}</h3>
            </div>
          </div>
        )}
        <div className="relative rounded-[40px] overflow-hidden glass-container p-6 shadow-2xl border-white/10">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3 relative">
              <div onClick={() => setActiveModal('from')} className="relative glass-card rounded-[24px] p-5 cursor-pointer border-white/5 active:scale-[0.98] transition-all">
                <label className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 font-black mb-1 block">{t.from}</label>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)]" />
                  <span className="text-xl font-[900] tracking-tighter uppercase">{from}</span>
                </div>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
                <button onClick={(e) => { e.stopPropagation(); setFrom(to); setTo(from); }} className="w-10 h-10 bg-zinc-900 text-white rounded-[14px] shadow-xl flex items-center justify-center active:scale-90 transition-all border border-white/10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                </button>
              </div>

              <div onClick={() => setActiveModal('to')} className="relative glass-card rounded-[24px] p-5 cursor-pointer border-white/5 active:scale-[0.98] transition-all">
                <label className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 font-black mb-1 block">{t.to}</label>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full border border-emerald-500" />
                  <span className="text-xl font-[900] tracking-tighter uppercase">{to}</span>
                </div>
              </div>
            </div>

            <div onClick={() => setActiveModal('class')} className="glass-card rounded-[24px] p-5 cursor-pointer border-white/5 active:scale-[0.98] transition-all">
              <label className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 font-black mb-1 block">{t.class}</label>
              <div className="flex items-center justify-between">
                 <span className="text-base font-[900] tracking-tighter uppercase">{trainClass}</span>
                 <svg className="w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end px-1">
                <label className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 font-black">{t.date}</label>
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{selectedDate}</span>
              </div>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 px-0.5">
                {dates.map((d) => (
                  <button key={d.full} onClick={() => setSelectedDate(d.full)} className={`min-w-[65px] py-4 rounded-[20px] flex flex-col items-center justify-center transition-all border active:scale-95 ${selectedDate === d.full ? 'bg-emerald-500 text-black border-emerald-500 shadow-lg scale-105' : 'glass-card border-white/5 text-zinc-500'}`}>
                    <span className={`text-[8px] font-black uppercase mb-0.5 ${selectedDate === d.full ? 'text-black/60' : 'text-zinc-700'}`}>{d.day}</span>
                    <span className="text-lg font-[900] leading-none mb-0.5">{d.date}</span>
                    <span className={`text-[8px] font-black uppercase ${selectedDate === d.full ? 'text-black/60' : 'text-zinc-700'}`}>{d.month}</span>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => onSearch({ from, to, date: selectedDate, class: trainClass })} className="w-full bg-emerald-500 text-black py-4 rounded-[24px] font-[900] text-sm shadow-xl active:scale-95 transition-all mt-2 uppercase tracking-widest">
              {t.find_train}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 px-6 grid grid-cols-2 gap-4">
          <button onClick={onTrack} className="glass-container p-5 rounded-[40px] border-white/10 flex flex-col items-center gap-3 text-center active:scale-95 transition-all shadow-lg">
             <div className="w-10 h-10 bg-emerald-500/10 rounded-[14px] flex items-center justify-center border border-emerald-500/10">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
             </div>
             <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">{t.track}</p>
          </button>
          <button onClick={onViewHistory} className="glass-container p-5 rounded-[40px] border-white/10 flex flex-col items-center gap-3 text-center active:scale-95 transition-all shadow-lg">
             <div className="w-10 h-10 bg-white/5 rounded-[14px] flex items-center justify-center border border-white/5">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
             </div>
             <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">{t.history}</p>
          </button>
      </div>
    </div>
  );
};
