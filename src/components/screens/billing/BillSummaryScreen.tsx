import React from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { Button } from '../../common/Button';
import { Badge } from '../../common/Badge';
import { Building2, CreditCard, ArrowLeft, Calendar, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

const BillSummaryScreen: React.FC = () => {
  const { language, navigateTo, goBack, propertyTax, billState } = useAppState();

  const isPaid = billState === 'paid';
  const isUnlinked = billState === 'unlinked';

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

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            {language === 'hi' ? 'अपशिष्ट शुल्क बिल विवरण' : 'Waste Utility Bill Summary'}
          </h2>
          <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-bold">
            BBPS Mocked
          </span>
        </div>

        <p className="text-xs text-slate-500 mt-1">
          {language === 'hi'
            ? 'इंदौर नगर निगम कचरा संग्रहण शुल्क बिल'
            : 'Indore Municipal Corporation monthly waste collection utility invoice'}
        </p>

        {/* Property Selector Header */}
        <div className="mt-4 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-municipal-lightBlue text-municipal-blue flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">{propertyTax.taxId}</div>
              <div className="text-[10px] text-slate-500">{propertyTax.ownerName}</div>
            </div>
          </div>

          <Badge variant={isPaid ? 'success' : isUnlinked ? 'neutral' : 'warning'}>
            {isPaid
              ? language === 'hi'
                ? 'भुगतान संपन्न'
                : 'PAID'
              : isUnlinked
              ? 'NO PROPERTY'
              : language === 'hi'
              ? 'बकाया (UNPAID)'
              : 'UNPAID'}
          </Badge>
        </div>

        {/* Bill Amount Invoice Card */}
        {isUnlinked ? (
          <div className="mt-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
            <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800">
              {language === 'hi' ? 'कोई संपत्ति कर आईडी लिंक नहीं है' : 'No Property Tax ID Linked Yet'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'hi'
                ? 'बिल देखने और भुगतान करने के लिए अपनी संपत्ति आईडी दर्ज करें'
                : 'Please link your 10-digit IMC Property ID to view current billing status.'}
            </p>
            <Button variant="primary" onClick={() => navigateTo('property_link')}>
              {language === 'hi' ? 'संपत्ति आईडी लिंक करें' : 'Link Property ID Now'}
            </Button>
          </div>
        ) : (
          <div className="mt-4 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs text-slate-500 font-medium">
                {language === 'hi' ? 'बिलिंग अवधि' : 'Billing Cycle'}
              </span>
              <span className="text-xs font-bold text-slate-800">August 2026</span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs text-slate-500 font-medium">
                {language === 'hi' ? 'देय तिथि' : 'Due Date'}
              </span>
              <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{propertyTax.dueDate}</span>
              </span>
            </div>

            {/* Total Amount Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 uppercase font-semibold block">
                  {language === 'hi' ? 'कुल देय राशि' : 'Total Amount Payable'}
                </span>
                <span className="text-2xl font-black text-slate-900">₹{propertyTax.amountDue}</span>
              </div>
              {isPaid && (
                <div className="flex items-center gap-1 text-eco-darkGreen font-bold text-xs bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-eco-green" />
                  <span>{language === 'hi' ? 'भुगतान हुआ' : 'Paid'}</span>
                </div>
              )}
            </div>

            <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
              <span>IMC Waste Tariff Zone 8</span>
              <span>Ref: #BBPS-IND-8841</span>
            </div>
          </div>
        )}
      </div>

      {/* Action CTAs */}
      {!isUnlinked && (
        <div className="space-y-2 pt-4">
          {!isPaid ? (
            <Button variant="eco" onClick={() => navigateTo('payment_method')}>
              <CreditCard className="w-4 h-4" />
              <span>{language === 'hi' ? 'अभी ₹150 का भुगतान करें' : 'Pay ₹150 Now'}</span>
            </Button>
          ) : (
            <Button variant="secondary" onClick={() => navigateTo('passbook')}>
              <FileText className="w-4 h-4" />
              <span>{language === 'hi' ? 'पासबुक / भुगतान इतिहास देखें' : 'View Passbook / Receipt History'}</span>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default BillSummaryScreen;
