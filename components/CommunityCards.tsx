import React from 'react';
import { Card } from '@/types/poker';
import { getSuitSymbol, getSuitClass } from '@/lib/cards';

interface CommunityCardsProps {
  cards: Card[];
  pot: number;
  phase: string;
}

export default function CommunityCards({ cards, pot, phase }: CommunityCardsProps) {
  const totalSlots = 5;
  const emptySlots = totalSlots - cards.length;

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Phase indicator */}
      <div className="bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
        <h3 className="text-white font-bold text-lg uppercase tracking-wider">
          {phase === 'preflop' ? 'Pre-Flop' : phase}
        </h3>
      </div>

      {/* Community Cards */}
      <div className="flex space-x-2">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative w-20 h-28 bg-white rounded-lg shadow-2xl border-2 border-gray-300 transform transition-all duration-500 hover:scale-105"
            style={{
              animationDelay: `${index * 200}ms`,
              animation: 'cardFlip 0.6s ease-in-out'
            }}
          >
            <div className="flex flex-col justify-between h-full p-2">
              <div className={`text-xl font-bold ${getSuitClass(card.suit)}`}>
                {card.rank}
              </div>
              <div className={`text-3xl ${getSuitClass(card.suit)} text-center`}>
                {getSuitSymbol(card.suit)}
              </div>
              <div className={`text-xl font-bold ${getSuitClass(card.suit)} transform rotate-180 self-end`}>
                {card.rank}
              </div>
            </div>
          </div>
        ))}
        
        {/* Empty card slots */}
        {Array.from({ length: emptySlots }, (_, index) => (
          <div
            key={`empty-${index}`}
            className="w-20 h-28 border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center"
          >
            <div className="text-white/50 text-4xl">?</div>
          </div>
        ))}
      </div>

      {/* Pot */}
      <div className="bg-yellow-500 text-black px-6 py-3 rounded-full shadow-lg">
        <div className="text-center">
          <div className="text-sm font-medium">POT</div>
          <div className="text-2xl font-bold">${pot}</div>
        </div>
      </div>
    </div>
  );
}