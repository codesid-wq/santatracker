import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ChimneyJumpProps {
  onClose: () => void;
}

export default function ChimneyJump({ onClose }: ChimneyJumpProps) {
  const [santaY, setSantaY] = useState(300);
  const [velocity, setVelocity] = useState(0);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [obstacles, setObstacles] = useState<number[]>([0]);

  const GRAVITY = 0.6;
  const JUMP_POWER = -12;
  const GROUND = 300;

  useEffect(() => {
    if (!gameActive) return;

    const gameLoop = setInterval(() => {
      setSantaY((y) => {
        let newY = y + velocity;
        let newVel = velocity + GRAVITY;

        if (newY >= GROUND) {
          newY = GROUND;
          newVel = 0;
        }

        setVelocity(newVel);

        if (newY < 0) {
          setGameActive(false);
          return y;
        }

        return newY;
      });

      setObstacles((obs) => {
        const newObs = obs.map((o) => o + 5);
        if (newObs[0] > 400) {
          newObs.shift();
          setScore((s) => s + 10);
        }
        if (newObs[newObs.length - 1] < 300) {
          newObs.push(-50);
        }
        return newObs;
      });
    }, 30);

    return () => clearInterval(gameLoop);
  }, [gameActive, velocity]);

  const handleJump = () => {
    if (santaY === GROUND && gameActive) {
      setVelocity(JUMP_POWER);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleJump();
      }
    });

    return () => window.removeEventListener('keydown', handleJump);
  }, [santaY, gameActive]);

  const checkCollision = () => {
    const santaSize = 30;
    const obstacleSize = 40;
    const threshold = 50;

    for (let obs of obstacles) {
      if (
        obs < threshold + santaSize &&
        obs + obstacleSize > threshold &&
        santaY < 350
      ) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (checkCollision()) {
      setGameActive(false);
    }
  }, [obstacles, santaY]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-red-900 to-slate-900 rounded-3xl p-8 max-w-2xl w-full border-2 border-white/20 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Chimney Jump</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-black/40 rounded-2xl overflow-hidden mb-6 relative h-80">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-slate-400">
            <div className="absolute" style={{ left: '50px', top: `${santaY}px` }}>
              🎅
            </div>

            {obstacles.map((obs, idx) => (
              <div
                key={idx}
                className="absolute w-full h-12 bg-red-700 border-4 border-red-900"
                style={{ left: `${obs}px`, top: '50%' }}
              >
                🏠
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm">Score</p>
            <p className="text-3xl font-bold text-red-400">{score}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm">Status</p>
            <p className={`text-xl font-bold ${gameActive ? 'text-green-400' : 'text-red-400'}`}>
              {gameActive ? 'Playing' : 'Game Over'}
            </p>
          </div>
        </div>

        <p className="text-white text-center text-sm mb-4">Press SPACE or click to jump</p>

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
