export interface Card {
  rank: string;
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  value: number;
}

export interface Player {
  id: string;
  username: string;
  chips: number;
  cards: Card[];
  hasFolded: boolean;
  hasActed: boolean;
}

export interface GameState {
  phase: 'preflop' | 'flop' | 'turn' | 'river' | 'showdown' | 'ended';
  pot: number;
  currentBet: number;
  communityCards: Card[];
  players: Player[];
  currentPlayer: number;
  dealer: number;
  winner: GameWinner | null;
}

export interface GameWinner {
  playerId: string;
  handDescription: string;
  winnings: number;
  handRank: number;
}

export interface PlayerStats {
  wins: number;
  losses: number;
  totalChips: number;
  winRate: number;
  netGain: number;
}

export interface HandEvaluation {
  rank: number;
  description: string;
  cards: Card[];
}

export interface FarcasterUser {
  fid: number;
  username: string;
  displayName: string;
  pfpUrl?: string;
}
