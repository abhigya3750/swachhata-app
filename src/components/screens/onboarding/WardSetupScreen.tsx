import React, { useState } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { Button } from '../../common/Button';
import MockMap from '../../common/MockMap';
import { MOCK_WARDS } from '../../../data/mockData';
import { MapPin, Navigation, Check, Search, ArrowLeft } from 'lucide-react';

const WardSetupScreen: React.FC = () => {
  const { language, navigateTo, selectedWard, setSelectedWard, goBack } = useAppState();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [autoDetected, setAutoDetected] = useState<boolean>(true);

  const filteredWards = MOCK_WARDS.filter(
    (w) =>
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.nameHi.includes(searchQuery) ||
      w.zone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAutoDetect = () => {
    setIsDetecting(true);
    setTimeout(() => {
      setIsDetecting(false);
      setAutoDetected(true);
      setSelectedWard(MOCK_WARDS[0]); // Vijay Nagar Ward 34
    }, 800);
  };

  return (
    <div className="flex-1 bg-slate-50 text-slate-800 p-4 flex flex-col justify-between">
      <div>
        <button
          onClick={goBack}
          className="flex items-center gap-1 text-slate-600 hover:text-slate-900 text-xs font-semibold py-1 mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'hi' ? 'पीछे' : 'Back'}</span>
        </button>

        <h2 className="text-xl font-bold text-slate-900">
          {language === 'hi' ? 'नगर निगम वार्ड चुनें' : 'Setup Municipal Ward'}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          {language === 'hi'
            ? 'आपकी कचरा गाड़ी और लाइव स्थिति आपके चुने गए वार्ड पर आधारित होती है'
            : 'Your live fleet radar and garbage collection schedule are pinned to your assigned ward'}
        </p>

        {/* Map Preview Area */}
        <div className="mt-4 mb-4 relative">
          <MockMap interactivePin={true} heightClass="h-40" />

          {autoDetected && (
            <div className="absolute bottom-2 left-2 bg-emerald-950/90 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-600 shadow z-20">
              GPS Location Pinned
            </div>
          )}

          {/* Detect Location Button */}
          <button
            onClick={handleAutoDetect}
            disabled={isDetecting}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur hover:bg-white text-municipal-blue px-3 py-1.5 rounded-full text-xs font-bold shadow-md border border-slate-200 flex items-center gap-1.5 transition active:scale-95 z-20"
          >
            <Navigation className={`w-3.5 h-3.5 ${isDetecting ? 'animate-spin' : ''}`} />
            <span>
              {isDetecting
                ? language === 'hi'
                  ? 'खोज रहा है...'
                  : 'Detecting GPS...'
                : language === 'hi'
                ? 'मेरी स्थिति पहचानें'
                : 'Detect My Location'}
            </span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'hi' ? 'वार्ड या क्षेत्र खोजें...' : 'Search Ward or Zone (e.g. Vijay Nagar)...'}
            className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-municipal-blue outline-none"
          />
        </div>

        {/* Ward List Cards */}
        <div className="max-h-48 overflow-y-auto space-y-2 pr-1 phone-screen-scroll">
          {filteredWards.map((ward) => {
            const isSelected = selectedWard.id === ward.id;
            return (
              <div
                key={ward.id}
                onClick={() => {
                  setSelectedWard(ward);
                  setAutoDetected(false);
                }}
                className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-municipal-lightBlue border-municipal-blue text-municipal-darkBlue font-semibold shadow-sm'
                    : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'bg-municipal-blue text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">
                      {language === 'hi' ? ward.nameHi : ward.name}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {ward.zone} • {language === 'hi' ? `गाड़ी ईटीए: ${ward.vanETA}` : `Van ETA: ${ward.vanETA}`}
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-municipal-blue text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirm CTA */}
      <div className="pt-4">
        <Button variant="eco" onClick={() => navigateTo('property_link')}>
          {language === 'hi' ? 'वार्ड की पुष्टि करें और आगे बढ़ें' : 'Confirm Ward & Proceed'}
        </Button>
      </div>
    </div>
  );
};

export default WardSetupScreen;
