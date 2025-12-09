import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const christmas = new Date(currentYear, 11, 25);

      if (now > christmas) {
        christmas.setFullYear(currentYear + 1);
      }

      const difference = christmas.getTime() - now.getTime();

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-red-500/20 via-green-500/20 to-red-500/20 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
      <div className="flex items-center justify-center mb-6">
        <Calendar className="w-6 h-6 text-yellow-400 mr-3" />
        <h2 className="text-2xl font-bold text-white">Countdown to Christmas</h2>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds }
        ].map((item) => (
          <div key={item.label} className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-2">
              <p className="text-4xl md:text-5xl font-bold text-white">
                {item.value.toString().padStart(2, '0')}
              </p>
            </div>
            <p className="text-gray-300 text-sm font-medium">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
