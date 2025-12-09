import { Gift, Gauge, MapPin, Clock } from 'lucide-react';
import { SantaStatus } from '../types/santa';
import StatCard from './StatCard';

interface StatsGridProps {
  status: SantaStatus;
}

export default function StatsGrid({ status }: StatsGridProps) {
  const stats = [
    {
      icon: Gift,
      label: 'Gifts Delivered',
      value: status.giftsDelivered.toLocaleString(),
      color: 'from-red-500 to-red-600'
    },
    {
      icon: MapPin,
      label: 'Distance Traveled',
      value: `${status.distanceTraveled.toLocaleString()} km`,
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Gauge,
      label: 'Current Speed',
      value: `${status.currentSpeed.toLocaleString()} km/h`,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Clock,
      label: 'Next Stop In',
      value: `${status.timeToNextStop} seconds`,
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
