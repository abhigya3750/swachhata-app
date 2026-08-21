import React, { useState } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import {
  Bot,
  Send,
  Sparkles,
  Mic,
  CreditCard,
  PlusCircle,
  Truck,
  PackageCheck,
  ShoppingBag,
  Flame,
  ArrowRight,
  Building,
  Store,
  Gift
} from 'lucide-react';

const ChatbotScreen: React.FC = () => {
  const {
    language,
    navigateTo,
    messages,
    sendMessage,
    handleChipClick,
    screenParams,
  } = useAppState();

  const [inputVal, setInputVal] = useState<string>('');
  const [isRecordingVoice, setIsRecordingVoice] = useState<boolean>(false);
  const [activeSegregationTab, setActiveSegregationTab] = useState<'wet' | 'dry' | 'hazardous' | 'sacred' | null>(null);

  const isFromOther = screenParams?.fromOtherCategory;

  const intentChips = [
    { id: 'chip_spot_dump', labelEn: '📸 Spot-a-Dump (+50 PTS)', labelHi: '📸 स्पॉट-ए-डंप (+50 PTS)', icon: Gift },
    { id: 'chip_toilets', labelEn: '🚻 Find Public Toilet', labelHi: '🚻 शौचालय खोजें', icon: Building },
    { id: 'chip_pay_bill', labelEn: '💳 Pay Utility Bill', labelHi: '💳 बिल भुगतान', icon: CreditCard },
    { id: 'chip_track_van', labelEn: '🚚 Track Van #42', labelHi: '🚚 कचरा गाड़ी #42', icon: Truck },
    { id: 'chip_bulk_pickup', labelEn: '📦 Book Bulk Pickup', labelHi: '📦 बल्क पिकअप', icon: PackageCheck },
    { id: 'chip_pavitra', labelEn: '🌸 Schedule Pavitra', labelHi: '🌸 पवित्र पुष्प कचरा', icon: Flame },
    { id: 'chip_ecostore', labelEn: '🛍️ Eco-Store Market', labelHi: '🛍️ इको-स्टोर', icon: ShoppingBag },
    { id: 'chip_raise_complaint', labelEn: '⚠️ Raise Grievance', labelHi: '⚠️ अन्य शिकायत', icon: PlusCircle },
  ];

  const segregationGuides = {
    wet: {
      title: 'Wet / Biodegradable Waste (गीला कचरा - हरा डिब्बा 🟢)',
      items: 'Kitchen food scraps, fruit/vegetable peels, tea leaves, leftover cooked food, garden leaves.',
      destination: 'Processed at Indore Gobar-Dhan 550 TPD Bio-CNG plant & organic compost units.'
    },
    dry: {
      title: 'Dry Recyclable Waste (सूखा कचरा - नीला डिब्बा 🔵)',
      items: 'Plastic bottles, cardboard cartons, newspapers, metal cans, glass bottles, clean polythene wrappers.',
      destination: 'Sorted into 24 distinct streams at Automated Material Recovery Facility (MRF).'
    },
    hazardous: {
      title: 'Domestic Hazardous & Sanitary (घरेलू हानिकारक कचरा - पीला/काला डिब्बा 🟡)',
      items: 'Diapers, sanitary pads, medicines, syringes, paint cans, insect sprays, tube lights.',
      destination: 'Safely transported in sealed compartments for high-temperature biomedical incineration.'
    },
    sacred: {
      title: 'Pavitra Sacred Floral Waste (पवित्र पुष्प कचरा 🌸)',
      items: 'Temple & home puja flowers, havan ashes, sacred garlands, festival organic decorations.',
      destination: 'Crafted by Women Self Help Groups into Pavitra natural charcoal-free dhoop sticks.'
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendMessage(inputVal);
    setInputVal('');
  };

  const handleSimulateVoice = () => {
    setIsRecordingVoice(true);
    setTimeout(() => {
      setIsRecordingVoice(false);
      sendMessage('कचरा गाड़ी का समय क्या है और बिल कैसे भरें? (Voice Note)');
    }, 2000);
  };

  return (
    <div className="flex-1 bg-slate-50 flex flex-col justify-between h-full relative font-sans">
      
      {/* Municipal Blue Top Header */}
      <div className="bg-gradient-to-r from-municipal-blue via-blue-600 to-municipal-darkBlue text-white p-3.5 shadow-md flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 text-white flex items-center justify-center shadow-inner">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs font-bold flex items-center gap-1.5 text-white">
              <span>Swachhata AI Co-Pilot</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </h2>
            <p className="text-[10px] text-blue-100/90 font-medium">
              {language === 'hi'
                ? 'इंदौर नगर निगम • 8x राष्ट्रीय विजेता स्मार्ट सहायक'
                : 'Indore Municipal Corporation • 8x Champion AI Assistant'}
            </p>
          </div>
        </div>

        <span className="text-[9.5px] bg-emerald-500/30 text-emerald-200 font-bold px-2 py-0.5 rounded-full border border-emerald-400/40">
          Online • AI 2.0
        </span>
      </div>

      {/* Segregation Quick Guide Bar */}
      <div className="bg-blue-50/90 border-b border-blue-100 px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto text-[10.5px] scrollbar-none">
        <span className="text-slate-500 font-bold shrink-0 flex items-center gap-0.5 text-[9px] uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-amber-500" /> Guide:
        </span>
        <button
          onClick={() => setActiveSegregationTab(activeSegregationTab === 'wet' ? null : 'wet')}
          className={`px-2 py-0.5 rounded-full font-semibold shrink-0 transition border ${
            activeSegregationTab === 'wet'
              ? 'bg-emerald-600 text-white border-emerald-700'
              : 'bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50'
          }`}
        >
          🟢 Wet (गीला)
        </button>
        <button
          onClick={() => setActiveSegregationTab(activeSegregationTab === 'dry' ? null : 'dry')}
          className={`px-2 py-0.5 rounded-full font-semibold shrink-0 transition border ${
            activeSegregationTab === 'dry'
              ? 'bg-blue-600 text-white border-blue-700'
              : 'bg-white text-blue-800 border-blue-200 hover:bg-blue-50'
          }`}
        >
          🔵 Dry (सूखा)
        </button>
        <button
          onClick={() => setActiveSegregationTab(activeSegregationTab === 'hazardous' ? null : 'hazardous')}
          className={`px-2 py-0.5 rounded-full font-semibold shrink-0 transition border ${
            activeSegregationTab === 'hazardous'
              ? 'bg-amber-600 text-white border-amber-700'
              : 'bg-white text-amber-800 border-amber-200 hover:bg-amber-50'
          }`}
        >
          🟡 Sanitary/Hazardous
        </button>
        <button
          onClick={() => setActiveSegregationTab(activeSegregationTab === 'sacred' ? null : 'sacred')}
          className={`px-2 py-0.5 rounded-full font-semibold shrink-0 transition border ${
            activeSegregationTab === 'sacred'
              ? 'bg-amber-700 text-white border-amber-800'
              : 'bg-white text-amber-900 border-amber-300 hover:bg-amber-50'
          }`}
        >
          🌸 Pavitra Floral
        </button>
      </div>

      {/* Segregation Guide Detail Popover */}
      {activeSegregationTab && (
        <div className="bg-white border-b border-slate-200 p-3 text-xs shadow-sm animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-100">
            <span className="font-bold text-slate-900">{segregationGuides[activeSegregationTab].title}</span>
            <button
              onClick={() => setActiveSegregationTab(null)}
              className="text-[10px] text-slate-400 hover:text-slate-700 font-bold px-1.5 py-0.5 bg-slate-100 rounded"
            >
              ✕
            </button>
          </div>
          <p className="text-slate-700 text-[11px] mb-1">
            <strong>Includes:</strong> {segregationGuides[activeSegregationTab].items}
          </p>
          <p className="text-[10px] text-emerald-700 font-medium">
            <strong>Indore IMC Process:</strong> {segregationGuides[activeSegregationTab].destination}
          </p>
        </div>
      )}

      {/* Chat Messages Feed */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3 phone-screen-scroll">
        
        {isFromOther && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs text-amber-900 mb-2 animate-in fade-in">
            <div className="font-bold flex items-center gap-1.5 mb-1 text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{language === 'hi' ? 'विशेष शिकायत सहायता' : 'Custom Grievance Assistance'}</span>
            </div>
            <p className="text-[11px] text-amber-800">
              {language === 'hi'
                ? 'कृपया अपनी समस्या के बारे में लिखें या बोलें, मैं इसे आपके वार्ड सुपरवाइजर के लिए आधिकारिक टिकट बना दूँगा।'
                : 'Please type or speak your issue below. I will auto-generate an official Ward 34 ticket.'}
            </p>
          </div>
        )}

        {/* Message Bubbles */}
        {messages.map((msg) => {
          const isBot = msg.sender === 'bot';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} animate-in fade-in`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                  isBot
                    ? 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                    : 'bg-gradient-to-r from-municipal-blue to-blue-700 text-white rounded-tr-none'
                }`}
              >
                <p>{msg.text}</p>
                <span
                  className={`text-[9px] mt-1 block text-right font-mono ${
                    isBot ? 'text-slate-400' : 'text-blue-200'
                  }`}
                >
                  {msg.timestamp}
                </span>

                {/* Smart Action Escalation Button */}
                {msg.showTicketCTA && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => navigateTo('evidence_location')}
                      className="w-full bg-municipal-lightBlue hover:bg-blue-100 text-municipal-blue px-3 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
                    >
                      <span>
                        {language === 'hi'
                          ? 'क्या आप इसे आधिकारिक शिकायत टिकट बनाना चाहते हैं?'
                          : 'Convert into Official Municipal Grievance Ticket'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Live Audio Recording Visualizer Overlay */}
        {isRecordingVoice && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-3 text-xs text-red-900 animate-pulse flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-ping"></span>
              <span className="font-bold">Recording voice note in Hindi/English...</span>
            </div>
            <div className="flex gap-1 items-center h-4">
              <span className="w-1 bg-red-500 h-3 animate-bounce"></span>
              <span className="w-1 bg-red-500 h-4 animate-bounce delay-75"></span>
              <span className="w-1 bg-red-500 h-2 animate-bounce delay-150"></span>
            </div>
          </div>
        )}

        {/* Smart Intent Chips */}
        <div className="pt-2">
          <p className="text-[10px] text-slate-500 font-semibold mb-2 uppercase tracking-wider">
            {language === 'hi' ? 'त्वरित सेवा शॉर्टकट' : 'Quick Service Shortcuts'}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {intentChips.map((chip) => {
              return (
                <button
                  key={chip.id}
                  onClick={() => handleChipClick(chip.id)}
                  className="bg-white hover:bg-slate-100 active:scale-95 border border-slate-200 hover:border-municipal-blue text-slate-700 text-xs font-semibold px-2.5 py-1.5 rounded-full shadow-xs flex items-center gap-1.5 transition min-h-touch"
                >
                  <span>{language === 'hi' ? chip.labelHi : chip.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Message Input Bar with Voice Note Simulator */}
      <form onSubmit={handleSend} className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2">
        <button
          type="button"
          onClick={handleSimulateVoice}
          className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-red-600 hover:bg-red-50 min-h-touch flex items-center justify-center transition"
          title="Voice input (Bol kar batayein)"
        >
          <Mic className="w-4 h-4" />
        </button>

        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={
            language === 'hi'
              ? 'संदेश लिखें (उदा. शौचालय कहां है, बिल कैसे भरें)...'
              : 'Ask a question or tap a shortcut above...'
          }
          className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-municipal-blue outline-none"
        />

        <button
          type="submit"
          disabled={!inputVal.trim()}
          className="w-9 h-9 rounded-xl bg-municipal-blue hover:bg-municipal-darkBlue disabled:opacity-40 text-white flex items-center justify-center shadow-md min-h-touch shrink-0 transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};

export default ChatbotScreen;
