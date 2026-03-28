import { useState } from 'react';
import { FaPlus, FaUsers, FaUndo } from 'react-icons/fa';

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
    <section className='max-w-7xl mx-auto'>
      <div className='tactile-card p-6 rounded-2xl bg-white border-cabo-black mb-4'>
        <form
          id='round-form'
          className='flex flex-col md:flex-row items-center gap-6'
          onSubmit={handleSubmit}>
          <div
            class={`flex-1 grid grid-cols-2 md:grid-cols-${players.length > 4 ? '4' : players.length} gap-4 w-full`}>
            {players.map((player) => (
              <div className='space-y-1'>
                <label className='block text-xs font-black text-cabo-black uppercase ml-1'>
                  {player.name}
                </label>
                <input
                  key={player.id}
                  name={player.id}
                  value={formData[player.id]}
                  type='number'
                  min='0'
                  max='50'
                  className='w-full bg-cabo-green-shade border-2 border-cabo-black rounded-xl p-4 text-2xl font-black focus:ring-2 focus:ring-cabo-green focus:border-cabo-green focus:bg-white transition-all outline-none'
                  placeholder='0'
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
          <button
            className='w-full md:w-auto h-20 px-8 py-3 flex items-center justify-center gap-3 text-xl tactile-btn font-black'
            type='submit'>
            <FaPlus />
            Add Round
          </button>
        </form>
      </div>
      <div className='flex justify-between'>
        <button
          className={`px-8 py-3 gap-3 mb-3 flex items-center tactile-btn ${game.rounds.length > 0 ? 'bg-cabo-red/60' : 'bg-cabo-red'}`}
          onClick={handleEditPlayers}
          disabled={game.rounds.length > 0}>
          <FaUsers />
          Edit Players
        </button>
        <button
          className='px-8 py-3 gap-3 mb-3 flex items-center tactile-btn bg-cabo-red'
          onClick={handleResetGame}>
          <FaUndo />
          Reset Game
        </button>
      </div>
    </section>
  );
};

export default RoundForm;
