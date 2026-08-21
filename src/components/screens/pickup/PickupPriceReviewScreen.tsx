import React from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { Button } from '../../common/Button';
import { PICKUP_FLEET_OPTIONS } from '../../../data/mockData';
import { ArrowLeft, Truck, MapPin, Receipt } from 'lucide-react';

const PickupPriceReviewScreen: React.FC = () => {
  const { language, navigateTo, goBack, pickupForm } = useAppState();

  const fleet = PICKUP_FLEET_OPTIONS.find((f) => f.id === pickupForm.fleetId) || PICKUP_FLEET_OPTIONS[1];

  const baseFare = fleet.priceMin || 100;
  const distanceFee = 15;
  const ecoFee = 5;
  const totalFare = baseFare + distanceFee + ecoFee;

  const handleConfirmBooking = () => {
    navigateTo('pickup_tracking');
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
          {language === 'hi' ? 'किराया समीक्षा और बुकिंग' : 'Fare Breakdown & Confirm'}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          {language === 'hi'
            ? 'निगम द्वारा निर्धारित पारदर्शी दर तालिका'
            : 'Review your transparent municipal fare breakdown before booking driver'}
        </p>

        {/* Selected Vehicle Card */}
        <div className="mt-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-eco-lightGreen text-eco-darkGreen flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                {language === 'hi' ? fleet.nameHi : fleet.name}
              </div>
              <div className="text-[10px] text-slate-500 font-semibold">{pickupForm.quantityTier}</div>
            </div>
          </div>

          <span className="text-xs font-bold text-eco-darkGreen bg-emerald-100 px-2.5 py-1 rounded-full shrink-0">
            ETA: {fleet.eta}
          </span>
        </div>

        {/* Fare Itemized Breakdown Card */}
        <div className="mt-4 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100 text-xs font-bold text-slate-800">
            <Receipt className="w-4 h-4 text-municipal-blue" />
            <span>{language === 'hi' ? 'किराया विवरण (Fare Breakdown)' : 'Itemized Fare Breakdown'}</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">{language === 'hi' ? 'मूल वाहन शुल्क (Base Fare)' : 'Base Vehicle Rate'}</span>
            <span className="font-semibold text-slate-800">₹{baseFare}.00</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">{language === 'hi' ? 'दूरी शुल्क (Distance Fee)' : 'Distance Rate (2.4 km)'}</span>
            <span className="font-semibold text-slate-800">₹{distanceFee}.00</span>
          </div>

          <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-100">
            <span className="text-slate-500">{language === 'hi' ? 'पर्यावरण शुल्क (Municipal Eco Charge)' : 'IMC Eco Cess'}</span>
            <span className="font-semibold text-slate-800">₹{ecoFee}.00</span>
          </div>

          <div className="flex justify-between items-center pt-1 text-sm">
            <span className="font-bold text-slate-900">{language === 'hi' ? 'कुल देय राशि (Total)' : 'Total Fare'}</span>
            <span className="font-black text-eco-darkGreen text-xl">₹{totalFare}.00</span>
          </div>
        </div>

        {/* Pickup Address Box */}
        <div className="mt-3 p-3 bg-slate-100 rounded-xl border border-slate-200 text-xs flex items-center gap-2">
          <MapPin className="w-4 h-4 text-municipal-blue shrink-0" />
          <div className="truncate">
            <span className="font-semibold text-slate-700 block">{language === 'hi' ? 'पिकअप स्थान:' : 'Pickup Address:'}</span>
            <span className="text-[11px] text-slate-500">{pickupForm.address || 'Scheme 54, Vijay Nagar, Indore'}</span>
          </div>
        </div>
      </div>

      {/* Confirm Action CTA */}
      <div className="pt-3">
        <Button variant="eco" onClick={handleConfirmBooking}>
          {language === 'hi' ? 'बुकिंग की पुष्टि करें (Confirm Booking)' : `Confirm Booking • Pay ₹${totalFare}`}
        </Button>
      </div>
    </div>
  );
};

export default PickupPriceReviewScreen;
