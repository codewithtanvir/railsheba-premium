import React from 'react';
import { MOCK_TRAINS, TRANSLATIONS } from '../constants';
import { Train } from '../types';

interface TrainListScreenProps {
  language: 'en' | 'bn';
  onBack: () => void;
  onSelectTrain: (train: Train) => void;
  searchData: any;
}

export const TrainListScreen: React.FC<TrainListScreenProps> = ({ language, onBack, onSelectTrain, searchData }) => {
  const t = TRANSLATIONS[language];
  const filteredTrains = MOCK_TRAINS.filter(train =>
    train.from === searchData.from && train.to === searchData.to
  );

  return (
    <div className="min-h-full w-full pt-6 pb-32 animate-fade-in relative">
      <header className="px-6 flex items-center gap-5 mb-8">
        <button onClick={onBack} className="w-10 h-10 glass-card rounded-[14px] flex items-center justify-center border-white/20 active:scale-90 transition-transform">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div>
          <h1 className="text-lg font-[900] tracking-tighter uppercase leading-none">{searchData.from} <span className="text-emerald-500">→</span> {searchData.to}</h1>
          <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mt-1.5">{searchData.date} • {searchData.class}</p>
        </div>
      </header>

      <div className="px-6 space-y-6">
        {filteredTrains.length > 0 ? (
          filteredTrains.map((train) => (
            <div
              key={train.id}
              onClick={() => onSelectTrain(train)}
              className="glass-container rounded-[32px] p-6 relative overflow-hidden group active:scale-[0.99] transition-all cursor-pointer border-white/10 hover:border-emerald-500/20 shadow-xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-[900] tracking-tighter text-white group-hover:text-emerald-400 transition-colors uppercase">
                    {train.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">#{train.number}</span>
                    <div className="w-1 h-1 rounded-full bg-zinc-800" />
                    <span className="text-[9px] font-black text-emerald-500/80 uppercase tracking-widest tracking-tighter">{t.intercity}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-8">
                <div className="text-left">
                  <p className="text-xl font-[900] tracking-tight mb-1">{train.departureTime}</p>
                  <p className="text-[8px] text-zinc-700 font-black uppercase tracking-widest">{train.from}</p>
                </div>

                <div className="flex-1 px-4 flex flex-col items-center">
                  <div className="relative w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-2/3 bg-emerald-500/50" />
                  </div>
                  <span className="mt-2 text-[8px] text-zinc-600 font-black uppercase">{train.duration}</span>
                </div>

                <div className="text-right">
                  <p className="text-xl font-[900] tracking-tight mb-1">{train.arrivalTime}</p>
                  <p className="text-[8px] text-zinc-700 font-black uppercase tracking-widest">{train.to}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {train.classes.map((cls, idx) => (
                  <div key={idx} className={`glass-card rounded-[16px] p-3 text-center border-white/5 transition-all ${searchData.class === cls.type ? 'bg-emerald-500/10 border-emerald-500/30' : ''}`}>
                    <p className="text-[8px] font-black text-zinc-700 mb-0.5 uppercase tracking-widest">{cls.type}</p>
                    <p className="text-sm font-black text-white leading-tight">৳{cls.fare}</p>
                    <p className="text-[8px] font-bold text-emerald-500 mt-0.5 uppercase">{cls.available} S</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 glass-container rounded-[32px] p-8 border-white/10 opacity-60">
            <h3 className="text-base font-black uppercase text-zinc-600">{t.no_trains}</h3>
            <p className="text-zinc-800 mt-2 text-xs font-bold leading-relaxed">{t.adjust_filters}</p>
          </div>
        )}
      </div>
    </div>
  );
};
