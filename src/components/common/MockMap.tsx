import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Truck } from 'lucide-react';

interface MockMapProps {
  interactivePin?: boolean;
  showDriver?: boolean;
  showRadar?: boolean;
  onPinChange?: (lat: number, lng: number) => void;
  heightClass?: string;
  driverEta?: string;
}

const MockMap: React.FC<MockMapProps> = ({
  interactivePin = false,
  showDriver = true,
  showRadar = true,
  onPinChange,
  heightClass = 'h-48',
  driverEta = '3 mins',
}) => {
  const [pinPos, setPinPos] = useState({ x: 50, y: 55 });
  const [driverPos, setDriverPos] = useState({ x: 30, y: 70 });

  useEffect(() => {
    if (!showDriver) return;
    const interval = setInterval(() => {
      setDriverPos((prev) => {
        const dx = (pinPos.x - prev.x) * 0.05;
        const dy = (pinPos.y - prev.y) * 0.05;
        return { x: prev.x + dx, y: prev.y + dy };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showDriver, pinPos]);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactivePin) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPinPos({ x, y });
    if (onPinChange) onPinChange(22.75 + y * 0.001, 75.89 + x * 0.001);
  };

  return (
    <div
      onClick={handleMapClick}
      className={`relative w-full ${heightClass} bg-emerald-950/90 rounded-2xl overflow-hidden shadow-inner cursor-pointer select-none border border-emerald-800/40`}
    >
      <svg className="w-full h-full object-cover opacity-80" viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect x="5" y="5" width="40" height="35" fill="#064e3b" rx="2" opacity="0.6" />
        <rect x="50" y="5" width="45" height="35" fill="#064e3b" rx="2" opacity="0.6" />
        <rect x="5" y="45" width="40" height="50" fill="#064e3b" rx="2" opacity="0.6" />
        <rect x="50" y="45" width="45" height="50" fill="#064e3b" rx="2" opacity="0.6" />

        <path d="M 0,40 L 100,40" stroke="#059669" strokeWidth="4" opacity="0.8" />
        <path d="M 45,0 L 45,100" stroke="#059669" strokeWidth="4" opacity="0.8" />
        <path d="M 0,75 L 100,75" stroke="#047857" strokeWidth="2.5" opacity="0.6" />
        <path d="M 75,0 L 75,100" stroke="#047857" strokeWidth="2.5" opacity="0.6" />

        <path d="M 0,20 L 45,20" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2,2" opacity="0.5" />
        <path d="M 45,60 L 100,60" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2,2" opacity="0.5" />

        <rect
          x="3"
          y="3"
          width="94"
          height="94"
          fill="none"
          stroke="#10b981"
          strokeWidth="0.8"
          strokeDasharray="3,3"
        />
      </svg>

      <div className="absolute top-2 left-2 bg-emerald-950/80 backdrop-blur-md text-emerald-200 text-[10px] font-semibold px-2 py-1 rounded-md border border-emerald-700/60 flex items-center gap-1 shadow">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
        Vijay Nagar • Ward 34 Live Grid
      </div>

      <div
        style={{ left: `${pinPos.x}%`, top: `${pinPos.y}%` }}
        className="absolute -translate-x-1/2 -translate-y-full transition-all duration-300 z-20 group"
      >
        <div className="relative flex flex-col items-center">
          <div className="bg-municipal-blue text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg whitespace-nowrap mb-1 border border-white/40">
            {interactivePin ? 'Tap to move pin' : 'Pickup Location'}
          </div>
          <div className="w-8 h-8 rounded-full bg-municipal-blue/20 flex items-center justify-center animate-pulse">
            <MapPin className="w-6 h-6 text-municipal-blue fill-municipal-blue/40 drop-shadow-md" />
          </div>
        </div>
      </div>

      {showDriver && (
        <div
          style={{ left: `${driverPos.x}%`, top: `${driverPos.y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 z-30"
        >
          <div className="relative flex items-center justify-center">
            {showRadar && (
              <div className="absolute w-12 h-12 rounded-full bg-emerald-400/30 animate-ping"></div>
            )}
            <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-emerald-400">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div className="absolute top-full mt-1 bg-slate-900/90 text-emerald-300 text-[9px] font-bold px-1.5 py-0.5 rounded shadow border border-emerald-600 whitespace-nowrap">
              Van #42 • {driverEta}
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-md text-white text-[9px] px-2 py-1 rounded-md border border-slate-700 flex items-center gap-1.5 shadow">
        <Navigation className="w-3 h-3 text-emerald-400" />
        <span>GPS Signal Active</span>
      </div>
    </div>
  );
};

export default MockMap;
