import { useState, useEffect, useCallback } from 'react';
import { GameState, PlayerStats, Card, GameWinner } from '@/types/poker';
import { createDeck, dealCards } from '@/lib/cards';
import { evaluateHand, compareHands } from '@/lib/poker';

const INITIAL_CHIPS = 1000;
const BLIND_AMOUNT = 25;

export function usePokerGame() {
  const [gameState, setGameState] = useState<GameState>({
    phase: 'preflop',
    pot: 0,
    currentBet: BLIND_AMOUNT,
    communityCards: [],
    players: [],
    currentPlayer: 0,
    dealer: 0,
    winner: null
  });

  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    wins: 0,
    losses: 0,
    totalChips: INITIAL_CHIPS,
    winRate: 0,
    netGain: 0
  });

  const [deck, setDeck] = useState<Card[]>([]);

  // Load game state from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('pokerDuel_playerStats');
    if (savedStats) {
      setPlayerStats(JSON.parse(savedStats));
    }
  }, []);

  // Save stats to localStorage
  useEffect(() => {
    localStorage.setItem('pokerDuel_playerStats', JSON.stringify(playerStats));
  }, [playerStats]);

  const initializeGame = useCallback(() => {
    const newDeck = createDeck();
    
    // Deal hole cards to both players
    const { cards: player1Cards, remainingDeck: deck1 } = dealCards(newDeck, 2);
    const { cards: player2Cards, remainingDeck: finalDeck } = dealCards(deck1, 2);
    
    const players = [
      {
        id: 'player1',
        username: 'You',
        chips: playerStats.totalChips,
        cards: player1Cards,
        hasFolded: false,
        hasActed: false
      },
      {
        id: 'player2',
        username: 'Opponent',
        chips: INITIAL_CHIPS,
        cards: player2Cards,
        hasFolded: false,
        hasActed: false
      }
    ];

    setDeck(finalDeck);
    setGameState({
      phase: 'preflop',
      pot: BLIND_AMOUNT * 2,
      currentBet: BLIND_AMOUNT,
      communityCards: [],
      players,
      currentPlayer: 0,
      dealer: 0,
      winner: null
    });
  }, [playerStats.totalChips]);

  const dealCommunityCards = useCallback((count: number) => {
    const { cards: newCards, remainingDeck } = dealCards(deck, count);
    setDeck(remainingDeck);
    setGameState(prev => ({
      ...prev,
      communityCards: [...prev.communityCards, ...newCards]
    }));
  }, [deck]);

  const progressToNextPhase = useCallback(() => {
    setGameState(prev => {
      let newPhase = prev.phase;
      let cardsToDeal = 0;

      switch (prev.phase) {
        case 'preflop':
          newPhase = 'flop';
          cardsTodeal = 3;
          break;
        case 'flop':
          newPhase = 'turn';
          cardsToDeall = 1;
          break;
        case 'turn':
          newPhase = 'river';
          cardsToDeall = 1;
          break;
        case 'river':
          newPhase = 'showdown';
          break;
        default:
          newPhase = 'ended';
      }

      return { ...prev, phase: newPhase };
    });

    if (gameState.phase !== 'river') {
      setTimeout(() => {
        if (gameState.phase === 'preflop') dealCommunityCards(3);
        else dealCommunityCards(1);
      }, 500);
    }
  }, [gameState.phase, dealCommunityCards]);

  const determineWinner = useCallback(() => {
    const [player1, player2] = gameState.players;
    
    if (player1.hasFolded) {
      return {
        playerId: player2.id,
        handDescription: 'Opponent wins by fold',
        winnings: gameState.pot,
        handRank: 10
      };
    }
    
    if (player2.hasFolded) {
      return {
        playerId: player1.id,
        handDescription: 'You win by fold',
        winnings: gameState.pot,
        handRank: 10
      };
    }

    const player1Hand = evaluateHand(player1.cards, gameState.communityCards);
    const player2Hand = evaluateHand(player2.cards, gameState.communityCards);
    
    const comparison = compareHands(player1Hand, player2Hand);
    
    if (comparison > 0) {
      return {
        playerId: player1.id,
        handDescription: `You win with ${player1Hand.description}`,
        winnings: gameState.pot,
        handRank: player1Hand.rank
      };
    } else if (comparison < 0) {
      return {
        playerId: player2.id,
        handDescription: `Opponent wins with ${player2Hand.description}`,
        winnings: gameState.pot,
        handRank: player2Hand.rank
      };
    } else {
      return {
        playerId: 'tie',
        handDescription: 'Tie - Split pot',
        winnings: gameState.pot / 2,
        handRank: player1Hand.rank
      };
    }
  }, [gameState]);

  const endGame = useCallback((winner: GameWinner) => {
    setGameState(prev => ({ ...prev, winner, phase: 'ended' }));
    
    // Update player stats
    setPlayerStats(prev => {
      const isWin = winner.playerId === 'player1';
      const newWins = isWin ? prev.wins + 1 : prev.wins;
      const newLosses = isWin ? prev.losses : prev.losses + 1;
      const totalGames = newWins + newLosses;
      const newWinRate = totalGames > 0 ? Math.round((newWins / totalGames) * 100) : 0;
      const chipsChange = isWin ? winner.winnings - BLIND_AMOUNT : -BLIND_AMOUNT;
      
      return {
        wins: newWins,
        losses: newLosses,
        totalChips: Math.max(0, prev.totalChips + chipsChange),
        winRate: newWinRate,
        netGain: prev.netGain + chipsChange
      };
    });
  }, []);

  const handleCall = useCallback(() => {
    if (gameState.phase === 'ended') return;
    
    // Both players have now acted, progress to next phase or showdown
    if (gameState.phase === 'river') {
      const winner = determineWinner();
      endGame(winner);
    } else {
      progressToNextPhase();
    }
  }, [gameState.phase, determineWinner, endGame, progressToNextPhase]);

  const handleFold = useCallback(() => {
    const winner: GameWinner = {
      playerId: 'player2',
      handDescription: 'You folded',
      winnings: gameState.pot,
      handRank: 10
    };
    endGame(winner);
  }, [gameState.pot, endGame]);

  const handleNewGame = useCallback(() => {
    initializeGame();
  }, [initializeGame]);

  const showWinnerModal = gameState.winner !== null;
  
  const hideWinnerModal = useCallback(() => {
    setGameState(prev => ({ ...prev, winner: null }));
  }, []);

  // Initialize game on mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return {
    gameState,
    playerStats,
    handleCall,
    handleFold,
    handleNewGame,
    showWinnerModal,
    hideWinnerModal
  };
}
