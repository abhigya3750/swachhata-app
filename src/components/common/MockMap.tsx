import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Truck } from 'lucide-react';

// Indore-specific ward configurations for realistic simulation
const WARD_MAP_CONFIG: Record<string, {
  label: string;
  streets: string[];
  landmarks: { label: string; x: number; y: number; color: string }[];
  vanRoute: { x: number; y: number }[];
  pinDefault: { x: number; y: number };
}> = {
  'w1': {
    label: 'Vijay Nagar • Ward 34',
    streets: ['Scheme 54 Main', 'AB Rd', 'Bypass Rd', 'Ring Rd'],
    landmarks: [
      { label: 'D-Mart', x: 30, y: 28, color: '#1e40af' },
      { label: 'BIG Bazaar', x: 62, y: 22, color: '#166534' },
      { label: 'BRTS Stop', x: 50, y: 55, color: '#7c3aed' },
      { label: 'Scheme 54', x: 22, y: 68, color: '#b45309' },
    ],
    vanRoute: [{ x: 8, y: 35 }, { x: 22, y: 55 }, { x: 38, y: 60 }, { x: 50, y: 55 }],
    pinDefault: { x: 55, y: 60 },
  },
  'w2': {
    label: 'Palasia • Ward 22',
    streets: ['Palasia Square', 'MG Rd', 'AB Rd', 'Race Course'],
    landmarks: [
      { label: 'Palasia Sq', x: 45, y: 45, color: '#1e40af' },
      { label: '56 Dukan', x: 65, y: 35, color: '#166534' },
      { label: 'Race Course', x: 20, y: 60, color: '#7c3aed' },
      { label: 'MG Rd', x: 55, y: 70, color: '#b45309' },
    ],
    vanRoute: [{ x: 10, y: 25 }, { x: 25, y: 42 }, { x: 40, y: 50 }, { x: 45, y: 45 }],
    pinDefault: { x: 52, y: 55 },
  },
  'w3': {
    label: 'Rajwada • Ward 12',
    streets: ['Rajwada Rd', 'Sarafa Bazar', 'Chhatris', 'Cloth Market'],
    landmarks: [
      { label: 'Rajwada', x: 48, y: 42, color: '#1e40af' },
      { label: 'Sarafa', x: 65, y: 28, color: '#d97706' },
      { label: 'Cloth Mkt', x: 25, y: 55, color: '#166534' },
      { label: 'Chhatris', x: 70, y: 62, color: '#7c3aed' },
    ],
    vanRoute: [{ x: 10, y: 65 }, { x: 25, y: 55 }, { x: 38, y: 48 }, { x: 48, y: 42 }],
    pinDefault: { x: 55, y: 50 },
  },
  'w4': {
    label: 'Annapurna • Ward 45',
    streets: ['Annapurna Rd', 'Tilak Nagar', 'Sukhliya', 'Tejaji Nagar'],
    landmarks: [
      { label: 'Annapurna', x: 42, y: 38, color: '#b45309' },
      { label: 'Tilak Ngr', x: 65, y: 25, color: '#166534' },
      { label: 'Sukhliya', x: 22, y: 58, color: '#1e40af' },
      { label: 'Hospital', x: 68, y: 65, color: '#dc2626' },
    ],
    vanRoute: [{ x: 12, y: 30 }, { x: 28, y: 45 }, { x: 40, y: 40 }, { x: 42, y: 38 }],
    pinDefault: { x: 50, y: 50 },
  },
  'w5': {
    label: 'Saket Nagar • Ward 28',
    streets: ['Saket Nagar', 'Banganga', 'Bhanwarkua', 'Nanda Nagar'],
    landmarks: [
      { label: 'Saket Sq', x: 48, y: 45, color: '#1e40af' },
      { label: 'Bhanwarkua', x: 25, y: 30, color: '#166534' },
      { label: 'Nanda Ngr', x: 68, y: 28, color: '#7c3aed' },
      { label: 'Park', x: 30, y: 65, color: '#15803d' },
    ],
    vanRoute: [{ x: 8, y: 55 }, { x: 20, y: 48 }, { x: 35, y: 45 }, { x: 48, y: 45 }],
    pinDefault: { x: 55, y: 55 },
  },
  'w6': {
    label: 'Khajrana • Ward 39',
    streets: ['Khajrana Sq', 'Kanadia Rd', 'New Palasia', 'Bhawarkua'],
    landmarks: [
      { label: 'Khajrana', x: 45, y: 40, color: '#d97706' },
      { label: 'Kanadia Rd', x: 20, y: 28, color: '#1e40af' },
      { label: 'Masjid', x: 68, y: 35, color: '#166534' },
      { label: 'Garden', x: 28, y: 68, color: '#15803d' },
    ],
    vanRoute: [{ x: 10, y: 20 }, { x: 22, y: 38 }, { x: 38, y: 42 }, { x: 45, y: 40 }],
    pinDefault: { x: 55, y: 52 },
  },
  'w7': {
    label: 'Rau • Ward 52',
    streets: ['Rau Road', 'MR-10', 'Super Corridor', 'Dewas Naka'],
    landmarks: [
      { label: 'Rau Chowk', x: 45, y: 45, color: '#1e40af' },
      { label: 'MR-10', x: 65, y: 30, color: '#166534' },
      { label: 'Sup. Corr.', x: 72, y: 55, color: '#7c3aed' },
      { label: 'College', x: 22, y: 62, color: '#b45309' },
    ],
    vanRoute: [{ x: 8, y: 60 }, { x: 22, y: 52 }, { x: 35, y: 48 }, { x: 45, y: 45 }],
    pinDefault: { x: 52, y: 55 },
  },
};

const DEFAULT_CONFIG = WARD_MAP_CONFIG['w1'];

interface MockMapProps {
  interactivePin?: boolean;
  showDriver?: boolean;
  showRadar?: boolean;
  onPinChange?: (lat: number, lng: number) => void;
  heightClass?: string;
  driverEta?: string;
  wardId?: string;
}

const MockMap: React.FC<MockMapProps> = ({
  interactivePin = false,
  showDriver = true,
  showRadar = true,
  onPinChange,
  heightClass = 'h-48',
  driverEta = '3 mins',
  wardId = 'w1',
}) => {
  const config = WARD_MAP_CONFIG[wardId] || DEFAULT_CONFIG;
  const [pinPos, setPinPos] = useState(config.pinDefault);
  const [driverPos, setDriverPos] = useState(config.vanRoute[0]);
  const [routeStep, setRouteStep] = useState(0);

  // Update pin position when ward changes
  useEffect(() => {
    setPinPos(config.pinDefault);
    setDriverPos(config.vanRoute[0]);
    setRouteStep(0);
  }, [wardId]);

  // Animate driver along ward-specific route
  useEffect(() => {
    if (!showDriver) return;
    const interval = setInterval(() => {
      setRouteStep((prev) => {
        const next = (prev + 1) % config.vanRoute.length;
        setDriverPos(config.vanRoute[next]);
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [showDriver, wardId, config.vanRoute]);

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
      className={`relative w-full ${heightClass} rounded-2xl overflow-hidden shadow-inner cursor-pointer select-none border border-slate-300`}
      style={{ background: '#e8f0e8' }}
    >
      {/* Realistic Indore City Map SVG */}
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Base map background - light grey/beige like real maps */}
        <rect x="0" y="0" width="100" height="100" fill="#eae6df" />

        {/* Green parks / open areas */}
        <rect x="3" y="55" width="14" height="12" fill="#b8d8a0" rx="2" opacity="0.9" />
        <rect x="72" y="62" width="12" height="10" fill="#c4dda8" rx="2" opacity="0.9" />
        <rect x="35" y="5" width="20" height="10" fill="#b8d8a0" rx="2" opacity="0.85" />
        <ellipse cx="85" cy="20" rx="9" ry="6" fill="#c4dda8" opacity="0.85" />

        {/* Water body (simulating Bilawali Lake / Sirpur) */}
        <ellipse cx="10" cy="15" rx="7" ry="5" fill="#b0d4e8" opacity="0.85" />
        <text x="10" y="16" fontSize="3.2" fill="#1e6fa0" textAnchor="middle" fontWeight="bold">Lake</text>

        {/* Building blocks */}
        <rect x="20" y="20" width="12" height="10" fill="#d4cfc8" rx="1" opacity="0.9" />
        <rect x="36" y="20" width="10" height="9" fill="#d8d2ca" rx="1" opacity="0.9" />
        <rect x="52" y="18" width="14" height="11" fill="#d4cfc8" rx="1" opacity="0.9" />
        <rect x="20" y="68" width="10" height="9" fill="#d4cfc8" rx="1" opacity="0.9" />
        <rect x="38" y="70" width="12" height="8" fill="#d8d2ca" rx="1" opacity="0.9" />
        <rect x="58" y="68" width="14" height="10" fill="#d4cfc8" rx="1" opacity="0.9" />
        <rect x="78" y="38" width="12" height="18" fill="#ccc7be" rx="1" opacity="0.9" />
        <rect x="4" y="30" width="10" height="18" fill="#d4cfc8" rx="1" opacity="0.9" />

        {/* Main arterial roads (wide/orange like Google Maps) */}
        {/* Horizontal main roads */}
        <rect x="0" y="44" width="100" height="5" fill="#f5c77a" opacity="0.95" />
        {/* Vertical main roads */}
        <rect x="47" y="0" width="5" height="100" fill="#f5c77a" opacity="0.95" />

        {/* Secondary roads */}
        <rect x="0" y="32" width="47" height="2.5" fill="#ffffff" opacity="0.9" />
        <rect x="52" y="32" width="48" height="2.5" fill="#ffffff" opacity="0.9" />
        <rect x="0" y="65" width="47" height="2.5" fill="#ffffff" opacity="0.9" />
        <rect x="52" y="65" width="48" height="2.5" fill="#ffffff" opacity="0.9" />

        <rect x="25" y="0" width="2.5" height="44" fill="#ffffff" opacity="0.9" />
        <rect x="25" y="49" width="2.5" height="51" fill="#ffffff" opacity="0.9" />
        <rect x="70" y="0" width="2.5" height="44" fill="#ffffff" opacity="0.9" />
        <rect x="70" y="49" width="2.5" height="51" fill="#ffffff" opacity="0.9" />

        {/* Lane / sub-roads (thin, white) */}
        <line x1="0" y1="20" x2="25" y2="20" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" />
        <line x1="52" y1="20" x2="70" y2="20" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" />
        <line x1="52" y1="55" x2="70" y2="55" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" />
        <line x1="0" y1="80" x2="25" y2="80" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" />
        <line x1="52" y1="80" x2="70" y2="80" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" />
        <line x1="8" y1="49" x2="8" y2="65" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" />
        <line x1="35" y1="49" x2="35" y2="65" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" />
        <line x1="60" y1="49" x2="60" y2="65" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" />
        <line x1="85" y1="49" x2="85" y2="65" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" />

        {/* Road centerlines (dashes for main road) */}
        <line x1="0" y1="46.5" x2="47" y2="46.5" stroke="#e8a830" strokeWidth="0.5" strokeDasharray="3,2" opacity="0.7" />
        <line x1="52" y1="46.5" x2="100" y2="46.5" stroke="#e8a830" strokeWidth="0.5" strokeDasharray="3,2" opacity="0.7" />
        <line x1="49.5" y1="0" x2="49.5" y2="44" stroke="#e8a830" strokeWidth="0.5" strokeDasharray="3,2" opacity="0.7" />
        <line x1="49.5" y1="49" x2="49.5" y2="100" stroke="#e8a830" strokeWidth="0.5" strokeDasharray="3,2" opacity="0.7" />

        {/* Street labels */}
        <text x="50" y="43" fontSize="2.8" fill="#8a6a20" textAnchor="middle" fontWeight="bold">{config.streets[0]}</text>
        <text x="50" y="52" fontSize="2.8" fill="#8a6a20" textAnchor="middle" fontWeight="bold">{config.streets[1]}</text>
        <text x="44" y="28" fontSize="2.5" fill="#8a6a20" textAnchor="middle" transform="rotate(-90,44,28)">{config.streets[2]}</text>
        <text x="73" y="28" fontSize="2.5" fill="#8a6a20" textAnchor="middle" transform="rotate(-90,73,28)">{config.streets[3]}</text>

        {/* Landmarks with colored dots */}
        {config.landmarks.map((lm, i) => (
          <g key={i}>
            <circle cx={lm.x} cy={lm.y} r="2.5" fill={lm.color} opacity="0.85" />
            <text x={lm.x} y={lm.y - 3.5} fontSize="2.8" fill={lm.color} textAnchor="middle" fontWeight="bold">{lm.label}</text>
          </g>
        ))}

        {/* Route path the van takes (dotted green line) */}
        {config.vanRoute.length > 1 && (
          <polyline
            points={config.vanRoute.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="#16a34a"
            strokeWidth="1.5"
            strokeDasharray="3,2"
            opacity="0.8"
          />
        )}
      </svg>

      {/* Ward Label Overlay (top-left) */}
      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-blue-800 text-[10px] font-bold px-2 py-1 rounded-lg border border-blue-200 flex items-center gap-1 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0"></span>
        {config.label}
      </div>

      {/* Home Pin */}
      <div
        style={{ left: `${pinPos.x}%`, top: `${pinPos.y}%` }}
        className="absolute -translate-x-1/2 -translate-y-full transition-all duration-300 z-20 group"
      >
        <div className="relative flex flex-col items-center">
          <div className="bg-blue-700 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg whitespace-nowrap mb-1 border border-white/40">
            {interactivePin ? 'Tap to move pin' : 'Your Location'}
          </div>
          <div className="w-7 h-7 rounded-full bg-blue-600/20 flex items-center justify-center animate-pulse">
            <MapPin className="w-5 h-5 text-blue-700 fill-blue-200 drop-shadow-md" />
          </div>
        </div>
      </div>

      {/* Vehicle Marker */}
      {showDriver && (
        <div
          style={{ left: `${driverPos.x}%`, top: `${driverPos.y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-1500 ease-in-out z-30"
        >
          <div className="relative flex items-center justify-center">
            {showRadar && (
              <div className="absolute w-10 h-10 rounded-full bg-emerald-400/25 animate-ping"></div>
            )}
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-emerald-400">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <div className="absolute top-full mt-1 bg-slate-900/90 text-emerald-300 text-[9px] font-bold px-1.5 py-0.5 rounded shadow border border-emerald-600 whitespace-nowrap">
              Van #42 • {driverEta}
            </div>
          </div>
        </div>
      )}

      {/* GPS Signal Badge (bottom-right) */}
      <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm text-slate-700 text-[9px] px-2 py-1 rounded-lg border border-slate-200 flex items-center gap-1.5 shadow-sm">
        <Navigation className="w-3 h-3 text-emerald-600" />
        <span className="font-semibold">GPS Live</span>
      </div>
    </div>
  );
};

export default MockMap;
