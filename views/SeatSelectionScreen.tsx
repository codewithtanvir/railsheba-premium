import React, { useState } from 'react';
import { Train } from '../types';
import { TRANSLATIONS } from '../constants';

interface SeatSelectionScreenProps {
  language: 'en' | 'bn';
  train: Train;
  selectedClass: string;
  onBack: () => void;
  onConfirm: (seats: string[]) => void;
}

export const SeatSelectionScreen: React.FC<SeatSelectionScreenProps> = ({ language, train, selectedClass, onBack, onConfirm }) => {
  const t = TRANSLATIONS[language];
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [activeCoach, setActiveCoach] = useState('C');
  const coaches = ['A', 'B', 'C', 'D', 'E'];

  const toggleSeat = (id: string) => {
    if (selectedSeats.includes(id)) {
      setSelectedSeats(prev => prev.filter(s => s !== id));
    } else if (selectedSeats.length < 4) {
      setSelectedSeats(prev => [...prev, id]);
    }
  };

  const isShovon = selectedClass === 'S_CHAIR' || selectedClass === 'SHOVON';

  const renderSeatRow = (rowNum: number) => {
    const leftCols = isShovon ? ['A', 'B', 'C'] : ['A', 'B'];
    const rightCols = ['D', 'E'];

    return (
      <div key={rowNum} className="flex items-center justify-between gap-4 mb-3">
        <div className="flex gap-2">
          {leftCols.map(col => {
            const id = `${activeCoach}-${rowNum}${col}`;
            const isSelected = selectedSeats.includes(id);
            return (
              <button
                key={id}
                onClick={() => toggleSeat(id)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-black transition-all border
                  ${isSelected
                    ? 'bg-emerald-500 text-black border-emerald-500 shadow-lg scale-105'
                    : 'glass-card text-zinc-600 border-white/5 active:scale-95'}`}
              >
                {col}{rowNum}
              </button>
            );
          })}
        </div>

        <div className="text-[8px] font-black text-zinc-800 w-4 h-4 flex items-center justify-center rounded-full bg-white/5 border border-white/5">{rowNum}</div>

        <div className="flex gap-2">
          {rightCols.map(col => {
            const id = `${activeCoach}-${rowNum}${col}`;
            const isSelected = selectedSeats.includes(id);
            return (
              <button
                key={id}
                onClick={() => toggleSeat(id)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-black transition-all border
                  ${isSelected
                    ? 'bg-emerald-500 text-black border-emerald-500 shadow-lg scale-105'
                    : 'glass-card text-zinc-600 border-white/5 active:scale-95'}`}
              >
                {col}{rowNum}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-full w-full flex flex-col pt-6 pb-20 animate-fade-in relative">
      <header className="px-6 flex items-center gap-5 mb-6">
        <button onClick={onBack} className="w-10 h-10 glass-card rounded-[14px] flex items-center justify-center border-white/20 active:scale-90 transition-transform">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div>
          <h1 className="text-lg font-[900] tracking-tight uppercase leading-none">Choose Seats</h1>
          <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mt-1.5">{train.name} • {selectedClass}</p>
        </div>
      </header>

      <div className="px-6 mb-6">
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {coaches.map(c => (
            <button
              key={c}
              onClick={() => setActiveCoach(c)}
              className={`min-w-[75px] py-4 rounded-[18px] border transition-all text-xs font-black active:scale-95
                ${activeCoach === c
                  ? 'bg-emerald-500 text-black border-emerald-500 shadow-xl'
                  : 'glass-card text-zinc-600 border-white/5'}`}
            >
              Coach {c}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-6 overflow-y-auto no-scrollbar">
        <div className="glass-container rounded-[40px] p-6 border-white/10 shadow-2xl relative max-w-[340px] mx-auto mb-10">
          <div className="w-full py-2 glass-card-dark rounded-[14px] mb-8 flex items-center justify-center border-white/10">
            <span className="text-[9px] font-black tracking-[0.4em] text-emerald-500/40 uppercase">Boarding End</span>
          </div>

          <div className="flex flex-col items-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(renderSeatRow)}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 left-0 right-0 px-6 z-[110] pb-6 pt-4 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="glass-container rounded-[32px] p-5 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-3xl">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">{t.selection} ({selectedSeats.length})</p>
              <div className="flex gap-1 flex-wrap max-w-[150px]">
                 {selectedSeats.length > 0 ? (
                   selectedSeats.map(s => <span key={s} className="text-[9px] font-black px-2 py-0.5 bg-white/5 rounded-md border border-white/10">{s}</span>)
                 ) : (
                   <span className="text-zinc-700 text-[9px] font-black tracking-widest uppercase">{t.tap_to_select}</span>
                 )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">{t.total_fare}</p>
              <h4 className="text-xl font-[900] text-emerald-500 tracking-tighter leading-none">৳{selectedSeats.length * (train.classes.find(c => c.type === selectedClass)?.fare || 500)}</h4>
            </div>
          </div>

          <button
            disabled={selectedSeats.length === 0}
            onClick={() => onConfirm(selectedSeats)}
            className={`w-full py-4 rounded-[20px] font-[900] text-sm transition-all active:scale-95
              ${selectedSeats.length > 0 ? 'bg-white text-black shadow-lg shadow-white/5' : 'bg-white/5 text-zinc-800 cursor-not-allowed border border-white/5'}`}
          >
            {t.review_booking}
          </button>
        </div>
      </div>
    </div>
  );
};
