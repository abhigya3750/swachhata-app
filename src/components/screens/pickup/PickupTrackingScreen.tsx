import React, { useState } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { Button } from '../../common/Button';
import { Badge } from '../../common/Badge';
import MockMap from '../../common/MockMap';
import { MOCK_DRIVER_DATA } from '../../../data/mockData';
import { Phone, CheckCircle2, ArrowRight, Key } from 'lucide-react';

const PickupTrackingScreen: React.FC = () => {
  const { language, navigateTo } = useAppState();
  const [driverStage, setDriverStage] = useState<'en_route' | 'arrived' | 'complete'>('en_route');

  return (
    <div className="flex-1 bg-slate-900 text-white flex flex-col justify-between relative">
      {/* Top Demo Simulation Controls */}
      <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between">
        <div className="bg-slate-900/90 backdrop-blur text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-500/40 shadow-lg flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>
            {driverStage === 'en_route'
              ? language === 'hi'
                ? 'चालक मार्ग पर है (~2 मिनट)'
                : 'Driver En Route (~2 mins)'
              : driverStage === 'arrived'
              ? language === 'hi'
                ? 'चालक आपके स्थान पर पहुँचा'
                : 'Driver Arrived at Pickup Point'
              : language === 'hi'
              ? 'पिकअप पूर्ण हुआ'
              : 'Pickup Booking Completed'}
          </span>
        </div>

        {/* Manual Advance Stage Button for Demo */}
        <button
          onClick={() =>
            setDriverStage(
              driverStage === 'en_route' ? 'arrived' : driverStage === 'arrived' ? 'complete' : 'en_route'
            )
          }
          className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg border border-blue-400 shadow transition active:scale-95"
        >
          {driverStage === 'en_route'
            ? 'Advance to "Arrived"'
            : driverStage === 'arrived'
            ? 'Advance to "Complete"'
            : 'Reset Demo'}
        </button>
      </div>

      {/* Dynamic Screen View */}
      {driverStage !== 'complete' ? (
        <>
          {/* Mock Map Viewport */}
          <div className="flex-1 relative">
            <MockMap
              heightClass="h-full"
              showDriver={true}
              showRadar={true}
              driverEta={driverStage === 'en_route' ? '2 mins' : 'Arrived!'}
            />
          </div>

          {/* Driver Card & OTP Drawer */}
          <div className="bg-white text-slate-800 rounded-t-3xl p-4 shadow-2xl border-t border-slate-200 z-30 space-y-3">
            <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-1"></div>

            {/* OTP Banner Display */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-amber-900">
                  {language === 'hi' ? 'चालक के साथ शेयर करने हेतु ओटीपी:' : 'Share 4-Digit OTP with Driver:'}
                </span>
              </div>
              <span className="text-lg font-black font-mono tracking-widest text-slate-900 bg-white px-2.5 py-0.5 rounded border border-amber-300 shadow-inner">
                {MOCK_DRIVER_DATA.otpCode}
              </span>
            </div>

            {/* Driver Profile */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={MOCK_DRIVER_DATA.driverPhoto}
                  alt={MOCK_DRIVER_DATA.driverName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-md"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-slate-900">{MOCK_DRIVER_DATA.driverName}</h3>
                    <Badge variant="success">★ {MOCK_DRIVER_DATA.rating}</Badge>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{MOCK_DRIVER_DATA.vehicleNumber}</p>
                </div>
              </div>

              <a
                href={`tel:${MOCK_DRIVER_DATA.driverPhone}`}
                className="w-11 h-11 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg min-h-touch min-w-touch"
              >
                <Phone className="w-5 h-5 fill-current" />
              </a>
            </div>
          </div>
        </>
      ) : (
        /* Completed Summary View */
        <div className="flex-1 bg-slate-50 text-slate-800 p-6 flex flex-col justify-between items-center text-center">
          <div className="w-full space-y-4 pt-8">
            <div className="w-20 h-20 rounded-full bg-eco-green text-white flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              {language === 'hi' ? 'बल्क पिकअप पूर्ण हुआ!' : 'Bulk Pickup Completed!'}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'hi'
                ? 'आपका कचरा सुरक्षित रूप से संसाधित करने हेतु ले जाया गया है।'
                : 'Your bulk waste was picked up by Ramesh Sharma and transferred to IMC Processing Plant.'}
            </p>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Booking ID:</span>
                <span className="font-mono font-bold">#IMC-PKP-9021</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Driver:</span>
                <span className="font-bold">Ramesh Sharma (Indore Tipper #42)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Eco Points Earned:</span>
                <span className="font-bold text-eco-darkGreen">+50 PTS</span>
              </div>
            </div>
          </div>

          <div className="w-full pt-4">
            <Button variant="primary" onClick={() => navigateTo('home')}>
              <span>{language === 'hi' ? 'मुख्य पृष्ठ पर लौटें' : 'Back to Home'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PickupTrackingScreen;
