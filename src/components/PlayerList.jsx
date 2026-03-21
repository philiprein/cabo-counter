import Player from './Player';

const PlayerList = ({ players, game, deletePlayer, updatePlayerStatus }) => {
  return (
    <div className='container-lg text-center mb-4'>
      <div className='row row-cols-2 row-cols-md-3 row-cols-lg-5 g-3 justify-content-center'>
        {players.length > 0 ? (
          game.inProgress ? (
            players
              .filter((player) => player.isPlaying)
              .map((player) => (
                <Player key={player.id} player={player} playing={true} />
              ))
          ) : (
            players.map((player) => (
              <Player
                key={player.id}
                player={player}
                playing={false}
                deletePlayer={deletePlayer}
                updatePlayerStatus={updatePlayerStatus}
              />
            ))
          )
        ) : (
          <div>
            <p className='text-nowrap opacity-50'>
              Please add at least 2 players to start
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerList;
