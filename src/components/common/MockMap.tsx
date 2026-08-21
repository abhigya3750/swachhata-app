import React, { useState, useEffect } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { MapPin, Navigation, Truck, Compass, Layers } from 'lucide-react';

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
  const { selectedWard } = useAppState();

  const [pinPos, setPinPos] = useState({ x: 52, y: 48 });
  const [driverPos, setDriverPos] = useState({ x: 32, y: 68 });
  const [mapMode, setMapMode] = useState<'streets' | 'satellite'>('streets');

  // Update map coordinates based on chosen Ward
  useEffect(() => {
    if (selectedWard.id === 'w3') {
      // Rajwada (Ward 12)
      setPinPos({ x: 45, y: 55 });
      setDriverPos({ x: 25, y: 72 });
    } else if (selectedWard.id === 'w2') {
      // Palasia (Ward 22)
      setPinPos({ x: 58, y: 42 });
      setDriverPos({ x: 40, y: 60 });
    } else if (selectedWard.id === 'w4') {
      // Annapurna (Ward 45)
      setPinPos({ x: 38, y: 65 });
      setDriverPos({ x: 20, y: 80 });
    } else {
      // Default Vijay Nagar (Ward 34)
      setPinPos({ x: 52, y: 48 });
      setDriverPos({ x: 32, y: 68 });
    }
  }, [selectedWard]);

  // Driver animated movement simulation towards destination pin
  useEffect(() => {
    if (!showDriver) return;
    const interval = setInterval(() => {
      setDriverPos((prev) => {
        const dx = (pinPos.x - prev.x) * 0.04;
        const dy = (pinPos.y - prev.y) * 0.04;
        return { x: prev.x + dx, y: prev.y + dy };
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [showDriver, pinPos]);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactivePin) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPinPos({ x, y });
    if (onPinChange) {
      const baseLat = selectedWard.lat || 22.753;
      const baseLng = selectedWard.lng || 75.893;
      onPinChange(baseLat + (y - 50) * 0.0003, baseLng + (x - 50) * 0.0003);
    }
  };

  return (
    <div
      onClick={handleMapClick}
      className={`relative w-full ${heightClass} rounded-2xl overflow-hidden shadow-inner cursor-pointer select-none border border-slate-300 transition-all ${
        mapMode === 'satellite' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-800'
      }`}
    >
      {/* Realistic Vector Map Layers */}
      <svg className="w-full h-full object-cover" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="gridPattern" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke={mapMode === 'satellite' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'} strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* Map Background */}
        <rect width="100" height="100" fill={mapMode === 'satellite' ? '#0f172a' : '#f1f5f9'} />
        <rect width="100" height="100" fill="url(#gridPattern)" />

        {/* Green Belt & Parks (Indore Meghdoot Garden / Regional Park) */}
        <path d="M 65 15 Q 75 10 85 25 Q 90 40 75 45 Z" fill={mapMode === 'satellite' ? '#064e3b' : '#dcfce7'} opacity="0.8" />
        <path d="M 10 70 Q 20 60 30 75 Q 25 90 12 85 Z" fill={mapMode === 'satellite' ? '#064e3b' : '#dcfce7'} opacity="0.8" />

        {/* Khan River / Saraswati Stream Vector */}
        <path d="M 0 30 Q 30 50 60 40 T 100 80" fill="none" stroke={mapMode === 'satellite' ? '#0284c7' : '#93c5fd'} strokeWidth="2.5" />

        {/* Major Indore Arterial Highways (AB Road, Ring Road, BRTS Corridor) */}
        {/* AB Road */}
        <path d="M 10 0 Q 40 40 90 100" fill="none" stroke={mapMode === 'satellite' ? '#f59e0b' : '#fbbf24'} strokeWidth="4" opacity="0.9" />
        {/* BRTS Lane */}
        <path d="M 10 0 Q 40 40 90 100" fill="none" stroke="#2563eb" strokeWidth="1" strokeDasharray="1.5,1.5" />

        {/* Ring Road */}
        <path d="M 0 60 Q 50 20 100 50" fill="none" stroke={mapMode === 'satellite' ? '#64748b' : '#cbd5e1'} strokeWidth="3" />
        
        {/* Local Sector Grid Lanes */}
        <path d="M 20 10 L 80 10 M 20 30 L 80 30 M 20 70 L 90 70" stroke={mapMode === 'satellite' ? '#334155' : '#e2e8f0'} strokeWidth="1" />
        <path d="M 30 10 L 30 90 M 60 10 L 60 90 M 80 10 L 80 90" stroke={mapMode === 'satellite' ? '#334155' : '#e2e8f0'} strokeWidth="1" />

        {/* Route Vector Line from Driver to Pin */}
        {showDriver && (
          <path
            d={`M ${driverPos.x} ${driverPos.y} Q ${(driverPos.x + pinPos.x) / 2} ${(driverPos.y + pinPos.y) / 2 + 5} ${pinPos.x} ${pinPos.y}`}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeDasharray="2,2"
          />
        )}
      </svg>

      {/* Ward Location Header Badge */}
      <div className="absolute top-2 left-2 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 text-[10.5px] font-bold px-2.5 py-1 rounded-xl border border-slate-200 shadow-md flex items-center gap-1.5 z-10">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
        <span className="truncate max-w-[170px]">{selectedWard.name}</span>
        <span className="text-[9px] text-slate-400 font-normal">({selectedWard.landmark || 'Indore'})</span>
      </div>

      {/* Map Satellite / Street Toggle */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setMapMode(mapMode === 'streets' ? 'satellite' : 'streets');
        }}
        className="absolute top-2 right-2 bg-white/95 text-slate-700 hover:bg-slate-100 p-1.5 rounded-xl border border-slate-200 shadow-md z-10 transition"
        title="Toggle Map View"
      >
        <Layers className="w-3.5 h-3.5" />
      </button>

      {/* Destination Pin Marker */}
      <div
        style={{ left: `${pinPos.x}%`, top: `${pinPos.y}%` }}
        className="absolute -translate-x-1/2 -translate-y-full transition-all duration-300 z-20"
      >
        <div className="relative flex flex-col items-center">
          <div className="bg-municipal-blue text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg whitespace-nowrap mb-1 border border-white/40">
            {interactivePin ? 'Tap map to place pin' : 'Collection Point'}
          </div>
          <div className="w-8 h-8 rounded-full bg-municipal-blue/20 flex items-center justify-center animate-pulse">
            <MapPin className="w-6 h-6 text-municipal-blue fill-municipal-blue/40 drop-shadow-md" />
          </div>
        </div>
      </div>

      {/* Live Tipper Driver Marker */}
      {showDriver && (
        <div
          style={{ left: `${driverPos.x}%`, top: `${driverPos.y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 z-30"
        >
          <div className="relative flex items-center justify-center">
            {showRadar && (
              <div className="absolute w-11 h-11 rounded-full bg-emerald-500/30 animate-ping"></div>
            )}
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-emerald-400">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <div className="absolute top-full mt-1 bg-slate-900/90 text-emerald-300 text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow border border-emerald-600 whitespace-nowrap">
              Van #42 • {driverEta}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Compass Indicator */}
      <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-md text-slate-700 text-[9px] px-2 py-1 rounded-lg border border-slate-200 flex items-center gap-1 shadow-sm font-mono z-10">
        <Compass className="w-3 h-3 text-municipal-blue" />
        <span>Indore GPS Live</span>
      </div>
    </div>
  );
};

export default MockMap;
