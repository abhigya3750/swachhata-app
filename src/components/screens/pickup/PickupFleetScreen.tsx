import React, { useState } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { Button } from '../../common/Button';
import { PICKUP_FLEET_OPTIONS } from '../../../data/mockData';
import { ArrowLeft, Truck, Bike, Car, Check, Clock } from 'lucide-react';

const PickupFleetScreen: React.FC = () => {
  const { language, navigateTo, goBack, pickupForm, setPickupForm } = useAppState();
  const [selectedFleetId, setSelectedFleetId] = useState<string>(
    pickupForm.fleetId || 'fleet_medium'
  );

  const getFleetIcon = (iconType: string) => {
    switch (iconType) {
      case 'bike':
        return Bike;
      case 'auto':
        return Car;
      case 'truck':
        return Truck;
      default:
        return Truck;
    }
  };

  const handleProceed = () => {
    setPickupForm((prev) => ({
      ...prev,
      fleetId: selectedFleetId,
    }));
    navigateTo('pickup_location');
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
          {language === 'hi' ? 'वाहन प्रकार का चयन करें' : 'Select Fleet Vehicle'}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          {language === 'hi'
            ? 'आपके चुने गए कचरे की मात्रा के अनुसार सर्वोत्तम वाहन विकल्प'
            : 'Pre-fixed municipal rates & guaranteed arrival times for Ward 34'}
        </p>

        <div className="mt-4 space-y-3">
          {PICKUP_FLEET_OPTIONS.map((opt) => {
            const isSelected = selectedFleetId === opt.id;
            const VehicleIcon = getFleetIcon(opt.iconType);

            return (
              <div
                key={opt.id}
                onClick={() => setSelectedFleetId(opt.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-50 border-eco-green shadow-md ring-1 ring-eco-green'
                    : 'bg-white border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-eco-green text-white shadow-sm' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <VehicleIcon className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {language === 'hi' ? opt.nameHi : opt.name}
                    </div>
                    <div className="text-[11px] font-bold text-eco-darkGreen mt-0.5">
                      {opt.priceRange} • <span className="text-slate-500 font-normal">{opt.weightCapacity}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>ETA: {opt.eta}</span>
                    </div>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-eco-green bg-eco-green text-white' : 'border-slate-300'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-4">
        <Button variant="eco" onClick={handleProceed}>
          {language === 'hi' ? 'स्थान की पुष्टि करें (Confirm Location)' : 'Proceed to Location Pin'}
        </Button>
      </div>
    </div>
  );
};

export default PickupFleetScreen;
