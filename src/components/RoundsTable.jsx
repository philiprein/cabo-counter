const RoundsTable = ({ game, players }) => {
  return (
    <>
      {game.rounds.length > 0 && (
        <section className='tactile-card rounded-2xl overflow-hidden mb-12'>
          <div className='p-6 border-b-4 border-cabo-black flex justify-between items-center bg-white'>
            <h3 className='font-black text-2xl uppercase'>Round History</h3>
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='bg-cabo-green text-white border-b-4 border-cabo-black'>
                  <th className='px-6 py-4 font-black uppercase tracking-widest border-r-4 border-on-surface/20'>
                    Round
                  </th>
                  {players.map((player) => (
                    <th
                      scope='col'
                      key={player.id}
                      className='px-6 py-4 font-black text-lg uppercase'>
                      {player.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='divide-y-2 divide-on-surface/10'>
                {game.rounds.map((round, index) => (
                  <tr
                    className='hover:bg-cabo-green/5 transition-colors'
                    key={index}>
                    <td className='px-6 py-4 font-black text-on-surface border-r-4 border-on-surface/10 bg-gray-50/50'>
                      {`${index + 1}`.padStart(2, '0')}
                    </td>
                    {Object.entries(round).map(([playerId, points]) => (
                      <td
                        className='px-6 py-4 font-black text-xl'
                        key={playerId}>
                        {points}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
};

export default RoundsTable;
