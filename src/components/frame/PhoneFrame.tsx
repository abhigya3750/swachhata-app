import React, { useState, useEffect } from 'react';
import { useAppState } from '../../context/AppStateContext';
import Header from './Header';
import NavigationBar from './NavigationBar';
import { Wifi, Signal, Battery, Sliders, RefreshCw, Maximize2, Minimize2 } from 'lucide-react';

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
  const [viewMode, setViewMode] = useState<'mobile' | 'responsive'>('mobile');

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start p-2 sm:p-4 font-sans select-none">
      {/* Prototype Top Toolbar */}
      <header className="w-full max-w-2xl mb-3 bg-slate-900/90 backdrop-blur-md rounded-2xl p-2.5 border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white p-0.5 flex items-center justify-center shadow-sm shrink-0 border border-slate-200">
            <img src="/imc_logo.png" alt="IMC Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="font-bold text-white leading-none text-xs flex items-center gap-1.5">
              <span>Swachhata Citizen Portal</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[9px] font-bold px-1.5 py-0.2 rounded border border-emerald-500/30">Indore IMC</span>
            </h1>
            <p className="text-emerald-400 text-[9.5px] font-semibold mt-0.5">
              Project WISE (Waste Innovation for Sustainable Environment)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setViewMode(viewMode === 'mobile' ? 'responsive' : 'mobile')}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 rounded-xl border border-slate-700 transition"
            title="Toggle between Fixed Mobile Viewport & Responsive Width"
          >
            {viewMode === 'mobile' ? (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Responsive</span>
              </>
            ) : (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Phone Frame</span>
              </>
            )}
          </button>

          <button
            onClick={() => setShowDemoControls(!showDemoControls)}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 rounded-xl border border-slate-700 transition"
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            <span>{showDemoControls ? 'Hide State' : 'State Controls'}</span>
          </button>

          <button
            onClick={() => navigateTo('splash')}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition"
            title="Reset to Splash Screen"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Demo Controls Bar */}
      {showDemoControls && (
        <section className="w-full max-w-2xl mb-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-xs shadow-lg">
          <div className="text-slate-400 font-semibold mb-2 flex items-center justify-between text-[10.5px] uppercase tracking-wider">
            <span className="text-blue-400 flex items-center gap-1">
              ⚡ Simulation Controls
            </span>
            <span className="text-slate-500 font-mono text-[9.5px]">8x Cleanest City Benchmark</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Bill Tariff Status</label>
              <select
                value={billState}
                onChange={(e) => setBillState(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 outline-none"
              >
                <option value="unpaid">Unpaid (₹150 Due)</option>
                <option value="paid">Paid (Badge)</option>
                <option value="unlinked">No Property Linked</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Live Fleet Tipper</label>
              <select
                value={vanStatus}
                onChange={(e) => setVanStatus(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 outline-none"
              >
                <option value="nearby">Nearby (~3 mins)</option>
                <option value="away">Not Nearby (Last known)</option>
                <option value="no_data">GPS Offline</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Saved Addresses</label>
              <select
                value={addressState}
                onChange={(e) => setAddressState(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 outline-none"
              >
                <option value="populated">Populated List</option>
                <option value="empty">Empty State</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Language</label>
              <div className="flex bg-slate-950 border border-slate-800 rounded-xl p-0.5">
                <button
                  onClick={() => setLanguage('en')}
                  className={`flex-1 py-0.5 rounded-lg text-[11px] font-bold transition ${
                    language === 'en' ? 'bg-municipal-blue text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`flex-1 py-0.5 rounded-lg text-[11px] font-bold transition ${
                    language === 'hi' ? 'bg-municipal-blue text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  हिंदी
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Viewport Container: Auto-adjusts for Mobile Sizes & Responsive Web */}
      <main
        className={`relative bg-white text-slate-800 transition-all duration-300 flex flex-col select-none overflow-hidden ${
          viewMode === 'mobile'
            ? 'w-full max-w-[390px] h-[844px] sm:h-[844px] rounded-[44px] shadow-2xl border-[8px] border-slate-800 ring-1 ring-slate-700/50'
            : 'w-full max-w-2xl min-h-[820px] rounded-3xl shadow-2xl border-4 border-slate-800'
        }`}
      >
        {/* iOS Dynamic Island & Status Bar (Visible in mobile frame mode) */}
        {viewMode === 'mobile' && (
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
        )}

        {isMainFlow && <Header />}

        <div className="flex-1 overflow-y-auto bg-slate-50 relative phone-screen-scroll flex flex-col">
          {children}
        </div>

        {isMainFlow && <NavigationBar />}

        {/* Home Indicator Bar */}
        <div className="w-full bg-white py-1.5 flex justify-center items-center z-40 border-t border-slate-100 shrink-0">
          <div className="w-28 h-1 bg-slate-400 rounded-full"></div>
        </div>
      </main>
    </div>
  );
};

export default PhoneFrame;
