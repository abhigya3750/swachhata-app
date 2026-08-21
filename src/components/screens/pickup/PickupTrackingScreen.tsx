import React, { useState } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { Button } from '../../common/Button';
import { Badge } from '../../common/Badge';
import MockMap from '../../common/MockMap';
import { MOCK_DRIVER_DATA } from '../../../data/mockData';
import {
  Phone,
  CheckCircle2,
  ArrowRight,
  Key,
  ShieldCheck,
  Activity
} from 'lucide-react';

const PickupTrackingScreen: React.FC = () => {
  const { language, navigateTo, awardCommunityPoints } = useAppState();
  const [driverStage, setDriverStage] = useState<'en_route' | 'arrived' | 'loaded' | 'complete'>('en_route');
  const [showOtpSimModal, setShowOtpSimModal] = useState<boolean>(false);
  const [driverEnteredOtp, setDriverEnteredOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [pointsAwarded, setPointsAwarded] = useState<boolean>(false);

  const handleSimulateSafaiMitraOtp = () => {
    if (driverEnteredOtp === MOCK_DRIVER_DATA.otpCode) {
      setOtpError(false);
      setDriverStage('loaded');
      setShowOtpSimModal(false);
      if (!pointsAwarded) {
        awardCommunityPoints(50);
        setPointsAwarded(true);
      }
    } else {
      setOtpError(true);
    }
  };

  return (
    <div className="flex-1 bg-slate-900 text-white flex flex-col justify-between relative font-sans">
      {/* Top Safai Mitra Bidirectional Sync Status Badge */}
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
                : 'Driver Arrived at Doorstep'
              : driverStage === 'loaded'
              ? language === 'hi'
                ? 'कचरा लोड व सत्यापित (Synced)'
                : 'Waste Loaded & Verified'
              : language === 'hi'
              ? 'पिकअप पूर्ण हुआ'
              : 'Pickup Booking Completed'}
          </span>
        </div>

        {/* Demo Stage Stepper */}
        <button
          onClick={() =>
            setDriverStage(
              driverStage === 'en_route'
                ? 'arrived'
                : driverStage === 'arrived'
                ? 'loaded'
                : driverStage === 'loaded'
                ? 'complete'
                : 'en_route'
            )
          }
          className="bg-white/20 hover:bg-white/30 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/25 transition"
          title="Advance demo stage"
        >
          Stage Step ⏩
        </button>
      </div>

      {/* Interactive Map View */}
      <div className="flex-1 relative">
        <MockMap
          heightClass="h-full"
          showDriver={true}
          driverEta={
            driverStage === 'en_route'
              ? '2 mins'
              : driverStage === 'arrived'
              ? 'Arrived'
              : 'Done'
          }
        />

        {/* Safai Mitra Bidirectional Sync Indicator Pill on Map */}
        <div className="absolute bottom-3 left-3 right-3 bg-slate-900/80 backdrop-blur p-2 rounded-xl border border-slate-700/80 text-[10px] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
            <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>Safai Mitra Field App Synchronized</span>
          </div>
          <span className="text-slate-400 font-mono">Telemetry: Live GPS</span>
        </div>
      </div>

      {/* Driver & Handshake Details Drawer */}
      <div className="bg-white text-slate-900 p-4 rounded-t-3xl shadow-2xl space-y-3 animate-in slide-in-from-bottom duration-300">
        
        {/* Driver Profile */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <img
              src={MOCK_DRIVER_DATA.driverPhoto}
              alt={MOCK_DRIVER_DATA.driverName}
              className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900">{MOCK_DRIVER_DATA.driverName}</h3>
                <Badge variant="success">★ {MOCK_DRIVER_DATA.rating}</Badge>
              </div>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                {MOCK_DRIVER_DATA.vehicleModel} ({MOCK_DRIVER_DATA.vehicleNumber})
              </p>
            </div>
          </div>

          <a
            href={`tel:${MOCK_DRIVER_DATA.driverPhone}`}
            className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md min-h-touch min-w-touch"
            aria-label="Call Driver"
          >
            <Phone className="w-4 h-4 fill-current" />
          </a>
        </div>

        {/* Secure 4-Digit Handshake OTP Card */}
        {driverStage !== 'complete' && driverStage !== 'loaded' ? (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-sm">
                <Key className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-amber-900 font-bold block uppercase tracking-wider">
                  {language === 'hi' ? 'सुरक्षित पिकअप ओटीपी (Driver OTP)' : 'Secure Handshake OTP'}
                </span>
                <p className="text-[10px] text-amber-700">
                  {language === 'hi' ? 'चालक को यह कोड बताएं' : 'Share with driver upon arrival'}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xl font-black font-mono tracking-widest text-slate-900 bg-white px-3 py-1 rounded-xl border border-amber-300 shadow-inner">
                {MOCK_DRIVER_DATA.otpCode}
              </span>
            </div>
          </div>
        ) : (
          /* Loaded & Verified Banner */
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-emerald-950 block">
                  Waste Successfully Handed Over & Synced!
                </span>
                <span className="text-[10px] text-emerald-700">
                  Transferred to Palasia Central GTS Transfer Station
                </span>
              </div>
            </div>
            <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              +50 PTS
            </span>
          </div>
        )}

        {/* Interactive Safai Mitra Field App Simulation Trigger */}
        {driverStage === 'arrived' && (
          <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-blue-900">
            <span>Simulate Driver Ramesh Sharma verifying OTP:</span>
            <button
              onClick={() => {
                setShowOtpSimModal(true);
                setDriverEnteredOtp(MOCK_DRIVER_DATA.otpCode);
              }}
              className="text-[10px] bg-municipal-blue text-white font-bold px-2.5 py-1 rounded-lg shadow-sm hover:bg-municipal-darkBlue transition"
            >
              Verify OTP 4821 📲
            </button>
          </div>
        )}

        {/* Action Button */}
        <div>
          {driverStage === 'complete' || driverStage === 'loaded' ? (
            <Button variant="primary" onClick={() => navigateTo('home')}>
              <span>{language === 'hi' ? 'डैशबोर्ड पर लौटें' : 'Return to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button variant="neutral" onClick={() => navigateTo('home')}>
              <span>{language === 'hi' ? 'बैकग्राउंड में ट्रैक करें' : 'Track in Background'}</span>
            </Button>
          )}
        </div>
      </div>

      {/* Safai Mitra Driver Numeric Keypad Validation Modal */}
      {showOtpSimModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 w-full max-w-xs text-slate-900 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
            <div className="text-center space-y-1">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">Safai Mitra Field App</h4>
              <p className="text-[10px] text-slate-500">
                Driver Ramesh Sharma entering citizen OTP for pickup confirmation
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-700 block text-center">
                Enter Citizen 4-Digit Handshake OTP
              </label>
              <input
                type="text"
                maxLength={4}
                value={driverEnteredOtp}
                onChange={(e) => setDriverEnteredOtp(e.target.value)}
                className="w-full text-center font-mono font-black text-2xl tracking-widest bg-slate-100 border-2 border-emerald-500 rounded-2xl py-2 text-slate-900 outline-none"
              />
              {otpError && (
                <span className="text-[10px] text-red-600 font-bold block text-center">
                  Invalid OTP code. Expected {MOCK_DRIVER_DATA.otpCode}
                </span>
              )}
            </div>

            <div className="space-y-1.5 pt-1">
              <button
                onClick={handleSimulateSafaiMitraOtp}
                className="w-full py-2.5 bg-eco-green hover:bg-eco-darkGreen text-white font-bold text-xs rounded-xl shadow-md transition"
              >
                Validate OTP & Confirm Handover
              </button>
              <button
                onClick={() => setShowOtpSimModal(false)}
                className="w-full py-1.5 text-[11px] text-slate-400 hover:text-slate-700 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PickupTrackingScreen;
