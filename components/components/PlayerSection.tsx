import { Player, Card } from '@/types/poker';
import { getSuitIcon, getSuitClass } from '@/lib/cards';
import { getHandStrength } from '@/lib/poker';

interface PlayerSectionProps {
  player: Player;
  isCurrentUser: boolean;
  showCards: boolean;
  position: 'top' | 'bottom';
  communityCards?: Card[];
}

export default function PlayerSection({ 
  player, 
  isCurrentUser, 
  showCards, 
  position,
  communityCards = []
}: PlayerSectionProps) {
  const handStrength = isCurrentUser && communityCards.length >= 3 
    ? getHandStrength(player.cards, communityCards)
    : null;

  return (
    <div className={`bg-black ${isCurrentUser ? 'bg-opacity-50' : 'bg-opacity-40'} rounded-xl p-4 backdrop-blur-sm ${
      isCurrentUser ? 'border border-yellow-400 border-opacity-30' : ''
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 ${isCurrentUser ? 'bg-yellow-400' : 'bg-gray-400'} rounded-full flex items-center justify-center`}>
            <i className={`fas fa-user ${isCurrentUser ? 'text-black' : 'text-gray-700'}`}></i>
          </div>
          <div>
            <p className="text-white font-semibold">@{player.username}</p>
            <p className="text-gray-300 text-sm">Chips: {player.chips.toLocaleString()}</p>
          </div>
        </div>
        <div className="text-right">
          <span className={`font-bold text-sm ${
            player.hasFolded ? 'text-red-400' : 
            isCurrentUser ? 'text-green-400' : 'text-yellow-400'
          }`}>
            {player.hasFolded ? 'Folded' : isCurrentUser ? 'Your Turn' : 'Waiting...'}
          </span>
        </div>
      </div>
      
      {/* Player Cards */}
      <div className="flex justify-center space-x-2 mb-4">
        {player.cards.map((card, index) => (
          <div key={index} className="relative">
            {showCards ? (
              <div className="w-12 h-16 bg-white border-2 border-gray-300 rounded-lg shadow-lg flex flex-col items-center justify-center transform hover:scale-105 transition-transform">
                <span className={`text-xl font-bold ${getSuitClass(card.suit)}`}>
                  {card.rank}
                </span>
                <i className={`${getSuitIcon(card.suit)} ${getSuitClass(card.suit)} text-sm`}></i>
              </div>
            ) : (
              <div className={`w-12 h-16 bg-blue-900 border-2 border-white rounded-lg shadow-lg flex items-center justify-center transform ${
                index === 0 ? 'rotate-12' : '-rotate-12'
              }`}>
                <div className="w-8 h-8 bg-blue-800 rounded border border-blue-700"></div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Hand Strength Indicator */}
      {handStrength && isCurrentUser && (
        <div className="text-center">
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold inline-block">
            {handStrength}
          </div>
        </div>
      )}
    </div>
  );
}