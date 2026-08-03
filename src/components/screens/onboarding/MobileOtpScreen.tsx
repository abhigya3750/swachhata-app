import React, { useState } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { Button } from '../../common/Button';
import { Phone, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

const MobileOtpScreen: React.FC = () => {
  const { language, navigateTo, userPhone, setUserPhone, goBack } = useAppState();
  
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '']);
  const [showErrorDemo, setShowErrorDemo] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userPhone || userPhone.length < 10) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setStep('otp');
    }, 600);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const newOtp = [...otpValues];
    newOtp[index] = val;
    setOtpValues(newOtp);

    // Auto-advance box focus
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-box-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showErrorDemo) return; // Simulated error state
    navigateTo('ward_setup');
  };

  return (
    <div className="flex-1 bg-slate-50 text-slate-800 p-5 flex flex-col justify-between">
      {/* Top Header Navigation */}
      <div>
        <button
          onClick={() => (step === 'otp' ? setStep('phone') : goBack())}
          className="flex items-center gap-1 text-slate-600 hover:text-slate-900 text-xs font-semibold py-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'hi' ? 'पीछे' : 'Back'}</span>
        </button>

        <div className="mt-4">
          <h2 className="text-xl font-bold text-slate-900">
            {step === 'phone'
              ? language === 'hi'
                ? 'मोबाइल नंबर दर्ज करें'
                : 'Enter Mobile Number'
              : language === 'hi'
              ? 'ओटीपी सत्यापित करें'
              : 'Verify 4-Digit OTP'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {step === 'phone'
              ? language === 'hi'
                ? 'सत्यापन कोड और नागरिक अपडेट प्राप्त करने के लिए अपना नंबर दर्ज करें'
                : 'Enter your 10-digit mobile number for instant login'
              : language === 'hi'
              ? `कोड +91 ${userPhone} पर भेजा गया है`
              : `A 4-digit code was sent to +91 ${userPhone}`}
          </p>
        </div>
      </div>

      {/* Main Form Content */}
      <div className="my-6">
        {step === 'phone' ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                {language === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'}
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-slate-500 font-semibold text-xs border-r border-slate-300 pr-2">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="98260 12345"
                  className="w-full bg-white border border-slate-300 rounded-xl pl-16 pr-10 py-3 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-municipal-blue focus:border-municipal-blue outline-none"
                  required
                />
                <Phone className="absolute right-3 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <Button variant="primary" type="submit" disabled={isSending || userPhone.length < 10}>
              {isSending
                ? language === 'hi'
                  ? 'भेजा जा रहा है...'
                  : 'Sending Code...'
                : language === 'hi'
                ? 'ओटीपी प्राप्त करें'
                : 'Send Verification OTP'}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-5">
            {/* OTP Boxes */}
            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3].map((idx) => (
                <input
                  key={idx}
                  id={`otp-box-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={otpValues[idx]}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className={`w-14 h-14 bg-white border-2 rounded-xl text-center text-xl font-bold transition focus:ring-2 outline-none ${
                    showErrorDemo
                      ? 'border-action-red text-action-red bg-red-50/50'
                      : otpValues[idx]
                      ? 'border-municipal-blue text-municipal-blue'
                      : 'border-slate-300 text-slate-800'
                  }`}
                />
              ))}
            </div>

            {/* Error state simulation alert */}
            {showErrorDemo && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-action-red font-medium animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>
                  {language === 'hi'
                    ? 'अमान्य ओटीपी कोड। कृपया 4821 का प्रयास करें।'
                    : 'Invalid OTP code. Use any 4 digits (e.g. 4821) in demo mode.'}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={() => setShowErrorDemo(!showErrorDemo)}
                className="text-[11px] text-amber-700 underline font-medium hover:text-amber-800"
              >
                {showErrorDemo ? 'Clear Demo Error' : 'Simulate Invalid OTP Error'}
              </button>
              <button
                type="button"
                onClick={() => setOtpValues(['4', '8', '2', '1'])}
                className="text-[11px] text-municipal-blue hover:underline font-semibold"
              >
                {language === 'hi' ? 'पुनः भेजें (Resend)' : 'Resend OTP'}
              </button>
            </div>

            <Button variant="eco" type="submit" disabled={otpValues.some((v) => !v)}>
              {language === 'hi' ? 'सत्यापित करें और आगे बढ़ें' : 'Verify & Continue'}
            </Button>
          </form>
        )}
      </div>

      {/* Security Footer Note */}
      <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-eco-green shrink-0" />
        <span>
          {language === 'hi'
            ? 'निगम सुरक्षित ओटीपी प्रमाणीकरण प्रणाली'
            : 'IMC Secured Login — Any 4-digit code works in prototype mode.'}
        </span>
      </div>
    </div>
  );
};

export default MobileOtpScreen;
