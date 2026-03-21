const RoundsTable = ({ game, players }) => {
  return (
    <>
      {game.rounds.length > 0 && (
        <div className='container text-center mb-4'>
          <div className='table-responsive rounded'>
            <table className='table table-striped table-bordered overflow-hidden'>
              <thead>
                <tr>
                  <th style={{ width: '1%', whiteSpace: 'nowrap' }}>Round</th>
                  {players.map((player) => (
                    <th scope='col' key={player.id}>
                      {player.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {game.rounds.map((round, index) => (
                  <tr key={index}>
                    <td style={{ width: '1%', whiteSpace: 'nowrap' }}>
                      Round {index + 1}
                    </td>
                    {Object.entries(round).map(([playerId, points]) => (
                      <td key={playerId}>{points}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default RoundsTable;
