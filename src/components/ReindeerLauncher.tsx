import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ReindeerLauncherProps {
  onClose: () => void;
}

export default function ReindeerLauncher({ onClose }: ReindeerLauncherProps) {
  const [power, setPower] = useState(50);
  const [height, setHeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [launches, setLaunches] = useState(0);
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

  const handleLaunch = () => {
    if (!gameActive) return;
    const calculatedHeight = (power / 100) * 300;
    setHeight(calculatedHeight);
    setMaxHeight(Math.max(maxHeight, calculatedHeight));
    setLaunches((l) => l + 1);
    setPower(50);

    setTimeout(() => setHeight(0), 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-red-900 to-brown-900 rounded-3xl p-8 max-w-2xl w-full border-2 border-white/20 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Reindeer Launcher</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-black/40 rounded-2xl p-6 mb-6">
          <div className="h-40 bg-gradient-to-b from-blue-300 to-blue-100 rounded-lg relative overflow-hidden mb-4">
            <div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-4xl transition-all duration-300"
              style={{ bottom: `${height}px` }}
            >
              🦌
            </div>
          </div>

          <div className="mb-4">
            <p className="text-white text-sm mb-2">Power: {power}%</p>
            <input
              type="range"
              min="0"
              max="100"
              value={power}
              onChange={(e) => setPower(parseInt(e.target.value))}
              disabled={!gameActive}
              className="w-full"
            />
          </div>

          <button
            onClick={handleLaunch}
            disabled={!gameActive}
            className={`w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-colors ${
              !gameActive ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            🚀 Launch
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm">Launches</p>
            <p className="text-3xl font-bold text-red-400">{launches}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm">Max Height</p>
            <p className="text-2xl font-bold text-yellow-400">{Math.round(maxHeight)}px</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm">Time</p>
            <p className="text-3xl font-bold text-cyan-400">{time}s</p>
          </div>
        </div>

        {!gameActive && (
          <div className="text-center mb-6">
            <p className="text-xl text-white font-bold">Best Launch: {Math.round(maxHeight)}px</p>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-colors"
        >
          {gameActive ? 'Quit' : 'Back to Games'}
        </button>
      </div>
    </div>
  );
}
