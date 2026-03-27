import { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';

const PlayerForm = ({ players, setPlayers }) => {
  const [formData, setFormData] = useState({
    playerName: '',
  });

  const playerTitles = [
    'Master of the Zero',
    'Tactical Shuffler',
    'Spying Menace',
    'Professional Peeker',
    'Card Curious',
    'Silent Observer',
    'Swap Saboteur',
    'Card Contemplator',
    'Deceptive Dealer',
    'Cabo Conqueror',
    'Forgetful Finder',
    'Wrong Card Again',
    'Accidental Genius',
    'Still Peeking',
    'Lucky Draw Club',
    'Calculated Caller',
    'Last‑Turn Legend',
    'Zero or Bust',
    'Swap Addict',
    'Point Minimizer',
    'Confused but Confident',
    'Lucky Draw Club',
    'Accidental Genius',
    'Memory Monster',
    'Scoreless Tyrant',
    'No‑Look Cabo',
    'Eyes Everywhere',
    'Card Whisperer',
    'Oops Wrong Card',
  ];

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
      title: playerTitles[Math.floor(Math.random() * playerTitles.length)],
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
          <div className='flex items-center gap-2 p-2 tactile-card'>
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
              className='px-8 py-3 flex items-center gap-2 tactile-btn font-black'>
              <FaUserPlus />
              <span className='hidden sm:inline'>Add Player</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PlayerForm;
