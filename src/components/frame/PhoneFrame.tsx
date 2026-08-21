import React, { useState, useEffect } from 'react';
import { useAppState } from '../../context/AppStateContext';
import Header from './Header';
import NavigationBar from './NavigationBar';
import { Wifi, Signal, Battery, Sliders, RefreshCw, Smartphone } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  const {
    currentScreen,
    billState,
    setBillState,
    vanStatus,
    setVanStatus,
    addressState,
    setAddressState,
    language,
    setLanguage,
    navigateTo,
  } = useAppState();

  const [currentTime, setCurrentTime] = useState<string>('09:41');
  const [showDemoControls, setShowDemoControls] = useState<boolean>(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setCurrentTime(
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const isMainFlow = ![
    'splash',
    'mobile_otp',
    'ward_setup',
    'property_link',
  ].includes(currentScreen);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-start sm:p-4 font-sans">
      {/* Prototype Header Toolbar - only visible on desktop */}
      <header className="hidden sm:flex w-full max-w-xl mb-3 bg-slate-800/90 backdrop-blur-md rounded-2xl p-3 border border-slate-700/80 shadow-lg flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white p-1 flex items-center justify-center shadow-sm shrink-0">
            <img src="/wise_logo.png" alt="Project WISE" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="font-bold text-slate-100 leading-none text-xs">Swachhata Citizen App</h1>
            <p className="text-emerald-400 text-[10px] font-semibold mt-0.5">Project WISE • Powered by NERDS</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDemoControls(!showDemoControls)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-200 rounded-lg border border-slate-600 transition"
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            <span>{showDemoControls ? 'Hide Demo Toggles' : 'Demo State Controls'}</span>
          </button>

          <button
            onClick={() => navigateTo('splash')}
            className="p-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg border border-slate-600"
            title="Reset to Splash Intro"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Demo Controls Bar - only on desktop */}
      {showDemoControls && (
        <section className="hidden sm:block w-full max-w-xl mb-3 bg-blue-950/40 border border-blue-800/60 rounded-xl p-3 text-xs">
          <div className="text-slate-300 font-medium mb-2 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-blue-300">
            <Smartphone className="w-3.5 h-3.5 text-blue-400" />
            Simulate PRD Screen States
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Bill Status</label>
              <select
                value={billState}
                onChange={(e) => setBillState(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500"
              >
                <option value="unpaid">Unpaid (₹150 Due)</option>
                <option value="paid">Paid (Badge)</option>
                <option value="unlinked">No Property Linked</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Live Fleet Van</label>
              <select
                value={vanStatus}
                onChange={(e) => setVanStatus(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500"
              >
                <option value="nearby">Nearby (~3 mins)</option>
                <option value="away">Not Nearby (Last known)</option>
                <option value="no_data">No Live Data</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Saved Addresses</label>
              <select
                value={addressState}
                onChange={(e) => setAddressState(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500"
              >
                <option value="populated">Populated List</option>
                <option value="empty">Empty State</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Global Language</label>
              <div className="flex bg-slate-800 border border-slate-700 rounded p-0.5">
                <button
                  onClick={() => setLanguage('en')}
                  className={`flex-1 py-0.5 rounded text-[11px] font-medium transition ${
                    language === 'en' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`flex-1 py-0.5 rounded text-[11px] font-medium transition ${
                    language === 'hi' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  हिंदी
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 
        RESPONSIVE FRAME:
        - Mobile (< sm): Full-screen native app feel, no frame shell
        - Desktop (≥ sm): iPhone 390px mockup frame with rounded corners
      */}
      <main className="
        relative w-full bg-white text-slate-800 flex flex-col select-none
        min-h-screen sm:min-h-0
        sm:max-w-[390px] sm:h-[844px]
        sm:rounded-[48px] sm:shadow-2xl sm:border-[10px] sm:border-slate-800
        sm:ring-1 sm:ring-slate-700/50
        overflow-hidden
      ">
        
        {/* iOS Dynamic Island & Status Bar - only visible on desktop frame */}
        <div className="hidden sm:flex relative bg-white z-40 px-6 pt-3 pb-2 items-center justify-between text-slate-900 font-semibold text-xs border-b border-slate-100">
          <span>{currentTime}</span>
          
          <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-28 h-5 bg-slate-950 rounded-full flex items-center justify-end px-2.5 gap-1.5 shadow-inner">
            <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
          </div>

          <div className="flex items-center gap-1.5 text-slate-700">
            <Signal className="w-3.5 h-3.5 fill-current" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {isMainFlow && <Header />}

        <div className="flex-1 overflow-y-auto bg-slate-50 relative phone-screen-scroll flex flex-col">
          {children}
        </div>

        {isMainFlow && <NavigationBar />}

        <div className="w-full bg-white py-2 flex justify-center items-center z-40 border-t border-slate-100 sm:flex hidden">
          <div className="w-32 h-1 bg-slate-400 rounded-full"></div>
        </div>
      </main>
    </div>
  );
};

export default PhoneFrame;
