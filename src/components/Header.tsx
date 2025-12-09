import { Sparkles, Gamepad2 } from 'lucide-react';

interface HeaderProps {
  onPlayGames: () => void;
}

export default function Header({ onPlayGames }: HeaderProps) {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center space-x-3">
        <Sparkles className="w-10 h-10 text-yellow-400 animate-pulse" />
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-green-500">
          Santa Tracker
        </h1>
        <Sparkles className="w-10 h-10 text-yellow-400 animate-pulse" />
      </div>
      <p className="text-xl text-gray-300">
        Follow Santa's magical journey around the world!
      </p>
      <button
        onClick={onPlayGames}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
      >
        <Gamepad2 className="w-5 h-5" />
        Play Games
      </button>
    </div>
  );
}
