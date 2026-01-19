import React, { useState } from 'react';
import { Train, Passenger } from '../types';
import { TRANSLATIONS } from '../constants';

interface PassengerDetailsScreenProps {
  language: 'en' | 'bn';
  train: Train;
  selectedSeats: string[];
  onBack: () => void;
  onConfirm: (passengers: Passenger[]) => void;
}

export const PassengerDetailsScreen: React.FC<PassengerDetailsScreenProps> = ({ language, train, selectedSeats, onBack, onConfirm }) => {
  const t = TRANSLATIONS[language];
  const [passengers, setPassengers] = useState<Passenger[]>(
    selectedSeats.map(() => ({ name: '', phone: '', gender: 'male', age: '' }))
  );

  const updatePassenger = (index: number, field: keyof Passenger, value: string) => {
    const newPassengers = [...passengers];
    newPassengers[index] = { ...newPassengers[index], [field]: value };
    setPassengers(newPassengers);
  };

  const isValid = passengers.every(p => p.name && p.phone && p.age);

  return (
    <div className="min-h-full w-full pt-8 pb-32">
       <header className="px-8 flex items-center gap-6 mb-8">
        <button onClick={onBack} className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center border-white/20 active:scale-90 transition-transform">
          <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
           <h1 className="text-2xl font-[1000] tracking-tighter text-white uppercase">{t.passenger_info}</h1>
           <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1">{t.details_for} {selectedSeats.length} {selectedSeats.length > 1 ? t.travellers : t.traveller}</p>
        </div>
      </header>

      {/* Summary Header */}
      <div className="px-8 mt-2 mb-8">
         <div className="glass-container rounded-[32px] p-6 border-white/10 flex items-center justify-between shadow-2xl">
            <div className="space-y-1">
               <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">{train.name}</p>
               <h3 className="text-xl font-[1000] tracking-tighter uppercase">{train.from} <span className="text-emerald-500">→</span> {train.to}</h3>
            </div>
            <div className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center border-white/10 group">
               <div className="text-center">
                  <p className="text-[8px] text-zinc-500 font-black uppercase mb-0.5">Seats</p>
                  <p className="text-sm font-[1000] text-emerald-500">{selectedSeats[0]}</p>
               </div>
            </div>
         </div>
      </div>

      <div className="px-8 space-y-10">
        {selectedSeats.map((seat, idx) => (
          <div key={seat} className="space-y-5">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
                <div>
                  <h3 className="text-sm font-[1000] text-white uppercase tracking-wider">Passenger {idx + 1}</h3>
                  <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Reserved Seat • {seat}</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full glass-card border-white/5 flex items-center justify-center">
                <span className="text-[10px] font-black text-zinc-700">P{idx + 1}</span>
              </div>
            </div>

            <div className="glass-container rounded-[40px] p-8 border-white/10 space-y-6 bg-white/[0.02] shadow-xl">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2 block italic">{t.legal_name}</label>
                  <div className="relative group">
                    <input
                      type="text"
                      value={passengers[idx].name}
                      onChange={(e) => updatePassenger(idx, 'name', e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full h-16 bg-white/5 border border-white/10 rounded-[24px] px-8 text-base font-bold focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all placeholder:text-zinc-800"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-800 group-focus-within:text-emerald-500/50 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                    </div>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2 block italic">{t.age}</label>
                    <input
                      type="number"
                      value={passengers[idx].age}
                      onChange={(e) => updatePassenger(idx, 'age', e.target.value)}
                      placeholder="25"
                      className="w-full h-16 bg-white/5 border border-white/10 rounded-[24px] px-8 text-base font-bold focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all placeholder:text-zinc-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2 block italic">{t.gender}</label>
                    <div className="relative">
                      <select
                        value={passengers[idx].gender}
                        onChange={(e) => updatePassenger(idx, 'gender', e.target.value as any)}
                        className="w-full h-16 bg-white/5 border border-white/10 rounded-[24px] px-8 text-base font-bold focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 appearance-none transition-all"
                      >
                        <option value="male" className="bg-zinc-950 text-white">{t.male}</option>
                        <option value="female" className="bg-zinc-950 text-white">{t.female}</option>
                        <option value="other" className="bg-zinc-950 text-white">{t.other}</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7"/></svg>
                      </div>
                    </div>
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2 block italic">{t.contact_whatsapp || t.contact_number}</label>
                  <div className="relative group">
                    <input
                      type="tel"
                      value={passengers[idx].phone}
                      onChange={(e) => updatePassenger(idx, 'phone', e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full h-16 bg-white/5 border border-white/10 rounded-[24px] px-8 text-base font-bold focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all placeholder:text-zinc-800"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-800 group-focus-within:text-emerald-500/50 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        ))}

        <div className="pt-4 px-2">
          <button
            disabled={!isValid}
            onClick={() => onConfirm(passengers)}
            className={`w-full h-20 rounded-[30px] font-[1000] text-sm transition-all shadow-2xl active:scale-95 uppercase tracking-[0.3em] flex items-center justify-center gap-4 relative overflow-hidden group
              ${isValid ? 'bg-emerald-500 text-black shadow-emerald-500/20' : 'bg-white/5 text-zinc-800 border border-white/5 cursor-not-allowed grayscale'}`}
          >
            <span className="relative z-10">{t.proceed_to_payment}</span>
            <svg className="w-6 h-6 relative z-10 animate-bounce-horizontal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            {isValid && <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 skew-x-12" />}
          </button>
        </div>
      </div>
    </div>
  );
};
