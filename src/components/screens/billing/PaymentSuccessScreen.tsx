import React, { useState } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { Button } from '../../common/Button';
import { Modal } from '../../common/Modal';
import { Badge } from '../../common/Badge';
import { CheckCircle2, Download, ArrowRight, ShieldCheck, Printer } from 'lucide-react';

const PaymentSuccessScreen: React.FC = () => {
  const { language, navigateTo, screenParams, propertyTax } = useAppState();
  const [showReceiptModal, setShowReceiptModal] = useState<boolean>(false);

  const txn = screenParams?.txn || {
    id: 'TXN-882190',
    taxId: propertyTax.taxId,
    amount: 150,
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    paymentMethod: 'BHIM UPI',
    status: 'SUCCESS',
  };

  return (
    <div className="flex-1 bg-slate-50 p-5 flex flex-col justify-between items-center text-center">
      <div className="w-full space-y-4 pt-4">
        {/* Success Checkmark Animation */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-75"></div>
          <div className="relative w-20 h-20 rounded-full bg-eco-green text-white flex items-center justify-center shadow-xl border-4 border-white">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>
        </div>

        <div>
          <Badge variant="success" className="mb-2">
            {language === 'hi' ? 'भुगतान सफल रहा' : 'Payment Successful'}
          </Badge>

          <h2 className="text-3xl font-black text-slate-900 tracking-tight">₹{txn.amount}</h2>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'hi'
              ? 'इंदौर नगर निगम अपशिष्ट शुल्क रसीद उत्पन्न हुई'
              : 'Waste Utility Bill Payment Confirmed by IMC BBPS'}
          </p>
        </div>

        {/* Payment Confirmation Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-left space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100 text-xs">
            <span className="text-slate-500 font-medium">{language === 'hi' ? 'लेन-देन आईडी' : 'Transaction Ref'}</span>
            <span className="font-mono font-bold text-slate-800">{txn.id}</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-slate-100 text-xs">
            <span className="text-slate-500 font-medium">{language === 'hi' ? 'संपत्ति आईडी' : 'Property Tax ID'}</span>
            <span className="font-mono font-bold text-slate-800">{txn.taxId}</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-slate-100 text-xs">
            <span className="text-slate-500 font-medium">{language === 'hi' ? 'भुगतान का प्रकार' : 'Payment Mode'}</span>
            <span className="font-bold text-slate-800">{txn.paymentMethod}</span>
          </div>

          <div className="flex justify-between items-center text-xs pt-1">
            <span className="text-slate-500 font-medium">{language === 'hi' ? 'दिनांक' : 'Date'}</span>
            <span className="font-bold text-slate-800">{txn.date}</span>
          </div>
        </div>

        {/* Download Receipt Modal Trigger */}
        <Button variant="outline" onClick={() => setShowReceiptModal(true)}>
          <Download className="w-4 h-4 text-municipal-blue" />
          <span>{language === 'hi' ? 'आधिकारिक रसीद डाउनलोड करें (PDF)' : 'Download Official Receipt PDF'}</span>
        </Button>
      </div>

      {/* Navigation CTAs */}
      <div className="w-full pt-4 space-y-2">
        <Button variant="primary" onClick={() => navigateTo('home')}>
          <span>{language === 'hi' ? 'मुख्य पृष्ठ पर लौटें' : 'Back to Home'}</span>
          <ArrowRight className="w-4 h-4" />
        </Button>

        <button
          onClick={() => navigateTo('passbook')}
          className="text-xs font-semibold text-municipal-blue hover:underline block mx-auto py-1"
        >
          {language === 'hi' ? 'पासबुक में देखें' : 'View in Passbook History'}
        </button>
      </div>

      {/* PDF Receipt Modal Preview */}
      <Modal
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        title={language === 'hi' ? 'नगर निगम डिजिटल रसीद' : 'IMC Official Payment Receipt PDF'}
      >
        <div className="p-4 bg-slate-50 border border-slate-300 rounded-xl space-y-4 font-sans text-slate-800">
          <div className="flex items-center justify-between border-b border-slate-300 pb-3">
            <div>
              <h4 className="font-black text-sm text-municipal-blue uppercase">Indore Municipal Corporation</h4>
              <p className="text-[10px] text-slate-500">Waste Management Utility Payment Voucher</p>
            </div>
            <div className="w-8 h-8 rounded bg-municipal-blue text-white font-black text-xs flex items-center justify-center">
              IMC
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block">Receipt No</span>
              <span className="font-mono font-bold text-slate-900">{txn.id}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Date & Time</span>
              <span className="font-bold text-slate-900">{txn.date}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Property ID</span>
              <span className="font-bold text-slate-900">{txn.taxId}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Owner Name</span>
              <span className="font-bold text-slate-900">{propertyTax.ownerName}</span>
            </div>
          </div>

          <div className="p-3 bg-white border border-slate-200 rounded-lg flex justify-between items-center text-xs">
            <span className="font-bold">Total Paid Amount:</span>
            <span className="font-black text-emerald-700 text-sm">₹{txn.amount}.00</span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-[9px] text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-eco-green" /> Digitally Signed by IMC BBPS Gateway
            </span>
            <button
              onClick={() => alert('Mock PDF Download Triggered')}
              className="px-3 py-1 bg-municipal-blue text-white text-xs font-bold rounded-lg flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" /> Save PDF
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PaymentSuccessScreen;
