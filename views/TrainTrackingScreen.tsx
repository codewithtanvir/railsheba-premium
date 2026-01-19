import React, { useState } from 'react';
import { MOCK_TRAINS, TRANSLATIONS } from '../constants';

export const TrainTrackingScreen: React.FC<{ language: 'en' | 'bn', onBack: () => void }> = ({ language, onBack }) => {
  const t = TRANSLATIONS[language];
  const [searchNumber, setSearchNumber] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleTrack = () => {
    setIsSearching(true);
    // Simulate API delay
    setTimeout(() => {
      const train = MOCK_TRAINS.find(t => t.number === searchNumber) || MOCK_TRAINS[0];
      setTrackingData({
        ...train,
        currentStatus: t.on_time,
        lastStation: 'Cumilla',
        nextStation: 'Feni',
        progress: 68,
        delay: 0,
        // Mock coordinates for the map embed
        lat: 23.4607,
        lng: 91.1809
      });
      setIsSearching(false);
    }, 1200);
  };

  return (
    <div className="min-h-full w-full pt-8 pb-40">
      <header className="px-6 flex items-center gap-6 mb-10">
        <button onClick={onBack} className="w-10 h-10 glass-card rounded-2xl flex items-center justify-center border-white/20 active:scale-90 transition-transform">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-[900] tracking-tight uppercase tracking-wider">{t.track}</h1>
      </header>

      <div className="px-6 space-y-6">
        {/* Search Bar */}
        <div className="glass-container p-5 rounded-[32px] border-white/10 shadow-xl">
          <label className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-2.5 block">{t.enter_train_number}</label>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder={t.train_number_placeholder}
              value={searchNumber}
              onChange={(e) => setSearchNumber(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm font-black outline-none focus:border-emerald-500/50 transition-all text-emerald-400 placeholder:text-zinc-700"
            />
            <button
              onClick={handleTrack}
              disabled={isSearching}
              className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 active:scale-95 transition-all disabled:opacity-50"
            >
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {trackingData ? (
          <div className="space-y-6 animate-fade-in">
            {/* Live Map Preview Card */}
            <div className="glass-container rounded-[40px] overflow-hidden border-white/10 shadow-2xl relative h-64">
               <div className="absolute top-4 left-4 z-10 glass-card px-3 py-1.5 rounded-full border-white/10 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[8px] font-black uppercase tracking-widest">{t.live_satellite}</span>
               </div>

               {/* Premium Dark Styled Google Map Embed */}
               <iframe
                  className="w-full h-full grayscale invert-[1] contrast-[1.2] opacity-40 mix-blend-screen"
                  src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d100000!2d${trackingData.lng}!3d${trackingData.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1716182400000!5m2!1sen!2sbd`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
               />

               {/* Floating Overlay for Train Indicator */}
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative">
                    <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-xl scale-[4] animate-pulse" />
                    <div className="relative w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.8)] border border-white/20 rotate-45">
                       <svg className="w-5 h-5 text-black -rotate-45" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
                       </svg>
                    </div>
                  </div>
               </div>
            </div>

            {/* Status Card */}
            <div className="glass-container rounded-[40px] p-6 border-white/10 shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-[900] tracking-tighter uppercase">{trackingData.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.2em]">#{trackingData.number}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-800" />
                    <span className="text-[9px] text-emerald-500 font-black uppercase tracking-[0.2em]">{t.track}</span>
                  </div>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-4 py-2 rounded-xl">
                  <span className="text-[9px] font-black uppercase tracking-widest">{trackingData.currentStatus}</span>
                </div>
              </div>

              {/* Progress Visualizer - More compact for mobile */}
              <div className="relative h-20 flex flex-col justify-center mb-10 px-2">
                <div className="absolute w-full h-[1px] bg-white/10 rounded-full top-1/2 -translate-y-1/2" />
                <div
                  className="absolute h-[2px] bg-emerald-500 rounded-full top-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all duration-1000"
                  style={{ width: `${trackingData.progress}%` }}
                />

                <div className="flex justify-between items-center relative z-10 w-full">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-black border border-zinc-700 mb-2" />
                    <p className="text-[9px] font-black tracking-tighter uppercase text-zinc-500">{trackingData.from}</p>
                  </div>

                  <div className="absolute transition-all duration-1000" style={{ left: `${trackingData.progress}%`, transform: 'translateX(-50%)' }}>
                     <div className="w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center shadow-2xl shadow-emerald-500/40 mb-2 rotate-90">
                        <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
                        </svg>
                     </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-black border border-zinc-700 mb-2" />
                    <p className="text-[9px] font-black text-zinc-500 tracking-tighter uppercase">{trackingData.to}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="glass-card p-4 rounded-3xl border-white/5">
                  <p className="text-[8px] text-zinc-600 font-black uppercase tracking-[0.3em] mb-1">{t.last_station}</p>
                  <p className="text-base font-black truncate">{trackingData.lastStation}</p>
                </div>
                <div className="glass-card p-4 rounded-3xl border-white/5">
                  <p className="text-[8px] text-zinc-600 font-black uppercase tracking-[0.3em] mb-1">{t.next_station}</p>
                  <p className="text-base font-black text-emerald-500 truncate">{trackingData.nextStation}</p>
                </div>
                <div className="glass-card p-4 rounded-3xl border-white/5">
                  <p className="text-[8px] text-zinc-600 font-black uppercase tracking-[0.3em] mb-1">{t.exp_arrival}</p>
                  <p className="text-base font-black truncate">{trackingData.arrivalTime}</p>
                </div>
                <div className="glass-card p-4 rounded-3xl border-white/5">
                  <p className="text-[8px] text-zinc-600 font-black uppercase tracking-[0.3em] mb-1">{t.speed}</p>
                  <p className="text-base font-black">74 <span className="text-[10px] text-zinc-600">{t.km_h}</span></p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center animate-fade-in">
            <div className="w-24 h-24 bg-zinc-900/50 rounded-[32px] flex items-center justify-center mb-8 border border-white/5 relative">
              <div className="absolute inset-0 bg-emerald-500/5 rounded-[32px] animate-pulse" />
              <svg className="w-10 h-10 text-emerald-500/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-black uppercase tracking-widest mb-3">{t.radar_standby}</h3>
            <p className="text-zinc-500 text-xs font-medium leading-relaxed max-w-[200px]">
              {t.radar_desc}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
