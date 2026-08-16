import React from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { ECO_PRODUCTS } from '../../../data/mockData';
import type { EcoProduct } from '../../../types';
import { Badge } from '../../common/Badge';
import { Sparkles, Flame, Star, Gift, ArrowRight } from 'lucide-react';

const EcoStoreGridScreen: React.FC = () => {
  const { language, navigateTo, ecoPoints, setSelectedProduct, setSelectedComplaintCategory } = useAppState();

  const handleSelectProduct = (product: EcoProduct) => {
    setSelectedProduct(product);
    navigateTo('product_detail');
  };

  const handleEarnPoints = () => {
    setSelectedComplaintCategory({
      id: 'spot_a_dump',
      title: 'Community Spot-a-Dump (+50 PTS)',
      titleHi: 'स्पॉट-ए-डंप (इनाम +50 PTS)',
      rewardPoints: 50,
    });
    navigateTo('evidence_location');
  };

  return (
    <div className="flex-1 bg-slate-50 p-4 space-y-4 pb-6 font-sans">
      {/* Municipal Blue Top Header Card */}
      <div className="bg-gradient-to-r from-municipal-blue via-blue-600 to-municipal-darkBlue text-white p-4 rounded-2xl shadow-md flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-blue-100 font-semibold">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{language === 'hi' ? 'इको-कॉइन्स बैलेंस' : 'Eco-Points Rewards Balance'}</span>
          </div>
          <div className="text-2xl font-black tracking-tight mt-0.5">{ecoPoints} PTS</div>
        </div>

        <button
          onClick={() => navigateTo('pavitra_scheduler')}
          className="bg-white/20 hover:bg-white/30 border border-white/25 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 transition"
        >
          <Flame className="w-3.5 h-3.5 text-amber-300" />
          <span>{language === 'hi' ? 'पवित्र वेस्ट' : 'Pavitra Pickup'}</span>
        </button>
      </div>

      {/* Earn Points via Spot-a-Dump Banner */}
      <div
        onClick={handleEarnPoints}
        className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl shadow-sm flex items-center justify-between cursor-pointer hover:scale-[1.01] transition"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
            <Gift className="w-4 h-4 text-yellow-200" />
          </div>
          <div>
            <span className="text-xs font-bold block">Need more points?</span>
            <span className="text-[10px] text-amber-100">Report an open dump in Spot-a-Dump & earn +50 PTS</span>
          </div>
        </div>
        <ArrowRight className="w-4 h-4" />
      </div>

      {/* SHG Section Header */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            {language === 'hi' ? 'महिला स्व-सहायता समूह बाज़ार' : 'SHG Eco Marketplace'}
          </h2>
          <Badge variant="success">80G Tax Exempt</Badge>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          {language === 'hi'
            ? 'अपसाइकल्ड कचरे से निर्मित 100% टिकाऊ उत्पाद'
            : 'Buy upcycled eco products crafted by Women Self Help Groups of Indore'}
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3">
        {ECO_PRODUCTS.map((prod) => (
          <div
            key={prod.id}
            onClick={() => handleSelectProduct(prod)}
            className="bg-white border border-slate-200 hover:border-eco-green rounded-2xl overflow-hidden shadow-sm cursor-pointer transition touch-active flex flex-col justify-between"
          >
            <div className="relative h-28 w-full bg-slate-100 overflow-hidden">
              <img
                src={prod.imageUrl}
                alt={prod.title}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
              <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <Star className="w-2.5 h-2.5 fill-current" /> {prod.rating}
              </span>
              {prod.ecoTaxExempt && (
                <span className="absolute top-2 right-2 bg-emerald-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
                  80G
                </span>
              )}
            </div>

            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-semibold text-emerald-700 truncate">{prod.shgGroup}</div>
                <h3 className="text-xs font-bold text-slate-900 line-clamp-1 mt-0.5">
                  {language === 'hi' ? prod.titleHi : prod.title}
                </h3>
              </div>

              <div className="mt-2 flex items-center justify-between pt-1 border-t border-slate-100">
                <span className="text-sm font-black text-slate-900">₹{prod.price}</span>
                <span className="text-[10px] text-eco-darkGreen font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                  +{prod.pointsReward} PTS
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EcoStoreGridScreen;
