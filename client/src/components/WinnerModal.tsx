import { GameWinner } from '@/types/poker';

interface WinnerModalProps {
  winner: GameWinner;
  onPlayAgain: () => void;
}

export default function WinnerModal({ winner, onPlayAgain }: WinnerModalProps) {
  const isPlayerWinner = winner.playerId === 'player1';
  const isTie = winner.playerId === 'tie';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 max-w-md w-full border-4 border-yellow-400">
        <div className="text-center">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className={`fas ${isTie ? 'fa-handshake' : isPlayerWinner ? 'fa-crown' : 'fa-trophy'} text-black text-3xl`}></i>
          </div>
          <h2 className="text-white font-bold text-2xl mb-2">
            {isTie ? 'It\'s a Tie!' : isPlayerWinner ? 'You Win!' : 'You Lose!'}
          </h2>
          <p className="text-gray-200 mb-4">{winner.handDescription}</p>
          <div className="bg-black bg-opacity-30 rounded-lg p-4 mb-6">
            <p className={`font-bold text-xl ${isPlayerWinner || isTie ? 'text-yellow-400' : 'text-red-400'}`}>
              {isPlayerWinner || isTie ? '+' : '-'}${winner.winnings.toLocaleString()}
            </p>
          </div>
          <button
            onClick={onPlayAgain}
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}