import { useNavigate } from 'react-router';

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
        <div
          className='modal show d-block'
          tabIndex='-1'
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          data-bs-backdrop='static'
          data-bs-keyboard='false'>
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content rounded-3 shadow'>
              <div className='modal-header'>
                <h5 className='modal-title'>Game Over</h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'></button>
              </div>
              <div className='modal-body'>
                <p>
                  Congratulations!&nbsp;
                  <strong>
                    {
                      players.reduce((min, player) =>
                        player.points < min.points ? player : min,
                      ).name
                    }
                  </strong>
                  &nbsp;won!
                </p>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                  onClick={handleEditPlayers}>
                  Edit Players
                </button>
                <button
                  id='new-game-button'
                  type='button'
                  className='btn btn-cabo'
                  onClick={handleResetGame}>
                  Start New Game
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
