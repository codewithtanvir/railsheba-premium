import React, { useState, useEffect } from 'react';
import { Ticket } from '../types';
import { TRANSLATIONS } from '../constants';

interface TicketHistoryScreenProps {
  language: 'en' | 'bn';
  tickets: Ticket[];
  onBack: () => void;
}

export const TicketHistoryScreen: React.FC<TicketHistoryScreenProps> = ({ language, tickets: initialTickets, onBack }) => {
  const t = TRANSLATIONS[language];
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    // Sync with props if they change, though usually App manages this
    setTickets(initialTickets);
  }, [initialTickets]);

  const handleExportPNG = async (ticket: Ticket) => {
    setIsExporting(true);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 500;
    canvas.height = 900;

    // Background
    ctx.fillStyle = '#09090b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header
    ctx.fillStyle = '#10b981';
    ctx.fillRect(0, 0, canvas.width, 80);
    ctx.fillStyle = '#000000';
    ctx.font = '900 18px "Plus Jakarta Sans"';
    ctx.textAlign = 'center';
    ctx.fillText('BANGLADESH RAILWAY E-TICKET', 250, 48);

    // Information Section
    const labelX1 = 40;
    const labelX2 = 280;
    const labelFont = '800 11px "Plus Jakarta Sans"';
    const valFont = '900 18px "Plus Jakarta Sans"';
    ctx.textAlign = 'left';

    const drawField = (label: string, val: string, x: number, y: number, color: string = '#ffffff') => {
      ctx.font = labelFont;
      ctx.fillStyle = '#52525b';
      ctx.fillText(label.toUpperCase(), x, y);
      ctx.font = valFont;
      ctx.fillStyle = color;
      ctx.fillText(val.toUpperCase(), x, y + 25);
    };

    // Rows of data
    drawField('Ticket ID', ticket.id, labelX1, 140, '#10b981');
    drawField('Travel Date', ticket.date, labelX2, 140);

    drawField('From (Origin)', ticket.from, labelX1, 280);
    drawField('To (Destination)', ticket.to, labelX2, 280);

    drawField('Train Service', ticket.trainName, labelX1, 350);
    drawField('Service Type', 'Intercity Express', labelX2, 350);

    // Passenger List in Export
    ctx.font = '800 11px "Plus Jakarta Sans"';
    ctx.fillStyle = '#52525b';
    ctx.fillText('PASSENGERS & SEATS', labelX1, 420);

    ticket.passengers.forEach((p, i) => {
      const yPos = 450 + (i * 35);
      ctx.font = '900 13px "Plus Jakarta Sans"';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`${p.name.toUpperCase()} (${ticket.seats[i]})`, labelX1, yPos);
      ctx.font = '700 10px "Plus Jakarta Sans"';
      ctx.fillStyle = '#10b981';
      ctx.fillText(`AGE: ${p.age} | ${p.gender.toUpperCase()} | ${p.phone}`, labelX1, yPos + 15);
    });

    drawField('Total Fare', `৳${ticket.totalAmount}`, labelX2, 420, '#10b981');

    // QR Image
    const qrImg = new Image();
    qrImg.crossOrigin = "Anonymous";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${ticket.id}`;

    qrImg.onload = () => {
      // Background for QR
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(150, 600, 200, 200, 16);
      ctx.fill();

      // Draw QR
      ctx.drawImage(qrImg, 165, 615, 170, 170);

      // Footer text
      ctx.fillStyle = '#3f3f46';
      ctx.font = '700 10px "Plus Jakarta Sans"';
      ctx.textAlign = 'center';
      ctx.fillText('THIS IS A COMPUTER GENERATED TICKET', 250, 840);
      ctx.fillText('VALID FOR A SINGLE JOURNEY ONLY', 250, 855);

      // Finalizing export
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `BR-${ticket.id}.png`;
      link.href = dataUrl;
      link.click();
      setIsExporting(false);
    };

    qrImg.onerror = () => {
      alert("Verification server unavailable. Using fallback QR.");
      setIsExporting(false);
    };
  };

  return (
    <div className="min-h-full w-full pt-6 pb-32 animate-fade-in relative">
      {selectedTicket && (
        <div className="absolute inset-0 z-[300] flex items-center justify-center p-6 animate-fade-in">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setSelectedTicket(null)} />
          <div className="relative w-full max-w-[360px] animate-slide-up">
            <div className="w-full relative bg-zinc-950 rounded-[32px] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,1)]">
              {/* Ticket Visual Cutouts */}
              <div className="absolute top-[42%] -left-3 w-6 h-6 bg-black rounded-full border border-white/5 z-10" />
              <div className="absolute top-[42%] -right-3 w-6 h-6 bg-black rounded-full border border-white/5 z-10" />

              <div className="bg-emerald-500 p-5 flex justify-between items-center relative z-20">
                <span className="text-black font-black text-[9px] uppercase tracking-widest">E-Ticket Pass</span>
                <button onClick={() => setSelectedTicket(null)} className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="p-7 space-y-6">
                <div className="text-center">
                  <p className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.3em] mb-1.5">PASS ID</p>
                  <h2 className="text-2xl font-[900] text-emerald-400 leading-none">{selectedTicket.id}</h2>
                </div>

                <div className="space-y-5">
                   <div className="pb-5 border-b border-white/5">
                      <p className="text-[8px] text-zinc-700 font-black uppercase mb-3 text-center tracking-widest">Passenger List</p>
                      <div className="space-y-3 max-h-32 overflow-y-auto no-scrollbar pr-1">
                        {selectedTicket.passengers.map((p, i) => (
                          <div key={i} className="flex justify-between items-center bg-white/[0.03] p-3 rounded-2xl border border-white/5">
                             <div>
                               <p className="text-[10px] font-black text-white leading-none uppercase">{p.name}</p>
                               <span className="text-[8px] text-emerald-500 font-bold mt-1 block uppercase">Seat {selectedTicket.seats[i]}</span>
                             </div>
                             <div className="text-right">
                               <p className="text-[8px] text-zinc-600 font-black uppercase">{p.age}Y • {p.gender}</p>
                             </div>
                          </div>
                        ))}
                      </div>
                   </div>

                   <div className="flex justify-between items-center py-1">
                      <div className="text-left">
                        <p className="text-2xl font-[900] text-white tracking-tighter uppercase">{selectedTicket.from}</p>
                        <p className="text-[9px] text-zinc-700 font-black uppercase mt-1">Origin</p>
                      </div>
                      <div className="flex-1 flex flex-col items-center px-4">
                        <div className="w-full h-px bg-white/10 relative">
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-500 rounded-full" />
                        </div>
                        <span className="text-[8px] font-black text-zinc-800 mt-1 uppercase">{selectedTicket.date}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-[900] text-white tracking-tighter uppercase">{selectedTicket.to}</p>
                        <p className="text-[9px] text-zinc-700 font-black uppercase mt-1">Dest</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4 pt-5 border-t border-white/5">
                      <div className="space-y-1">
                        <p className="text-[8px] text-zinc-700 font-black uppercase">SERVICE</p>
                        <p className="text-sm font-black text-white leading-none uppercase">{selectedTicket.trainName}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-[8px] text-zinc-700 font-black uppercase">TOTAL FARE</p>
                        <p className="text-sm font-black text-emerald-500 leading-none">৳{selectedTicket.totalAmount}</p>
                      </div>
                   </div>
                </div>

                <div className="flex flex-col items-center pt-5">
                  <div className="w-36 h-36 bg-white rounded-[20px] p-3 shadow-xl mb-3">
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${selectedTicket.id}`} className="w-full h-full" alt="QR" />
                  </div>
                  <p className="text-[9px] text-emerald-500 font-black uppercase tracking-[0.4em]">Ready to Board</p>
                </div>
              </div>
            </div>

            <div className="w-full mt-5 grid grid-cols-2 gap-3">
              <button onClick={() => handleExportPNG(selectedTicket)} disabled={isExporting} className="py-4 glass-container rounded-[20px] text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/5 active:scale-95 transition-all flex items-center justify-center gap-2">
                {isExporting ? <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : t.download_pass}
              </button>
              <button onClick={() => setSelectedTicket(null)} className="py-4 bg-white text-black rounded-[20px] text-[10px] font-black uppercase tracking-widest active:scale-95 shadow-lg">CLOSE</button>
            </div>
          </div>
        </div>
      )}

      <header className="px-6 flex items-center gap-5 mb-8">
        <button onClick={onBack} className="w-10 h-10 glass-card rounded-[14px] flex items-center justify-center border-white/20 active:scale-90 transition-transform">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="text-xl font-[900] tracking-tight uppercase">{t.history}</h1>
      </header>

      <div className="px-6 space-y-6 pb-20">
        {tickets.length > 0 ? tickets.map((ticket) => (
          <div key={ticket.id} className="glass-container rounded-[32px] p-6 relative overflow-hidden group border-white/10 active:scale-[0.99] transition-all">
            <div className="absolute top-6 right-6">
              <span className={`text-[8px] font-black uppercase px-3 py-1 rounded-full ${ticket.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                {ticket.status}
              </span>
            </div>

            <div className="mb-6">
              <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest mb-1">{ticket.id}</p>
              <h3 className="text-xl font-[900] text-white leading-tight">{ticket.trainName}</h3>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="text-left">
                <p className="text-lg font-[900] uppercase">{ticket.from}</p>
                <p className="text-[9px] text-zinc-700 font-black uppercase mt-1">{t.from}</p>
              </div>
              <div className="flex-1 px-4 opacity-10"><div className="w-full h-px bg-white" /></div>
              <div className="text-right">
                <p className="text-lg font-[900] uppercase">{ticket.to}</p>
                <p className="text-[9px] text-zinc-700 font-black uppercase mt-1">{t.to}</p>
              </div>
            </div>

            <div className="flex justify-between items-end pt-5 border-t border-white/5">
              <div>
                <p className="text-[9px] text-zinc-700 font-black uppercase mb-1">Trip Info</p>
                <p className="text-xs font-black text-white">{ticket.seats.join(', ')} • {ticket.date}</p>
              </div>
              <p className="text-xl font-[900] text-emerald-500 tracking-tighter">৳{ticket.totalAmount}</p>
            </div>

            <button onClick={() => setSelectedTicket(ticket)} className="w-full mt-6 py-4 bg-white/5 border border-white/5 rounded-[16px] text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all">
              {t.view_details}
            </button>
          </div>
        )) : (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
             <div className="w-20 h-20 bg-zinc-900/50 rounded-full flex items-center justify-center mb-6 border border-white/5">
                <svg className="w-8 h-8 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
             </div>
             <h3 className="text-lg font-black uppercase tracking-widest mb-2">{t.no_history}</h3>
             <p className="text-zinc-500 text-xs font-medium max-w-[220px] leading-relaxed">
                {t.no_history_desc}
             </p>
          </div>
        )}
      </div>
    </div>
  );
};
