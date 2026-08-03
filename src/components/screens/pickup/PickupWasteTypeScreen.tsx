import React, { useState } from 'react';
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

  const quantityTiers = [
    { id: 'Small (up to 5kg)', labelEn: 'Small (Up to 5 kg)', labelHi: 'छोटा (5 किग्रा तक)', descEn: 'Single box, old electronics', descHi: 'एक डिब्बा या छोटे इलेक्ट्रॉनिक सामान' },
    { id: 'Medium (up to 25kg)', labelEn: 'Medium (Up to 25 kg)', labelHi: 'मध्यम (25 किग्रा तक)', descEn: 'Garden trimmings, furniture scrap', descHi: 'पेड़-पौधों की छँटाई या पुराना सामान' },
    { id: 'Large (25kg+)', labelEn: 'Large / Heavy Debris (25kg+)', labelHi: 'बड़ा / मलबा (25 किग्रा+)', descEn: 'Renovation concrete debris, major overhaul', descHi: 'मकान मरम्मत का भारी मलबा' },
  ];

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
            : 'Select waste material & approximate weight tier to match suitable fleet vehicle'}
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

        {/* 2. Sequential Quantity Tiers */}
        <div className="mt-5 space-y-2.5">
          <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
            {language === 'hi' ? '2. वजन श्रेणी (Quantity Tier)' : '2. Estimated Quantity Tier'}
          </label>

          {quantityTiers.map((tier) => {
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
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
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
