import { MapPin, Globe, Users } from 'lucide-react';
import { Location } from '../types/santa';

interface LocationCardProps {
  title: string;
  location: Location;
  type: 'current' | 'next';
}

export default function LocationCard({ title, location, type }: LocationCardProps) {
  const bgColor = type === 'current'
    ? 'bg-gradient-to-br from-red-500/20 to-red-600/20 border-red-500/30'
    : 'bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30';

  return (
    <div className={`${bgColor} backdrop-blur-lg rounded-2xl p-6 border shadow-xl`}>
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <MapPin className="w-5 h-5 mr-2" />
        {title}
      </h3>

      <div className="space-y-3">
        <div className="flex items-start">
          <Globe className="w-5 h-5 text-yellow-400 mt-1 mr-3 flex-shrink-0" />
          <div>
            <p className="text-2xl font-bold text-white">{location.city}</p>
            <p className="text-gray-300">{location.country}</p>
          </div>
        </div>

        <div className="flex items-center text-gray-300">
          <Users className="w-5 h-5 mr-3 text-yellow-400" />
          <span>{location.population.toLocaleString()} people</span>
        </div>

        <div className="pt-3 border-t border-white/10">
          <p className="text-sm text-gray-400">Coordinates</p>
          <p className="text-white font-mono text-sm">
            {location.lat.toFixed(4)}°, {location.lng.toFixed(4)}°
          </p>
        </div>
      </div>
    </div>
  );
}
