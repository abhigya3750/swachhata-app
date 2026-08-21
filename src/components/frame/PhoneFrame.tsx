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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start p-0 sm:p-6 font-sans">
      {/* Prototype Header Toolbar (Desktop Only) */}
      <header className="hidden sm:flex w-full max-w-xl mb-3 bg-slate-900/90 backdrop-blur-md rounded-2xl p-2.5 border border-slate-800 shadow-lg items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white p-0.5 flex items-center justify-center shadow-sm shrink-0 border border-white">
            <img src="/imc_logo.png" alt="IMC Crest" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="font-bold text-slate-100 leading-none text-xs">Swachhata Citizen App</h1>
            <p className="text-emerald-400 text-[10px] font-semibold mt-0.5">Project WISE • Powered by IMC</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDemoControls(!showDemoControls)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 rounded-xl border border-slate-700 transition"
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            <span>{showDemoControls ? 'Hide Controls' : 'Demo State Controls'}</span>
          </button>

          <button
            onClick={() => navigateTo('splash')}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700"
            title="Reset to Splash Intro"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Demo Controls Bar (Desktop Only) */}
      {showDemoControls && (
        <section className="hidden sm:block w-full max-w-xl mb-4 bg-blue-950/40 border border-blue-800/60 rounded-2xl p-3 text-xs shadow-inner">
          <div className="text-slate-300 font-medium mb-2 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-blue-300">
            <Smartphone className="w-3.5 h-3.5 text-blue-400" />
            Simulate Prototype States
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1 font-semibold">Bill Status</label>
              <select
                value={billState}
                onChange={(e) => setBillState(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2 py-1 focus:ring-1 focus:ring-blue-500 text-[11px]"
              >
                <option value="unpaid">Unpaid (₹150 Due)</option>
                <option value="paid">Paid (Badge)</option>
                <option value="unlinked">No Property Linked</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1 font-semibold">Live Fleet Van</label>
              <select
                value={vanStatus}
                onChange={(e) => setVanStatus(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2 py-1 focus:ring-1 focus:ring-blue-500 text-[11px]"
              >
                <option value="nearby">Nearby (~3 mins)</option>
                <option value="away">Not Nearby (Last known)</option>
                <option value="no_data">No Live Data</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1 font-semibold">Saved Addresses</label>
              <select
                value={addressState}
                onChange={(e) => setAddressState(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2 py-1 focus:ring-1 focus:ring-blue-500 text-[11px]"
              >
                <option value="populated">Populated List</option>
                <option value="empty">Empty State</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1 font-semibold">Language</label>
              <div className="flex bg-slate-800 border border-slate-700 rounded-lg p-0.5">
                <button
                  onClick={() => setLanguage('en')}
                  className={`flex-1 py-0.5 rounded-md text-[11px] font-bold transition ${
                    language === 'en' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`flex-1 py-0.5 rounded-md text-[11px] font-bold transition ${
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

      {/* Main Responsive iPhone Viewport Container */}
      <main className="relative w-full sm:max-w-[390px] h-screen sm:h-[844px] bg-white text-slate-800 sm:rounded-[44px] shadow-2xl sm:border-[8px] border-slate-800 overflow-hidden flex flex-col select-none ring-1 ring-slate-700/50">
        
        {/* iOS Dynamic Island & Status Bar */}
        <div className="relative bg-white z-40 px-6 pt-3 pb-2 flex items-center justify-between text-slate-900 font-semibold text-xs border-b border-slate-100 shrink-0">
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

        <div className="w-full bg-white py-1.5 flex justify-center items-center z-40 border-t border-slate-100 shrink-0">
          <div className="w-32 h-1 bg-slate-300 rounded-full"></div>
        </div>
      </main>
    </div>
  );
};

export default PhoneFrame;
