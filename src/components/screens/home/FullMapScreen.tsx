import React from 'react';
import { useAppState } from '../../../context/AppStateContext';
import MockMap from '../../common/MockMap';
import { Badge } from '../../common/Badge';
import { MOCK_DRIVER_DATA } from '../../../data/mockData';
import { ArrowLeft, Phone } from 'lucide-react';

const FullMapScreen: React.FC = () => {
  const { language, goBack, selectedWard } = useAppState();

  return (
    <div className="flex-1 bg-slate-900 text-white flex flex-col justify-between relative">
      <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between">
        <button
          onClick={goBack}
          className="w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur text-white flex items-center justify-center border border-slate-700 shadow-lg min-h-touch min-w-touch"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="bg-slate-900/90 backdrop-blur text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-500/40 shadow-lg flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{selectedWard.name}</span>
        </div>
      </div>

      <div className="flex-1 relative">
        <MockMap heightClass="h-full" showDriver={true} showRadar={true} driverEta="3 mins" wardId={selectedWard.id} />
      </div>

      <div className="bg-white text-slate-800 rounded-t-3xl p-4 shadow-2xl border-t border-slate-200 z-30 space-y-3">
        <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-1"></div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={MOCK_DRIVER_DATA.driverPhoto}
              alt={MOCK_DRIVER_DATA.driverName}
              className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-md"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-slate-900">{MOCK_DRIVER_DATA.driverName}</h3>
                <Badge variant="success">★ {MOCK_DRIVER_DATA.rating}</Badge>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{MOCK_DRIVER_DATA.vehicleNumber}</p>
            </div>
          </div>

          <a
            href={`tel:${MOCK_DRIVER_DATA.driverPhone}`}
            className="w-11 h-11 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg min-h-touch min-w-touch"
          >
            <Phone className="w-5 h-5 fill-current" />
          </a>
        </div>

        <div className="p-2.5 bg-slate-100 rounded-xl flex items-center justify-between text-xs">
          <span className="text-slate-600 font-medium">
            {language === 'hi' ? 'अनुमानित आगमन समय' : 'Estimated Arrival'}
          </span>
          <span className="font-bold text-emerald-700">~ 3 Mins (250m away)</span>
        </div>
      </div>
    </div>
  );
};

export default FullMapScreen;
