import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router';

import EditPlayersPage from './pages/edit-players';
import GamePage from './pages/game';
import NotFoundPage from './pages/not-found';

import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const [players, setPlayers] = useState(() => {
    const players = JSON.parse(localStorage.getItem('players'));
    return players || [];
  });
  const [game, setGame] = useState(() => {
    const game = JSON.parse(localStorage.getItem('game'));
    return (
      game || {
        inProgress: false,
        rounds: [],
      }
    );
  });
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem('game', JSON.stringify(game));
  }, [game]);

  const deletePlayer = (id) => {
    setPlayers(players.filter((player) => player.id !== id));
  };

  const updatePlayerStatus = (id) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === id ? { ...player, isPlaying: !player.isPlaying } : player,
      ),
    );
  };

  const startGame = () => {
    setGame((prevGame) => ({
      ...prevGame,
      inProgress: true,
    }));
    navigate('/game');
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            game.inProgress ? (
              <Navigate to='/game' replace />
            ) : (
              <EditPlayersPage
                players={players}
                setPlayers={setPlayers}
                game={game}
                deletePlayer={deletePlayer}
                updatePlayerStatus={updatePlayerStatus}
                startGame={startGame}
              />
            )
          }
        />
        <Route
          path='/game'
          element={
            game.inProgress &&
            players.filter((player) => player.isPlaying).length > 1 ? (
              <GamePage
                players={players}
                setPlayers={setPlayers}
                game={game}
                setGame={setGame}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            ) : (
              <Navigate to='/' replace />
            )
          }
        />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
