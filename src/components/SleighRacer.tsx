import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface SleighRacerProps {
  onClose: () => void;
}

export default function SleighRacer({ onClose }: SleighRacerProps) {
  const [position, setPosition] = useState(50);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [time, setTime] = useState(30);

  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          setGameActive(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive]);

  useEffect(() => {
    if (!gameActive) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setPosition((p) => Math.max(0, p - 5));
      } else if (e.key === 'ArrowRight') {
        setPosition((p) => Math.min(100, p + 5));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameActive]);

  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      setScore((s) => s + 1);
    }, 500);

    return () => clearInterval(interval);
  }, [gameActive]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-blue-900 to-cyan-900 rounded-3xl p-8 max-w-2xl w-full border-2 border-white/20 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Sleigh Racer</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-black/40 rounded-2xl p-6 mb-6">
          <div className="h-32 bg-gradient-to-b from-blue-200 to-blue-400 rounded-lg relative overflow-hidden mb-4">
            <div
              className="absolute bottom-0 w-12 h-12 bg-red-500 rounded-full transition-all"
              style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
            >
              🛷
            </div>
            <div className="absolute top-0 left-0 right-0 h-full pointer-events-none flex items-center justify-around">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1 h-full bg-white/20" />
              ))}
            </div>
          </div>

          <p className="text-white text-center text-sm">Use Arrow Keys to steer</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm">Score</p>
            <p className="text-3xl font-bold text-yellow-400">{score}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm">Time</p>
            <p className="text-3xl font-bold text-cyan-400">{time}s</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm">Status</p>
            <p className={`text-xl font-bold ${gameActive ? 'text-green-400' : 'text-red-400'}`}>
              {gameActive ? 'Racing' : 'Finished'}
            </p>
          </div>
        </div>

        {!gameActive && (
          <div className="text-center mb-6">
            <p className="text-xl text-white font-bold">Final Score: {score}</p>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl transition-colors"
        >
          {gameActive ? 'Give Up' : 'Back to Games'}
        </button>
      </div>
    </div>
  );
}
