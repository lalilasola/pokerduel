interface GameActionsProps {
  onCall: () => void;
  onFold: () => void;
  currentBet: number;
  phase: string;
  canAct: boolean;
}

export default function GameActions({ onCall, onFold, currentBet, phase, canAct }: GameActionsProps) {
  if (!canAct) return null;

  return (
    <div className="absolute bottom-20 right-8 left-8">
      <div className="flex justify-center space-x-6">
        <button
          onClick={onFold}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
        >
          <i className="fas fa-times"></i>
          <span>FOLD</span>
        </button>
        
        <button
          onClick={onCall}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 animate-chip-bounce"
        >
          <i className="fas fa-check"></i>
          <span>CALL ${currentBet}</span>
        </button>
      </div>
    </div>
  );
}
