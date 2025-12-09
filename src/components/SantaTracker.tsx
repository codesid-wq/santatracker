import { useState } from 'react';
import { useSanta } from '../context/SantaContext';
import Header from './Header';
import StatsGrid from './StatsGrid';
import LocationCard from './LocationCard';
import MapVisualization from './MapVisualization';
import Countdown from './Countdown';
import Snowfall from './Snowfall';
import GameSelector from './GameSelector';
import GiftCatcher from './GiftCatcher';
import NaughtyOrNice from './NaughtyOrNice';

type ActiveGame = null | 'selector' | 'gift-catcher' | 'naughty-or-nice';

export default function SantaTracker() {
  const { status } = useSanta();
  const [activeGame, setActiveGame] = useState<ActiveGame>(null);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Snowfall />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header onPlayGames={() => setActiveGame('selector')} />

        <div className="mt-8 space-y-8">
          <Countdown />

          <MapVisualization
            currentLocation={status.currentLocation}
            progress={status.progressPercentage}
          />

          <StatsGrid status={status} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LocationCard
              title="Current Location"
              location={status.currentLocation}
              type="current"
            />
            <LocationCard
              title="Next Stop"
              location={status.nextLocation}
              type="next"
            />
          </div>
        </div>
      </div>

      {activeGame === 'selector' && (
        <GameSelector
          onSelectGame={(game) => setActiveGame(game as ActiveGame)}
          onClose={() => setActiveGame(null)}
        />
      )}

      {activeGame === 'gift-catcher' && (
        <GiftCatcher onClose={() => setActiveGame('selector')} />
      )}

      {activeGame === 'naughty-or-nice' && (
        <NaughtyOrNice onClose={() => setActiveGame('selector')} />
      )}
    </div>
  );
}
