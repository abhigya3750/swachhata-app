import React, { useState } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { Button } from '../../common/Button';
import MockMap from '../../common/MockMap';
import { ArrowLeft, Flame, CheckCircle2, HeartHandshake } from 'lucide-react';

const PavitraSchedulerScreen: React.FC = () => {
  const { language, navigateTo, goBack } = useAppState();
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow, 09:00 AM');
  const [isScheduled, setIsScheduled] = useState<boolean>(false);

  const dates = [
    'Today, 04:00 PM',
    'Tomorrow, 09:00 AM',
    'Tomorrow, 02:00 PM',
    'Day After, 10:00 AM',
  ];

  const handleSchedule = () => {
    setIsScheduled(true);
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

        {/* Municipal Blue Top Header Card (Matching Profile Styling) */}
        <div className="bg-gradient-to-r from-municipal-blue to-municipal-darkBlue text-white p-4 rounded-2xl shadow-md flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 text-amber-300 flex items-center justify-center shadow-inner shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold">
              {language === 'hi' ? 'पवित्र पुष्प अपशिष्ट पिकअप' : 'Pavitra Sacred Floral Waste'}
            </h2>
            <p className="text-xs text-blue-100/90">
              {language === 'hi'
                ? 'पूजा/मंदिर के फूलों का नि:शुल्क पवित्र संग्रह'
                : 'Free dedicated collection for temple & home floral waste'}
            </p>
          </div>
        </div>

        {!isScheduled ? (
          <>
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-xs text-amber-900">
              <HeartHandshake className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                {language === 'hi'
                  ? 'एकत्रित फूलों को महिला स्व-सहायता समूहों द्वारा अगरबत्ती और प्राकृतिक रंगों में बदला जाता है।'
                  : 'Collected sacred waste is lovingly handcrafted into organic incense sticks & dyes by Women SHGs.'}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                {language === 'hi' ? 'पिकअप समय स्लॉट चुनें' : 'Select Pickup Window'}
              </label>

              <div className="grid grid-cols-2 gap-2">
                {dates.map((d) => {
                  const isSelected = selectedDate === d;
                  return (
                    <div
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className={`p-3 rounded-xl border cursor-pointer text-center text-xs font-semibold transition ${
                        isSelected
                          ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-sm'
                          : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      {d}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                {language === 'hi' ? 'पिकअप स्थान' : 'Pickup Location Pin'}
              </label>
              <MockMap interactivePin={true} heightClass="h-32" />
            </div>
          </>
        ) : (
          <div className="mt-6 bg-white p-6 rounded-2xl border border-amber-200 shadow-md text-center space-y-3 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {language === 'hi' ? 'पवित्र पिकअप निर्धारित हुआ!' : 'Pavitra Pickup Scheduled!'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'hi'
                ? `हमारे प्रतिनिधि ${selectedDate} को आपकी सेवा में उपस्थित होंगे।`
                : `IMC Pavitra Waste Van assigned for ${selectedDate}.`}
            </p>
            <div className="p-2.5 bg-amber-50 rounded-xl text-xs font-mono font-bold text-amber-800">
              Booking Ref: #IMC-PVT-4402
            </div>
          </div>
        )}
      </div>

      <div className="pt-4">
        {!isScheduled ? (
          <Button variant="eco" onClick={handleSchedule}>
            {language === 'hi' ? 'निःशुल्क पिकअप शेड्यूल करें' : 'Schedule Free Pavitra Pickup'}
          </Button>
        ) : (
          <Button variant="primary" onClick={() => navigateTo('home')}>
            {language === 'hi' ? 'मुख्य पृष्ठ पर लौटें' : 'Back to Home'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PavitraSchedulerScreen;
