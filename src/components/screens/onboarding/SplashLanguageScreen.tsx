import React, { useState, useEffect } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { Button } from '../../common/Button';
import { Sparkles, MapPin, ArrowRight } from 'lucide-react';

const SplashLanguageScreen: React.FC = () => {
  const { language, setLanguage, navigateTo } = useAppState();
  const [stage, setStage] = useState<'intro' | 'language'>('intro');

  useEffect(() => {
    if (stage === 'intro') {
      const timer = setTimeout(() => {
        setStage('language');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  return (
    <div className="flex-1 bg-gradient-to-b from-municipal-blue via-municipal-darkBlue to-slate-950 text-white p-5 flex flex-col justify-between items-center text-center relative overflow-hidden select-none font-sans">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

      {/* STAGE 1: Animated Splash Intro */}
      {stage === 'intro' ? (
        <div className="flex-1 w-full flex flex-col justify-between items-center py-6 animate-in fade-in zoom-in-95 duration-700">
          <div className="w-full flex justify-between items-center">
            {/* IMC Crest Logo */}
            <div className="w-10 h-10 rounded-full bg-white p-0.5 shadow-md border border-white/60">
              <img src="/imc_logo.png" alt="IMC Crest Logo" className="w-full h-full object-contain" />
            </div>

            <button
              onClick={() => setStage('language')}
              className="text-[11px] text-blue-200/80 hover:text-white bg-white/10 px-3 py-1 rounded-full border border-white/20 transition"
            >
              Skip Intro →
            </button>
          </div>

          {/* WISE Logo Emblem */}
          <div className="flex flex-col items-center my-auto space-y-4">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-blue-400 to-amber-400 rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition duration-1000 animate-pulse"></div>
              <div className="relative bg-white rounded-3xl p-4 shadow-2xl border border-white/80 w-44 h-44 flex items-center justify-center">
                <img
                  src="/wise_logo.png"
                  alt="Project WISE Logo"
                  className="w-full h-full object-contain drop-shadow-md animate-in zoom-in-75 duration-700"
                />
              </div>
            </div>

            <div className="space-y-1.5 max-w-xs">
              <h1 className="text-2xl font-black tracking-wider text-white uppercase">
                Project WISE
              </h1>
              <p className="text-xs font-bold text-emerald-300 tracking-wide">
                Waste Innovation for Sustainable Environment
              </p>
              <p className="text-[10px] text-blue-200/80 leading-relaxed font-medium">
                Indore Municipal Corporation (IMC) • 8x Cleanest City
              </p>
            </div>
          </div>

          {/* Bottom Accreditation */}
          <div className="space-y-1 pt-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-[10px] font-semibold border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Indore Municipal Corporation (IMC)</span>
            </div>
            <p className="text-[9px] text-white/40">
              Technology Service Provider: Project WISE Platform
            </p>
          </div>
        </div>
      ) : (
        /* STAGE 2: Language Selection */
        <div className="flex-1 w-full flex flex-col justify-between items-center py-3 animate-in fade-in duration-500">
          
          {/* Header with Official IMC Logo */}
          <div className="w-full pt-2 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white p-1 text-municipal-blue font-black flex items-center justify-center shadow-xl border-2 border-white/40 mb-2">
              <img src="/imc_logo.png" alt="Indore Municipal Corporation Crest" className="w-full h-full object-contain" />
            </div>

            <h1 className="text-lg font-bold text-white tracking-tight">
              Indore Municipal Corporation
            </h1>
            <p className="text-[11px] text-blue-100/90 font-medium">
              {language === 'hi' ? 'स्वच्छता नागरिक सेवा पोर्टल' : 'Swachhata Citizen Service Portal'}
            </p>
          </div>

          {/* WISE Logo & Language Choose Card */}
          <div className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl my-4 space-y-4">
            
            <div className="flex items-center justify-center gap-3 py-1">
              <div className="bg-white rounded-2xl p-2 shadow-lg border border-white/80 h-16 w-36 flex items-center justify-center">
                <img
                  src="/wise_logo.png"
                  alt="Project WISE"
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>

            <div className="text-xs font-semibold text-blue-200 flex items-center justify-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-300" />
              <span>{language === 'hi' ? 'भाषा का चयन करें' : 'Select Preferred Language'}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setLanguage('hi')}
                className={`p-3.5 rounded-2xl border flex flex-col items-center gap-1 transition touch-active ${
                  language === 'hi'
                    ? 'bg-white text-municipal-darkBlue border-white shadow-xl font-bold scale-105 ring-2 ring-emerald-400'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                <span className="text-xl font-bold">हिंदी</span>
                <span className="text-[10px] opacity-80">Hindi</span>
              </button>

              <button
                onClick={() => setLanguage('en')}
                className={`p-3.5 rounded-2xl border flex flex-col items-center gap-1 transition touch-active ${
                  language === 'en'
                    ? 'bg-white text-municipal-darkBlue border-white shadow-xl font-bold scale-105 ring-2 ring-emerald-400'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                <span className="text-xl font-bold">English</span>
                <span className="text-[10px] opacity-80">अंग्रेज़ी</span>
              </button>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="w-full space-y-3 pb-2">
            <Button variant="eco" onClick={() => navigateTo('mobile_otp')}>
              <span>{language === 'hi' ? 'आगे बढ़ें (Continue)' : 'Continue to Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="text-[10px] text-white/60 space-y-0.5">
              <p className="font-semibold text-emerald-300">
                Project WISE • Waste Innovation for Sustainable Environment
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default SplashLanguageScreen;
