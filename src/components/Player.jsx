const Player = ({ player, playing, deletePlayer, updatePlayerStatus }) => {
  return (
    <>
      <div
        className='col-4'
        {...(!playing && {
          onClick: () => updatePlayerStatus(player.id),
        })}>
        <div
          className={`position-relative p-3 rounded shadow-sm player ${
            player.isPlaying
              ? ''
              : 'opacity-25 bg-secondary text-body-secondary'
          }`}>
          {!playing && (
            <button
              type='button'
              className='btn-close position-absolute top-0 end-0 m-2'
              onClick={() => deletePlayer(player.id)}></button>
          )}
          <h4>{player.name}</h4>
          <small>Wins: {player.wins}</small>
          {playing && (
            <>
              <br />
              <small>Points: {player.points}</small>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Player;
