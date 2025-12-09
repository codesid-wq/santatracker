import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  size: number;
  opacity: number;
}

export default function Snowfall() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: Math.random() * 10 + 10,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.6 + 0.4
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute rounded-full bg-white animate-fall"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `fall ${flake.animationDuration}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );
}
