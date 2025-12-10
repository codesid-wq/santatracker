import { Gamepad2, Gift, HelpCircle } from 'lucide-react';

interface GameSelectorProps {
  onSelectGame: (game: string) => void;
  onClose: () => void;
}

export default function GameSelector({ onSelectGame, onClose }: GameSelectorProps) {
  const games = [
    {
      id: 'gift-catcher',
      title: 'Gift Catcher',
      description: 'Catch falling gifts to earn points',
      icon: Gift,
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'naughty-or-nice',
      title: 'Naughty or Nice',
      description: 'Decide if actions are naughty or nice',
      icon: HelpCircle,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'sleigh-racer',
      title: 'Sleigh Racer',
      description: 'Steer your sleigh down the snowy course',
      icon: Gift,
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'cookie-clicker',
      title: 'Cookie Clicker',
      description: 'Click cookies as fast as you can',
      icon: Gift,
      color: 'from-yellow-500 to-amber-600'
    },
    {
      id: 'reindeer-launcher',
      title: 'Reindeer Launcher',
      description: 'Launch reindeer to reach maximum height',
      icon: Gift,
      color: 'from-red-500 to-pink-600'
    },
    {
      id: 'present-puzzle',
      title: 'Present Puzzle',
      description: 'Match pairs of presents to win',
      icon: Gift,
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'chimney-jump',
      title: 'Chimney Jump',
      description: 'Jump over obstacles while going down chimneys',
      icon: Gift,
      color: 'from-red-600 to-slate-700'
    },
    {
      id: 'ornament-collector',
      title: 'Ornament Collector',
      description: 'Collect ornaments as they fall',
      icon: Gift,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'snowball-toss',
      title: 'Snowball Toss',
      description: 'Throw snowballs at targets',
      icon: Gift,
      color: 'from-cyan-600 to-blue-700'
    },
    {
      id: 'elf-training',
      title: 'Elf Training',
      description: 'Test your reaction time with colors',
      icon: HelpCircle,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'naughty-list-quiz',
      title: 'Naughty List Quiz',
      description: 'Answer trivia questions about being nice or naughty',
      icon: HelpCircle,
      color: 'from-slate-700 to-slate-900'
    },
    {
      id: 'stockings-shuffle',
      title: 'Stockings Shuffle',
      description: 'Match stockings in this memory game',
      icon: Gift,
      color: 'from-red-600 to-green-600'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-8 max-w-2xl w-full border-2 border-white/20 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-white flex items-center">
            <Gamepad2 className="w-8 h-8 mr-3 text-yellow-400" />
            Holiday Games
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {games.map((game) => {
            const Icon = game.icon;
            return (
              <button
                key={game.id}
                onClick={() => onSelectGame(game.id)}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 text-left group"
              >
                <div className={`bg-gradient-to-br ${game.color} p-4 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{game.title}</h3>
                <p className="text-gray-300">{game.description}</p>
              </button>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-8 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-colors"
        >
          Back to Tracker
        </button>
      </div>
    </div>
  );
}
