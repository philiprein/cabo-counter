import Game from './Game.js';
import Player from './Player.js';
import Storage from './Storage.js';
import UIManager from './UIManager.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

class App {
  constructor() {
    this._players = Storage.getPlayers();
    this._currentGame = Storage.getCurrentGame();
    this._ui = new UIManager();

    this._ui.renderPlayers(this._players);

    // Event listeners
    this._ui.newPlayerForm.addEventListener(
      'submit',
      this._addPlayer.bind(this)
    );

    this._ui.playerListEl.addEventListener(
      'click',
      this._modifyPlayer.bind(this)
    );

    this._ui.startGameButton.addEventListener(
      'click',
      this._startGame.bind(this)
    );

    this._ui.newRoundForm.addEventListener('submit', this._addRound.bind(this));

    this._ui.resetGameButton.addEventListener('click', () => {
      if (confirm('Are you sure?')) {
        this._restartGame();
      }
    });

    this._ui.editPlayersButton.addEventListener(
      'click',
      this._ui.renderSetupMode.bind(this._ui, this._players)
    );

    this._ui.newGameButton.addEventListener(
      'click',
      this._restartGame.bind(this)
    );

    this._ui.editPlayersButtonModal.addEventListener(
      'click',
      this._ui.renderSetupMode.bind(this._ui, this._players)
    );

    document.addEventListener('DOMContentLoaded', () => {
      if (this._currentGame) {
        const playersPlaying = this._players.filter(
          (player) => player.isPlaying
        );
        this._ui.renderGameMode(playersPlaying);
        this._ui.refreshScoreboard(this._currentGame);
      }
    });
  }

  _addPlayer(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const playerName = data.get('player-input');

    // Validate input
    if (!playerName) {
      alert('Please enter a player name');
      return;
    }

    // Create new player
    const player = new Player(playerName);
    this._players.push(player);
    Storage.savePlayers(this._players);

    // Rerender players
    this._ui.renderPlayers(this._players);

    // Reset form (clear input)
    e.target.reset();
  }

  _modifyPlayer(e) {
    if (e.target.classList.contains('btn-close')) {
      const id = e.target.parentElement.parentElement.getAttribute('data-id');
      this._removePlayer(id);
    } else if (e.target.classList.contains('player')) {
      const id = e.target.parentElement.getAttribute('data-id');
      this._changePlayerState(id);
    }
  }

  _removePlayer(id) {
    // Remove player
    this._players = this._players.filter((player) => player.id !== id);
    Storage.savePlayers(this._players);

    // Rerender players
    this._ui.renderPlayers(this._players);
  }

  _changePlayerState(id) {
    // Modify player state
    const player = this._players.find((player) => player.id === id);
    if (player) {
      player.isPlaying = !player.isPlaying;
    }
    Storage.savePlayers(this._players);

    // Rerender players
    this._ui.renderPlayers(this._players);
  }

  _startGame() {
    const playersPlaying = this._players.filter((player) => player.isPlaying);
    this._currentGame = new Game(playersPlaying);
    Storage.saveCurrentGame(this._currentGame);
    this._ui.renderGameMode(playersPlaying);
  }

  _addRound(e) {
    e.preventDefault();

    const data = new FormData(e.target);

    // Create new round
    const round = [];
    for (let player of this._currentGame.players) {
      const points = parseInt(data.get(`${player.id}-points`));
      if (isNaN(points)) {
        alert(`Please enter points for ${player.name}`);
        return;
      }
      round.push({ id: player.id, points: points });
    }

    // Validate that only one player has 0 points
    const zeroPoints = round.filter((p) => p.points === 0);
    if (zeroPoints.length === 0) {
      alert('At least one player must have 0 points');
      return;
    }

    // Add round to currentGame
    this._currentGame.addRound(round);
    Storage.saveCurrentGame(this._currentGame);

    // Refresh scoreboard
    this._ui.refreshScoreboard(this._currentGame);

    // Reset form (clear input)
    e.target.reset();

    // Check if game was won
    let winner = this._currentGame.checkWinner();
    if (winner !== null) {
      winner = this._players.find((player) => player.id === winner.id);

      // Show modal
      this._ui.displayGameOverModal(winner.name);

      // Add win
      winner.wins++;
      Storage.savePlayers(this._players);

      // Delete current game
      this._currentGame = null;
      Storage.deleteCurrentGame();
    }
  }

  _restartGame() {
    const playersPlaying = this._players.filter((player) => player.isPlaying);
    this._currentGame = new Game(playersPlaying);
    Storage.saveCurrentGame(this._currentGame);
    this._ui.resetScoreboard(this._players);
  }
}

const app = new App();
