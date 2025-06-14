'use client';

import { useState, useEffect } from 'react';
import GameTable from '@/components/GameTable';
import StatsPanel from '@/components/StatsPanel';
import WinnerModal from '@/components/WinnerModal';
import { usePokerGame } from '@/hooks/usePokerGame';
import { useFarcasterAuth } from '@/hooks/useFarcasterAuth';

export default function PokerGame() {
  const { user, isConnected, connect, disconnect } = useFarcasterAuth();
  const {
    gameState,
    playerStats,
    handleCall,
    handleFold,
    handleNewGame,
    showWinnerModal,
    hideWinnerModal
  } = usePokerGame();

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-poker-felt to-emerald-800 flex items-center justify-center">
        <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full mx-4 border border-poker-gold border-opacity-30">
          <div className="text-center">
            <div className="w-16 h-16 bg-poker-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-spade text-black text-2xl"></i>
            </div>
            <h1 className="text-white font-bold text-3xl mb-2">Poker Duel</h1>
            <p className="text-gray-300 mb-8">Connect your Farcaster account to start playing</p>
            <button
              onClick={connect}
              className="bg-poker-gold text-black px-8 py-3 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-colors w-full"
            >
              Connect with Farcaster
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-poker-felt to-emerald-800 min-h-screen font-inter">
      {/* Header */}
      <header className="bg-black bg-opacity-30 backdrop-blur-sm border-b border-poker-gold border-opacity-20">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-poker-gold rounded-full flex items-center justify-center">
              <i className="fas fa-spade text-black text-sm"></i>
            </div>
            <h1 className="text-white font-bold text-xl">Poker Duel</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 bg-green-500 bg-opacity-20 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-100 text-sm">@{user?.username || 'Anonymous'}</span>
            </div>
            <button
              onClick={disconnect}
              className="bg-poker-gold text-black px-4 py-2 rounded-lg font-semibold text-sm hover:bg-yellow-400 transition-colors"
            >
              <i className="fas fa-sign-out-alt mr-2"></i>Disconnect
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <GameTable
          gameState={gameState}
          onCall={handleCall}
          onFold={handleFold}
          currentUser={user}
        />
        
        <StatsPanel stats={playerStats} />
        
        <div className="mt-8 text-center">
          <button
            onClick={handleNewGame}
            className="bg-gradient-to-r from-poker-gold to-yellow-500 text-black px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <i className="fas fa-plus mr-2"></i>
            Start New Game
          </button>
        </div>
      </main>

      {gameState.winner && (
        <WinnerModal
          winner={gameState.winner}
          onPlayAgain={() => {
            hideWinnerModal();
            handleNewGame();
          }}
        />
      )}

      {/* Mobile Game Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-80 backdrop-blur-sm p-4 md:hidden">
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleFold}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold flex-1 max-w-32"
          >
            FOLD
          </button>
          <button
            onClick={handleCall}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold flex-1 max-w-32"
          >
            CALL
          </button>
        </div>
      </div>
    </div>
  );
}