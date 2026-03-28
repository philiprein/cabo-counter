import { useNavigate } from 'react-router';
import { FaUsers, FaUndo } from 'react-icons/fa';

import PlayerList from '../components/PlayerList';
import RoundForm from '../components/RoundForm';
import RoundsTable from '../components/RoundsTable';

const GamePage = ({
  players,
  setPlayers,
  game,
  setGame,
  showModal,
  setShowModal,
}) => {
  const navigate = useNavigate();

  const handleResetGame = () => {
    // Reset rounds
    setGame((prevGame) => ({
      ...game,
      rounds: [],
    }));

    // Reset player points
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        // Leave players that are not playing as is
        player.isPlaying
          ? {
              ...player,
              points: 0,
            }
          : player,
      ),
    );

    setShowModal(false);
  };

  const handleEditPlayers = () => {
    // Reset game
    setGame({
      inProgress: false,
      rounds: [],
    });

    // Reset player points
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        // Leave players that are not playing as is
        player.isPlaying
          ? {
              ...player,
              points: 0,
            }
          : player,
      ),
    );

    setShowModal(false);

    // Go back to edit players page
    navigate('/');
  };

  return (
    <main className='grow max-w-7xl mx-auto w-full px-6 py-10'>
      <PlayerList players={players} game={game} />
      <RoundsTable
        players={players.filter((player) => player.isPlaying)}
        game={game}
      />
      <RoundForm
        players={players.filter((player) => player.isPlaying)}
        setPlayers={setPlayers}
        game={game}
        setGame={setGame}
        handleResetGame={handleResetGame}
        handleEditPlayers={handleEditPlayers}
        setShowModal={setShowModal}
      />
      {showModal && (
        <div className='fixed inset-0 z-100 flex items-center justify-center p-4 bg-cabo-black/40 backdrop-blur-sm'>
          <div className='relative max-w-2xl tactile-card bg-cabo-green overflow-hidden rounded-3xl'>
            <div className='relative pt-4 pb-2 px-3 text-center'>
              <div className='mb-8'>
                <span className='text-4xl md:text-7xl cabo-title'>
                  We have a winner!
                </span>
              </div>
              <div class='relative inline-block mb-10'>
                <div className='p-6 tactile-card'>
                  <h3 className='font-title text-4xl font-black text-cabo-black uppercase mb-1'>
                    {
                      players
                        .filter((player) => player.isPlaying)
                        .reduce((min, player) =>
                          player.points < min.points ? player : min,
                        ).name
                    }
                  </h3>
                  <p className='text-xs font-black text-cabo-black/50 uppercase'>
                    {
                      players
                        .filter((player) => player.isPlaying)
                        .reduce((min, player) =>
                          player.points < min.points ? player : min,
                        ).title
                    }
                  </p>
                </div>
              </div>
              <div class='flex gap-4 justify-evenly'>
                <button
                  className='px-8 py-3 gap-3 mb-3 flex items-center tactile-btn bg-cabo-red'
                  onClick={handleEditPlayers}>
                  <FaUsers />
                  Edit Players
                </button>
                <button
                  className='px-8 py-3 gap-3 mb-3 flex items-center tactile-btn bg-cabo-red'
                  onClick={handleResetGame}>
                  <FaUndo />
                  Reset Game
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default GamePage;
