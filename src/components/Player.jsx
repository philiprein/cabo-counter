import { FaTrashAlt } from 'react-icons/fa';

const Player = ({
  player,
  playing,
  position,
  last,
  deletePlayer,
  updatePlayerStatus,
}) => {
  return (
    <div
      className={`flex flex-col relative p-6 tactile-card cursor-pointer transform hover:scale-[1.05] transition-all duration-200 ${player.isPlaying ? '' : 'bg-white/60 grayscale opacity-80'}`}
      {...(!playing && {
        onClick: () => updatePlayerStatus(player.id),
      })}>
      <div className='flex justify-between mb-4'>
        <span
          className={`text-[10px] font-black border-2 border-cabo-black px-2 py-0.5 rounded-lg uppercase ${playing ? (position === 1 ? 'text-white bg-cabo-green' : last ? 'text-white bg-cabo-red' : 'text-cabo-black bg-white/80') : player.isPlaying ? 'text-white bg-cabo-green' : 'text-cabo-black bg-white/80'}`}>
          {playing
            ? position === 1
              ? '1st place'
              : position === 2
                ? '2nd place'
                : position === 3
                  ? '3rd place'
                  : `${position}th place`
            : player.isPlaying
              ? 'Playing'
              : 'Sitting Out'}
        </span>
        {!playing && (
          <button
            className={`hover:scale-110 transition-transform ${player.isPlaying ? 'text-cabo-red' : 'text-cabo-black'}`}
            type='button'
            onClick={() => deletePlayer(player.id)}>
            <FaTrashAlt />
          </button>
        )}
      </div>

      <div className='flex gap-3 mb-4'>
        <div>
          <h3 className='font-title text-4xl font-black text-cabo-black uppercase mb-1'>
            {player.name}
          </h3>
          {!playing && (
            <p className='text-xs font-black text-cabo-black/50 uppercase'>
              {player.title}
            </p>
          )}
        </div>
      </div>

      {playing ? (
        <div className='flex items-baseline gap-1 mt-1'>
          <span
            className={`text-5xl font-black ${position === 1 ? 'text-cabo-green' : last && 'text-cabo-red'}`}>
            {player.points}
          </span>
          <span className='text-xs font-black uppercase'>Points</span>
        </div>
      ) : (
        <div
          className={`border-2  rounded-xl flex items-end justify-between p-4 ${player.isPlaying ? 'bg-cabo-green-shade border-cabo-black' : 'bg-black/5 border-cabo-black/30'}`}>
          <div>
            <p className='text-[10px] font-black text-cabo-black/60 uppercase'>
              Total Wins
            </p>
            <p
              className={`text-6xl font-black font-title  leading-none ${player.isPlaying ? 'text-cabo-black' : 'text-cabo-black/40'}`}>
              {player.wins}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
