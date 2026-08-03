import React from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { Button } from '../../common/Button';
import { Badge } from '../../common/Badge';
import { CheckCircle2, Clock, MapPin, ArrowRight } from 'lucide-react';

const ComplaintConfirmScreen: React.FC = () => {
  const { language, navigateTo, screenParams } = useAppState();
  const ticket = screenParams?.ticket || {
    ticketId: '#IMC-ORD-8832',
    categoryTitle: 'Garbage Truck Missed',
    categoryTitleHi: 'कचरा गाड़ी नहीं आई',
    wardName: 'Vijay Nagar (Ward 34)',
    address: 'Scheme 54, Vijay Nagar, Indore',
    createdAt: 'Just now',
    slaHours: 48,
  };

  return (
    <div className="flex-1 bg-slate-50 p-5 flex flex-col justify-between items-center text-center">
      <div className="w-full space-y-4 pt-4">
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-75"></div>
          <div className="relative w-20 h-20 rounded-full bg-eco-green text-white flex items-center justify-center shadow-xl border-4 border-white">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>
        </div>

        <div>
          <Badge variant="success" className="mb-2">
            {language === 'hi' ? 'शिकायत सफलता पूर्वक दर्ज हुई' : 'Complaint Successfully Registered'}
          </Badge>

          <h2 className="text-2xl font-black text-slate-900 tracking-tight font-mono">
            {ticket.ticketId}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'hi'
              ? 'आपकी शिकायत संबंधित वार्ड सुपरवाइजर को भेज दी गई है'
              : 'Your complaint has been logged and dispatched to Ward 34 Inspector'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-left space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100 text-xs">
            <span className="text-slate-500 font-medium">{language === 'hi' ? 'श्रेणी' : 'Category'}</span>
            <span className="font-bold text-slate-800">
              {language === 'hi' ? ticket.categoryTitleHi : ticket.categoryTitle}
            </span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-slate-100 text-xs">
            <span className="text-slate-500 font-medium">{language === 'hi' ? 'स्थान' : 'Ward / Location'}</span>
            <span className="font-bold text-slate-800 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-municipal-blue" />
              <span>{ticket.wardName}</span>
            </span>
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-slate-800 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-municipal-blue" />
                <span>{language === 'hi' ? 'निगम एसएलए समयसीमा' : 'Municipal SLA Guarantee'}</span>
              </span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                {ticket.slaHours} Hours Max
              </span>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-3 p-0.5 border border-slate-200 relative overflow-hidden">
              <div className="bg-gradient-to-r from-municipal-blue to-emerald-500 h-full rounded-full w-1/4 animate-pulse"></div>
            </div>

            <div className="flex justify-between text-[10px] text-slate-400 mt-1.5 font-medium">
              <span>Logged (Now)</span>
              <span>Supervisor Inspection</span>
              <span>Resolved (48h)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full pt-4 space-y-2">
        <Button variant="primary" onClick={() => navigateTo('home')}>
          <span>{language === 'hi' ? 'मुख्य पृष्ठ पर लौटें' : 'Back to Home'}</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ComplaintConfirmScreen;
