import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Target {
  id: number;
  x: number;
  hit: boolean;
}

interface SnowballTossProps {
  onClose: () => void;
}

export default function SnowballToss({ onClose }: SnowballTossProps) {
  const [angle, setAngle] = useState(45);
  const [power, setPower] = useState(50);
  const [targets, setTargets] = useState<Target[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [time, setTime] = useState(40);

  useEffect(() => {
    const initialTargets: Target[] = [
      { id: 1, x: 100, hit: false },
      { id: 2, x: 250, hit: false },
      { id: 3, x: 400, hit: false },
    ];
    setTargets(initialTargets);
  }, []);

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

  const handleThrow = () => {
    if (!gameActive) return;

    setAttempts((a) => a + 1);

    const hitDistance = 50;
    const centerX = (power / 100) * 450;

    setTargets((prev) =>
      prev.map((target) => {
        if (!target.hit && Math.abs(target.x - centerX) < hitDistance) {
          setScore((s) => s + 100);
          return { ...target, hit: true };
        }
        return target;
      })
    );

    setAngle(45);
    setPower(50);
  };

  const allHit = targets.every((t) => t.hit);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-cyan-900 to-blue-900 rounded-3xl p-8 max-w-2xl w-full border-2 border-white/20 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Snowball Toss</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-black/40 rounded-2xl p-6 mb-6">
          <div className="h-32 bg-gradient-to-b from-blue-200 to-white rounded-lg relative overflow-hidden mb-4">
            {targets.map((target) => (
              <div
                key={target.id}
                className={`absolute top-4 text-3xl transition-all ${
                  target.hit ? 'opacity-50' : ''
                }`}
                style={{ left: `${target.x}px` }}
              >
                {target.hit ? '✓' : '🎯'}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-white text-sm mb-2">Angle: {angle}°</p>
              <input
                type="range"
                min="0"
                max="90"
                value={angle}
                onChange={(e) => setAngle(parseInt(e.target.value))}
                disabled={!gameActive}
                className="w-full"
              />
            </div>

            <div>
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
              onClick={handleThrow}
              disabled={!gameActive}
              className={`w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors ${
                !gameActive ? 'opacity-50' : ''
              }`}
            >
              ❄️ Throw Snowball
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm">Score</p>
            <p className="text-3xl font-bold text-cyan-400">{score}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm">Attempts</p>
            <p className="text-3xl font-bold text-blue-400">{attempts}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm">Time</p>
            <p className="text-3xl font-bold text-white">{time}s</p>
          </div>
        </div>

        {allHit && gameActive && (
          <div className="text-center mb-4">
            <p className="text-lg text-green-400 font-bold">All targets hit!</p>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors"
        >
          {gameActive ? 'Quit' : 'Back to Games'}
        </button>
      </div>
    </div>
  );
}
