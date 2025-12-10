import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface CookieClickerProps {
  onClose: () => void;
}

export default function CookieClicker({ onClose }: CookieClickerProps) {
  const [clicks, setClicks] = useState(0);
  const [autoClicks, setAutoClicks] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [time, setTime] = useState(20);

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

    const autoClickInterval = setInterval(() => {
      setAutoClicks((a) => a + 1);
      setClicks((c) => c + Math.floor(c / 20) + 1);
    }, 2000);

    return () => clearInterval(autoClickInterval);
  }, [gameActive, clicks]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-amber-900 to-yellow-900 rounded-3xl p-8 max-w-2xl w-full border-2 border-white/20 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Cookie Clicker</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-black/40 rounded-2xl p-8 mb-6 flex flex-col items-center justify-center">
          <button
            onClick={() => gameActive && setClicks((c) => c + 1)}
            disabled={!gameActive}
            className={`text-8xl mb-4 transition-transform ${
              gameActive ? 'hover:scale-110 active:scale-95 cursor-pointer' : ''
            }`}
          >
            🍪
          </button>
          <p className="text-gray-300 text-sm text-center">Click the cookie!</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm">Clicks</p>
            <p className="text-3xl font-bold text-yellow-400">{clicks}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm">Auto Clicks</p>
            <p className="text-3xl font-bold text-orange-400">{autoClicks}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm">Time</p>
            <p className="text-3xl font-bold text-amber-400">{time}s</p>
          </div>
        </div>

        {!gameActive && (
          <div className="text-center mb-6">
            <p className="text-xl text-white font-bold">Total Score: {clicks + autoClicks * 10}</p>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-white font-semibold rounded-xl transition-colors"
        >
          {gameActive ? 'Quit' : 'Back to Games'}
        </button>
      </div>
    </div>
  );
}
