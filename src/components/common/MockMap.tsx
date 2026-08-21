import React, { useState, useEffect } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { MapPin, Navigation, Truck, Layers, Plus, Minus, Compass } from 'lucide-react';

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
  const [mapTheme, setMapTheme] = useState<'standard' | 'dark'>('standard');
  const [zoomLevel, setZoomLevel] = useState<number>(14);

  // Position coordinates mapped to chosen ward
  const wardDetailsMap: Record<string, { lat: number; lng: number; mainRoad: string; secondaryRoad: string; landmark: string }> = {
    'w1': { lat: 22.753, lng: 75.893, mainRoad: 'AB Road (BRTS Corridor)', secondaryRoad: 'Scheme 54 Arterial Road', landmark: 'Vijay Nagar Square / C21 Mall' },
    'w2': { lat: 22.723, lng: 75.882, mainRoad: 'Old Palasia Main Road', secondaryRoad: 'Janjeerwala Square', landmark: '56 Dukan Food Street' },
    'w3': { lat: 22.719, lng: 75.857, mainRoad: 'MG Road (Mahatma Gandhi Marg)', secondaryRoad: 'Subhash Marg', landmark: 'Rajwada Palace & Sarafa' },
    'w4': { lat: 22.698, lng: 75.834, mainRoad: 'Annapurna Road', secondaryRoad: 'Narendra Tiwari Marg', landmark: 'Annapurna Temple Square' },
    'w5': { lat: 22.712, lng: 75.890, mainRoad: 'Kanadia Road', secondaryRoad: 'Saket Main Street', landmark: 'Saket Club & Park' },
    'w6': { lat: 22.731, lng: 75.912, mainRoad: 'Khajrana Main Road', secondaryRoad: 'Ring Road Junction', landmark: 'Khajrana Ganesh Mandir' },
    'w7': { lat: 22.632, lng: 75.815, mainRoad: 'Bypass Highway NH-52', secondaryRoad: 'Rau Pithampur Road', landmark: 'Rau Circle' },
  };

  const currentWardData = wardDetailsMap[selectedWard.id] || wardDetailsMap['w1'];

  const [pinPos, setPinPos] = useState({ x: 50, y: 50 });
  const [driverPos, setDriverPos] = useState({ x: 30, y: 65 });

  useEffect(() => {
    if (!showDriver) return;
    const interval = setInterval(() => {
      setDriverPos((prev) => {
        const dx = (pinPos.x - prev.x) * 0.04;
        const dy = (pinPos.y - prev.y) * 0.04;
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
    if (onPinChange) {
      const computedLat = currentWardData.lat + (0.5 - y / 100) * 0.01;
      const computedLng = currentWardData.lng + (x / 100 - 0.5) * 0.01;
      onPinChange(computedLat, computedLng);
    }
  };

  const isDark = mapTheme === 'dark';

  return (
    <div
      onClick={handleMapClick}
      className={`relative w-full ${heightClass} rounded-2xl overflow-hidden shadow-inner cursor-pointer select-none border transition-colors duration-300 ${
        isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-300'
      }`}
    >
      {/* Real Map Visual Surface SVG */}
      <svg className="w-full h-full object-cover" viewBox="0 0 400 200" preserveAspectRatio="none">
        {/* Background land use blocks */}
        <rect width="400" height="200" fill={isDark ? '#0f172a' : '#f1f5f9'} />

        {/* Greenery / Park Area Blocks */}
        <path d="M 20 20 Q 60 10 90 40 T 110 90 T 50 110 Z" fill={isDark ? '#064e3b' : '#dcfce7'} opacity="0.6" />
        <path d="M 280 110 Q 320 80 370 120 T 360 180 T 300 170 Z" fill={isDark ? '#064e3b' : '#dcfce7'} opacity="0.6" />
        <path d="M 220 10 Q 260 5 310 30 T 290 70 T 240 50 Z" fill={isDark ? '#022c22' : '#e8f5e9'} opacity="0.7" />

        {/* Building Blocks simulation */}
        <rect x="130" y="25" width="40" height="25" rx="3" fill={isDark ? '#1e293b' : '#e2e8f0'} stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1" />
        <rect x="180" y="25" width="50" height="20" rx="3" fill={isDark ? '#1e293b' : '#e2e8f0'} stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1" />
        <rect x="130" y="60" width="30" height="35" rx="3" fill={isDark ? '#1e293b' : '#e2e8f0'} stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1" />
        <rect x="70" y="130" width="60" height="30" rx="3" fill={isDark ? '#1e293b' : '#e2e8f0'} stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1" />
        <rect x="150" y="130" width="50" height="40" rx="3" fill={isDark ? '#1e293b' : '#e2e8f0'} stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1" />

        {/* Secondary Inner Streets Grid */}
        <path d="M 0 45 L 400 45" stroke={isDark ? '#334155' : '#ffffff'} strokeWidth="4" />
        <path d="M 0 120 L 400 120" stroke={isDark ? '#334155' : '#ffffff'} strokeWidth="4" />
        <path d="M 120 0 L 120 200" stroke={isDark ? '#334155' : '#ffffff'} strokeWidth="4" />
        <path d="M 270 0 L 270 200" stroke={isDark ? '#334155' : '#ffffff'} strokeWidth="4" />
        <path d="M 0 165 L 400 165" stroke={isDark ? '#1e293b' : '#ffffff'} strokeWidth="2.5" />
        <path d="M 210 0 L 210 200" stroke={isDark ? '#1e293b' : '#ffffff'} strokeWidth="2.5" />

        {/* Main Arterial Road (High Visibility - e.g. AB Road / MG Road) */}
        <path d="M -10 100 Q 150 70 410 110" stroke={isDark ? '#3b82f6' : '#fbbf24'} strokeWidth="7" fill="none" />
        <path d="M -10 100 Q 150 70 410 110" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="5,4" fill="none" opacity="0.9" />

        {/* BRTS Corridor Lane (Orange Highlight) */}
        <path d="M 180 -10 Q 170 100 185 210" stroke={isDark ? '#10b981' : '#ef4444'} strokeWidth="6" fill="none" opacity="0.85" />

        {/* Road Names Labels */}
        <text x="210" y="85" fill={isDark ? '#94a3b8' : '#475569'} fontSize="7" fontStyle="italic" fontWeight="bold">
          {currentWardData.mainRoad}
        </text>
        <text x="30" y="115" fill={isDark ? '#94a3b8' : '#475569'} fontSize="6.5" fontWeight="bold">
          {currentWardData.secondaryRoad}
        </text>
      </svg>

      {/* Top Left: Ward GPS Location Badge */}
      <div className="absolute top-2 left-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-slate-100 text-[10px] font-bold px-2.5 py-1 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-1.5 shadow-md z-20">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
        <span>📍 {selectedWard.name}</span>
        <span className="text-slate-400 font-mono text-[9px]">({currentWardData.lat}, {currentWardData.lng})</span>
      </div>

      {/* Top Right: Map Layers & Controls Toggle */}
      <div className="absolute top-2 right-2 flex items-center gap-1 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMapTheme(isDark ? 'standard' : 'dark');
          }}
          className="bg-white/90 dark:bg-slate-900/90 hover:bg-white text-slate-700 dark:text-slate-200 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md transition"
          title="Switch Map Theme (Light/Dark)"
        >
          <Layers className="w-3.5 h-3.5 text-municipal-blue" />
        </button>

        <div className="flex flex-col bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setZoomLevel((prev) => Math.min(prev + 1, 18));
            }}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Zoom In"
          >
            <Plus className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setZoomLevel((prev) => Math.max(prev - 1, 10));
            }}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition border-t border-slate-200 dark:border-slate-800"
            title="Zoom Out"
          >
            <Minus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Target Pin Marker */}
      <div
        style={{ left: `${pinPos.x}%`, top: `${pinPos.y}%` }}
        className="absolute -translate-x-1/2 -translate-y-full transition-all duration-300 z-30 group"
      >
        <div className="relative flex flex-col items-center">
          <div className="bg-municipal-blue text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg whitespace-nowrap mb-0.5 border border-white">
            {interactivePin ? 'Tap to move pin' : currentWardData.landmark}
          </div>
          <div className="w-7 h-7 rounded-full bg-municipal-blue/20 flex items-center justify-center animate-bounce">
            <MapPin className="w-6 h-6 text-municipal-blue fill-municipal-blue/40 drop-shadow-md" />
          </div>
        </div>
      </div>

      {/* Live Fleet Tipper Van #42 Animated Vehicle */}
      {showDriver && (
        <div
          style={{ left: `${driverPos.x}%`, top: `${driverPos.y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 z-40"
        >
          <div className="relative flex items-center justify-center">
            {showRadar && (
              <div className="absolute w-12 h-12 rounded-full bg-emerald-500/30 animate-ping"></div>
            )}
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xl border-2 border-white ring-2 ring-emerald-400">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <div className="absolute top-full mt-1 bg-slate-900/95 text-emerald-300 text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow border border-emerald-500 whitespace-nowrap">
              Tipper #42 • {driverEta}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Floating Info Pill */}
      <div className="absolute bottom-2 left-2 bg-slate-900/90 backdrop-blur-md text-white text-[9.5px] font-bold px-2.5 py-1 rounded-xl border border-slate-700/80 flex items-center gap-1.5 shadow-md z-20">
        <Navigation className="w-3 h-3 text-emerald-400 animate-pulse" />
        <span>Indore Swachhata GIS Active • Zoom {zoomLevel}x</span>
      </div>
    </div>
  );
};

export default MockMap;
