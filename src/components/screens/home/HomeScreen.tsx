import React, { useState } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import MockMap from '../../common/MockMap';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';
import {
  Truck,
  CreditCard,
  PackageCheck,
  ShoppingBag,
  ArrowRight,
  Clock,
  AlertTriangle,
  Flame,
  Award,
  ShieldCheck,
  Building,
  Store
} from 'lucide-react';

const HomeScreen: React.FC = () => {
  const {
    language,
    navigateTo,
    selectedWard,
    billState,
    vanStatus,
    propertyTax,
    ecoPoints,
  } = useAppState();

  const [showCleanCitySealModal, setShowCleanCitySealModal] = useState<boolean>(false);

  return (
    <div className="flex-1 bg-slate-50 p-4 space-y-4 pb-6 font-sans">
      
      {/* 1. Clean Municipal Blue Header with 8x National Cleanest City Seal */}
      <div className="bg-gradient-to-r from-municipal-blue via-blue-600 to-municipal-darkBlue text-white p-4 rounded-2xl shadow-md relative overflow-hidden">
        {/* Subtle background decorative emblem */}
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

        <div className="flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-blue-100 text-xs font-semibold">
              <span>{language === 'hi' ? 'इंदौर नगर निगम' : 'Indore Municipal Corporation'}</span>
              <span>•</span>
              <span className="text-emerald-300 font-bold">{selectedWard.name}</span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              {language === 'hi' ? 'नमस्ते, राजेश कुमार 👋' : 'Namaste, Rajesh Kumar 👋'}
            </h2>
          </div>

          {/* Prestigious 8x Clean City Achievement Seal (Clickable for details) */}
          <button
            onClick={() => setShowCleanCitySealModal(true)}
            className="group relative flex flex-col items-center bg-gradient-to-b from-amber-300 via-amber-400 to-yellow-500 text-slate-950 px-3 py-1.5 rounded-2xl shadow-lg border border-amber-200 hover:scale-105 active:scale-95 transition-transform shrink-0"
            title="View Swachh Survekshan 8x National Award Seal"
          >
            <div className="flex items-center gap-0.5 text-[8px] font-black tracking-tighter text-amber-950 uppercase">
              <span>★★★★★</span>
            </div>
            <div className="flex items-center gap-1 my-0.5">
              <Award className="w-4 h-4 text-amber-950 stroke-[2.5]" />
              <span className="text-xs font-black tracking-tight leading-none">#1 CITY</span>
            </div>
            <div className="text-[7.5px] font-black uppercase tracking-widest text-amber-950/90 bg-amber-200/80 px-1.5 py-0.2 rounded-full">
              8x National
            </div>
          </button>
        </div>
      </div>

      {/* 2. Live Fleet Radar Box */}
      <section className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-eco-darkGreen flex items-center justify-center font-bold shadow-sm shrink-0">
              <Truck className="w-4 h-4 text-eco-green" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <span>{language === 'hi' ? 'लाइव गाड़ी रडार' : 'Live Fleet Radar'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                {language === 'hi' ? selectedWard.nameHi : selectedWard.name} • Route #34A
              </p>
            </div>
          </div>

          <button
            onClick={() => navigateTo('full_map')}
            className="text-[11px] font-bold text-municipal-blue hover:text-municipal-darkBlue flex items-center gap-0.5 bg-municipal-lightBlue px-2.5 py-1 rounded-full border border-municipal-blue/20 transition touch-active shrink-0"
          >
            <span>{language === 'hi' ? 'पूरा नक्शा देखें' : 'View Full Map'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Clean Proximity Banner */}
        {vanStatus === 'nearby' && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-3 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded-full bg-eco-green flex items-center justify-center shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-950">
                  {language === 'hi' ? 'कचरा गाड़ी ~3 मिनट में आ रही है' : 'Garbage Van Arriving in ~3 mins'}
                </div>
                <div className="text-[10px] text-emerald-700">
                  Entering Scheme 54 Residential Lane
                </div>
              </div>
            </div>

            <span className="bg-emerald-600 text-white px-2.5 py-1 rounded-xl text-xs font-bold shrink-0 shadow-xs">
              Tipper #42
            </span>
          </div>
        )}

        {vanStatus === 'away' && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 flex items-center justify-between text-xs text-amber-900">
            <div className="flex items-center gap-2 font-medium">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="font-bold block">
                  {language === 'hi' ? 'गाड़ी आपके वार्ड से आगे है' : 'Van not nearby currently'}
                </span>
                <span className="text-[10px] text-amber-700">
                  Next scheduled collection pass at 02:30 PM (Tipper Van #42)
                </span>
              </div>
            </div>
            <Badge variant="warning">Last Known</Badge>
          </div>
        )}

        {vanStatus === 'no_data' && (
          <div className="bg-slate-100 border border-slate-200 rounded-xl p-2.5 flex items-center gap-2 text-xs text-slate-600">
            <AlertTriangle className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              {language === 'hi'
                ? 'लाइव जीपीएस सिग्नल ऑफलाइन है। नियमित समय सारिणी लागू है।'
                : 'Vehicle GPS offline. Standard morning schedule: 07:00 AM – 11:30 AM.'}
            </span>
          </div>
        )}

        {/* Map Viewport with Draggable / Animated Van marker */}
        <MockMap
          heightClass="h-36"
          showDriver={vanStatus === 'nearby' || vanStatus === 'away'}
          driverEta={vanStatus === 'nearby' ? '3 mins' : '15 mins'}
        />
      </section>

      {/* 3. Quick Civic Utilities Bar (Toilet Locator & Commercial Flow) */}
      <section className="grid grid-cols-2 gap-3">
        <div
          onClick={() => navigateTo('toilet_locator')}
          className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm cursor-pointer hover:border-municipal-blue transition touch-active flex items-start gap-2.5"
        >
          <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center shrink-0">
            <Building className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
              <span className="truncate">{language === 'hi' ? 'सार्वजनिक शौचालय' : 'Public Toilets'}</span>
              <span className="bg-pink-100 text-pink-700 text-[8px] font-bold px-1 rounded shrink-0">Pink</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-0.5 leading-tight line-clamp-2">
              {language === 'hi' ? '5-स्टार CT/PT व शी-लाउंज' : 'Find nearest clean restrooms'}
            </p>
          </div>
        </div>

        <div
          onClick={() => navigateTo('commercial_waste')}
          className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm cursor-pointer hover:border-municipal-blue transition touch-active flex items-start gap-2.5"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-municipal-blue flex items-center justify-center shrink-0">
            <Store className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
              <span className="truncate">{language === 'hi' ? 'व्यावसायिक कचरा' : 'Commercial'}</span>
              <span className="bg-blue-100 text-blue-700 text-[8px] font-bold px-1 rounded shrink-0">GST</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-0.5 leading-tight line-clamp-2">
              {language === 'hi' ? 'दुकान व होटल पिकअप' : 'Shops & market logistics'}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Core Utility Cards Grid */}

      {/* Card A: Waste Utility Bill (BBPS) */}
      <section
        onClick={() => navigateTo('bill_summary')}
        className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm cursor-pointer hover:border-municipal-blue transition touch-active flex items-center justify-between"
      >
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-xl bg-municipal-lightBlue text-municipal-blue flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-slate-900 truncate">
              {language === 'hi' ? 'कचरा प्रबंधन शुल्क बिल' : 'Waste Utility Bill Payment'}
            </div>

            {billState === 'unpaid' && (
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm font-bold text-civic-darkYellow">₹{propertyTax.amountDue}</span>
                <Badge variant="warning">
                  {language === 'hi' ? 'देय तिथि: 15 अगस्त' : 'Due: 15 Aug'}
                </Badge>
              </div>
            )}

            {billState === 'paid' && (
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="success">
                  {language === 'hi' ? 'भुगतान हुआ • अगस्त 2026' : 'Paid • Aug 2026'}
                </Badge>
              </div>
            )}

            {billState === 'unlinked' && (
              <p className="text-xs text-municipal-blue font-semibold mt-1">
                {language === 'hi' ? '+ अपनी संपत्ति कर आईडी लिंक करें' : '+ Link your Property Tax ID'}
              </p>
            )}
          </div>
        </div>

        <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
      </section>

      {/* Card B: On-Demand Bulk Waste Pickup */}
      <section
        onClick={() => navigateTo('pickup_waste_type')}
        className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-4 shadow-md cursor-pointer hover:brightness-105 transition touch-active flex items-center justify-between"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur text-white flex items-center justify-center shrink-0">
            <PackageCheck className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold truncate">
              {language === 'hi' ? 'बल्क कचरा पिकअप (Porter स्टाइल)' : 'On-Demand Bulk Pickup'}
            </div>
            <p className="text-[11px] text-emerald-100 opacity-90 mt-0.5 line-clamp-1">
              {language === 'hi'
                ? 'सूखा/मलबे/बगीचे का कचरा उठाने हेतु वाहन बुक करें'
                : 'Book dedicated vehicle for heavy debris & bulk scrap'}
            </p>
          </div>
        </div>

        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 ml-2">
          <ArrowRight className="w-4 h-4 text-white" />
        </div>
      </section>

      {/* Card C: Pavitra Sacred Waste & Eco-Store Preview */}
      <section className="grid grid-cols-2 gap-3">
        <div
          onClick={() => navigateTo('pavitra_scheduler')}
          className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3.5 cursor-pointer hover:bg-amber-500/20 transition touch-active flex flex-col justify-between"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center mb-2 shadow-sm">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-950">
              {language === 'hi' ? 'पवित्र पुष्प कचरा' : 'Pavitra Sacred Pickup'}
            </div>
            <p className="text-[10px] text-amber-800 mt-0.5 line-clamp-1">
              {language === 'hi' ? 'पूजा/फूल कचरा नि:शुल्क पिकअप' : 'Free floral waste schedule'}
            </p>
          </div>
        </div>

        <div
          onClick={() => navigateTo('ecostore_grid')}
          className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-3.5 cursor-pointer hover:bg-emerald-500/20 transition touch-active flex flex-col justify-between"
        >
          <div className="w-8 h-8 rounded-lg bg-eco-green text-white flex items-center justify-center mb-2 shadow-sm">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-950">
              {language === 'hi' ? 'इको-स्टोर बाज़ार' : 'Eco-Store SHG Market'}
            </div>
            <p className="text-[10px] text-emerald-800 mt-0.5 line-clamp-1">
              {language === 'hi'
                ? `इको कॉइन्स: ${ecoPoints} PTS • 80G छूट`
                : `Balance: ${ecoPoints} PTS • 80G Tax Free`}
            </p>
          </div>
        </div>
      </section>

      {/* MODAL: Swachh Survekshan 8-Time National Award Modal */}
      <Modal
        isOpen={showCleanCitySealModal}
        onClose={() => setShowCleanCitySealModal(false)}
        title={language === 'hi' ? 'राष्ट्रीय स्वच्छता गौरव • इंदौर' : 'Indore: India’s 8x Cleanest City'}
      >
        <div className="space-y-4 p-2 text-slate-800 font-sans">
          <div className="bg-gradient-to-b from-amber-100 to-amber-50 p-4 rounded-2xl border border-amber-300 text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 text-amber-950 flex items-center justify-center mx-auto shadow-md">
              <Award className="w-8 h-8 stroke-[2.2]" />
            </div>
            <h3 className="text-base font-black text-amber-950">
              Swachh Survekshan 8x Consecutive National Champion
            </h3>
            <p className="text-xs text-amber-900 leading-relaxed font-medium">
              Ranked <strong>#1 Cleanest City in India for 8 Consecutive Years</strong> by the Ministry of Housing & Urban Affairs (MoHUA), Government of India.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-500 block font-semibold">Garbage Free Rating</span>
              <span className="font-bold text-slate-900 flex items-center gap-1 text-xs">
                ★★★★★★★ 7-Star GFC
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-500 block font-semibold">Water+ Certified</span>
              <span className="font-bold text-emerald-700 text-xs">
                100% Sewage Treated
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-500 block font-semibold">Segregation Compliance</span>
              <span className="font-bold text-slate-900 text-xs">
                99.8% Doorstep 6-Bin
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-500 block font-semibold">Bio-CNG Production</span>
              <span className="font-bold text-slate-900 text-xs">
                550 TPD Gobar-Dhan
              </span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-municipal-blue shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              Every citizen’s daily waste segregation at source directly powers Indore’s Bio-CNG city buses and sustainable SHG compost initiatives.
            </p>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default HomeScreen;
