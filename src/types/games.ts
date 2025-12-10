export type GameType = 'selector' | 'gift-catcher' | 'naughty-or-nice' | 'sleigh-racer' | 'cookie-clicker' | 'reindeer-launcher' | 'present-puzzle' | 'chimney-jump' | 'ornament-collector' | 'snowball-toss' | 'elf-training' | 'naughty-list-quiz' | 'stockings-shuffle';

export interface GameScore {
  game: string;
  score: number;
  timestamp: Date;
}

export interface GiftItem {
  id: number;
  x: number;
  y: number;
  size: number;
}

export interface QuizQuestion {
  id: number;
  text: string;
  answer: 'naughty' | 'nice';
  emoji: string;
}
