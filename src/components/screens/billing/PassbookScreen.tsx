import React, { useState } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';
import { ArrowLeft, Download, CheckCircle2, History, Printer } from 'lucide-react';
import type { PaymentTransaction } from '../../../types';

const PassbookScreen: React.FC = () => {
  const { language, goBack, transactions } = useAppState();
  const [showEmptyDemo, setShowEmptyDemo] = useState<boolean>(false);
  const [selectedTxn, setSelectedTxn] = useState<PaymentTransaction | null>(null);

  const displayTransactions = showEmptyDemo ? [] : transactions;

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
            {language === 'hi' ? 'पासबुक / भुगतान इतिहास' : 'Passbook & Transaction History'}
          </h2>
          <button
            onClick={() => setShowEmptyDemo(!showEmptyDemo)}
            className="text-[10px] text-amber-700 underline font-semibold"
          >
            {showEmptyDemo ? 'Show Populated' : 'Simulate Empty State'}
          </button>
        </div>

        <p className="text-xs text-slate-500 mt-1">
          {language === 'hi'
            ? 'आपके संपत्ति कर से जुड़े सभी अपशिष्ट शुल्क भुगतान'
            : 'All past waste utility bill payments for linked property'}
        </p>

        <div className="mt-4 space-y-3">
          {displayTransactions.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center space-y-3 my-6">
              <History className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800">
                {language === 'hi' ? 'अभी कोई भुगतान इतिहास नहीं है' : 'No Payments Yet'}
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                {language === 'hi'
                  ? 'जब आप अपने अपशिष्ट शुल्क बिल का भुगतान करेंगे तो रसीदें यहाँ दिखाई देंगी।'
                  : 'Your past bill receipts and payment history for brand new accounts will appear here.'}
              </p>
            </div>
          ) : (
            displayTransactions.map((txn) => (
              <div
                key={txn.id}
                className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm flex items-center justify-between hover:border-municipal-blue transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-eco-green flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">₹{txn.amount}</span>
                      <Badge variant="success">SUCCESS</Badge>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {txn.date} • {txn.paymentMethod}
                    </div>
                    <div className="text-[9px] font-mono text-slate-400">{txn.id}</div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedTxn(txn)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-municipal-blue min-h-touch min-w-touch flex items-center justify-center transition"
                  title="Download Receipt"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <Modal
        isOpen={!!selectedTxn}
        onClose={() => setSelectedTxn(null)}
        title={language === 'hi' ? 'नगर निगम डिजिटल रसीद' : 'IMC Transaction Receipt PDF'}
      >
        {selectedTxn && (
          <div className="p-4 bg-slate-50 border border-slate-300 rounded-xl space-y-4 font-sans text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-300 pb-3">
              <div>
                <h4 className="font-black text-sm text-municipal-blue uppercase">Indore Municipal Corporation</h4>
                <p className="text-[10px] text-slate-500">Official Municipal Waste Utility Payment Voucher</p>
              </div>
              <div className="w-8 h-8 rounded bg-municipal-blue text-white font-black text-xs flex items-center justify-center">
                IMC
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Receipt No</span>
                <span className="font-mono font-bold text-slate-900">{selectedTxn.id}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Date</span>
                <span className="font-bold text-slate-900">{selectedTxn.date}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Property Tax ID</span>
                <span className="font-bold text-slate-900">{selectedTxn.taxId}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Mode</span>
                <span className="font-bold text-slate-900">{selectedTxn.paymentMethod}</span>
              </div>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-lg flex justify-between items-center text-xs">
              <span className="font-bold">Total Paid:</span>
              <span className="font-black text-emerald-700 text-sm">₹{selectedTxn.amount}.00</span>
            </div>

            <button
              onClick={() => {
                alert('Downloading Receipt PDF...');
                setSelectedTxn(null);
              }}
              className="w-full py-2 bg-municipal-blue text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" /> Download Printable PDF
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PassbookScreen;
