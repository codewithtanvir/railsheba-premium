import React from 'react';
import { RSNotification } from '../types';
import { TRANSLATIONS } from '../constants';

interface NotificationsScreenProps {
  language: 'en' | 'bn';
  notifications: RSNotification[];
  onBack: () => void;
  onClear: () => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ language, notifications, onBack, onClear }) => {
  const t = TRANSLATIONS[language];
  return (
    <div className="min-h-full w-full pt-8 pb-32">
       <header className="px-8 flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center border-white/20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-[900] tracking-tight text-white uppercase tracking-[0.1em]">{t.notifications}</h1>
        </div>

        {notifications.length > 0 && (
          <button onClick={onClear} className="text-[10px] font-black text-rose-500 uppercase tracking-widest px-4 py-2 glass-card rounded-xl border-rose-500/20">
            {language === 'bn' ? 'সব মুছুন' : 'Clear All'}
          </button>
        )}
      </header>

      <div className="px-8 space-y-4">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
             <div className="w-20 h-20 glass-card rounded-3xl flex items-center justify-center mb-6 text-zinc-500">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
             </div>
             <p className="font-black uppercase tracking-[0.2em] text-xs">{t.no_notifications}</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`glass-container rounded-3xl p-6 border-white/10 relative overflow-hidden ${!notif.read ? 'border-emerald-500/30' : ''}`}
            >
              {!notif.read && (
                 <div className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-bl-xl shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              )}
              <div className="flex items-start gap-4">
                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                    ${notif.type === 'success' ? 'bg-emerald-500/20 text-emerald-500' :
                      notif.type === 'warning' ? 'bg-orange-500/20 text-orange-500' : 'bg-blue-500/20 text-blue-500'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       {notif.type === 'success' ? (
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                       ) : (
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                       )}
                    </svg>
                 </div>
                 <div className="space-y-1">
                    <div className="flex justify-between items-center">
                       <h3 className="font-black text-[11px] uppercase tracking-wider text-white">{notif.title}</h3>
                       <span className="text-[8px] font-bold text-zinc-600 uppercase">{notif.time}</span>
                    </div>
                    <p className="text-[11px] font-bold text-zinc-500 leading-relaxed">{notif.message}</p>
                 </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
