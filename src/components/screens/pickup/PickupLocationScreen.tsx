import React, { useState } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { Button } from '../../common/Button';
import MockMap from '../../common/MockMap';
import { ArrowLeft, Check, Home, Building2, Store } from 'lucide-react';

const PickupLocationScreen: React.FC = () => {
  const { language, navigateTo, goBack, savedAddresses, pickupDraft, setPickupDraft } = useAppState();
  const [selectedAddrId, setSelectedAddrId] = useState<string>(savedAddresses[0]?.id || 'addr_1');
  const [locationText, setLocationText] = useState<string>(
    savedAddresses[0]?.addressLine || 'Plot 142, Scheme 54, Vijay Nagar'
  );

  const handleSelectAddress = (addr: any) => {
    setSelectedAddrId(addr.id);
    setLocationText(addr.addressLine);
  };

  const handleProceed = () => {
    setPickupDraft({
      ...pickupDraft,
      locationAddress: locationText,
    });
    navigateTo('pickup_review');
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
          {language === 'hi' ? 'पिकअप स्थान की पुष्टि करें' : 'Confirm Pickup Address'}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          {language === 'hi'
            ? 'चालक को सटीक पिकअप स्थान हेतु नक्शा पिन सेट करें'
            : 'Adjust pin on the map or pick from your saved addresses list'}
        </p>

        {/* Map Pin Viewport */}
        <div className="mt-3 relative">
          <MockMap
            interactivePin={true}
            heightClass="h-44"
            onPinChange={(lat, lng) =>
              setLocationText(`Scheme 54, Ward 34 (${lat.toFixed(3)}, ${lng.toFixed(3)})`)
            }
          />
        </div>

        {/* Saved Addresses List */}
        <div className="mt-4 space-y-2">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            {language === 'hi' ? 'सहेजे गए पते (Saved Addresses)' : 'Saved Address Book'}
          </div>

          <div className="space-y-2 max-h-36 overflow-y-auto phone-screen-scroll pr-1">
            {savedAddresses.map((addr) => {
              const isSelected = selectedAddrId === addr.id;
              const IconComp = addr.label === 'Home' ? Home : addr.label === 'Office' ? Building2 : Store;

              return (
                <div
                  key={addr.id}
                  onClick={() => handleSelectAddress(addr)}
                  className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-50 border-eco-green font-semibold shadow-sm'
                      : 'bg-white border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-eco-green text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">
                        {language === 'hi' ? addr.labelHi : addr.label}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[200px]">
                        {addr.addressLine}
                      </div>
                    </div>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-eco-green stroke-[3]" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-3">
        <Button variant="eco" onClick={handleProceed}>
          {language === 'hi' ? 'किराया समीक्षा पर जाएं (Price Review)' : 'Proceed to Price Review'}
        </Button>
      </div>
    </div>
  );
};

export default PickupLocationScreen;
