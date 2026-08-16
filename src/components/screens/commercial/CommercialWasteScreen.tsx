import React, { useState } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { Button } from '../../common/Button';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';
import {
  ArrowLeft,
  Store,
  FileCheck,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Download,
  AlertCircle
} from 'lucide-react';

const CommercialWasteScreen: React.FC = () => {
  const { language, goBack, commercialBooking, setCommercialBooking, selectedWard } = useAppState();
  const [selectedTier, setSelectedTier] = useState<string>('standard');
  const [showCertModal, setShowCertModal] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const tiers = [
    {
      id: 'small',
      title: 'Small Retail & Shop (छोटा प्रतिष्ठान)',
      volume: 'Daily up to 20 kg (Dry packaging + General)',
      monthlyFee: 350,
      timing: 'Evening 21:00 PM',
    },
    {
      id: 'standard',
      title: 'Restaurant & Food Joint (रेस्टोरेंट/होटल)',
      volume: 'Daily 50-80 kg (Wet organic kitchen + Segregated dry)',
      monthlyFee: 650,
      timing: 'Daily Evening 21:30 PM',
    },
    {
      id: 'heavy',
      title: 'Wholesale Market & Bulk Trader (थोक बाज़ार)',
      volume: 'Daily 100 kg+ (Heavy commercial crates & boxes)',
      monthlyFee: 1200,
      timing: 'Night 22:30 PM (Heavy Tipper)',
    },
  ];

  const handleUpdateSchedule = () => {
    const chosen = tiers.find((t) => t.id === selectedTier);
    if (chosen) {
      setCommercialBooking((prev) => ({
        ...prev,
        wasteVolume: chosen.volume,
        pickupSlot: chosen.timing,
        monthlyFee: chosen.monthlyFee,
      }));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  return (
    <div className="flex-1 bg-slate-50 p-4 space-y-4 pb-6 font-sans flex flex-col justify-between">
      <div className="space-y-3">
        {/* Top Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={goBack}
            className="flex items-center gap-1 text-slate-600 hover:text-slate-900 text-xs font-semibold py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'hi' ? 'पीछे' : 'Back'}</span>
          </button>
          <Badge variant="success">GST Registered Business</Badge>
        </div>

        {/* Municipal Blue Header */}
        <div className="bg-gradient-to-r from-municipal-blue via-blue-600 to-municipal-darkBlue text-white p-4 rounded-2xl shadow-md space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">
                {language === 'hi' ? 'व्यावसायिक एवं बाज़ार कचरा प्रबंधन' : 'Commercial Waste Producer'}
              </h2>
              <p className="text-[11px] text-blue-100/90 font-medium">
                {language === 'hi'
                  ? 'दुकान, होटल एवं व्यावसायिक प्रतिष्ठानों हेतु विशेष स्वच्छता सेवा'
                  : 'Dedicated evening collection for shops, hotels & markets'}
              </p>
            </div>
          </div>
        </div>

        {/* Business Trade Profile Card */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Establishment Name
              </span>
              <h3 className="text-xs font-bold text-slate-900">{commercialBooking.businessName}</h3>
              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono mt-0.5">
                <span>GST: {commercialBooking.gstNumber}</span>
                <span>•</span>
                <span>{selectedWard.name}</span>
              </div>
            </div>

            <button
              onClick={() => setShowCertModal(true)}
              className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold px-2 py-1 rounded-xl flex items-center gap-1 hover:bg-emerald-100 transition shrink-0"
            >
              <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Compliance Cert</span>
            </button>
          </div>

          <div className="p-2.5 bg-blue-50/80 rounded-xl border border-blue-100 text-[11px] text-blue-900 flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-municipal-blue" />
              <span>Scheduled Pickup: <strong>{commercialBooking.pickupSlot}</strong></span>
            </div>
            <span className="font-bold text-slate-900">₹{commercialBooking.monthlyFee}/mo</span>
          </div>
        </div>

        {/* Commercial Volume Tiers */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-800 block uppercase tracking-wider">
            Select Commercial Waste Tier
          </span>

          <div className="space-y-2">
            {tiers.map((tier) => {
              const isSelected = selectedTier === tier.id;
              return (
                <div
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-50/60 border-municipal-blue shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 shrink-0 ${
                        isSelected ? 'border-municipal-blue bg-municipal-blue' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{tier.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">{tier.volume}</p>
                      <span className="text-[9.5px] text-emerald-700 font-semibold mt-1 block">
                        🚚 Dedicated Tipper: {tier.timing}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-slate-900">₹{tier.monthlyFee}</span>
                    <span className="text-[9px] text-slate-400 block font-medium">/ month</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Commercial Rule Alert */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2 text-xs text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[10.5px] leading-relaxed">
            Commercial waste must be placed in designated 120L twin bins before 21:00 PM. Dumping market garbage on footpaths attracts IMC Spot-Fine under Municipal By-Laws 2026.
          </p>
        </div>
      </div>

      {/* Footer Update Button */}
      <div className="pt-3 space-y-2">
        {isSaved && (
          <div className="p-2.5 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 text-xs font-bold text-center flex items-center justify-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Commercial Pickup Schedule Updated!</span>
          </div>
        )}

        <Button variant="primary" onClick={handleUpdateSchedule}>
          <span>Update Commercial Schedule</span>
        </Button>
      </div>

      {/* Compliance Certificate Modal */}
      <Modal
        isOpen={showCertModal}
        onClose={() => setShowCertModal(false)}
        title="Municipal Trade Sanitation Certificate"
      >
        <div className="space-y-4 p-2 text-slate-800 text-xs font-sans">
          <div className="border-2 border-dashed border-emerald-500 rounded-2xl p-4 bg-emerald-50/40 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">Indore Municipal Corporation (IMC)</h4>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
              Official Trade Waste Compliance Certificate 2026-27
            </p>
            <div className="p-2 bg-white rounded-xl font-mono text-[10.5px] font-bold text-emerald-800 border border-emerald-200">
              Certificate No: {commercialBooking.complianceCertId}
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-500">Business Unit:</span>
              <span className="font-bold">{commercialBooking.businessName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">GST Registration:</span>
              <span className="font-bold font-mono">{commercialBooking.gstNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Commercial Category:</span>
              <span className="font-bold uppercase">{commercialBooking.tradeType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Valid Through:</span>
              <span className="font-bold text-emerald-700">31 March 2027</span>
            </div>
          </div>

          <Button
            variant="eco"
            onClick={() => alert(`Certificate ${commercialBooking.complianceCertId} PDF downloaded!`)}
          >
            <Download className="w-4 h-4" />
            <span>Download Official PDF Certificate</span>
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CommercialWasteScreen;
