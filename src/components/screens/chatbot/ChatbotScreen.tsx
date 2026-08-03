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
  AlertCircle,
  ArrowRight
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

  const isFromOther = screenParams?.fromOtherCategory;

  const intentChips = [
    { id: 'chip_pay_bill', labelEn: 'Pay Utility Bill', labelHi: 'बिल का भुगतान करें', icon: CreditCard },
    { id: 'chip_raise_complaint', labelEn: 'Raise Complaint', labelHi: 'शिकायत दर्ज करें', icon: PlusCircle },
    { id: 'chip_track_van', labelEn: 'Track Garbage Van', labelHi: 'कचरा गाड़ी ट्रैक करें', icon: Truck },
    { id: 'chip_bulk_pickup', labelEn: 'Book Bulk Pickup', labelHi: 'बल्क पिकअप बुक करें', icon: PackageCheck },
    { id: 'chip_ecostore', labelEn: 'Explore Eco-Store', labelHi: 'इको-स्टोर देखें', icon: ShoppingBag },
    { id: 'chip_pavitra', labelEn: 'Schedule Pavitra Pickup', labelHi: 'पवित्र वेस्ट पिकअप', icon: Flame },
    { id: 'chip_custom_issue', labelEn: 'Report Custom Issue', labelHi: 'अन्य कस्टम समस्या', icon: AlertCircle },
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendMessage(inputVal);
    setInputVal('');
  };

  return (
    <div className="flex-1 bg-slate-50 flex flex-col justify-between h-full">
      {/* Municipal Blue Top Header Card (Matching Profile Styling) */}
      <div className="bg-gradient-to-r from-municipal-blue to-municipal-darkBlue text-white p-3.5 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 text-white flex items-center justify-center shadow-inner">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs font-bold flex items-center gap-1.5 text-white">
              <span>Swachhata Assistant</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </h2>
            <p className="text-[10px] text-blue-100/90">
              {language === 'hi' ? 'इंदौर नगर निगम एआई सहायक' : 'IMC Automated AI Civic Assistant'}
            </p>
          </div>
        </div>

        <span className="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded border border-white/25">
          AI Assistant
        </span>
      </div>

      {/* Chat Messages Feed */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3 phone-screen-scroll">
        {isFromOther && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs text-amber-900 mb-2 animate-in fade-in">
            <div className="font-bold flex items-center gap-1.5 mb-1 text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{language === 'hi' ? 'अन्य शिकायत सहायता' : 'Tell me what is wrong'}</span>
            </div>
            <p className="text-[11px] text-amber-800">
              {language === 'hi'
                ? 'कृपया अपनी समस्या के बारे में विस्तार से लिखें या बोलें, मैं इसे आपके वार्ड टिकट में बदल दूँगा।'
                : 'Please type or speak your issue below. I will create a custom complaint ticket for your Ward supervisor.'}
            </p>
          </div>
        )}

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
                    : 'bg-municipal-blue text-white rounded-tr-none'
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

                {msg.showTicketCTA && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => navigateTo('evidence_location')}
                      className="w-full bg-municipal-lightBlue hover:bg-blue-100 text-municipal-blue px-3 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
                    >
                      <span>
                        {language === 'hi'
                          ? 'क्या आप इसे टिकट के रूप में दर्ज करना चाहते हैं?'
                          : 'Would you like to raise this as a ticket?'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* 7 Intent Chips Grid */}
        <div className="pt-2">
          <p className="text-[10px] text-slate-500 font-semibold mb-2 uppercase tracking-wider">
            {language === 'hi' ? 'त्वरित कार्रवाई विकल्प (7 Quick Chips)' : 'Quick Action Shortcuts'}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {intentChips.map((chip) => {
              const ChipIcon = chip.icon;
              return (
                <button
                  key={chip.id}
                  onClick={() => handleChipClick(chip.id)}
                  className="bg-white hover:bg-slate-100 active:scale-95 border border-slate-200 hover:border-municipal-blue text-slate-700 text-xs font-semibold px-2.5 py-1.5 rounded-full shadow-xs flex items-center gap-1.5 transition min-h-touch"
                >
                  <ChipIcon className="w-3.5 h-3.5 text-municipal-blue" />
                  <span>{language === 'hi' ? chip.labelHi : chip.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Message Input Box */}
      <form onSubmit={handleSend} className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2">
        <button
          type="button"
          onClick={() => sendMessage('Garbage accumulation near Vijay Nagar market square')}
          className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 min-h-touch flex items-center justify-center"
          title="Voice input simulation"
        >
          <Mic className="w-4 h-4" />
        </button>

        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={
            language === 'hi'
              ? 'यहाँ संदेश लिखें (उदा. बिल कैसे भरें)...'
              : 'Type a message or tap an intent chip above...'
          }
          className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-municipal-blue outline-none"
        />

        <button
          type="submit"
          disabled={!inputVal.trim()}
          className="w-9 h-9 rounded-xl bg-municipal-blue hover:bg-municipal-darkBlue disabled:opacity-40 text-white flex items-center justify-center shadow-md min-h-touch shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default ChatbotScreen;
