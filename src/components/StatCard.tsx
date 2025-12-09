import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
}

export default function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:scale-105 transition-transform duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-300 text-sm font-medium mb-2">{label}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <div className={`bg-gradient-to-br ${color} p-3 rounded-xl`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}
