import { Card } from '@/types/poker';

const SUITS: Card['suit'][] = ['hearts', 'diamonds', 'clubs', 'spades'];
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export function createDeck(): Card[] {
  const deck: Card[] = [];
  
  for (const suit of SUITS) {
    for (let i = 0; i < RANKS.length; i++) {
      deck.push({
        rank: RANKS[i],
        suit,
        value: i + 2 // 2-14, where 14 is Ace
      });
    }
  }
  
  return shuffleDeck(deck);
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function dealCards(deck: Card[], count: number): { cards: Card[], remainingDeck: Card[] } {
  const cards = deck.slice(0, count);
  const remainingDeck = deck.slice(count);
  return { cards, remainingDeck };
}

export function getSuitSymbol(suit: Card['suit']): string {
  const symbols = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠'
  };
  return symbols[suit];
}

export function getSuitClass(suit: Card['suit']): string {
  return suit === 'hearts' || suit === 'diamonds' ? 'text-card-red' : 'text-card-black';
}

export function getSuitIcon(suit: Card['suit']): string {
  const icons = {
    hearts: 'fas fa-heart',
    diamonds: 'fas fa-diamond',
    clubs: 'fas fa-club',
    spades: 'fas fa-spade'
  };
  return icons[suit];
}
