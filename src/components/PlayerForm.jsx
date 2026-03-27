import { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';

const PlayerForm = ({ players, setPlayers }) => {
  const [formData, setFormData] = useState({
    playerName: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input
    if (!formData.playerName) {
      return;
    }

    // Create new player
    const newPlayer = {
      id: Math.random().toString(16).slice(2),
      name: formData.playerName,
      points: 0,
      wins: 0,
      isPlaying: true,
    };

    // Add player to state
    setPlayers([...players, newPlayer]);

    // Reset form data
    setFormData({
      playerName: '',
    });
  };

  return (
    <section className='mb-12'>
      <div className='max-w-2xl mx-auto'>
        <form onSubmit={handleSubmit}>
          <div className='border-4 border-solid border-cabo-black shadow-[4px_4px_0_#002b00] p-2 rounded-xl flex items-center gap-2 bg-cabo-white'>
            <input
              name='playerName'
              value={formData.playerName}
              onChange={handleChange}
              className='grow focus:outline-none px-4 py-3 text-lg font-black text-cabo-black placeholder:text-cabo-black/30 uppercase'
              placeholder='Enter player name...'
              autoComplete='off'
              type='text'
              required
            />
            <button
              type='submit'
              className='border-3 border-solid border-cabo-black shadow-[0_4px_0_#002b00] bg-cabo-green text-white px-8 py-3 font-black uppercase flex items-center gap-2 rounded-xl transition-all duration-100 ease-in-out active:shadow-[0_2px_0_#002b00] active:translate-y-[2px] cursor-pointer'>
              <FaUserPlus />
              <span class='hidden sm:inline'>Add Player</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PlayerForm;
