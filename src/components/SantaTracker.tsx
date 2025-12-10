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
import SleighRacer from './SleighRacer';
import CookieClicker from './CookieClicker';
import ReindeerLauncher from './ReindeerLauncher';
import PresentPuzzle from './PresentPuzzle';
import ChimneyJump from './ChimneyJump';
import OrnamentCollector from './OrnamentCollector';
import SnowballToss from './SnowballToss';
import ElfTraining from './ElfTraining';
import NaughtyListQuiz from './NaughtyListQuiz';
import StockingsShuffle from './StockingsShuffle';

type ActiveGame = null | 'selector' | 'gift-catcher' | 'naughty-or-nice' | 'sleigh-racer' | 'cookie-clicker' | 'reindeer-launcher' | 'present-puzzle' | 'chimney-jump' | 'ornament-collector' | 'snowball-toss' | 'elf-training' | 'naughty-list-quiz' | 'stockings-shuffle';

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

      {activeGame === 'sleigh-racer' && (
        <SleighRacer onClose={() => setActiveGame('selector')} />
      )}

      {activeGame === 'cookie-clicker' && (
        <CookieClicker onClose={() => setActiveGame('selector')} />
      )}

      {activeGame === 'reindeer-launcher' && (
        <ReindeerLauncher onClose={() => setActiveGame('selector')} />
      )}

      {activeGame === 'present-puzzle' && (
        <PresentPuzzle onClose={() => setActiveGame('selector')} />
      )}

      {activeGame === 'chimney-jump' && (
        <ChimneyJump onClose={() => setActiveGame('selector')} />
      )}

      {activeGame === 'ornament-collector' && (
        <OrnamentCollector onClose={() => setActiveGame('selector')} />
      )}

      {activeGame === 'snowball-toss' && (
        <SnowballToss onClose={() => setActiveGame('selector')} />
      )}

      {activeGame === 'elf-training' && (
        <ElfTraining onClose={() => setActiveGame('selector')} />
      )}

      {activeGame === 'naughty-list-quiz' && (
        <NaughtyListQuiz onClose={() => setActiveGame('selector')} />
      )}

      {activeGame === 'stockings-shuffle' && (
        <StockingsShuffle onClose={() => setActiveGame('selector')} />
      )}
    </div>
  );
}
