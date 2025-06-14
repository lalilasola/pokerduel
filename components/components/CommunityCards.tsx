import { Card } from '@/types/poker';
import { getSuitIcon, getSuitClass } from '@/lib/cards';

interface CommunityCardsProps {
  cards: Card[];
  pot: number;
  phase: string;
}

export default function CommunityCards({ cards, pot, phase }: CommunityCardsProps) {
  const getPhaseDisplay = (phase: string) => {
    switch (phase) {
      case 'preflop': return 'Pre-Flop Betting';
      case 'flop': return 'The Flop';
      case 'turn': return 'The Turn';
      case 'river': return 'The River';
      case 'showdown': return 'Showdown';
      default: return 'Game Over';
    }
  };

  return (
    <div className="text-center">
      <h3 className="text-white font-bold text-lg mb-2">Community Cards</h3>
      <div className="bg-black bg-opacity-30 rounded-lg px-4 py-2 mb-4">
        <span className="text-yellow-400 font-semibold">Pot: ${pot.toLocaleString()}</span>
      </div>
      
      <div className="flex justify-center space-x-3 mb-4">
        {[0, 1, 2, 3, 4].map((index) => (
          <div key={index} className="relative">
            {cards[index] ? (
              <div className="w-16 h-20 bg-white border-2 border-gray-300 rounded-lg shadow-lg flex flex-col items-center justify-center transform hover:scale-105 transition-transform animate-pulse">
                <span className={`text-2xl font-bold ${getSuitClass(cards[index].suit)}`}>
                  {cards[index].rank}
                </span>
                <i className={`${getSuitIcon(cards[index].suit)} ${getSuitClass(cards[index].suit)} text-lg`}></i>
              </div>
            ) : (
              <div className="w-16 h-20 bg-blue-900 border-2 border-white rounded-lg shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-blue-800 rounded border border-blue-700"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Game Phase Indicator */}
      <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
        <span className="text-yellow-400 font-semibold text-sm">{getPhaseDisplay(phase)}</span>
      </div>
    </div>
  );
}