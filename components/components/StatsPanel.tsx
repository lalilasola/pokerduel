import { PlayerStats } from '@/types/poker';

interface StatsPanelProps {
  stats: PlayerStats;
}

export default function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-xl p-6 border border-yellow-400 border-opacity-20">
        <h3 className="text-white font-bold text-lg mb-4 flex items-center">
          <i className="fas fa-trophy text-yellow-400 mr-2"></i>
          Game Stats
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-300">Games Won:</span>
            <span className="text-white font-semibold">{stats.wins}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Games Lost:</span>
            <span className="text-white font-semibold">{stats.losses}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Win Rate:</span>
            <span className="text-green-400 font-semibold">{stats.winRate}%</span>
          </div>
        </div>
      </div>
      
      <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-xl p-6 border border-yellow-400 border-opacity-20">
        <h3 className="text-white font-bold text-lg mb-4 flex items-center">
          <i className="fas fa-coins text-yellow-400 mr-2"></i>
          Chip Stack
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-300">Current:</span>
            <span className="text-yellow-400 font-bold text-xl">{stats.totalChips.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Starting:</span>
            <span className="text-gray-400">1,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Net:</span>
            <span className={`font-semibold ${stats.netGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.netGain >= 0 ? '+' : ''}{stats.netGain.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      
      <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-xl p-6 border border-yellow-400 border-opacity-20">
        <h3 className="text-white font-bold text-lg mb-4 flex items-center">
          <i className="fas fa-history text-yellow-400 mr-2"></i>
          Session Info
        </h3>
        <div className="space-y-2">
          <div className="text-gray-300 text-sm">
            Total Games: {stats.wins + stats.losses}
          </div>
          <div className="text-gray-300 text-sm">
            Best Streak: Coming Soon
          </div>
          <div className="text-gray-400 text-xs">
            Session Active
          </div>
        </div>
      </div>
    </div>
  );
}