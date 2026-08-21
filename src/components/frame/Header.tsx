import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { MapPin, Bell, ChevronDown, Check, X } from 'lucide-react';
import { MOCK_WARDS } from '../../data/mockData';

const Header: React.FC = () => {
  const { language, setLanguage, selectedWard, setSelectedWard, navigateTo } = useAppState();
  const [showWardPicker, setShowWardPicker] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-municipal-blue via-blue-600 to-municipal-darkBlue text-white px-3 py-2 shadow-md flex items-center justify-between border-b border-blue-700/80">
      
      {/* Left: Official IMC Logo & Ward Selector */}
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {/* Official IMC Logo Emblem */}
        <div className="w-8 h-8 rounded-full bg-white p-0.5 shadow-sm border border-white/40 shrink-0 flex items-center justify-center">
          <img
            src="/imc_logo.png"
            alt="Indore Municipal Corporation Emblem"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Interactive Ward Selector Pill */}
        <div className="relative min-w-0 flex-1">
          <button
            onClick={() => setShowWardPicker(!showWardPicker)}
            className="flex items-center gap-1 bg-white/15 hover:bg-white/25 active:bg-white/30 text-white rounded-full px-2.5 py-1 text-xs font-semibold border border-white/25 shadow-sm transition max-w-full"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <span className="truncate text-[11px]">
              {language === 'hi' ? selectedWard.nameHi : selectedWard.name}
            </span>
            <ChevronDown className="w-3 h-3 text-white/80 shrink-0 ml-0.5" />
          </button>

          {/* Ward Selector Modal/Dropdown */}
          {showWardPicker && (
            <div className="absolute left-0 top-full mt-2 w-60 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1 flex justify-between items-center">
                <span>{language === 'hi' ? 'वार्ड चुनें' : 'Select Municipal Ward'}</span>
                <button onClick={() => setShowWardPicker(false)} className="p-0.5 text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="max-h-52 overflow-y-auto space-y-0.5">
                {MOCK_WARDS.map((ward) => {
                  const isSelected = ward.id === selectedWard.id;
                  return (
                    <button
                      key={ward.id}
                      onClick={() => {
                        setSelectedWard(ward);
                        setShowWardPicker(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between transition ${
                        isSelected
                          ? 'bg-municipal-lightBlue text-municipal-blue font-bold'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span>{language === 'hi' ? ward.nameHi : ward.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-municipal-blue" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Language Switcher & Notification Bell */}
      <div className="flex items-center gap-1.5 shrink-0 ml-2">
        {/* Language Toggle Button */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          className="flex items-center gap-0.5 bg-white/15 hover:bg-white/25 active:scale-95 text-white px-2 py-1 rounded-full text-xs font-bold border border-white/25 transition shadow-xs"
          aria-label="Toggle language"
          title="Switch Language (Hindi / English)"
        >
          <span className={language === 'hi' ? 'text-amber-300' : 'text-white/70'}>अ</span>
          <span className="text-white/40">/</span>
          <span className={language === 'en' ? 'text-amber-300' : 'text-white/70'}>A</span>
        </button>

        {/* Notification Bell Icon */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-1.5 text-white/90 hover:text-white bg-white/15 hover:bg-white/25 rounded-full border border-white/25 flex items-center justify-center transition shadow-xs"
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-white" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-municipal-blue animate-pulse"></span>
          </button>

          {/* Notifications Dropdown Drawer */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                <span className="font-bold text-xs text-slate-800">
                  {language === 'hi' ? 'सूचनाएं (2)' : 'Notifications (2)'}
                </span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-[10px] text-slate-400 hover:text-slate-700 font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div
                  onClick={() => {
                    setShowNotifications(false);
                    navigateTo('full_map');
                  }}
                  className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100/60 cursor-pointer transition"
                >
                  <div className="font-bold text-emerald-900 flex items-center justify-between text-[11px]">
                    <span>{language === 'hi' ? 'कचरा गाड़ी निकट है' : 'Garbage Van Nearby'}</span>
                    <span className="text-[9px] bg-emerald-200 text-emerald-800 px-1.5 py-0.2 rounded font-mono">3 mins</span>
                  </div>
                  <p className="text-[10px] text-emerald-700 mt-0.5 leading-tight">
                    {language === 'hi'
                      ? 'गाड़ी संख्या MP-09-CZ-8832 आपकी गली में पहुँच रही है।'
                      : 'Indore Swachhata Tipper Van #42 is entering Ward 34 lane.'}
                  </p>
                </div>

                <div
                  onClick={() => {
                    setShowNotifications(false);
                    navigateTo('bill_summary');
                  }}
                  className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100/60 cursor-pointer transition"
                >
                  <div className="font-bold text-amber-950 flex items-center justify-between text-[11px]">
                    <span>{language === 'hi' ? 'कचरा शुल्क देय' : 'Utility Bill Due'}</span>
                    <span className="text-[9px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-mono">₹150</span>
                  </div>
                  <p className="text-[10px] text-amber-800 mt-0.5 leading-tight">
                    {language === 'hi'
                      ? 'अगस्त 2026 शुल्क देय तिथि 15 अगस्त है।'
                      : 'August 2026 waste utility bill due on 15th Aug.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
