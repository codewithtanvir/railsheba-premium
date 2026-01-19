import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './views/WelcomeScreen';
import { HomeScreen } from './views/HomeScreen';
import { TrainListScreen } from './views/TrainListScreen';
import { SeatSelectionScreen } from './views/SeatSelectionScreen';
import { BookingConfirmationScreen } from './views/BookingConfirmationScreen';
import { TicketHistoryScreen } from './views/TicketHistoryScreen';
import { ProfileScreen } from './views/ProfileScreen';
import { TrainTrackingScreen } from './views/TrainTrackingScreen';
import { LoginScreen } from './views/LoginScreen';
import { SignupScreen } from './views/SignupScreen';
import { NIDVerificationScreen } from './views/NIDVerificationScreen';
import { PaymentScreen } from './views/PaymentScreen';
import { PassengerDetailsScreen } from './views/PassengerDetailsScreen';
import { NotificationsScreen } from './views/NotificationsScreen';
import { Train, BookingContextType, Ticket, Passenger, RSNotification } from './types';
import { MOCK_HISTORY as INITIAL_HISTORY, TRANSLATIONS } from './constants';
import appBg from './assets/app.png';

const App: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'bn'>(() => {
    return (localStorage.getItem('rs_lang') as 'en' | 'bn') || 'en';
  });

  const t = TRANSLATIONS[language];

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('rs_auth') === 'true';
  });
  const [isGuest, setIsGuest] = useState(() => {
    return localStorage.getItem('rs_guest') === 'true';
  });
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'login' | 'signup' | 'nid' | 'home' | 'train-list' | 'seat-selection' | 'passenger-details' | 'payment' | 'confirmation' | 'history' | 'profile' | 'tracking' | 'notifications'>('welcome');
  const [bookingData, setBookingData] = useState<Partial<BookingContextType>>({});
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [history, setHistory] = useState<Ticket[]>(() => {
    const saved = localStorage.getItem('rs_history');
    return saved ? JSON.parse(saved) : INITIAL_HISTORY;
  });
  const [notifications, setNotifications] = useState<RSNotification[]>(() => {
    const saved = localStorage.getItem('rs_notifications');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Welcome to Premium', message: 'Experience the new way of train travel in Bangladesh.', time: 'Just now', type: 'info', read: false }
    ];
  });

  useEffect(() => {
    localStorage.setItem('rs_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('rs_auth', isAuthenticated.toString());
    localStorage.setItem('rs_guest', isGuest.toString());
  }, [isAuthenticated, isGuest]);

  useEffect(() => {
    localStorage.setItem('rs_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('rs_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    // If authenticated, skip welcome
    if (isAuthenticated && currentScreen === 'welcome') {
      setCurrentScreen('home');
    }
  }, []);

  const navigateTo = (screen: any, data?: any) => {
    if (data) {
      setBookingData(prev => ({ ...prev, ...data }));
    }
    setCurrentScreen(screen);
  };

  const handleSelectTrain = (train: Train) => {
    setSelectedTrain(train);
    navigateTo('seat-selection');
  };

  const handleBookingComplete = (newTicket: Ticket) => {
    const updatedHistory = [newTicket, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('rs_history', JSON.stringify(updatedHistory));

    const newNotif: RSNotification = {
      id: Math.random().toString(36).substr(2, 9),
      title: t.booking_confirmed,
      message: `${t.booking_success}${newTicket.trainName}.`,
      time: language === 'en' ? 'Just now' : 'এখনই',
      type: 'success',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    setCurrentScreen('history');
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setIsGuest(false);
    setCurrentScreen('home');
  };

  const handleGuestLogin = () => {
    setIsAuthenticated(true);
    setIsGuest(true);
    setCurrentScreen('home');
  };

  return (
    <div className="relative h-screen w-full bg-black text-white overflow-hidden flex justify-center items-center overscroll-none">
      {/* Background Layer */}
      <div
        className="fixed inset-0 z-0 transition-opacity duration-1000 ease-in-out pointer-events-none"
        style={{
          backgroundImage: `url(${appBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: currentScreen === 'welcome' ? 1 : 0,
          filter: "brightness(0.7)",
        }}
      />
      {/* Gradient Overlay for Depth */}
      <div className={`fixed inset-0 z-[1] transition-opacity duration-1000 bg-gradient-to-b from-black/60 via-transparent to-black pointer-events-none ${currentScreen === 'welcome' ? 'opacity-80' : 'opacity-100'}`} />

      {/* Mobile App Shell */}
      <div className={`w-full max-w-[440px] h-full sm:h-[90vh] relative z-10 shadow-2xl flex flex-col overflow-hidden sm:rounded-[48px] border-white/5 sm:border-[12px] sm:border-zinc-900/50 bg-black/20 sm:bg-black/40 transition-all duration-700 ${currentScreen === 'welcome' ? 'backdrop-blur-none' : 'backdrop-blur-2xl'}`}>
        <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar scroll-smooth overscroll-none">
          {currentScreen === 'welcome' && (
            <WelcomeScreen
              language={language}
              onLogin={() => navigateTo('login')}
              onSignup={() => navigateTo('signup')}
              onGuest={handleGuestLogin}
            />
          )}

          {currentScreen === 'login' && (
            <LoginScreen
              language={language}
              onBack={() => navigateTo('welcome')}
              onSuccess={handleLoginSuccess}
            />
          )}

          {currentScreen === 'signup' && (
            <SignupScreen
              language={language}
              onBack={() => navigateTo('welcome')}
              onSuccess={() => navigateTo('nid')}
            />
          )}

          {currentScreen === 'nid' && (
            <NIDVerificationScreen
              language={language}
              onBack={() => navigateTo('signup')}
              onSuccess={handleLoginSuccess}
            />
          )}

          {currentScreen === 'home' && (
            <HomeScreen
              language={language}
              onSearch={(searchParams) => navigateTo('train-list', searchParams)}
              onViewHistory={() => navigateTo('history')}
              onTrack={() => navigateTo('tracking')}
              onViewNotifications={() => {
                setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                navigateTo('notifications');
              }}
              hasUnreadNotifications={notifications.some(n => !n.read)}
            />
          )}

          {currentScreen === 'train-list' && (
            <TrainListScreen
              language={language}
              onBack={() => navigateTo('home')}
              onSelectTrain={handleSelectTrain}
              searchData={bookingData}
            />
          )}

          {currentScreen === 'seat-selection' && selectedTrain && (
            <SeatSelectionScreen
              language={language}
              train={selectedTrain}
              selectedClass={bookingData.class || 'AC_S'}
              onBack={() => navigateTo('train-list')}
              onConfirm={(seats) => navigateTo('passenger-details', {
                selectedSeats: seats,
                totalAmount: seats.length * (selectedTrain.classes.find(c => c.type === (bookingData.class || 'AC_S'))?.fare || 0)
              })}
            />
          )}

          {currentScreen === 'passenger-details' && selectedTrain && (
            <PassengerDetailsScreen
              language={language}
              train={selectedTrain}
              selectedSeats={bookingData.selectedSeats || []}
              onBack={() => navigateTo('seat-selection')}
              onConfirm={(passengers) => navigateTo('payment', { passengers })}
            />
          )}

          {currentScreen === 'payment' && selectedTrain && (
            <PaymentScreen
              language={language}
              train={selectedTrain}
              bookingData={bookingData}
              onBack={() => navigateTo('seat-selection')}
              onSuccess={() => navigateTo('confirmation')}
            />
          )}

          {currentScreen === 'confirmation' && selectedTrain && (
            <BookingConfirmationScreen
              language={language}
              train={selectedTrain}
              bookingData={bookingData}
              onComplete={handleBookingComplete}
              onBack={() => navigateTo('seat-selection')}
            />
          )}

          {currentScreen === 'history' && (
            <TicketHistoryScreen language={language} tickets={history} onBack={() => navigateTo('home')} />
          )}

          {currentScreen === 'profile' && (
            <ProfileScreen
              language={language}
              setLanguage={setLanguage}
              onBack={() => navigateTo('home')}
              onLogout={() => {
                setIsAuthenticated(false);
                setIsGuest(false);
                setCurrentScreen('welcome');
              }}
            />
          )}

          {currentScreen === 'tracking' && (
            <TrainTrackingScreen language={language} onBack={() => navigateTo('home')} />
          )}

          {currentScreen === 'notifications' && (
            <NotificationsScreen
              language={language}
              notifications={notifications}
              onBack={() => navigateTo('home')}
              onClear={() => setNotifications([])}
            />
          )}
        </div>

        {/* Global Navigation Bar */}
        {isAuthenticated && !['welcome', 'login', 'signup', 'nid', 'confirmation', 'seat-selection', 'passenger-details', 'payment'].includes(currentScreen) && (
          <div className="absolute bottom-6 left-0 right-0 px-6 z-[100] pb-2">
            <nav className="glass-container rounded-[36px] p-2 flex items-center justify-between border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              {[
                { id: 'home', key: 'home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                { id: 'tracking', key: 'track', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
                { id: 'history', key: 'history', icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z' },
                { id: 'profile', key: 'profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => navigateTo(tab.id as any)}
                  className={`flex-1 flex flex-col items-center py-3.5 rounded-[28px] transition-all duration-300 relative ${currentScreen === tab.id ? 'text-emerald-400 scale-105' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  {currentScreen === tab.id && (
                    <div className="absolute inset-0 bg-emerald-500/10 rounded-[28px] blur-[8px] animate-pulse" />
                  )}
                  <svg className="w-6 h-6 relative z-10" fill={currentScreen === tab.id ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                  </svg>
                  <span className="text-[8px] mt-1 uppercase font-black tracking-widest relative z-10">{t[tab.key as keyof typeof t] || tab.id}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
