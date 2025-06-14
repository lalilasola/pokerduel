import React from 'react';
import { Player, Card } from '@/types/poker';
import { getSuitSymbol, getSuitClass } from '@/lib/cards';
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
  const handStrength = communityCards.length >= 3 && showCards ? 
    getHandStrength(player.cards, communityCards) : '';

  return (
    <div className={`flex flex-col items-center space-y-3 ${position === 'top' ? 'mb-4' : 'mt-4'}`}>
      {/* Player Info */}
      <div className="bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
        <div className="text-center">
          <h3 className="text-white font-bold text-lg">{player.username}</h3>
          <div className="flex items-center justify-center space-x-2 text-sm">
            <span className="text-yellow-400">💰 {player.chips}</span>
            {player.hasFolded && <span className="text-red-400 font-bold">FOLDED</span>}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="flex space-x-2">
        {player.cards.map((card: Card, index: number) => (
          <div
            key={index}
            className={`
              relative w-16 h-24 rounded-lg shadow-lg transform transition-all duration-300
              ${showCards ? 'bg-white border-2 border-gray-300' : 'bg-blue-900 border-2 border-blue-700'}
              ${showCards ? 'hover:scale-105' : ''}
            `}
          >
            {showCards ? (
              <div className="flex flex-col justify-between h-full p-1">
                <div className={`text-lg font-bold ${getSuitClass(card.suit)}`}>
                  {card.rank}
                </div>
                <div className={`text-2xl ${getSuitClass(card.suit)} text-center`}>
                  {getSuitSymbol(card.suit)}
                </div>
                <div className={`text-lg font-bold ${getSuitClass(card.suit)} transform rotate-180 self-end`}>
                  {card.rank}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-4xl text-blue-300">🂠</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Hand Strength */}
      {handStrength && showCards && (
        <div className="text-center">
          <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
            {handStrength}
          </span>
        </div>
      )}
    </div>
  );
}