import React, { useState } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { Button } from '../../common/Button';
import { Building2, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

const PropertyLinkScreen: React.FC = () => {
  const { language, navigateTo, setBillState } = useAppState();
  const [taxIdInput, setTaxIdInput] = useState<string>('IMC-TAX-9921');
  const [isLinked, setIsLinked] = useState<boolean>(false);

  const handleLinkProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taxIdInput) return;
    setIsLinked(true);
    setBillState('unpaid');
    setTimeout(() => {
      navigateTo('home');
    }, 900);
  };

  const handleSkip = () => {
    setBillState('unlinked');
    navigateTo('home');
  };

  return (
    <div className="flex-1 bg-slate-50 text-slate-800 p-5 flex flex-col justify-between">
      <div>
        <div className="flex justify-end">
          <button
            onClick={handleSkip}
            className="text-xs text-slate-500 hover:text-slate-800 font-semibold px-2 py-1 underline"
          >
            {language === 'hi' ? 'अभी छोड़ें (Skip for now)' : 'Skip for now'}
          </button>
        </div>

        <div className="mt-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-municipal-lightBlue text-municipal-blue flex items-center justify-center mx-auto mb-3 shadow-md border border-municipal-blue/20">
            <Building2 className="w-8 h-8" />
          </div>

          <h2 className="text-xl font-bold text-slate-900">
            {language === 'hi' ? 'संपत्ति कर आईडी लिंक करें' : 'Link Property Tax ID'}
          </h2>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-xs mx-auto">
            {language === 'hi'
              ? 'कचरा प्रबंधन शुल्क का भुगतान करने और त्वरित बिल रसीदें प्राप्त करने के लिए अपनी 10-अंकीय आईडी दर्ज करें'
              : 'Link your Indore Municipal Property Tax ID to view & pay garbage utility charges directly from your dashboard'}
          </p>
        </div>

        {/* Input Card */}
        <div className="mt-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <form onSubmit={handleLinkProperty} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                {language === 'hi' ? 'संपत्ति कर खाता क्रमांक' : 'Property Tax Account ID'}
              </label>
              <input
                type="text"
                value={taxIdInput}
                onChange={(e) => setTaxIdInput(e.target.value.toUpperCase())}
                placeholder="e.g. IMC-TAX-9921"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 text-sm font-mono font-bold text-slate-900 tracking-wider focus:ring-2 focus:ring-municipal-blue outline-none"
                required
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                {language === 'hi'
                  ? 'नमूना आईडी: IMC-TAX-9921 (राजेश कुमार वर्मा)'
                  : 'Sample Property ID: IMC-TAX-9921 (Rajesh Kumar Verma)'}
              </span>
            </div>

            {isLinked ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-eco-darkGreen font-semibold animate-in zoom-in-95">
                <CheckCircle2 className="w-5 h-5 text-eco-green shrink-0" />
                <span>
                  {language === 'hi'
                    ? 'संपत्ति सफलतापूर्वक लिंक हो गई! होम पर जा रहे हैं...'
                    : 'Property successfully linked! Heading to Home...'}
                </span>
              </div>
            ) : (
              <Button variant="primary" type="submit">
                <span>{language === 'hi' ? 'अभी लिंक करें' : 'Link Property Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </form>
        </div>

        <div className="mt-4 p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-start gap-2.5 text-[11px] text-blue-900">
          <ShieldAlert className="w-4 h-4 text-municipal-blue shrink-0 mt-0.5" />
          <span>
            {language === 'hi'
              ? 'आप इसे बाद में अपने प्रोफाइल सेक्शन से भी लिंक या प्रबंधित कर सकते हैं।'
              : 'You can also link or change multiple properties later in your Profile settings.'}
          </span>
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={handleSkip}
          className="text-xs text-slate-500 hover:text-slate-800 font-medium"
        >
          {language === 'hi' ? 'बिना लिंक किए होम पेज पर जाएँ' : 'Proceed to Dashboard without linking'}
        </button>
      </div>
    </div>
  );
};

export default PropertyLinkScreen;
