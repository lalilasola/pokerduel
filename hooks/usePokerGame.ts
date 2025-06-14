import React, { useState, useEffect, useCallback } from 'react';
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
    
    setDeck(finalDeck);
    
    setGameState({
      phase: 'preflop',
      pot: BLIND_AMOUNT * 2,
      currentBet: BLIND_AMOUNT,
      communityCards: [],
      players: [
        {
          id: '1',
          username: 'You',
          chips: INITIAL_CHIPS - BLIND_AMOUNT,
          cards: player1Cards,
          hasFolded: false,
          hasActed: false
        },
        {
          id: '2',
          username: 'Opponent',
          chips: INITIAL_CHIPS - BLIND_AMOUNT,
          cards: player2Cards,
          hasFolded: false,
          hasActed: false
        }
      ],
      currentPlayer: 0,
      dealer: 0,
      winner: null
    });
  }, []);

  const advanceGamePhase = useCallback(() => {
    setGameState(prev => {
      const newDeck = [...deck];
      let newCommunityCards = [...prev.communityCards];
      
      switch (prev.phase) {
        case 'preflop':
          // Flop: deal 3 cards
          const { cards: flopCards, remainingDeck: afterFlop } = dealCards(newDeck, 3);
          newCommunityCards = flopCards;
          setDeck(afterFlop);
          return { ...prev, phase: 'flop', communityCards: newCommunityCards };
          
        case 'flop':
          // Turn: deal 1 card
          const { cards: turnCards, remainingDeck: afterTurn } = dealCards(newDeck, 1);
          newCommunityCards = [...prev.communityCards, ...turnCards];
          setDeck(afterTurn);
          return { ...prev, phase: 'turn', communityCards: newCommunityCards };
          
        case 'turn':
          // River: deal 1 card
          const { cards: riverCards, remainingDeck: afterRiver } = dealCards(newDeck, 1);
          newCommunityCards = [...prev.communityCards, ...riverCards];
          setDeck(afterRiver);
          return { ...prev, phase: 'river', communityCards: newCommunityCards };
          
        case 'river':
          // Showdown
          return { ...prev, phase: 'showdown' };
          
        default:
          return prev;
      }
    });
  }, [deck]);

  const endGame = useCallback((winner: GameWinner) => {
    setGameState(prev => ({ ...prev, phase: 'ended', winner }));
    
    // Update player stats
    setPlayerStats(prev => {
      const isWin = winner.playerId === '1';
      const newWins = isWin ? prev.wins + 1 : prev.wins;
      const newLosses = isWin ? prev.losses : prev.losses + 1;
      const totalGames = newWins + newLosses;
      const newWinRate = totalGames > 0 ? (newWins / totalGames) * 100 : 0;
      const chipChange = isWin ? winner.winnings : -BLIND_AMOUNT;
      
      return {
        wins: newWins,
        losses: newLosses,
        totalChips: prev.totalChips + chipChange,
        winRate: newWinRate,
        netGain: prev.netGain + chipChange
      };
    });
  }, []);

  const handleCall = useCallback(() => {
    // Simple AI opponent logic
    const shouldOpponentCall = Math.random() > 0.3; // 70% chance to call
    
    if (!shouldOpponentCall) {
      // Opponent folds, player wins
      const winner: GameWinner = {
        playerId: '1',
        handDescription: 'Opponent folded',
        winnings: gameState.pot,
        handRank: 0
      };
      endGame(winner);
      return;
    }

    // Both players call, advance to next phase or showdown
    if (gameState.phase === 'river') {
      // Showdown - evaluate hands
      const [player, opponent] = gameState.players;
      const playerHand = evaluateHand(player.cards, gameState.communityCards);
      const opponentHand = evaluateHand(opponent.cards, gameState.communityCards);
      
      const comparison = compareHands(playerHand, opponentHand);
      
      const winner: GameWinner = {
        playerId: comparison > 0 ? '1' : '2',
        handDescription: comparison > 0 ? playerHand.description : opponentHand.description,
        winnings: gameState.pot,
        handRank: comparison > 0 ? playerHand.rank : opponentHand.rank
      };
      
      endGame(winner);
    } else {
      advanceGamePhase();
    }
  }, [gameState, advanceGamePhase, endGame]);

  const handleFold = useCallback(() => {
    const winner: GameWinner = {
      playerId: '2',
      handDescription: 'Player folded',
      winnings: gameState.pot,
      handRank: 0
    };
    endGame(winner);
  }, [gameState.pot, endGame]);

  const resetGame = useCallback(() => {
    initializeGame();
  }, [initializeGame]);

  // Initialize game on first load
  useEffect(() => {
    if (gameState.players.length === 0) {
      initializeGame();
    }
  }, [initializeGame, gameState.players.length]);

  return {
    gameState,
    playerStats,
    handleCall,
    handleFold,
    resetGame
  };
}