import { Navigation } from 'lucide-react';
import { Location } from '../types/santa';

interface MapVisualizationProps {
  currentLocation: Location;
  progress: number;
}

export default function MapVisualization({ currentLocation, progress }: MapVisualizationProps) {
  const normalizedLat = ((90 - currentLocation.lat) / 180) * 100;
  const normalizedLng = ((currentLocation.lng + 180) / 360) * 100;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-white">Journey Progress</h2>
          <span className="text-2xl font-bold text-yellow-400">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 transition-all duration-1000 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="relative w-full bg-gradient-to-b from-blue-900 to-blue-950 rounded-xl overflow-hidden border-2 border-white/20" style={{ height: '400px' }}>
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 500">
            <path
              d="M 50 250 Q 250 150, 450 250 T 850 250"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
            />
          </svg>
        </div>

        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out"
          style={{
            left: `${normalizedLng}%`,
            top: `${normalizedLat}%`
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75" style={{ width: '40px', height: '40px' }} />
            <div className="relative bg-gradient-to-br from-red-500 to-red-600 rounded-full p-3 shadow-2xl">
              <Navigation className="w-6 h-6 text-white" style={{ transform: 'rotate(45deg)' }} />
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
          <p className="text-white text-sm font-medium">Santa is flying over</p>
          <p className="text-yellow-400 text-lg font-bold">{currentLocation.city}</p>
        </div>
      </div>
    </div>
  );
}
