import React, { useState } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { Button } from '../../common/Button';
import { ArrowLeft, Check } from 'lucide-react';

const PickupWasteTypeScreen: React.FC = () => {
  const { language, navigateTo, goBack, pickupDraft, setPickupDraft } = useAppState();

  const [wasteType, setWasteType] = useState<string>(pickupDraft?.wasteType || 'Wet Waste');
  const [quantityTier, setQuantityTier] = useState<string>(
    pickupDraft?.quantityTier || 'Medium (up to 25kg)'
  );

  const wasteTypes = [
    { id: 'Wet Waste', labelEn: 'Horticulture / Green Waste', labelHi: 'बगीचे का कचरा / पेड़ पत्तियाँ', icon: '🍃' },
    { id: 'Dry Waste', labelEn: 'Dry Recyclable Scrap', labelHi: 'सूखा कचरा / पैकेजिंग', icon: '📦' },
    { id: 'Mixed Waste', labelEn: 'C&D Debris / Construction', labelHi: 'निर्माण मलबा / रिपेयर कचरा', icon: '🧱' },
  ];

  // Dynamic quantity tiers based on selected waste type
  const getQuantityTiers = (category: string) => {
    if (category === 'Wet Waste') {
      return [
        {
          id: 'Small (up to 5kg)',
          labelEn: 'Small Green Waste (Up to 5 kg)',
          labelHi: 'छोटा बगीचा कचरा (5 किग्रा तक)',
          descEn: '1-2 sacks of garden leaves, small flower/plant prunings',
          descHi: '1-2 बोरा पत्तियों एवं छोटे पेड़-पौधों की छँटाई'
        },
        {
          id: 'Medium (up to 25kg)',
          labelEn: 'Medium Green Waste (Up to 25 kg)',
          labelHi: 'मध्यम बगीचा कचरा (25 किग्रा तक)',
          descEn: 'Cut tree branches, hedge trimmings & lawn grass',
          descHi: 'पेड़ की टहनियाँ, झाड़ियाँ एवं घास की छँटाई'
        },
        {
          id: 'Large (25kg+)',
          labelEn: 'Heavy Green Waste (25 kg+)',
          labelHi: 'भारी बगीचा कचरा (25 किग्रा+)',
          descEn: 'Heavy tree trunks, major garden overhaul & dense logs',
          descHi: 'मोटे तने, भारी शाखाएँ एवं बड़े बगीचे की सफाई'
        },
      ];
    } else if (category === 'Dry Waste') {
      return [
        {
          id: 'Small (up to 5kg)',
          labelEn: 'Small Scrap (Up to 5 kg)',
          labelHi: 'छोटा स्क्रैप (5 किग्रा तक)',
          descEn: 'Single cardboard box, old plastic containers',
          descHi: 'एक डिब्बा या छोटे प्लास्टिक बर्तन'
        },
        {
          id: 'Medium (up to 25kg)',
          labelEn: 'Medium Scrap (Up to 25 kg)',
          labelHi: 'मध्यम स्क्रैप (25 किग्रा तक)',
          descEn: 'Paper cartons, metal cans & plastic scrap bundles',
          descHi: 'कागज गत्ते, धातु के डिब्बे एवं प्लास्टिक स्क्रैप'
        },
        {
          id: 'Large (25kg+)',
          labelEn: 'Bulk Scrap (25 kg+)',
          labelHi: 'बल्क स्क्रैप (25 किग्रा+)',
          descEn: 'Major household clear-out, commercial packaging',
          descHi: 'घर का पुराना कबाड़ एवं भारी पैकिंग'
        },
      ];
    } else {
      return [
        {
          id: 'Small (up to 5kg)',
          labelEn: 'Small Masonry (Up to 5 kg)',
          labelHi: 'छोटा मलबा (5 किग्रा तक)',
          descEn: 'Broken tiles, single cement sack scrap',
          descHi: 'टूटी हुई टाइल्स या सीमेंट का छोटा टुकड़ा'
        },
        {
          id: 'Medium (up to 25kg)',
          labelEn: 'Medium Debris (Up to 25 kg)',
          labelHi: 'मध्यम मलबा (25 किग्रा तक)',
          descEn: 'Bathroom repair concrete debris, plaster rubble',
          descHi: 'बाथरूम रिपेयर का कंक्रीट मलबा'
        },
        {
          id: 'Large (25kg+)',
          labelEn: 'Heavy Construction Debris (25 kg+)',
          labelHi: 'भारी निर्माण मलबा (25 किग्रा+)',
          descEn: 'Full room renovation rubble, heavy brick/concrete',
          descHi: 'मकान मरम्मत का भारी ईंट-पत्थर मलबा'
        },
      ];
    }
  };

  const currentQuantityTiers = getQuantityTiers(wasteType);

  const handleSelectWasteType = (typeId: string) => {
    setWasteType(typeId);
  };

  const handleProceed = () => {
    setPickupDraft({
      ...pickupDraft,
      wasteType,
      quantityTier,
    });
    navigateTo('pickup_fleet');
  };

  return (
    <div className="flex-1 bg-slate-50 p-4 space-y-4 pb-6 flex flex-col justify-between font-sans">
      <div>
        <button
          onClick={goBack}
          className="flex items-center gap-1 text-slate-600 hover:text-slate-900 text-xs font-semibold py-1 mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'hi' ? 'पीछे' : 'Back'}</span>
        </button>

        <h2 className="text-xl font-bold text-slate-900">
          {language === 'hi' ? 'बल्क कचरा प्रकार और वजन' : 'Bulk Pickup Category & Weight'}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          {language === 'hi'
            ? 'अपनी पसंद के अनुसार कचरा श्रेणी और वजन चुनें'
            : 'Select category & approximate weight tier to match suitable tipper vehicle'}
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
                  onClick={() => handleSelectWasteType(t.id)}
                  className={`p-3 rounded-2xl border text-center cursor-pointer transition flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-emerald-50 border-eco-green text-eco-darkGreen font-bold shadow-sm ring-1 ring-eco-green'
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

        {/* 2. Sequential Quantity Tiers (Dynamic by Waste Type) */}
        <div className="mt-5 space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {language === 'hi' ? '2. वजन श्रेणी (Quantity Tier)' : '2. Estimated Weight Tier'}
            </label>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
              {wasteType}
            </span>
          </div>

          {currentQuantityTiers.map((tier) => {
            const isSelected = quantityTier === tier.id;
            return (
              <div
                key={tier.id}
                onClick={() => setQuantityTier(tier.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-50 border-eco-green shadow-sm ring-1 ring-eco-green'
                    : 'bg-white border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="pr-2">
                  <div className="text-xs font-bold text-slate-900">
                    {language === 'hi' ? tier.labelHi : tier.labelEn}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {language === 'hi' ? tier.descHi : tier.descEn}
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
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
