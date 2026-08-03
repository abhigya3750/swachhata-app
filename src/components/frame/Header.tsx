import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { MapPin, Bell, ChevronDown, Check } from 'lucide-react';
import { MOCK_WARDS } from '../../data/mockData';

const Header: React.FC = () => {
  const { language, setLanguage, selectedWard, setSelectedWard, navigateTo } = useAppState();
  const [showWardPicker, setShowWardPicker] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-municipal-blue via-blue-600 to-municipal-darkBlue text-white px-4 py-2.5 shadow-md flex items-center justify-between border-b border-blue-700/80">
      {/* Ward Location Tag */}
      <div className="relative">
        <button
          onClick={() => setShowWardPicker(!showWardPicker)}
          className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 active:bg-white/30 text-white rounded-full px-3 py-1.5 min-h-touch text-xs font-medium border border-white/20 shadow-sm transition"
        >
          <MapPin className="w-4 h-4 text-emerald-300 shrink-0" />
          <span className="truncate max-w-[130px] font-semibold">
            {language === 'hi' ? selectedWard.nameHi : selectedWard.name}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-white/70" />
        </button>

        {/* Ward Selector Modal/Dropdown */}
        {showWardPicker && (
          <div className="absolute left-0 top-full mt-2 w-64 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
            <div className="px-2 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
              {language === 'hi' ? 'वार्ड चुनें' : 'Select Municipal Ward'}
            </div>
            <div className="max-h-52 overflow-y-auto space-y-1">
              {MOCK_WARDS.map((ward) => {
                const isSelected = ward.id === selectedWard.id;
                return (
                  <button
                    key={ward.id}
                    onClick={() => {
                      setSelectedWard(ward);
                      setShowWardPicker(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition ${
                      isSelected
                        ? 'bg-municipal-lightBlue text-municipal-blue font-semibold'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span>{language === 'hi' ? ward.nameHi : ward.name}</span>
                    {isSelected && <Check className="w-4 h-4 text-municipal-blue" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Language Switcher & Notification Bell */}
      <div className="flex items-center gap-2">
        {/* Language Toggle Button */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          className="flex items-center gap-1 bg-white/15 hover:bg-white/25 active:scale-95 text-white px-2.5 py-1.5 rounded-full text-xs font-semibold border border-white/25 min-h-touch transition shadow-sm"
          aria-label="Toggle language"
        >
          <span className={language === 'hi' ? 'text-amber-300 font-bold' : 'text-white/70'}>अ</span>
          <span className="text-white/40">/</span>
          <span className={language === 'en' ? 'text-amber-300 font-bold' : 'text-white/70'}>A</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-white/90 hover:text-white bg-white/15 hover:bg-white/25 rounded-full border border-white/20 min-h-touch min-w-touch flex items-center justify-center transition shadow-sm"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-white" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-action-red rounded-full ring-2 ring-municipal-blue"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                <span className="font-semibold text-xs text-slate-800">
                  {language === 'hi' ? 'सूचनाएं (2)' : 'Notifications (2)'}
                </span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-[10px] text-municipal-blue hover:underline font-medium"
                >
                  {language === 'hi' ? 'बंद करें' : 'Close'}
                </button>
              </div>

              <div className="space-y-2.5 text-xs">
                <div
                  onClick={() => {
                    setShowNotifications(false);
                    navigateTo('full_map');
                  }}
                  className="p-2 rounded-lg bg-emerald-50 border border-emerald-100 hover:bg-emerald-100/60 cursor-pointer transition"
                >
                  <div className="font-semibold text-emerald-800 flex items-center justify-between text-[11px]">
                    <span>{language === 'hi' ? 'कचरा गाड़ी निकट है' : 'Van Arriving Soon'}</span>
                    <span className="text-[9px] text-emerald-600">3 mins</span>
                  </div>
                  <p className="text-[10px] text-emerald-700 mt-0.5">
                    {language === 'hi'
                      ? 'गाड़ी संख्या MP-09-CZ-8832 आपकी गली में पहुँच रही है।'
                      : 'Indore Swachhata Tipper Van is entering Ward 34 lane.'}
                  </p>
                </div>

                <div
                  onClick={() => {
                    setShowNotifications(false);
                    navigateTo('bill_summary');
                  }}
                  className="p-2 rounded-lg bg-amber-50 border border-amber-100 hover:bg-amber-100/60 cursor-pointer transition"
                >
                  <div className="font-semibold text-amber-800 flex items-center justify-between text-[11px]">
                    <span>{language === 'hi' ? 'अपशिष्ट शुल्क देय' : 'Waste Utility Bill Due'}</span>
                    <span className="text-[9px] text-amber-600">₹150</span>
                  </div>
                  <p className="text-[10px] text-amber-700 mt-0.5">
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
