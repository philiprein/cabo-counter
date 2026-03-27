import { FaPlay, FaInfoCircle } from 'react-icons/fa';

import PlayerForm from '../components/PlayerForm';
import PlayerList from '../components/PlayerList';
import StatsOverview from '../components/StatsOverview';

const EditPlayersPage = ({
  players,
  setPlayers,
  game,
  deletePlayer,
  updatePlayerStatus,
  startGame,
}) => {
  return (
    <main className='grow max-w-7xl mx-auto w-full px-6 py-10'>
      <PlayerForm players={players} setPlayers={setPlayers} />
      <PlayerList
        players={players}
        game={game}
        deletePlayer={deletePlayer}
        updatePlayerStatus={updatePlayerStatus}
      />
      <div className='max-w-2xl mx-auto justify-items-center'>
        <button
          className={`px-16 py-6 gap-4 mb-3 flex items-center tactile-btn text-3xl font-black ${players.filter((player) => player.isPlaying).length >= 2 ? 'bg-cabo-red' : 'bg-cabo-red/60'}`}
          onClick={startGame}
          disabled={
            players.filter((player) => player.isPlaying).length >= 2
              ? false
              : true
          }>
          <FaPlay /> Start Game
        </button>
        <div className='text-sm font-semibold text-white flex items-center gap-2'>
          <FaInfoCircle />
          <p>Please add at least two active players to start</p>
        </div>
      </div>
      <StatsOverview players={players} />
    </main>
  );
};

export default EditPlayersPage;
