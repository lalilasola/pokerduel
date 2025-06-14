import { Card, HandEvaluation } from '@/types/poker';

export function evaluateHand(playerCards: Card[], communityCards: Card[]): HandEvaluation {
  const allCards = [...playerCards, ...communityCards];
  const sortedCards = allCards.sort((a, b) => b.value - a.value);

  // Check for flush
  const isFlush = checkFlush(sortedCards);
  
  // Check for straight
  const isStraight = checkStraight(sortedCards);
  
  // Check for pairs, three of a kind, etc.
  const pairData = checkPairs(sortedCards);

  // Determine hand rank and description
  if (isStraight && isFlush) {
    if (sortedCards[0].value === 14 && sortedCards[1].value === 13) {
      return { rank: 10, description: 'Royal Flush', cards: sortedCards.slice(0, 5) };
    }
    return { rank: 9, description: 'Straight Flush', cards: sortedCards.slice(0, 5) };
  }
  
  if (pairData.fourOfAKind) {
    return { rank: 8, description: 'Four of a Kind', cards: sortedCards.slice(0, 5) };
  }
  
  if (pairData.threeOfAKind && pairData.pairs.length > 0) {
    return { rank: 7, description: 'Full House', cards: sortedCards.slice(0, 5) };
  }
  
  if (isFlush) {
    return { rank: 6, description: 'Flush', cards: sortedCards.slice(0, 5) };
  }
  
  if (isStraight) {
    return { rank: 5, description: 'Straight', cards: sortedCards.slice(0, 5) };
  }
  
  if (pairData.threeOfAKind) {
    return { rank: 4, description: 'Three of a Kind', cards: sortedCards.slice(0, 5) };
  }
  
  if (pairData.pairs.length >= 2) {
    return { rank: 3, description: 'Two Pair', cards: sortedCards.slice(0, 5) };
  }
  
  if (pairData.pairs.length === 1) {
    return { rank: 2, description: 'One Pair', cards: sortedCards.slice(0, 5) };
  }
  
  return { rank: 1, description: 'High Card', cards: sortedCards.slice(0, 5) };
}

function checkFlush(cards: Card[]): boolean {
  const suitCounts: { [suit: string]: number } = {};
  
  for (const card of cards) {
    suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
    if (suitCounts[card.suit] >= 5) {
      return true;
    }
  }
  
  return false;
}

function checkStraight(cards: Card[]): boolean {
  const uniqueValues = [...new Set(cards.map(card => card.value))].sort((a, b) => b - a);
  
  for (let i = 0; i <= uniqueValues.length - 5; i++) {
    if (uniqueValues[i] - uniqueValues[i + 4] === 4) {
      return true;
    }
  }
  
  // Check for A-2-3-4-5 straight (wheel)
  if (uniqueValues.includes(14) && uniqueValues.includes(5) && 
      uniqueValues.includes(4) && uniqueValues.includes(3) && uniqueValues.includes(2)) {
    return true;
  }
  
  return false;
}

function checkPairs(cards: Card[]): {
  pairs: number[];
  threeOfAKind: boolean;
  fourOfAKind: boolean;
} {
  const valueCounts: { [value: number]: number } = {};
  
  for (const card of cards) {
    valueCounts[card.value] = (valueCounts[card.value] || 0) + 1;
  }
  
  const pairs: number[] = [];
  let threeOfAKind = false;
  let fourOfAKind = false;
  
  for (const [value, count] of Object.entries(valueCounts)) {
    if (count === 2) {
      pairs.push(parseInt(value));
    } else if (count === 3) {
      threeOfAKind = true;
    } else if (count === 4) {
      fourOfAKind = true;
    }
  }
  
  return { pairs, threeOfAKind, fourOfAKind };
}

export function compareHands(hand1: HandEvaluation, hand2: HandEvaluation): number {
  if (hand1.rank !== hand2.rank) {
    return hand2.rank - hand1.rank;
  }
  
  // Same rank, compare high cards
  for (let i = 0; i < Math.min(hand1.cards.length, hand2.cards.length); i++) {
    if (hand1.cards[i].value !== hand2.cards[i].value) {
      return hand2.cards[i].value - hand1.cards[i].value;
    }
  }
  
  return 0; // Tie
}

export function getHandStrength(playerCards: Card[], communityCards: Card[]): string {
  const evaluation = evaluateHand(playerCards, communityCards);
  return evaluation.description;
}