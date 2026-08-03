import React, { useState } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { Button } from '../../common/Button';
import { ArrowLeft, CreditCard, ShieldCheck, Check, Loader2, QrCode, Building } from 'lucide-react';

const PaymentMethodScreen: React.FC = () => {
  const { language, navigateTo, goBack, propertyTax, addTransaction } = useAppState();
  const [selectedMethod, setSelectedMethod] = useState<string>('upi');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const paymentOptions = [
    { id: 'upi', name: 'BHIM UPI / Google Pay / PhonePe', nameHi: 'भीम यूपीआई / गूगल पे', icon: QrCode },
    { id: 'card', name: 'Credit / Debit Card (RuPay, Visa)', nameHi: 'डेबिट / क्रेडिट कार्ड', icon: CreditCard },
    { id: 'netbank', name: 'Net Banking (SBI, HDFC, ICICI)', nameHi: 'नेट बैंकिंग', icon: Building },
  ];

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);

      const newTxn = {
        id: `TXN-${Math.floor(800000 + Math.random() * 190000)}`,
        taxId: propertyTax.taxId,
        amount: propertyTax.amountDue,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        paymentMethod: selectedMethod === 'upi' ? 'BHIM UPI' : selectedMethod === 'card' ? 'RuPay Card' : 'Net Banking',
        status: 'SUCCESS' as const,
        receiptUrl: '#',
      };

      addTransaction(newTxn);
      navigateTo('payment_success', { txn: newTxn });
    }, 1200);
  };

  return (
    <div className="flex-1 bg-slate-50 p-4 space-y-4 pb-6 flex flex-col justify-between relative">
      <div>
        <button
          onClick={goBack}
          className="flex items-center gap-1 text-slate-600 hover:text-slate-900 text-xs font-semibold py-1 mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'hi' ? 'पीछे' : 'Back'}</span>
        </button>

        <h2 className="text-xl font-bold text-slate-900">
          {language === 'hi' ? 'भुगतान विधि चुनें' : 'Select Payment Method'}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          {language === 'hi'
            ? 'भारत बिलपे (BBPS) द्वारा सुरक्षित भुगतान'
            : 'Mock BBPS Gateway • Select preferred option to complete ₹150 payment'}
        </p>

        {/* Payment Amount Card Header */}
        <div className="mt-4 bg-slate-900 text-white p-4 rounded-2xl shadow-md flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              {language === 'hi' ? 'भुगतान राशि' : 'Amount to Pay'}
            </span>
            <div className="text-2xl font-black text-white">₹{propertyTax.amountDue}</div>
          </div>
          <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded-full border border-emerald-500/40">
            IMC Bill #9921
          </span>
        </div>

        {/* Method Selection Options */}
        <div className="mt-4 space-y-2.5">
          {paymentOptions.map((opt) => {
            const isSelected = selectedMethod === opt.id;
            const OptIcon = opt.icon;
            return (
              <div
                key={opt.id}
                onClick={() => setSelectedMethod(opt.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-municipal-lightBlue border-municipal-blue shadow-sm'
                    : 'bg-white border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-municipal-blue text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <OptIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    {language === 'hi' ? opt.nameHi : opt.name}
                  </span>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? 'border-municipal-blue bg-municipal-blue text-white' : 'border-slate-300'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Submit CTA & Security Badge */}
      <div className="space-y-3 pt-4">
        <Button variant="eco" onClick={handlePayment} disabled={isProcessing}>
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{language === 'hi' ? 'सत्यापित हो रहा है...' : 'Processing BBPS Payment...'}</span>
            </span>
          ) : (
            <span>{language === 'hi' ? 'भुगतान की पुष्टि करें (Confirm Payment)' : 'Confirm & Pay ₹150'}</span>
          )}
        </Button>

        <p className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-eco-green" />
          <span>NPCI BBPS Standard 256-Bit Encrypted Simulation</span>
        </p>
      </div>

      {/* Processing Modal Overlay */}
      {isProcessing && (
        <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white p-6 text-center animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-municipal-blue text-white flex items-center justify-center shadow-xl animate-bounce mb-4">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
          <h3 className="text-base font-bold">
            {language === 'hi' ? 'भुगतान प्रक्रियाधीन है...' : 'Processing Payment...'}
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xs">
            {language === 'hi'
              ? 'कृपया बैंक विंडो बंद न करें, NPCI BBPS रसीद उत्पन्न की जा रही है।'
              : 'Communicating with Indore Municipal Corporation gateway...'}
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodScreen;
