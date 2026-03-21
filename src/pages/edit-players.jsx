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
    <>
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
    </>
  );
};

export default EditPlayersPage;
