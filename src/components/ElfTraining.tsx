import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ElfTrainingProps {
  onClose: () => void;
}

export default function ElfTraining({ onClose }: ElfTrainingProps) {
  const colors = ['red', 'blue', 'green', 'yellow'];
  const [targetColor, setTargetColor] = useState('red');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
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

    const interval = setInterval(() => {
      setTargetColor(colors[Math.floor(Math.random() * colors.length)]);
      setStreak(0);
    }, 1500);

    return () => clearInterval(interval);
  }, [gameActive]);

  const handleColor = (color: string) => {
    if (!gameActive) return;

    if (color === targetColor) {
      setScore((s) => s + 10);
      setStreak((st) => st + 1);
    } else {
      setStreak(0);
    }
  };

  const colorMap = {
    red: 'bg-red-500 hover:bg-red-400',
    blue: 'bg-blue-500 hover:bg-blue-400',
    green: 'bg-green-500 hover:bg-green-400',
    yellow: 'bg-yellow-500 hover:bg-yellow-400',
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-8 max-w-2xl w-full border-2 border-white/20 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Elf Training</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-black/40 rounded-2xl p-8 mb-6 text-center">
          <p className="text-gray-300 text-sm mb-4">Click the target color:</p>
          <div
            className={`w-32 h-32 rounded-full mx-auto mb-4 transition-all ${
              colorMap[targetColor as keyof typeof colorMap]
            }`}
          />
          <p className="text-white text-xl font-bold capitalize">{targetColor}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => handleColor(color)}
              disabled={!gameActive}
              className={`py-4 rounded-xl font-bold text-white transition-all active:scale-95 ${
                colorMap[color as keyof typeof colorMap]
              } ${!gameActive ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm">Score</p>
            <p className="text-3xl font-bold text-purple-400">{score}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm">Streak</p>
            <p className="text-3xl font-bold text-yellow-400">{streak}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm">Time</p>
            <p className="text-3xl font-bold text-indigo-400">{time}s</p>
          </div>
        </div>

        {!gameActive && (
          <div className="text-center mb-6">
            <p className="text-xl text-white font-bold">Final Score: {score}</p>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-colors"
        >
          {gameActive ? 'Quit' : 'Back to Games'}
        </button>
      </div>
    </div>
  );
}
