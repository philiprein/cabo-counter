import { useState } from 'react';

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
    <div onSubmit={handleSubmit} className='container mb-4'>
      <form className='row g-3 justify-content-center'>
        <div className='col-auto'>
          <input
            name='playerName'
            value={formData.playerName}
            onChange={handleChange}
            className='form-control'
            placeholder='Name'
            autoComplete='off'
            required
          />
        </div>
        <div className='col-auto'>
          <button type='submit' className='btn btn-cabo'>
            Add Player
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlayerForm;
