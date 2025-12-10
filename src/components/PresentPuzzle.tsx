import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Card {
  id: number;
  emoji: string;
  matched: boolean;
}

interface PresentPuzzleProps {
  onClose: () => void;
}

export default function PresentPuzzle({ onClose }: PresentPuzzleProps) {
  const emojis = ['🎁', '🎄', '⛄', '🔔', '🎅', '🤶'];
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameActive, setGameActive] = useState(true);

  useEffect(() => {
    const gameCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, idx) => ({ id: idx, emoji, matched: false }));
    setCards(gameCards);
  }, []);

  useEffect(() => {
    if (flipped.length !== 2) return;

    const [first, second] = flipped;
    if (cards[first].emoji === cards[second].emoji) {
      setCards((prev) => {
        const updated = [...prev];
        updated[first].matched = true;
        updated[second].matched = true;
        return updated;
      });
      setMatched((m) => m + 1);
      setFlipped([]);
    } else {
      setTimeout(() => setFlipped([]), 1000);
    }
    setMoves((m) => m + 1);
  }, [flipped, cards]);

  useEffect(() => {
    if (matched === emojis.length && gameActive) {
      setGameActive(false);
    }
  }, [matched, gameActive]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-3xl p-8 max-w-2xl w-full border-2 border-white/20 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Present Puzzle</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-black/40 rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-4 gap-3">
            {cards.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => {
                  if (flipped.length < 2 && !flipped.includes(idx) && !card.matched) {
                    setFlipped([...flipped, idx]);
                  }
                }}
                className={`aspect-square rounded-lg font-bold text-2xl transition-all ${
                  flipped.includes(idx) || card.matched
                    ? 'bg-white/20 text-white'
                    : 'bg-gradient-to-br from-yellow-500 to-orange-500 hover:scale-105'
                }`}
              >
                {flipped.includes(idx) || card.matched ? card.emoji : '?'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm">Matched</p>
            <p className="text-3xl font-bold text-pink-400">{matched}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm">Moves</p>
            <p className="text-3xl font-bold text-purple-400">{moves}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm">Status</p>
            <p className={`text-xl font-bold ${gameActive ? 'text-yellow-400' : 'text-green-400'}`}>
              {gameActive ? 'Playing' : 'Won!'}
            </p>
          </div>
        </div>

        {!gameActive && (
          <div className="text-center mb-6">
            <p className="text-xl text-white font-bold">Completed in {moves} moves!</p>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-pink-600 hover:bg-pink-500 text-white font-semibold rounded-xl transition-colors"
        >
          Back to Games
        </button>
      </div>
    </div>
  );
}
