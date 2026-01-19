import React, { useState } from 'react';
import { Train, BookingContextType, Ticket } from '../types';
import { TRANSLATIONS } from '../constants';

interface BookingConfirmationScreenProps {
  language: 'en' | 'bn';
  train: Train;
  bookingData: Partial<BookingContextType>;
  onComplete: (ticket: Ticket) => void;
  onBack: () => void;
}

export const BookingConfirmationScreen: React.FC<BookingConfirmationScreenProps> = ({ language, train, bookingData, onComplete, onBack }) => {
  const t = TRANSLATIONS[language];
  const [isProcessing, setIsProcessing] = useState(false);

  const farePerSeat = train.classes.find(c => c.type === bookingData.class)?.fare || 0;
  const totalAmount = (bookingData.selectedSeats?.length || 0) * farePerSeat;
  const mainPassenger = bookingData.passengers?.[0] || { name: 'Guest', phone: '01XXX' };

  const handleFinish = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const newTicket: Ticket = {
        id: `RS-${Math.floor(Math.random() * 90000) + 10000}`,
        trainName: train.name,
        from: train.from,
        to: train.to,
        date: bookingData.date || '',
        seats: bookingData.selectedSeats || [],
        totalAmount: totalAmount + 20,
        status: 'confirmed',
        passengerName: mainPassenger.name,
        passengerPhone: mainPassenger.phone,
        passengers: bookingData.passengers || [mainPassenger]
      };
      onComplete(newTicket);
    }, 1500);
  };

  if (isProcessing) {
    return (
      <div className="h-full w-full bg-black flex flex-col items-center justify-center p-10 text-center animate-fade-in">
        <div className="w-24 h-24 mb-8 relative">
          <div className="absolute inset-0 border-[4px] border-emerald-500/10 rounded-[30px]" />
          <div className="absolute inset-0 border-[4px] border-t-emerald-500 rounded-[30px] animate-spin" />
        </div>
        <h2 className="text-2xl font-[900] mb-4 tracking-tighter uppercase">{t.securing_ticket}</h2>
        <p className="text-zinc-600 text-sm font-medium leading-relaxed">{t.please_wait_confirm}</p>
      </div>
    );
  }

  return (
    <div className="min-h-full w-full pb-32">
       <header className="px-6 pt-8 flex items-center gap-6 mb-8">
        <button onClick={onBack} className="w-10 h-10 glass-card rounded-[14px] flex items-center justify-center border-white/20">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="text-xl font-[900] tracking-tight uppercase">{t.checkout}</h1>
      </header>

      <div className="px-6 space-y-6">
        <div className="glass-container rounded-[32px] overflow-hidden border-white/10 shadow-xl">
           <div className="bg-emerald-500 px-6 py-4 flex justify-between items-center">
            <h3 className="text-black font-black text-[10px] uppercase tracking-widest">{t.e_ticket_details}</h3>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5">
              <div>
                <p className="text-[9px] text-zinc-500 font-black uppercase mb-1">{t.intercity}</p>
                <p className="text-lg font-[900] leading-none">{train.name}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-zinc-500 font-black uppercase mb-1">{t.class}</p>
                <p className="text-lg font-[900] leading-none">{bookingData.class}</p>
              </div>
            </div>

            <div className="flex justify-between items-center px-2">
              <div>
                <p className="text-2xl font-[900] tracking-tight hover:text-emerald-400 transition-colors">{train.from}</p>
                <p className="text-[10px] text-zinc-500 font-black mt-1">{train.departureTime}</p>
              </div>
              <div className="flex-1 flex items-center px-4">
                 <div className="w-full h-px bg-white/10 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-500 rounded-full" />
                 </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-[900] tracking-tight hover:text-emerald-400 transition-colors">{train.to}</p>
                <p className="text-[10px] text-zinc-500 font-black mt-1">{train.arrivalTime}</p>
              </div>
            </div>

            <div className="glass-card rounded-[24px] p-5 border-white/5 space-y-4">
               <div>
                  <p className="text-[9px] text-zinc-600 font-black uppercase mb-3 px-1">{bookingData.passengers?.length} {t.passenger_count}</p>
                  <div className="space-y-3">
                     {bookingData.passengers?.map((p, i) => (
                       <div key={i} className="flex justify-between items-center group">
                          <div>
                            <p className="text-sm font-black text-white/90 group-hover:text-emerald-400 transition-colors uppercase leading-none">{p.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                               <span className="text-[9px] text-zinc-600 font-bold">{p.age} Y • {p.gender}</span>
                               <span className="w-1 h-1 rounded-full bg-zinc-800" />
                               <span className="text-[9px] text-emerald-500 font-black uppercase">{t.seat} {bookingData.selectedSeats?.[i]}</span>
                            </div>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] text-zinc-600 font-bold">{p.phone}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
               <div className="pt-2 border-t border-white/5 flex justify-between items-end">
                  <div className="text-right w-full">
                    <p className="text-[9px] text-zinc-600 font-black uppercase mb-1">{t.date}</p>
                    <p className="text-sm font-black">{bookingData.date}</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="glass-container rounded-[32px] p-6 space-y-3 border-white/10 shadow-lg">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">{t.base_fare}</span>
            <span className="font-black">৳{totalAmount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">{t.platform_fee}</span>
            <span className="font-black">৳20</span>
          </div>
          <div className="h-px bg-white/5 my-1" />
          <div className="flex justify-between text-xl font-[900]">
            <span className="tracking-tighter uppercase">{t.fare}</span>
            <span className="text-emerald-500 tracking-tighter">৳{totalAmount + 20}</span>
          </div>
        </div>

        <button onClick={handleFinish} className="w-full bg-emerald-500 text-black py-5 rounded-[24px] font-[900] text-base shadow-xl active:scale-95 transition-all mt-4 uppercase tracking-widest">
          {t.confirm_book}
        </button>
      </div>
    </div>
  );
};
