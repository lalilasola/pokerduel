import React from 'react';
import { PlayerStats } from '@/types/poker';

interface StatsPanelProps {
  stats: PlayerStats;
}

export default function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-white/20">
      <h3 className="text-white font-bold text-xl mb-4 text-center">Player Stats</h3>
      
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-green-600/20 rounded-lg p-3">
          <div className="text-green-400 text-2xl font-bold">{stats.wins}</div>
          <div className="text-white text-sm">Wins</div>
        </div>
        
        <div className="bg-red-600/20 rounded-lg p-3">
          <div className="text-red-400 text-2xl font-bold">{stats.losses}</div>
          <div className="text-white text-sm">Losses</div>
        </div>
        
        <div className="bg-yellow-600/20 rounded-lg p-3">
          <div className="text-yellow-400 text-2xl font-bold">{stats.winRate.toFixed(1)}%</div>
          <div className="text-white text-sm">Win Rate</div>
        </div>
        
        <div className="bg-blue-600/20 rounded-lg p-3">
          <div className="text-blue-400 text-2xl font-bold">${stats.totalChips}</div>
          <div className="text-white text-sm">Total Chips</div>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <div className={`text-xl font-bold ${stats.netGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {stats.netGain >= 0 ? '+' : ''}${stats.netGain}
        </div>
        <div className="text-white text-sm">Net Gain</div>
      </div>
    </div>
  );
}