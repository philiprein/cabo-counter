import { useState } from 'react';

const RoundForm = ({
  players,
  setPlayers,
  game,
  setGame,
  handleResetGame,
  handleEditPlayers,
  setShowModal,
}) => {
  const [formData, setFormData] = useState(
    players.reduce((acc, { id }) => ({ ...acc, [id]: '' }), {}),
  );

  const calculateUpdatedPlayers = (prevPlayers, newRound) => {
    const updated = prevPlayers.map((player) =>
      player.isPlaying
        ? {
            ...player,
            points:
              player.points + newRound[player.id] === 100
                ? 50
                : player.points + newRound[player.id],
          }
        : player,
    );

    const highest = updated.reduce((max, p) =>
      p.points > max.points ? p : max,
    );

    if (highest.points <= 100) return { players: updated, winner: null };

    const lowest = updated.reduce((min, p) =>
      p.points < min.points ? p : min,
    );

    return {
      players: updated.map((p) =>
        p.id === lowest.id ? { ...p, wins: p.wins + 1 } : p,
      ),
      winner: lowest,
    };
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new round
    const newRound = {};
    for (let [playerId, points] of Object.entries(formData)) {
      points = parseInt(points);
      if (isNaN(points)) {
        alert(
          `Please enter points for ${players.find((player) => player.id === playerId)?.name}`,
        );
        return;
      }
      newRound[playerId] = points;
    }

    // Validate that at least one player has 0 points
    if (Object.values(newRound).filter((points) => points === 0).length < 1) {
      alert('At least one player must have 0 points');
      return;
    }

    // Add round to game state
    setGame((prevGame) => ({
      ...game,
      rounds: [...game.rounds, newRound],
    }));

    // Add rounds points to player's overall points
    setPlayers((prevPlayers) => {
      const { players: newPlayers, winner } = calculateUpdatedPlayers(
        prevPlayers,
        newRound,
      );

      if (winner) {
        setShowModal(true);
      }

      return newPlayers;
    });

    // Reset form
    setFormData((prev) =>
      Object.fromEntries(Object.keys(prev).map((key) => [key, ''])),
    );
  };

  return (
    <div className='container mb-4'>
      <form id='round-form' className='mb-2' onSubmit={handleSubmit}>
        <div className='input-group col-auto'>
          <span className='input-group-text'>
            Round {game.rounds.length + 1}
          </span>
          {players.map((player) => (
            <input
              key={player.id}
              name={player.id}
              value={formData[player.id]}
              type='number'
              min='0'
              max='50'
              className='form-control'
              placeholder={`${player.name}'s points`}
              onChange={handleChange}
            />
          ))}
        </div>
      </form>
      <div className='col d-flex justify-content-between'>
        <div>
          <button type='submit' form='round-form' className='btn btn-cabo'>
            Finish Round
          </button>
        </div>
        <div>
          <button
            className={`btn btn-cabo me-2 ${game.rounds.length > 0 && 'disabled'}`}
            onClick={handleEditPlayers}>
            Edit Players
          </button>
          <button className='btn btn-cabo' onClick={handleResetGame}>
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoundForm;
