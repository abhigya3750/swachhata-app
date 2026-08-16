import React, { useState } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { PRIMARY_CATEGORIES, SUB_CATEGORIES } from '../../../data/mockData';
import type { Category } from '../../../types';
import {
  Truck,
  Trash2,
  Wind,
  Waves,
  Sparkles,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Bot,
  PieChart,
  Box,
  ShoppingBag,
  Trash,
  Leaf,
  Ban,
  Cpu,
  ShieldAlert,
  UserX,
  Flame,
  ArrowRight,
  Gift
} from 'lucide-react';

const CategorySelectScreen: React.FC = () => {
  const { language, navigateTo, setSelectedComplaintCategory } = useAppState();
  const [showAccordion, setShowAccordion] = useState<boolean>(false);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'truck': return Truck;
      case 'trash-2': return Trash2;
      case 'broom': return Wind;
      case 'waves': return Waves;
      case 'sparkles': return Sparkles;
      case 'alert-triangle': return AlertTriangle;
      case 'pie-chart': return PieChart;
      case 'box': return Box;
      case 'shopping-bag': return ShoppingBag;
      case 'trash': return Trash;
      case 'leaf': return Leaf;
      case 'ban': return Ban;
      case 'cpu': return Cpu;
      case 'shield-alert': return ShieldAlert;
      case 'user-x': return UserX;
      case 'flame': return Flame;
      default: return Trash2;
    }
  };

  const handleSelectCategory = (category: Category) => {
    setSelectedComplaintCategory(category);
    navigateTo('evidence_location');
  };

  const handleSelectOther = () => {
    navigateTo('chat', { fromOtherCategory: true });
  };

  return (
    <div className="flex-1 bg-slate-50 p-4 space-y-4 pb-6 font-sans">
      {/* Municipal Blue Top Header Card */}
      <div className="bg-gradient-to-r from-municipal-blue via-blue-600 to-municipal-darkBlue text-white p-4 rounded-2xl shadow-md space-y-1">
        <h2 className="text-base font-bold">
          {language === 'hi' ? 'शिकायत श्रेणी का चयन करें' : 'Select Complaint Category'}
        </h2>
        <p className="text-xs text-blue-100/90 font-medium">
          {language === 'hi'
            ? 'त्वरित समाधान हेतु नगर निगम शिकायत एवं स्पॉट-ए-डंप सेवा'
            : 'Tap the category that best describes your sanitation issue'}
        </p>
      </div>

      {/* Community Spot-a-Dump Featured Banner (+50 PTS Reward) */}
      <div
        onClick={() =>
          handleSelectCategory({
            id: 'spot_a_dump',
            title: 'Community Spot-a-Dump (+50 PTS)',
            titleHi: 'स्पॉट-ए-डंप (इनाम +50 PTS)',
            iconName: 'sparkles',
            description: 'Report open garbage dump & earn 50 Eco-Points reward',
            descriptionHi: 'खुले कचरे के ढेर की रिपोर्ट करें और 50 पॉइंट्स पाएं',
            isPrimary: true,
            rewardPoints: 50,
          })
        }
        className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white rounded-2xl p-4 shadow-md cursor-pointer hover:scale-[1.02] active:scale-95 transition transform flex items-center justify-between border-2 border-amber-300"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur text-white flex items-center justify-center shrink-0 border border-white/30 shadow-inner">
            <Gift className="w-6 h-6 animate-bounce text-yellow-200" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black uppercase tracking-wider">
                {language === 'hi' ? 'स्पॉट-ए-डंप (इनाम पाएं)' : 'Spot-a-Dump (Earn Rewards)'}
              </span>
              <span className="bg-white text-amber-900 text-[9px] font-black px-1.5 py-0.2 rounded-full shadow-xs">
                +50 PTS
              </span>
            </div>
            <p className="text-[11px] text-amber-100 mt-0.5 leading-tight">
              {language === 'hi'
                ? 'सड़क या खाली प्लॉट पर कचरे के ढेर की फोटो भेजें और 50 पॉइंट्स पाएं'
                : 'Report public dump with photo proof & get 50 Eco-Points for Eco-Store'}
            </p>
          </div>
        </div>

        <ArrowRight className="w-4 h-4 text-white shrink-0" />
      </div>

      {/* 6 Primary Cards Grid */}
      <div className="grid grid-cols-2 gap-3">
        {PRIMARY_CATEGORIES.filter((c) => c.id !== 'spot_a_dump').map((cat) => {
          const IconComp = getCategoryIcon(cat.iconName);
          return (
            <div
              key={cat.id}
              onClick={() => handleSelectCategory(cat)}
              className="bg-white border border-slate-200 hover:border-municipal-blue rounded-2xl p-3.5 shadow-sm cursor-pointer transition touch-active flex flex-col justify-between min-h-[110px]"
            >
              <div className="w-10 h-10 rounded-xl bg-municipal-lightBlue text-municipal-blue flex items-center justify-center mb-2 shrink-0">
                <IconComp className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-800 leading-tight">
                  {language === 'hi' ? cat.titleHi : cat.title}
                </h3>
                <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-tight">
                  {language === 'hi' ? cat.descriptionHi : cat.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Accordion: 10 Sub-categories */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <button
          onClick={() => setShowAccordion(!showAccordion)}
          className="w-full px-4 py-3 bg-slate-100/80 hover:bg-slate-200/60 flex items-center justify-between text-xs font-bold text-slate-700 transition"
        >
          <span>
            {language === 'hi'
              ? `अन्य 10 विस्तृत श्रेणियां (${showAccordion ? 'छिपाएं' : 'देखें'})`
              : `View More Categories (10 Sub-categories)`}
          </span>
          {showAccordion ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showAccordion && (
          <div className="p-2 divide-y divide-slate-100">
            {SUB_CATEGORIES.map((sub) => {
              const SubIcon = getCategoryIcon(sub.iconName);
              return (
                <div
                  key={sub.id}
                  onClick={() => handleSelectCategory(sub)}
                  className="p-2.5 hover:bg-slate-50 rounded-xl cursor-pointer flex items-center justify-between text-xs transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                      <SubIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">
                        {language === 'hi' ? sub.titleHi : sub.title}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {language === 'hi' ? sub.descriptionHi : sub.description}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* "Other / अन्य" Card - Handoff to AI Chatbot */}
      <div
        onClick={handleSelectOther}
        className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-4 shadow-md cursor-pointer hover:brightness-110 transition touch-active flex items-center justify-between border border-blue-700"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur text-white flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold flex items-center gap-1.5">
              <span>{language === 'hi' ? 'अन्य समस्या / AI सहायता' : 'Other / अन्य (AI Assistant)'}</span>
            </div>
            <p className="text-[11px] text-blue-200 mt-0.5">
              {language === 'hi'
                ? 'यदि आपकी समस्या सूची में नहीं है, तो हमारे एआई सहायक से कहें'
                : 'Describe your custom issue directly to Swachhata Assistant'}
            </p>
          </div>
        </div>

        <ArrowRight className="w-4 h-4 text-white" />
      </div>
    </div>
  );
};

export default CategorySelectScreen;
