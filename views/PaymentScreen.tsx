import React, { useState } from 'react';
import { Train, BookingContextType } from '../types';
import { TRANSLATIONS } from '../constants';

interface PaymentScreenProps {
  language: 'en' | 'bn';
  train: Train;
  bookingData: Partial<BookingContextType>;
  onBack: () => void;
  onSuccess: () => void;
}

export const PaymentScreen: React.FC<PaymentScreenProps> = ({ language, train, bookingData, onBack, onSuccess }) => {
  const t = TRANSLATIONS[language];
  const [method, setMethod] = useState<'bkash' | 'nagad' | 'rocket' | 'card'>('bkash');
  const total = bookingData.totalAmount || 0;

  const methods = [
    { id: 'bkash', name: 'bKash', color: 'bg-pink-600', icon: '৳' },
    { id: 'nagad', name: 'Nagad', color: 'bg-orange-500', icon: '৳' },
    { id: 'rocket', name: 'Rocket', color: 'bg-purple-600', icon: '৳' },
    { id: 'card', name: t.debit_credit_card, color: 'bg-zinc-800', icon: '💳' }
  ];

  return (
    <div className="min-h-full w-full pt-8 pb-32">
       <header className="px-8 flex items-center gap-6 mb-8">
        <button onClick={onBack} className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center border-white/20">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-[900] tracking-tight text-white uppercase tracking-[0.1em]">{t.payment}</h1>
      </header>

      <div className="px-8 space-y-6">
        <div className="glass-container rounded-[40px] p-6 border-white/10">
           <div className="flex justify-between items-center mb-4">
              <span className="text-zinc-500 font-bold text-xs uppercase tracking-widest">{t.total_amount}</span>
              <span className="text-2xl font-[900] text-emerald-500">৳{total}</span>
           </div>
           <div className="h-[1px] bg-white/5 w-full mb-4" />
           <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
             {t.tickets_for} {train.name} ({train.number}) <br/>
             {bookingData.selectedSeats?.length} {t.seat}s • {bookingData.class}
           </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] ml-6">{t.select_method}</h3>
          <div className="grid grid-cols-1 gap-3">
             {methods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id as any)}
                  className={`w-full glass-container rounded-[32px] p-5 flex items-center justify-between transition-all border-white/5 ${method === m.id ? 'ring-2 ring-emerald-500 border-emerald-500/20 bg-emerald-500/5' : 'hover:bg-white/5'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${m.color} rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-lg`}>
                       {m.icon}
                    </div>
                    <span className="font-black text-sm uppercase tracking-wider">{m.name}</span>
                  </div>
                  {method === m.id && (
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
             ))}
          </div>
        </div>

        <button
          onClick={onSuccess}
          className="w-full bg-emerald-500 text-black py-6 rounded-[32px] font-[900] text-sm hover:bg-emerald-400 transition-all shadow-[0_20px_40px_rgba(16,185,129,0.3)] active:scale-95 uppercase tracking-[0.2em] mt-8"
        >
          {t.pay_securely.replace('{amount}', total.toString())}
        </button>

        <p className="text-center text-[9px] text-zinc-600 font-bold uppercase tracking-widest px-8">
          By clicking pay you agree to the RailSheba Terms of Service and Refund Policy.
        </p>
      </div>
    </div>
  );
};
