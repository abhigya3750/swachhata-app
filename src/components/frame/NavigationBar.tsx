import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import type { BottomTab } from '../../types';
import { Home, PlusCircle, Bot, ShoppingBag, User } from 'lucide-react';

const NavigationBar: React.FC = () => {
  const { activeTab, setActiveTab, language } = useAppState();

  const tabs: { id: BottomTab; labelEn: string; labelHi: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', labelEn: 'Home', labelHi: 'होम', icon: Home },
    { id: 'raise_query', labelEn: 'Raise Query', labelHi: 'शिकायत', icon: PlusCircle },
    { id: 'chatbot', labelEn: 'Assistant', labelHi: 'सहायक', icon: Bot },
    { id: 'ecostore', labelEn: 'Eco-Store', labelHi: 'इको-स्टोर', icon: ShoppingBag },
    { id: 'profile', labelEn: 'Profile', labelHi: 'प्रोफाइल', icon: User },
  ];

  return (
    <nav className="bg-white border-t border-slate-200 px-1 py-1 flex items-center justify-around z-30 shrink-0">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const IconComponent = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center justify-center py-1.5 min-h-touch rounded-xl transition touch-active ${
              isActive
                ? 'text-municipal-blue font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className={`p-1 rounded-full transition ${isActive ? 'bg-municipal-lightBlue scale-110' : ''}`}>
              <IconComponent className={`w-5 h-5 ${isActive ? 'text-municipal-blue stroke-[2.5]' : 'stroke-2'}`} />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[64px]">
              {language === 'hi' ? tab.labelHi : tab.labelEn}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default NavigationBar;
