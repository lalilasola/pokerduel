import { GameState, FarcasterUser } from '@/types/poker';
import PlayerSection from './PlayerSection';
import CommunityCards from './CommunityCards';
import GameActions from './GameActions';

interface GameTableProps {
  gameState: GameState;
  onCall: () => void;
  onFold: () => void;
  currentUser: FarcasterUser | null;
}

export default function GameTable({ gameState, onCall, onFold, currentUser }: GameTableProps) {
  const [player, opponent] = gameState.players;

  return (
    <div className="relative bg-gradient-to-br from-poker-green to-green-700 rounded-3xl shadow-2xl border-8 border-wood-brown p-8 min-h-[600px]">
      {/* Opponent Section (Top) */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md">
        <PlayerSection
          player={opponent}
          isCurrentUser={false}
          showCards={false}
          position="top"
        />
      </div>

      {/* Community Cards Section (Center) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <CommunityCards
          cards={gameState.communityCards}
          pot={gameState.pot}
          phase={gameState.phase}
        />
      </div>

      {/* Player Section (Bottom) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md">
        <PlayerSection
          player={player}
          isCurrentUser={true}
          showCards={true}
          position="bottom"
          communityCards={gameState.communityCards}
        />
      </div>

      {/* Game Actions */}
      {gameState.phase !== 'ended' && !player?.hasFolded && (
        <GameActions
          onCall={onCall}
          onFold={onFold}
          currentBet={gameState.currentBet}
          phase={gameState.phase}
          canAct={gameState.phase !== 'showdown'}
        />
      )}
    </div>
  );
}
