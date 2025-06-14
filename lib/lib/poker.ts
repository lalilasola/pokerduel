import { Card, HandEvaluation } from '@/types/poker';

// Simplified poker hand evaluation since poker-evaluator needs to be installed
export function evaluateHand(playerCards: Card[], communityCards: Card[]): HandEvaluation {
  const allCards = [...playerCards, ...communityCards];
  const sortedCards = allCards.sort((a, b) => b.value - a.value);
  
  // Check for different hand types
  const isFlush = checkFlush(sortedCards);
  const isStraight = checkStraight(sortedCards);
  const pairs = checkPairs(sortedCards);
  
  if (isStraight && isFlush) {
    if (sortedCards[0].value === 14) { // Ace high
      return { rank: 9, description: 'Royal Flush', cards: sortedCards.slice(0, 5) };
    }
    return { rank: 8, description: 'Straight Flush', cards: sortedCards.slice(0, 5) };
  }
  
  if (pairs.fourOfAKind) {
    return { rank: 7, description: 'Four of a Kind', cards: sortedCards.slice(0, 5) };
  }
  
  if (pairs.threeOfAKind && pairs.pair) {
    return { rank: 6, description: 'Full House', cards: sortedCards.slice(0, 5) };
  }
  
  if (isFlush) {
    return { rank: 5, description: 'Flush', cards: sortedCards.slice(0, 5) };
  }
  
  if (isStraight) {
    return { rank: 4, description: 'Straight', cards: sortedCards.slice(0, 5) };
  }
  
  if (pairs.threeOfAKind) {
    return { rank: 3, description: 'Three of a Kind', cards: sortedCards.slice(0, 5) };
  }
  
  if (pairs.twoPair) {
    return { rank: 2, description: 'Two Pair', cards: sortedCards.slice(0, 5) };
  }
  
  if (pairs.pair) {
    return { rank: 1, description: 'Pair', cards: sortedCards.slice(0, 5) };
  }
  
  return { rank: 0, description: 'High Card', cards: sortedCards.slice(0, 5) };
}

function checkFlush(cards: Card[]): boolean {
  const suitCounts: Record<string, number> = {};
  for (const card of cards) {
    suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
    if (suitCounts[card.suit] >= 5) return true;
  }
  return false;
}

function checkStraight(cards: Card[]): boolean {
  const uniqueValues = Array.from(new Set(cards.map(c => c.value))).sort((a, b) => b - a);
  
  for (let i = 0; i <= uniqueValues.length - 5; i++) {
    let consecutive = 1;
    for (let j = i + 1; j < uniqueValues.length && consecutive < 5; j++) {
      if (uniqueValues[j] === uniqueValues[j-1] - 1) {
        consecutive++;
      } else {
        break;
      }
    }
    if (consecutive >= 5) return true;
  }
  
  // Check for A-2-3-4-5 straight (wheel)
  if (uniqueValues.includes(14) && uniqueValues.includes(2) && 
      uniqueValues.includes(3) && uniqueValues.includes(4) && uniqueValues.includes(5)) {
    return true;
  }
  
  return false;
}

function checkPairs(cards: Card[]): {
  fourOfAKind: boolean;
  threeOfAKind: boolean;
  pair: boolean;
  twoPair: boolean;
} {
  const valueCounts: Record<number, number> = {};
  for (const card of cards) {
    valueCounts[card.value] = (valueCounts[card.value] || 0) + 1;
  }
  
  const counts = Object.values(valueCounts).sort((a, b) => b - a);
  
  return {
    fourOfAKind: counts[0] >= 4,
    threeOfAKind: counts[0] >= 3,
    pair: counts[0] >= 2,
    twoPair: counts[0] >= 2 && counts[1] >= 2
  };
}

export function compareHands(hand1: HandEvaluation, hand2: HandEvaluation): number {
  if (hand1.rank !== hand2.rank) {
    return hand2.rank - hand1.rank; // Higher rank wins
  }
  
  // If same rank, compare high cards
  for (let i = 0; i < Math.min(hand1.cards.length, hand2.cards.length); i++) {
    if (hand1.cards[i].value !== hand2.cards[i].value) {
      return hand2.cards[i].value - hand1.cards[i].value;
    }
  }
  
  return 0; // Tie
}

export function getHandStrength(playerCards: Card[], communityCards: Card[]): string {
  if (communityCards.length < 3) return 'Hole Cards';
  
  const evaluation = evaluateHand(playerCards, communityCards);
  return evaluation.description;
}