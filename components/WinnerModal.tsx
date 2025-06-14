import React from 'react';
import { GameWinner } from '@/types/poker';

interface WinnerModalProps {
  winner: GameWinner;
  onPlayAgain: () => void;
}

export default function WinnerModal({ winner, onPlayAgain }: WinnerModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-white mb-2">Game Over!</h2>
          <p className="text-xl text-green-400 font-bold mb-4">
            Player {winner.playerId} Wins!
          </p>
          <div className="bg-black/30 rounded-lg p-4 mb-6">
            <p className="text-white text-lg font-medium mb-2">{winner.handDescription}</p>
            <p className="text-yellow-400 text-xl font-bold">
              Winnings: ${winner.winnings}
            </p>
          </div>
          <button
            onClick={onPlayAgain}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}