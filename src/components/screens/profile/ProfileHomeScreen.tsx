import React from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { Badge } from '../../common/Badge';
import {
  Phone,
  MapPin,
  Building2,
  FileText,
  Bookmark,
  HelpCircle,
  LogOut,
  ChevronRight,
  Plus
} from 'lucide-react';

const ProfileHomeScreen: React.FC = () => {
  const {
    language,
    navigateTo,
    selectedWard,
    userPhone,
    propertyTax,
    billState,
    setIsLoggedIn,
  } = useAppState();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigateTo('splash');
  };

  return (
    <div className="flex-1 bg-slate-50 p-4 space-y-4 pb-6">
      {/* Citizen Identity Card */}
      <div className="bg-gradient-to-r from-municipal-blue to-municipal-darkBlue text-white p-4 rounded-2xl shadow-md space-y-3">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white font-bold text-xl shadow-inner shrink-0">
            AS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold">Abhigya Sharma</h2>
              <span className="bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                VERIFIED
              </span>
            </div>
            <p className="text-xs text-blue-100/90 mt-0.5 flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span>+91 {userPhone}</span>
            </p>
            <div className="mt-1.5 inline-flex items-center gap-1 bg-white/15 px-2.5 py-0.5 rounded-full text-[10px] text-emerald-300 font-semibold border border-white/20">
              <MapPin className="w-3 h-3" />
              <span>{selectedWard.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Linked Property Tax IDs List */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-municipal-blue" />
            <span>{language === 'hi' ? 'संलग्न संपत्ति कर खाता' : 'Linked Property Accounts'}</span>
          </span>
          <button
            onClick={() => navigateTo('property_link')}
            className="text-[11px] font-bold text-municipal-blue hover:underline flex items-center gap-0.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'आईडी जोड़ें' : 'Add Property'}</span>
          </button>
        </div>

        {billState !== 'unlinked' ? (
          <div
            onClick={() => navigateTo('bill_summary')}
            className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200 cursor-pointer transition flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-mono font-bold text-slate-900">{propertyTax.taxId}</div>
              <div className="text-[10px] text-slate-500">{propertyTax.address}</div>
            </div>
            <Badge variant={billState === 'paid' ? 'success' : 'warning'}>
              {billState === 'paid' ? 'PAID' : 'DUE ₹150'}
            </Badge>
          </div>
        ) : (
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex justify-between items-center">
            <span>{language === 'hi' ? 'कोई संपत्ति लिंक नहीं है' : 'No property linked'}</span>
            <button
              onClick={() => navigateTo('property_link')}
              className="text-xs font-bold text-municipal-blue underline"
            >
              Link Now
            </button>
          </div>
        )}
      </div>

      {/* Navigation Menu List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden text-xs">
        <div
          onClick={() => navigateTo('passbook')}
          className="p-3.5 hover:bg-slate-50 cursor-pointer flex items-center justify-between transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-municipal-blue flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <span className="font-semibold text-slate-800">
              {language === 'hi' ? 'पासबुक और रसीदें' : 'Passbook & Payment Receipts'}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        <div
          onClick={() => navigateTo('saved_addresses')}
          className="p-3.5 hover:bg-slate-50 cursor-pointer flex items-center justify-between transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-eco-green flex items-center justify-center">
              <Bookmark className="w-4 h-4" />
            </div>
            <span className="font-semibold text-slate-800">
              {language === 'hi' ? 'सहेजे गए पते (Saved Addresses)' : 'Saved Addresses'}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        <div
          onClick={() => navigateTo('helpdesk')}
          className="p-3.5 hover:bg-slate-50 cursor-pointer flex items-center justify-between transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <span className="font-semibold text-slate-800">
              {language === 'hi' ? 'हेल्पडेस्क और सहायता' : 'Helpdesk & Support Desk'}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Project WISE & NERDS TSP Attribution Card */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-slate-100 p-1 flex items-center justify-center shrink-0 border border-slate-200">
            <img src="/wise_logo.png" alt="Project WISE" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-xs">Project WISE</div>
            <div className="text-[10px] text-emerald-700 font-semibold">Powered by NERDS (TSP)</div>
          </div>
        </div>
        <span className="text-[9px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-semibold border border-slate-200">
          IMC Authority
        </span>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full py-3 bg-red-50 hover:bg-red-100 text-action-red rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition border border-red-200"
      >
        <LogOut className="w-4 h-4" />
        <span>{language === 'hi' ? 'लॉग आउट (Reset Walkthrough)' : 'Log Out (Reset Prototype)'}</span>
      </button>
    </div>
  );
};

export default ProfileHomeScreen;
