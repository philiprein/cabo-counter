import PlayerForm from '../components/PlayerForm';
import PlayerList from '../components/PlayerList';

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
      <div className='container text-center'>
        <button
          className={`btn btn-cabo ${players.filter((player) => player.isPlaying).length >= 2 ? '' : 'disabled'}`}
          onClick={startGame}>
          Start Game
        </button>
      </div>
    </main>
  );
};

export default EditPlayersPage;
