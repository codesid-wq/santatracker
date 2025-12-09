import { useState, useEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';

interface GiftCatcherProps {
  onClose: () => void;
}

interface Gift {
  id: number;
  x: number;
  y: number;
}

export default function GiftCatcher({ onClose }: GiftCatcherProps) {
  const [score, setScore] = useState(0);
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [basketX, setBasketX] = useState(50);
  const [gameActive, setGameActive] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const giftIdRef = useRef(0);

  useEffect(() => {
    const spawnGift = () => {
      if (!gameActive) return;
      const newGift = {
        id: giftIdRef.current++,
        x: Math.random() * 80 + 10,
        y: 0
      };
      setGifts((prev) => [...prev, newGift]);
    };

    const spawnInterval = setInterval(spawnGift, 800);
    return () => clearInterval(spawnInterval);
  }, [gameActive]);

  useEffect(() => {
    const moveGifts = () => {
      setGifts((prev) => {
        const updated = prev
          .map((gift) => ({ ...gift, y: gift.y + 2 }))
          .filter((gift) => {
            if (gift.y > 100) {
              if (Math.abs(gift.x - basketX) < 15) {
                setScore((s) => s + 10);
                return false;
              }
              return false;
            }
            return true;
          });
        return updated;
      });
    };

    const moveInterval = setInterval(moveGifts, 30);
    return () => clearInterval(moveInterval);
  }, [basketX]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      setBasketX(Math.max(10, Math.min(90, x)));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-slate-900 to-blue-900 rounded-3xl overflow-hidden max-w-2xl w-full border-2 border-white/20 shadow-2xl">
        <div className="bg-white/10 backdrop-blur-lg p-6 border-b border-white/20 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">Gift Catcher</h2>
            <p className="text-gray-300">Move your mouse to catch gifts!</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">Score</p>
            <p className="text-4xl font-bold text-yellow-400">{score}</p>
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative bg-gradient-to-b from-blue-400/30 to-blue-600/30 w-full h-96 overflow-hidden"
        >
          {gifts.map((gift) => (
            <div
              key={gift.id}
              className="absolute text-4xl animate-bounce"
              style={{
                left: `${gift.x}%`,
                top: `${gift.y}%`,
                transform: 'translateX(-50%)',
              }}
            >
              🎁
            </div>
          ))}

          <div
            className="absolute bottom-4 transition-all duration-75 flex flex-col items-center"
            style={{ left: `${basketX}%`, transform: 'translateX(-50%)' }}
          >
            <div className="text-2xl mb-1">👜</div>
            <div className="w-24 h-2 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 border-t border-white/20 flex gap-4">
          <button
            onClick={() => {
              setScore(0);
              setGifts([]);
              giftIdRef.current = 0;
            }}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
