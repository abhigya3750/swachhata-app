import React, { useState } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { Button } from '../../common/Button';
import { ArrowLeft, HelpCircle, CheckCircle2 } from 'lucide-react';

const HelpdeskScreen: React.FC = () => {
  const { language, navigateTo, goBack } = useAppState();
  const [issueType, setIssueType] = useState<string>('Billing Query');
  const [description, setDescription] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [supportId, setSupportId] = useState<string>('#IMC-SUP-7712');

  const issueTypes = [
    'Billing / Payment Receipt Query',
    'Garbage Collection Timing Issue',
    'Property ID Linking Problem',
    'Eco-Store Product Refund / Exchange',
    'Sanitation Worker Feedback',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    setSupportId(`#IMC-SUP-${Math.floor(7000 + Math.random() * 1900)}`);
    setIsSubmitted(true);
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

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {language === 'hi' ? 'नागरिक हेल्पडेस्क सहायता' : 'Civic Helpdesk & Support'}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'hi'
                ? 'इंदौर नगर निगम सहायता केंद्र से संपर्क करें'
                : 'Direct support desk for billing, service disputes & general queries'}
            </p>
          </div>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
                {language === 'hi' ? 'समस्या का प्रकार चुनें' : 'Select Issue Type'}
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-municipal-blue outline-none"
              >
                {issueTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
                {language === 'hi' ? 'अपनी समस्या का वर्णन करें' : 'Describe Your Query'}
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={
                  language === 'hi'
                    ? 'अपनी समस्या का विवरण यहाँ लिखें...'
                    : 'Provide specific details so our helpdesk officer can assist you...'
                }
                className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:ring-2 focus:ring-municipal-blue outline-none"
                required
              />
            </div>

            <Button variant="primary" type="submit" disabled={!description.trim()}>
              {language === 'hi' ? 'सहायता टिकट सबमिट करें' : 'Submit Support Ticket'}
            </Button>
          </form>
        ) : (
          <div className="mt-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-md text-center space-y-3 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-eco-green flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-base font-bold text-slate-900">
              {language === 'hi' ? 'सहायता टिकट सफलतापूर्वक दर्ज हुआ!' : 'Support Ticket Logged!'}
            </h3>

            <p className="text-xs text-slate-500">
              {language === 'hi'
                ? 'हेल्पडेस्क अधिकारी 24 घंटे में आपसे संपर्क करेंगे।'
                : 'IMC Customer Care officer will respond within 24 business hours.'}
            </p>

            <div className="p-3 bg-slate-50 rounded-xl font-mono text-xs font-bold text-slate-800 border border-slate-200">
              Reference Ticket: {supportId}
            </div>

            <Button variant="secondary" onClick={() => setIsSubmitted(false)}>
              Log Another Query
            </Button>
          </div>
        )}
      </div>

      <div className="pt-4">
        <Button variant="outline" onClick={() => navigateTo('profile_home')}>
          {language === 'hi' ? 'प्रोफाइल पर लौटें' : 'Back to Profile'}
        </Button>
      </div>
    </div>
  );
};

export default HelpdeskScreen;
