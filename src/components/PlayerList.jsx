import Player from './Player';

const PlayerList = ({ players, game, deletePlayer, updatePlayerStatus }) => {
  const playersPlaying = players.filter((player) => player.isPlaying);

  return (
    <section className='grid grid-cols-2 md:grid-cols-3 gap-8 mb-12 align-items-center'>
      {game.inProgress
        ? playersPlaying
            .sort((playerA, playerB) => playerA.points - playerB.points)
            .map((player, index) => (
              <Player
                key={player.id}
                player={player}
                playing={true}
                position={index + 1}
                last={playersPlaying.length === index + 1}
              />
            ))
        : players.map((player) => (
            <Player
              key={player.id}
              player={player}
              playing={false}
              deletePlayer={deletePlayer}
              updatePlayerStatus={updatePlayerStatus}
            />
          ))}
    </section>
  );
};

export default PlayerList;
