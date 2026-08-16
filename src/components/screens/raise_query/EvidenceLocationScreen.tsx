import React, { useState } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { Button } from '../../common/Button';
import MockMap from '../../common/MockMap';
import type { ComplaintTicket } from '../../../types';
import {
  Camera,
  Mic,
  MapPin,
  ArrowLeft,
  Image as ImageIcon,
  Volume2,
  Square,
  X
} from 'lucide-react';

const EvidenceLocationScreen: React.FC = () => {
  const {
    language,
    navigateTo,
    goBack,
    selectedComplaintCategory,
    selectedWard,
    addTicket,
  } = useAppState();

  const [photoAttached, setPhotoAttached] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [voiceRecorded, setVoiceRecorded] = useState<boolean>(false);
  const [textNote, setTextNote] = useState<string>('');
  const [pinLocation, setPinLocation] = useState<string>('Scheme 54, Vijay Nagar, Indore');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isSubmitValid = photoAttached || voiceRecorded || textNote.trim().length > 0;

  const handleRecordToggle = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setVoiceRecorded(true);
      }, 2000);
    } else {
      setIsRecording(false);
      setVoiceRecorded(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSubmitValid) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);

      const newTicket: ComplaintTicket = {
        ticketId: `#IMC-ORD-${Math.floor(8000 + Math.random() * 1900)}`,
        categoryId: selectedComplaintCategory?.id || 'truck_missed',
        categoryTitle: selectedComplaintCategory?.title || 'Garbage Truck Missed',
        categoryTitleHi: selectedComplaintCategory?.titleHi || 'कचरा गाड़ी नहीं आई',
        wardName: selectedWard.name,
        address: pinLocation,
        createdAt: 'Just now',
        slaHours: 48,
        status: 'In Progress',
        statusHi: 'प्रगति पर',
        photoUrl: photoAttached
          ? 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80'
          : undefined,
        note: textNote || (voiceRecorded ? 'Audio note attached' : undefined),
        rewardPointsEarned: selectedComplaintCategory?.rewardPoints,
      };

      addTicket(newTicket);
      navigateTo('complaint_confirm', { ticket: newTicket });
    }, 800);
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

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            {language === 'hi' ? 'प्रमाण और स्थान दर्ज करें' : 'Evidence & Location'}
          </h2>
          <span className="text-xs bg-municipal-lightBlue text-municipal-blue font-bold px-2.5 py-1 rounded-full border border-municipal-blue/20">
            {selectedComplaintCategory ? (language === 'hi' ? selectedComplaintCategory.titleHi : selectedComplaintCategory.title) : 'Complaint'}
          </span>
        </div>

        <p className="text-xs text-slate-500 mt-1">
          {language === 'hi'
            ? 'निगम अधिकारी के लिए फोटो, आवाज़ का संदेश या विवरण जोड़ें'
            : 'Attach proof photo, voice message or text description for municipal inspection'}
        </p>

        <div className="mt-4 space-y-3">
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-municipal-blue flex items-center justify-center shrink-0">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">
                  {language === 'hi' ? 'फोटो अपलोड करें' : 'Attach Proof Photo'}
                </div>
                <div className="text-[10px] text-slate-500">
                  {photoAttached
                    ? language === 'hi'
                      ? '1 फोटो संलग्न है'
                      : 'Photo attached (1)'
                    : language === 'hi'
                    ? 'कैमरा या गैलरी से चुनें'
                    : 'Take photo or choose from gallery'}
                </div>
              </div>
            </div>

            {photoAttached ? (
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=100&q=80"
                  alt="Proof Preview"
                  className="w-9 h-9 rounded-lg object-cover border border-emerald-400"
                />
                <button
                  onClick={() => setPhotoAttached(false)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setPhotoAttached(true)}
                className="px-3 py-1.5 bg-municipal-lightBlue text-municipal-blue rounded-xl text-xs font-bold hover:bg-blue-100 transition min-h-touch flex items-center gap-1"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'फोटो जोड़ें' : 'Add Photo'}</span>
              </button>
            )}
          </div>

          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition ${
                  isRecording ? 'bg-red-100 text-action-red animate-pulse' : 'bg-emerald-50 text-eco-green'
                }`}
              >
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">
                  {language === 'hi' ? 'बोल कर बताएं (Voice Note)' : 'Voice Message ("Bol kar batayein")'}
                </div>
                <div className="text-[10px] text-slate-500">
                  {isRecording
                    ? language === 'hi'
                      ? 'रिकॉर्डिंग जारी है...'
                      : 'Recording voice message...'
                    : voiceRecorded
                    ? language === 'hi'
                      ? 'ध्वनि संदेश रिकॉर्ड किया गया (0:05s)'
                      : 'Voice note recorded (0:05s)'
                    : language === 'hi'
                    ? 'अपनी भाषा में बोलें'
                    : 'Record spoken complaint details'}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRecordToggle}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition min-h-touch flex items-center gap-1 ${
                isRecording
                  ? 'bg-action-red text-white'
                  : voiceRecorded
                  ? 'bg-emerald-100 text-eco-darkGreen'
                  : 'bg-emerald-500 text-white hover:bg-emerald-600'
              }`}
            >
              {isRecording ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Stop</span>
                </>
              ) : voiceRecorded ? (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Recorded</span>
                </>
              ) : (
                <>
                  <Mic className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'बोलें' : 'Record'}</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              {language === 'hi' ? 'विवरण या लैंडमार्क दर्ज करें' : 'Additional Description / Landmark'}
            </label>
            <textarea
              rows={2}
              value={textNote}
              onChange={(e) => setTextNote(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'उदा. मुख्य चौराहे के पास कचरा एकत्र हुआ है...'
                  : 'e.g. Garbage accumulated near the corner landmark...'
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-municipal-blue outline-none"
            />
          </div>
        </div>

        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-municipal-blue" />
              <span>{language === 'hi' ? 'घटना स्थान (पिन खींचें)' : 'Confirm Issue Location (Drag Pin)'}</span>
            </span>
          </div>

          <MockMap
            interactivePin={true}
            heightClass="h-36"
            onPinChange={(lat, lng) =>
              setPinLocation(`Scheme 54, Ward 34 (${lat.toFixed(3)}, ${lng.toFixed(3)})`)
            }
          />
          <p className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
            <span>Location: {pinLocation}</span>
          </p>
        </div>
      </div>

      <div className="pt-3">
        <Button
          variant="eco"
          disabled={!isSubmitValid || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting
            ? language === 'hi'
              ? 'शिकायत दर्ज हो रही है...'
              : 'Submitting Ticket...'
            : language === 'hi'
            ? 'शिकायत सबमिट करें'
            : 'Submit Complaint Ticket'}
        </Button>
      </div>
    </div>
  );
};

export default EvidenceLocationScreen;
