import React, { useState, useEffect } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { Button } from '../../common/Button';
import { ArrowLeft, Check } from 'lucide-react';

const PickupWasteTypeScreen: React.FC = () => {
  const { language, navigateTo, goBack, pickupForm, setPickupForm } = useAppState();

  const [wasteType, setWasteType] = useState<string>(pickupForm.wasteType || 'garden');
  const [quantityTier, setQuantityTier] = useState<string>(pickupForm.quantityTier || 'Medium (30kg - 100kg)');

  const wasteTypes = [
    { id: 'garden', labelEn: 'Garden / Green Waste', labelHi: 'बगीचे का कचरा / पत्तियाँ', icon: '🍃' },
    { id: 'dry', labelEn: 'Dry Scrap / Packaging', labelHi: 'सूखा कचरा / डिब्बे', icon: '📦' },
    { id: 'debris', labelEn: 'C&D Debris / Renovation', labelHi: 'निर्माण मलबा / रिपेयर', icon: '🧱' },
  ];

  // Dynamic weight options calculated per selected waste category
  const getDynamicWeightTiers = (category: string) => {
    switch (category) {
      case 'garden':
        return [
          { id: 'Small (Up to 30kg)', labelEn: 'Small Green Waste (Up to 30 kg)', labelHi: 'छोटा हरा कचरा (30 किग्रा तक)', descEn: 'Garden leaf bags, small lawn trimmings', descHi: 'छोटे पौधों व पत्तों की कटाई' },
          { id: 'Medium (30kg - 100kg)', labelEn: 'Medium Branch Waste (30 kg - 100 kg)', labelHi: 'मध्यम डाली कचरा (30-100 किग्रा)', descEn: 'Tree branch cuttings, hedge pruning', descHi: 'पेड़ की डालियों की कटाई' },
          { id: 'Large (100kg+)', labelEn: 'Bulk Garden Scrap (100 kg+)', labelHi: 'बड़ा बगीचा कचरा (100 किग्रा+)', descEn: 'Major tree felling, large garden clean-out', descHi: 'बड़े पेड़ व बगीचे की व्यापक सफाई' },
        ];
      case 'debris':
        return [
          { id: 'Small (Up to 100kg)', labelEn: 'Light Construction Debris (Up to 100 kg)', labelHi: 'हल्का मलबा (100 किग्रा तक)', descEn: '2-3 bags of plaster, tiles, broken bricks', descHi: 'टाइल्स या प्लास्टर का मलबा' },
          { id: 'Medium (100kg - 500kg)', labelEn: 'Medium Renovation Scrap (100 kg - 500 kg)', labelHi: 'मध्यम मलबा (100-500 किग्रा)', descEn: 'Bathroom renovation debris, concrete blocks', descHi: 'मकान मरम्मत का कंक्रीट मलबा' },
          { id: 'Large (500kg+)', labelEn: 'Heavy Debris Load (500 kg+ / Tipper Load)', labelHi: 'भारी मलबा (500 किग्रा+ / पूरा ट्रक)', descEn: 'Full wall demolition, major structure debris', descHi: 'दीवार तोड़ने का भारी मलबा' },
        ];
      case 'dry':
      default:
        return [
          { id: 'Small (Up to 20kg)', labelEn: 'Small Scrap Box (Up to 20 kg)', labelHi: 'छोटा डिब्बा (20 किग्रा तक)', descEn: 'Paper cartons, single appliance box', descHi: 'कागज़ व कार्टन के डिब्बे' },
          { id: 'Medium (20kg - 80kg)', labelEn: 'Medium Dry Waste (20 kg - 80 kg)', labelHi: 'मध्यम सूखा कचरा (20-80 किग्रा)', descEn: 'Old furniture scrap, electronic clutter', descHi: 'पुराना फ़र्नीचर व घरेलू कचरा' },
          { id: 'Large (80kg+)', labelEn: 'Bulk Dry Clear-out (80 kg+)', labelHi: 'बड़ा सूखा कचरा (80 किग्रा+)', descEn: 'Full house shift scrap, commercial packaging', descHi: 'घर खाली करने का व्यापक सामान' },
        ];
    }
  };

  const currentTiers = getDynamicWeightTiers(wasteType);

  // Auto select valid tier if switching waste category
  useEffect(() => {
    const validIds = currentTiers.map((t) => t.id);
    if (!validIds.includes(quantityTier)) {
      setQuantityTier(currentTiers[1].id);
    }
  }, [wasteType]);

  const handleProceed = () => {
    // Determine recommended fleet based on weight
    let suggestedFleet = 'fleet_medium';
    if (quantityTier.includes('Small')) suggestedFleet = 'fleet_small';
    else if (quantityTier.includes('Large') || quantityTier.includes('500kg+')) suggestedFleet = 'fleet_large';

    setPickupForm((prev) => ({
      ...prev,
      wasteType,
      quantityTier,
      fleetId: suggestedFleet,
    }));
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
          {language === 'hi' ? 'बल्क कचरा प्रकार और मात्रा' : 'Waste Category & Weight Tier'}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          {language === 'hi'
            ? 'सही वाहन और शुल्क निर्धारण के लिए कचरे की श्रेणी और वजन चुनें'
            : 'Select waste material to calculate suitable vehicle fleet & price estimate'}
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
                      ? 'bg-emerald-50 border-eco-green text-eco-darkGreen font-bold shadow-sm ring-1 ring-emerald-500'
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

        {/* 2. Dynamically Recalculated Weight Tiers */}
        <div className="mt-5 space-y-2.5">
          <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
            {language === 'hi' ? '2. वजन श्रेणी (Weight Tier)' : '2. Estimated Weight Tier'}
          </label>

          {currentTiers.map((tier) => {
            const isSelected = quantityTier === tier.id;
            return (
              <div
                key={tier.id}
                onClick={() => setQuantityTier(tier.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-50 border-eco-green shadow-sm ring-1 ring-emerald-500'
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
