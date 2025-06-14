import React from 'react';

interface GameActionsProps {
  onCall: () => void;
  onFold: () => void;
  currentBet: number;
  phase: string;
  canAct: boolean;
}

export default function GameActions({ onCall, onFold, currentBet, phase, canAct }: GameActionsProps) {
  if (!canAct || phase === 'ended') {
    return null;
  }

  return (
    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
      <div className="flex space-x-4">
        <button
          onClick={onFold}
          className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
        >
          FOLD
        </button>
        <button
          onClick={onCall}
          className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
        >
          CALL ${currentBet}
        </button>
      </div>
    </div>
  );
}