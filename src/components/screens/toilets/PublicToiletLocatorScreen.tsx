import React, { useState } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';
import { Button } from '../../common/Button';
import {
  ArrowLeft,
  MapPin,
  Building,
  Star,
  Navigation,
  CheckCircle2,
  Clock
} from 'lucide-react';

const PublicToiletLocatorScreen: React.FC = () => {
  const { language, goBack, publicToilets } = useAppState();
  const [filter, setFilter] = useState<'all' | 'pink' | 'free' | '24x7'>('all');
  const [selectedToilet, setSelectedToilet] = useState<any>(null);
  const [showRatingModal, setShowRatingModal] = useState<boolean>(false);
  const [ratingSubmitted, setRatingSubmitted] = useState<boolean>(false);
  const [starRating, setStarRating] = useState<number>(5);

  const filteredToilets = publicToilets.filter((pt) => {
    if (filter === 'pink') return pt.isPinkToilet;
    if (filter === 'free') return pt.isFree;
    if (filter === '24x7') return pt.isOpen24x7;
    return true;
  });

  const handleOpenRating = (toilet: any) => {
    setSelectedToilet(toilet);
    setShowRatingModal(true);
    setRatingSubmitted(false);
  };

  const handleSubmitRating = () => {
    setRatingSubmitted(true);
    setTimeout(() => {
      setShowRatingModal(false);
      setRatingSubmitted(false);
    }, 1500);
  };

  return (
    <div className="flex-1 bg-slate-50 p-4 space-y-4 pb-6 flex flex-col justify-between font-sans">
      <div className="space-y-3">
        {/* Header Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={goBack}
            className="flex items-center gap-1 text-slate-600 hover:text-slate-900 text-xs font-semibold py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'hi' ? 'पीछे' : 'Back'}</span>
          </button>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
            {language === 'hi' ? '5-स्टार स्वच्छ शौचालय' : '5-Star Swachh CT/PT'}
          </span>
        </div>

        {/* Municipal Blue Hero Header */}
        <div className="bg-gradient-to-r from-municipal-blue via-blue-600 to-municipal-darkBlue text-white p-4 rounded-2xl shadow-md space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">
                {language === 'hi' ? 'सार्वजनिक शौचालय खोजक' : 'Public Toilet Locator'}
              </h2>
              <p className="text-[11px] text-blue-100/90">
                {language === 'hi'
                  ? 'इंदौर नगर निगम • 5-स्टार स्वच्छ शौचालय एवं शी-लाउंज'
                  : 'Find nearest 5-Star Clean Public Restrooms & She-Lounges'}
              </p>
            </div>
          </div>
        </div>

        {/* Filter Chips Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-full font-bold shrink-0 transition border ${
              filter === 'all'
                ? 'bg-municipal-blue text-white border-municipal-blue shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {language === 'hi' ? 'सभी (All)' : 'All Restrooms'}
          </button>
          <button
            onClick={() => setFilter('pink')}
            className={`px-3 py-1.5 rounded-full font-bold shrink-0 transition border flex items-center gap-1 ${
              filter === 'pink'
                ? 'bg-pink-600 text-white border-pink-700 shadow-sm'
                : 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100'
            }`}
          >
            <span>🌸 She-Lounge (Pink)</span>
          </button>
          <button
            onClick={() => setFilter('free')}
            className={`px-3 py-1.5 rounded-full font-bold shrink-0 transition border ${
              filter === 'free'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            {language === 'hi' ? 'निःशुल्क (Free)' : 'Free Entry'}
          </button>
          <button
            onClick={() => setFilter('24x7')}
            className={`px-3 py-1.5 rounded-full font-bold shrink-0 transition border ${
              filter === '24x7'
                ? 'bg-slate-800 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            24x7 Open
          </button>
        </div>

        {/* Mini Interactive Map Viewport with Toilet Pins */}
        <div className="relative h-32 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
          <svg className="w-full h-full object-cover" viewBox="0 0 390 140">
            <rect width="390" height="140" fill="#E2E8F0" />
            <path d="M 0 50 Q 150 70 390 40" stroke="#CBD5E1" strokeWidth="16" fill="none" />
            <path d="M 120 0 Q 150 80 180 140" stroke="#CBD5E1" strokeWidth="14" fill="none" />
            <path d="M 280 0 Q 260 70 290 140" stroke="#CBD5E1" strokeWidth="12" fill="none" />

            {/* Toilet Pins */}
            <g className="cursor-pointer">
              <circle cx="140" cy="55" r="12" fill="#EC4899" className="animate-pulse" />
              <text x="140" y="59" fontSize="9" fill="white" fontWeight="bold" textAnchor="middle">🌸</text>
            </g>

            <g className="cursor-pointer">
              <circle cx="270" cy="65" r="11" fill="#10B981" />
              <text x="270" y="69" fontSize="9" fill="white" fontWeight="bold" textAnchor="middle">🚻</text>
            </g>

            <g className="cursor-pointer">
              <circle cx="210" cy="90" r="11" fill="#1A73E3" />
              <text x="210" y="94" fontSize="9" fill="white" fontWeight="bold" textAnchor="middle">🚻</text>
            </g>

            {/* Citizen Pin */}
            <circle cx="195" cy="45" r="7" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
          </svg>

          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded-md text-[9px] font-bold text-slate-700 border border-slate-200">
            📍 Showing {filteredToilets.length} Restrooms nearby
          </div>
        </div>

        {/* Toilet Cards List */}
        <div className="space-y-2.5">
          {filteredToilets.map((toilet) => (
            <div
              key={toilet.id}
              className={`p-3.5 rounded-2xl border shadow-xs transition ${
                toilet.isPinkToilet
                  ? 'bg-pink-50/50 border-pink-200 hover:border-pink-300'
                  : 'bg-white border-slate-200 hover:border-municipal-blue'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold text-slate-900 leading-tight">
                      {language === 'hi' ? toilet.nameHi : toilet.name}
                    </h3>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{toilet.address}</span>
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-black text-emerald-700 block">{toilet.distance}</span>
                  <div className="inline-flex items-center gap-0.5 bg-amber-100 text-amber-900 text-[9px] font-bold px-1.5 py-0.2 rounded mt-0.5">
                    <Star className="w-2.5 h-2.5 fill-current text-amber-500" />
                    <span>{toilet.rating}</span>
                  </div>
                </div>
              </div>

              {/* Facilities tags */}
              <div className="flex flex-wrap gap-1 mt-2">
                {toilet.facilities.map((fac: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-[9px] font-semibold bg-white text-slate-600 px-1.5 py-0.5 rounded border border-slate-200"
                  >
                    {fac}
                  </span>
                ))}
              </div>

              {/* Action Buttons Strip */}
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Badge variant={toilet.isFree ? 'success' : 'neutral'}>
                    {toilet.isFree ? 'Free Entry' : 'Paid (₹5)'}
                  </Badge>
                  {toilet.isOpen24x7 && (
                    <span className="text-[9px] text-slate-500 font-medium flex items-center gap-0.5">
                      <Clock className="w-2.5 h-2.5" /> 24x7
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenRating(toilet)}
                    className="text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-lg transition"
                  >
                    Rate Hygiene
                  </button>

                  <button
                    onClick={() => alert(`Starting GPS navigation to ${toilet.name}...`)}
                    className="text-[10px] font-bold text-white bg-municipal-blue hover:bg-municipal-darkBlue px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm transition"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Directions</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hygiene Rating Feedback Modal */}
      <Modal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        title={language === 'hi' ? 'शौचालय स्वच्छता रेटिंग' : 'Rate Toilet Hygiene'}
      >
        <div className="space-y-4 p-2 text-slate-800 text-xs">
          {!ratingSubmitted ? (
            <>
              <div className="text-center space-y-1">
                <h4 className="font-bold text-sm text-slate-900">{selectedToilet?.name}</h4>
                <p className="text-[11px] text-slate-500">{selectedToilet?.address}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center space-y-2">
                <span className="text-[11px] font-bold text-slate-700 block">How clean was this facility?</span>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setStarRating(star)}
                      className="p-1.5 transition transform active:scale-125"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= starRating ? 'text-amber-400 fill-current' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-emerald-700 font-bold block">
                  {starRating === 5 ? '★★★★★ 5-Star Clean' : `${starRating} Stars`}
                </span>
              </div>

              <Button variant="primary" onClick={handleSubmitRating}>
                Submit Citizen Hygiene Review
              </Button>
            </>
          ) : (
            <div className="p-6 text-center space-y-2 animate-in zoom-in-95">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">Thank You, Citizen!</h4>
              <p className="text-slate-500 text-[11px]">
                Your live hygiene rating has been transmitted to Indore Municipal Corporation sanitation monitors.
              </p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default PublicToiletLocatorScreen;
