import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Ornament {
  id: number;
  x: number;
  y: number;
}

interface OrnamentCollectorProps {
  onClose: () => void;
}

export default function OrnamentCollector({ onClose }: OrnamentCollectorProps) {
  const [basketX, setBasketX] = useState(window.innerWidth / 2 - 25);
  const [ornaments, setOrnaments] = useState<Ornament[]>([]);
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

    const spawnInterval = setInterval(() => {
      const newOrnament: Ornament = {
        id: Math.random(),
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth - 40 : 300),
        y: 0,
      };
      setOrnaments((prev) => [...prev, newOrnament]);
    }, 600);

    return () => clearInterval(spawnInterval);
  }, [gameActive]);

  useEffect(() => {
    if (!gameActive) return;

    const moveInterval = setInterval(() => {
      setOrnaments((prev) => {
        return prev
          .map((o) => ({ ...o, y: o.y + 5 }))
          .filter((o) => {
            if (o.y > 350) {
              if (Math.abs(o.x - basketX) < 50) {
                setScore((s) => s + 10);
                return false;
              }
              return false;
            }
            return true;
          });
      });
    }, 50);

    return () => clearInterval(moveInterval);
  }, [basketX, gameActive]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setBasketX(Math.max(0, Math.min(e.clientX - 25, (typeof window !== 'undefined' ? window.innerWidth : 400) - 50)));
    };

    if (gameActive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [gameActive]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-green-900 to-emerald-900 rounded-3xl p-8 max-w-2xl w-full border-2 border-white/20 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Ornament Collector</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-black/40 rounded-2xl overflow-hidden mb-6 relative h-80 bg-gradient-to-b from-blue-200 to-green-100">
          {ornaments.map((ornament) => (
            <div
              key={ornament.id}
              className="absolute text-3xl"
              style={{ left: `${ornament.x}px`, top: `${ornament.y}px` }}
            >
              🎄
            </div>
          ))}

          <div
            className="absolute bottom-0 text-4xl transition-all"
            style={{ left: `${basketX}px`, width: '50px' }}
          >
            🧺
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm">Score</p>
            <p className="text-3xl font-bold text-green-400">{score}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm">Time</p>
            <p className="text-3xl font-bold text-emerald-400">{time}s</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm">Ornaments</p>
            <p className="text-3xl font-bold text-yellow-400">{ornaments.length}</p>
          </div>
        </div>

        <p className="text-white text-center text-sm mb-4">Move mouse to control basket</p>

        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-colors"
        >
          {gameActive ? 'Quit' : 'Back to Games'}
        </button>
      </div>
    </div>
  );
}
