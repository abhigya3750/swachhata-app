import React from 'react';
import { useAppState } from '../../../context/AppStateContext';
import MockMap from '../../common/MockMap';
import { Badge } from '../../common/Badge';
import {
  Truck,
  CreditCard,
  PackageCheck,
  ShoppingBag,
  ArrowRight,
  Clock,
  AlertTriangle,
  Flame
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

  return (
    <div className="flex-1 bg-slate-50 p-4 space-y-4 pb-6">
      {/* Municipal Blue Top Header Card (Matching Profile Styling) */}
      <div className="bg-gradient-to-r from-municipal-blue to-municipal-darkBlue text-white p-4 rounded-2xl shadow-md space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">👋</span>
            <div>
              <h2 className="text-base font-bold">
                {language === 'hi' ? 'नमस्ते, राजेश कुमार' : 'Namaste, Rajesh Kumar'}
              </h2>
              <p className="text-[11px] text-blue-100/90">
                {language === 'hi'
                  ? 'इंदौर नगर निगम • प्रोजेक्ट वाइस नागरिक डैशबोर्ड'
                  : 'Indore Municipal Corporation • Project WISE Dashboard'}
              </p>
            </div>
          </div>
          <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/25">
            #1 Clean City
          </span>
        </div>
      </div>
      
      {/* 1. Live Fleet Radar Box */}
      <section className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-eco-darkGreen flex items-center justify-center font-bold">
              <Truck className="w-4 h-4 text-eco-green" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {language === 'hi' ? 'लाइव गाड़ी रडार' : 'Live Fleet Radar'}
              </h3>
              <p className="text-[10px] text-slate-500">
                {language === 'hi' ? selectedWard.nameHi : selectedWard.name}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigateTo('full_map')}
            className="text-[11px] font-semibold text-municipal-blue hover:text-municipal-darkBlue flex items-center gap-0.5 bg-municipal-lightBlue px-2.5 py-1 rounded-full border border-municipal-blue/20 transition"
          >
            <span>{language === 'hi' ? 'पूरा नक्शा देखें' : 'View Full Map'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {vanStatus === 'nearby' && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-eco-green animate-ping"></span>
              <div className="text-xs font-bold text-emerald-900">
                {language === 'hi' ? 'कचरा गाड़ी ~3 मिनट में आ रही है' : 'Garbage Van arriving in ~3 mins'}
              </div>
            </div>
            <Badge variant="success">Van #42</Badge>
          </div>
        )}

        {vanStatus === 'away' && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-2 flex items-center justify-between text-xs text-amber-900">
            <div className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>
                {language === 'hi' ? 'गाड़ी आपके वार्ड से आगे है' : 'Van not nearby • Next pass 02:30 PM'}
              </span>
            </div>
            <Badge variant="warning">Last Known</Badge>
          </div>
        )}

        {vanStatus === 'no_data' && (
          <div className="bg-slate-100 border border-slate-200 rounded-xl p-2 flex items-center gap-2 text-xs text-slate-600">
            <AlertTriangle className="w-4 h-4 text-slate-400" />
            <span>
              {language === 'hi'
                ? 'लाइव ट्रैकिंग अनुपलब्ध (ऑफलाइन)'
                : 'No live GPS signal currently reported'}
            </span>
          </div>
        )}

        <MockMap
          heightClass="h-36"
          showDriver={vanStatus === 'nearby' || vanStatus === 'away'}
          driverEta={vanStatus === 'nearby' ? '3 mins' : '15 mins'}
        />
      </section>

      {/* 2. Quick Utility Cards */}

      {/* Card A: Waste Utility Bill */}
      <section
        onClick={() => navigateTo('bill_summary')}
        className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm cursor-pointer hover:border-municipal-blue transition touch-active flex items-center justify-between"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-municipal-lightBlue text-municipal-blue flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-800">
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
                  {language === 'hi' ? 'भुगतान हो गया (Paid)' : 'Paid • Aug 2026'}
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

        <ArrowRight className="w-4 h-4 text-slate-400" />
      </section>

      {/* Card B: On-Demand Bulk Waste Pickup */}
      <section
        onClick={() => navigateTo('pickup_waste_type')}
        className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-4 shadow-md cursor-pointer hover:brightness-105 transition touch-active flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur text-white flex items-center justify-center shrink-0">
            <PackageCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold">
              {language === 'hi' ? 'बल्क कचरा पिकअप (Porter स्टाइल)' : 'On-Demand Bulk Pickup'}
            </div>
            <p className="text-[11px] text-emerald-100 opacity-90 mt-0.5">
              {language === 'hi'
                ? 'सूखा/मलबे/बगीचे का कचरा उठाने हेतु वाहन बुक करें'
                : 'Book dedicated vehicle for heavy debris & bulk waste'}
            </p>
          </div>
        </div>

        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <ArrowRight className="w-4 h-4 text-white" />
        </div>
      </section>

      {/* Card C: Eco-Store & Sacred Waste Preview */}
      <section className="grid grid-cols-2 gap-3">
        <div
          onClick={() => navigateTo('pavitra_scheduler')}
          className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3.5 cursor-pointer hover:bg-amber-500/20 transition touch-active"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center mb-2 shadow-sm">
            <Flame className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-amber-950">
            {language === 'hi' ? 'पवित्र पुष्प कचरा' : 'Pavitra Sacred Pickup'}
          </div>
          <p className="text-[10px] text-amber-800 mt-0.5">
            {language === 'hi' ? 'पूजा/फूल कचरा नि:शुल्क पिकअप' : 'Free floral waste schedule'}
          </p>
        </div>

        <div
          onClick={() => navigateTo('ecostore_grid')}
          className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-3.5 cursor-pointer hover:bg-emerald-500/20 transition touch-active"
        >
          <div className="w-8 h-8 rounded-lg bg-eco-green text-white flex items-center justify-center mb-2 shadow-sm">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-emerald-950">
            {language === 'hi' ? 'इको-स्टोर बाज़ार' : 'Eco-Store SHG Marketplace'}
          </div>
          <p className="text-[10px] text-emerald-800 mt-0.5">
            {language === 'hi'
              ? `इको कॉइन्स: ${ecoPoints} PTS • 80G टैक्स छूट`
              : `Balance: ${ecoPoints} PTS • 80G Tax Free`}
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
