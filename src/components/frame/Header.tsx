import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { MapPin, Bell, ChevronDown, Check, X } from 'lucide-react';
import { MOCK_WARDS } from '../../data/mockData';

const Header: React.FC = () => {
  const { language, setLanguage, selectedWard, setSelectedWard, navigateTo } = useAppState();
  const [showWardPicker, setShowWardPicker] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-municipal-blue via-blue-600 to-municipal-darkBlue text-white px-3 py-2 shadow-md border-b border-blue-700/80 flex items-center justify-between">
      
      {/* Left: Ward Location Selector Pill */}
      <div className="relative">
        <button
          onClick={() => setShowWardPicker(!showWardPicker)}
          className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 active:scale-95 text-white rounded-full px-3 py-1.5 text-xs font-semibold border border-white/30 shadow-sm transition min-h-touch"
          title="Select Municipal Ward"
        >
          <MapPin className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
          <span className="truncate max-w-[130px] font-bold text-white tracking-tight">
            {language === 'hi' ? selectedWard.nameHi : selectedWard.name}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-white/80 shrink-0" />
        </button>

        {/* Ward Selector Dropdown */}
        {showWardPicker && (
          <div className="absolute left-0 top-full mt-2 w-64 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 font-sans">
            <div className="px-2 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1 flex justify-between items-center">
              <span>{language === 'hi' ? 'वार्ड का चयन करें' : 'Select Municipal Ward'}</span>
              <button onClick={() => setShowWardPicker(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-3 h-3" />
              </button>
            </div>
            <div className="max-h-56 overflow-y-auto space-y-1 phone-screen-scroll">
              {MOCK_WARDS.map((ward) => {
                const isSelected = ward.id === selectedWard.id;
                return (
                  <button
                    key={ward.id}
                    onClick={() => {
                      setSelectedWard(ward);
                      setShowWardPicker(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition ${
                      isSelected
                        ? 'bg-municipal-lightBlue text-municipal-blue font-bold shadow-xs'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{language === 'hi' ? ward.nameHi : ward.name}</div>
                      {ward.landmark && (
                        <div className="text-[9.5px] text-slate-400">{ward.landmark}</div>
                      )}
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-municipal-blue shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Right Controls: Official IMC Logo, Language Switcher & Notification Bell */}
      <div className="flex items-center gap-2">
        {/* Official IMC Crest Logo Emblem */}
        <div className="w-7 h-7 rounded-full bg-white p-0.5 shadow-sm border border-white/40 overflow-hidden shrink-0" title="Indore Municipal Corporation (IMC)">
          <img src="/imc_logo.png" alt="IMC Official Crest Logo" className="w-full h-full object-contain" />
        </div>

        {/* Language Switcher */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          className="flex items-center gap-0.5 bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded-full text-xs font-bold border border-white/30 shadow-xs transition shrink-0"
          title="Switch Language"
        >
          <span className={language === 'hi' ? 'text-amber-300 font-bold' : 'text-white/70'}>अ</span>
          <span className="text-white/40 text-[10px]">/</span>
          <span className={language === 'en' ? 'text-amber-300 font-bold' : 'text-white/70'}>A</span>
        </button>

        {/* High-Contrast Notification Bell Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-white bg-white/20 hover:bg-white/30 rounded-full border border-white/30 shadow-xs flex items-center justify-center transition shrink-0"
            aria-label="Notifications"
            title="View Notifications"
          >
            <Bell className="w-4 h-4 text-white fill-white/20" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-blue-700 animate-ping"></span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-blue-700"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 font-sans">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                <span className="font-bold text-xs text-slate-900">
                  {language === 'hi' ? 'सूचनाएं (2)' : 'Notifications (2)'}
                </span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-[10px] text-slate-400 hover:text-slate-600 font-bold px-1.5 py-0.5 bg-slate-100 rounded-lg"
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
                    <span>{language === 'hi' ? 'कचरा गाड़ी निकट है' : 'Van Arriving Soon'}</span>
                    <span className="text-[9px] bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded">3 mins</span>
                  </div>
                  <p className="text-[10px] text-emerald-700 mt-1">
                    {language === 'hi'
                      ? 'गाड़ी संख्या MP-09-CZ-8832 आपकी गली में पहुँच रही है।'
                      : 'Swachhata Tipper Van #42 is entering Ward 34 residential lane.'}
                  </p>
                </div>

                <div
                  onClick={() => {
                    setShowNotifications(false);
                    navigateTo('bill_summary');
                  }}
                  className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100/60 cursor-pointer transition"
                >
                  <div className="font-bold text-amber-900 flex items-center justify-between text-[11px]">
                    <span>{language === 'hi' ? 'अपशिष्ट शुल्क देय' : 'Waste Utility Bill Due'}</span>
                    <span className="text-[9px] bg-amber-600 text-white font-bold px-1.5 py-0.2 rounded">₹150</span>
                  </div>
                  <p className="text-[10px] text-amber-800 mt-1">
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
