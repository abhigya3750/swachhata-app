import React, { useState, useEffect } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { Button } from '../../common/Button';
import { ArrowLeft, Check } from 'lucide-react';

const PickupWasteTypeScreen: React.FC = () => {
  const { language, navigateTo, goBack, pickupDraft, setPickupDraft } = useAppState();

  const [wasteType, setWasteType] = useState<string>(pickupDraft?.wasteType || 'Dry Waste');
  const [quantityTier, setQuantityTier] = useState<string>(
    pickupDraft?.quantityTier || 'Medium (up to 25kg)'
  );

  const wasteTypes = [
    { id: 'Dry Waste', labelEn: 'Dry Waste / Packaging', labelHi: 'सूखा कचरा / पैकेजिंग', icon: '📦' },
    { id: 'Wet Waste', labelEn: 'Horticulture / Green Waste', labelHi: 'बगीचे का कचरा / पेड़ पत्तियाँ', icon: '🍃' },
    { id: 'Mixed Waste', labelEn: 'C&D Debris / Renovation Waste', labelHi: 'निर्माण मलबा / रिपेयर कचरा', icon: '🧱' },
  ];

  // Quantity tiers that change based on selected waste type
  const quantityTiersByType: Record<string, { id: string; labelEn: string; labelHi: string; descEn: string; descHi: string }[]> = {
    'Dry Waste': [
      {
        id: 'Small (up to 5kg)',
        labelEn: 'Small (Up to 5 kg)',
        labelHi: 'छोटा (5 किग्रा तक)',
        descEn: 'Single box, old electronics, few plastic bags',
        descHi: 'एक डिब्बा, पुराने इलेक्ट्रॉनिक्स, कुछ प्लास्टिक',
      },
      {
        id: 'Medium (up to 25kg)',
        labelEn: 'Medium (Up to 25 kg)',
        labelHi: 'मध्यम (25 किग्रा तक)',
        descEn: 'Old furniture scrap, large carton boxes, bulk packaging',
        descHi: 'पुराना फर्नीचर, बड़े कार्टन, बल्क पैकेजिंग',
      },
      {
        id: 'Large (25kg+)',
        labelEn: 'Large / Heavy Scrap (25kg+)',
        labelHi: 'बड़ा / भारी स्क्रैप (25 किग्रा+)',
        descEn: 'Full house clearout, warehouse e-waste, major scrap',
        descHi: 'पूरे घर का कचरा, गोदाम ई-कचरा, बड़ा स्क्रैप',
      },
    ],
    'Wet Waste': [
      {
        id: 'Small Bundle (up to 20kg)',
        labelEn: 'Small Bundle (Up to 20 kg)',
        labelHi: 'छोटा गट्ठर (20 किग्रा तक)',
        descEn: 'Single tree pruning, small garden trimmings',
        descHi: 'एक पेड़ की छँटाई, छोटे बगीचे की कतरन',
      },
      {
        id: 'Medium Load (20–50kg)',
        labelEn: 'Medium Load (20–50 kg)',
        labelHi: 'मध्यम लोड (20–50 किग्रा)',
        descEn: 'Multiple trees, seasonal garden cleanup, leaves',
        descHi: 'कई पेड़, मौसमी बगीचा सफाई, पत्तियाँ',
      },
      {
        id: 'Heavy Load (50kg+)',
        labelEn: 'Heavy Green Load (50kg+)',
        labelHi: 'भारी हरा कचरा (50 किग्रा+)',
        descEn: 'Full garden clearance, large fallen trees, bulk green waste',
        descHi: 'पूरे बगीचे की सफाई, बड़े गिरे पेड़, भारी हरा कचरा',
      },
    ],
    'Mixed Waste': [
      {
        id: 'Minor Debris (up to 100kg)',
        labelEn: 'Minor Debris (Up to 100 kg)',
        labelHi: 'मामूली मलबा (100 किग्रा तक)',
        descEn: 'Small repair, tile breaking, single room renovation',
        descHi: 'छोटी मरम्मत, टाइल तोड़ना, एक कमरे की मरम्मत',
      },
      {
        id: 'Major Renovation (100–500kg)',
        labelEn: 'Major Renovation (100–500 kg)',
        labelHi: 'बड़ी मरम्मत (100–500 किग्रा)',
        descEn: 'Full floor renovation, multiple rooms, structural repair',
        descHi: 'पूरी फर्श नवीनीकरण, कई कमरे, संरचनात्मक मरम्मत',
      },
      {
        id: 'Construction Debris (500kg+)',
        labelEn: 'Construction Debris (500kg+)',
        labelHi: 'निर्माण मलबा (500 किग्रा+)',
        descEn: 'Full demolition, new construction clearout, bulk concrete',
        descHi: 'पूर्ण विध्वंस, नया निर्माण, थोक कंक्रीट',
      },
    ],
  };

  // Reset quantity tier to first option of new type when waste type changes
  useEffect(() => {
    const tiers = quantityTiersByType[wasteType] || quantityTiersByType['Dry Waste'];
    setQuantityTier(tiers[0].id);
  }, [wasteType]);

  const currentTiers = quantityTiersByType[wasteType] || quantityTiersByType['Dry Waste'];

  const handleProceed = () => {
    setPickupDraft({
      ...pickupDraft,
      wasteType,
      quantityTier,
    });
    navigateTo('pickup_fleet');
  };

  return (
    <div className="flex-1 bg-slate-50 p-4 space-y-4 pb-6 flex flex-col justify-between">
      <div>
        <button
          onClick={goBack}
          className="flex items-center gap-1 text-slate-600 hover:text-slate-900 text-xs font-semibold py-1 mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'hi' ? 'पीछे' : 'Back'}</span>
        </button>

        <h2 className="text-xl font-bold text-slate-900">
          {language === 'hi' ? 'बल्क कचरा प्रकार और मात्रा' : 'Waste Type & Quantity Tier'}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          {language === 'hi'
            ? 'सही वाहन और शुल्क निर्धारण के लिए कचरे का विवरण चुनें'
            : 'Select waste material & weight tier — options update automatically based on type'}
        </p>

        {/* 1. Waste Category Selector */}
        <div className="mt-4 space-y-2">
          <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
            {language === 'hi' ? '1. कचरा श्रेणी (Waste Category)' : '1. Waste Material Category'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {wasteTypes.map((t) => {
              const isSelected = wasteType === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setWasteType(t.id)}
                  className={`p-3 rounded-2xl border text-center cursor-pointer transition flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-emerald-50 border-eco-green text-eco-darkGreen font-bold shadow-sm'
                      : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="text-2xl">{t.icon}</span>
                  <span className="text-[11px] leading-tight">
                    {language === 'hi' ? t.labelHi : t.labelEn}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Dynamic Quantity Tiers — auto-updates when waste type changes */}
        <div className="mt-5 space-y-2.5">
          <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
            {language === 'hi' ? '2. वजन श्रेणी (Quantity Tier)' : '2. Estimated Quantity Tier'}
            <span className="ml-1.5 text-[10px] text-emerald-600 font-semibold normal-case">• auto-matches {wasteType}</span>
          </label>

          {currentTiers.map((tier) => {
            const isSelected = quantityTier === tier.id;
            return (
              <div
                key={tier.id}
                onClick={() => setQuantityTier(tier.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-50 border-eco-green shadow-sm'
                    : 'bg-white border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {language === 'hi' ? tier.labelHi : tier.labelEn}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {language === 'hi' ? tier.descHi : tier.descEn}
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-2 ${
                    isSelected ? 'border-eco-green bg-eco-green text-white' : 'border-slate-300'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Continue Action Button */}
      <div className="pt-4">
        <Button variant="eco" onClick={handleProceed}>
          {language === 'hi' ? 'वाहन विकल्प देखें (Fleet Selection)' : 'Continue to Fleet Selection'}
        </Button>
      </div>
    </div>
  );
};

export default PickupWasteTypeScreen;
