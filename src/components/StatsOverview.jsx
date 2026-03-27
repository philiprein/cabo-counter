const StatsOverview = ({ players }) => {
  const leaders = players.reduce(
    (acc, player) => {
      if (player.wins > acc.maxWins)
        return { maxWins: player.wins, players: [player.name] };
      if (player.wins === acc.maxWins) acc.players.push(player.name);
      return acc;
    },
    { maxWins: -Infinity, players: [] },
  );

  return (
    <section className='mt-20'>
      <h2 className='text-xs font-black uppercase tracking-[0.25em] text-white drop-shadow-md mb-8 flex items-center gap-4'>
        <span className='w-12 h-1 bg-white inline-block'></span>
        Session Overview
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        {leaders.maxWins > 0 && (
          <div className='md:col-span-2 tactile-card bg-cabo-green p-8 text-white flex flex-col justify-between'>
            <div>
              <p className='text-5xl font-black uppercase leading-tight'>
                {leaders.players.join(', ')}
              </p>
              <p className='font-black text-cabo-yellow uppercase text-xs tracking-widest'>
                currently {leaders.players.length > 1 ? 'have' : 'has'} the most
                wins
              </p>
            </div>
          </div>
        )}
        <div className='tactile-card bg-white p-8 flex flex-col justify-between'>
          <p className='text-[10px] font-black uppercase tracking-widest text-on-surface/50'>
            Total Rounds
          </p>
          <p className='text-7xl font-black text-on-surface'>
            {players.reduce((acc, player) => acc + player.wins, 0)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsOverview;
