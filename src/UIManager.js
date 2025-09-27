import { Modal } from 'bootstrap';

class UIManager {
  constructor() {
    this.newPlayerForm = document.getElementById('new-player-form');
    this.playerListEl = document.getElementById('player-list');
    this.startGameButton = document.getElementById('start-game-button');
    this.roundsTable = document.getElementById('rounds-table');
    this.newRoundForm = document.getElementById('new-round-form');
    this.resetGameButton = document.getElementById('reset-game-button');
    this.editPlayersButton = document.getElementById('edit-players-button');
    this.gameOverModal = document.getElementById('game-over-modal');
    this.editPlayersButtonModal = document.getElementById(
      'edit-players-button-modal'
    );
    this.newGameButton = document.getElementById('new-game-button');
  }

  renderPlayers(players) {
    // Remove list content
    while (this.playerListEl.firstElementChild) {
      this.playerListEl.firstElementChild.remove();
    }

    // Render players or placeholder
    if (players.length > 0) {
      players.forEach((player) => {
        // Create player element
        const playerEl = document.createElement('div');
        playerEl.classList.add('col-4');
        playerEl.setAttribute('data-id', player.id);
        const innerDiv = document.createElement('div');
        innerDiv.classList.add(
          'position-relative',
          'p-3',
          'rounded',
          'shadow-sm',
          'player'
        );
        if (!player.isPlaying) {
          innerDiv.classList.add(
            'opacity-25',
            'bg-secondary',
            'text-body-secondary'
          );
        }
        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.classList.add(
          'btn-close',
          'position-absolute',
          'top-0',
          'end-0',
          'm-2'
        );
        const playerName = document.createElement('h4');
        playerName.textContent = player.name;
        const totalWins = document.createElement('small');
        totalWins.textContent = `Wins: ${player.wins}`;
        innerDiv.append(removeButton, playerName, totalWins);
        playerEl.append(innerDiv);

        // Add player element to player list
        this.playerListEl.append(playerEl);
      });
    } else {
      // Create placeholder element
      const placeholderEl = document.createElement('div');
      const placeholderText = document.createElement('p');
      placeholderText.classList.add('text-nowrap', 'opacity-50');
      placeholderText.textContent = 'Please add at least 2 players to start';
      placeholderEl.append(placeholderText);

      // Add placeholder element to player list
      this.playerListEl.append(placeholderEl);
    }

    // Enable "Start Game" button if at least 2 players were added and are playing, disable otherwise
    const playersPlaying = players.filter((player) => player.isPlaying);
    if (playersPlaying.length >= 2) {
      this.startGameButton.classList.remove('disabled');
    } else {
      this.startGameButton.classList.add('disabled');
    }
  }

  renderGameMode(players) {
    // Disable and hide new player form
    this.newPlayerForm.classList.add('visually-hidden');
    this.newPlayerForm.firstElementChild.firstElementChild.disabled = true;
    this.newPlayerForm.lastElementChild.firstElementChild.disabled = true;

    // Modify player elements
    const playersEls = document.querySelectorAll('.player');
    playersEls.forEach((playerEl) => {
      // Remove player elements for players that are not playing
      if (playerEl.classList.contains('opacity-25')) {
        playerEl.parentElement.remove();
        return;
      }
      // Remove "Remove Player" button
      playerEl.firstElementChild.remove();
      // Show overall points
      const lineBreak = document.createElement('br');
      const overallPoints = document.createElement('small');
      overallPoints.textContent = 'Points: 0';
      playerEl.append(lineBreak, overallPoints);
    });

    // Disable and hide "Start Game" button
    this.startGameButton.disabled = true;
    this.startGameButton.classList.add('visually-hidden');

    players.forEach((player) => {
      // Add player to rounds table
      const th = document.createElement('th');
      th.scope = 'col';
      th.textContent = player.name;
      this.roundsTable.firstElementChild.firstElementChild.append(th);

      // Add player to new round form
      const input = document.createElement('input');
      input.type = 'number';
      input.min = 0;
      input.max = 50;
      input.name = `${player.id}-points`;
      input.className = 'form-control';
      input.placeholder = `${player.name}'s points`;
      this.newRoundForm.firstElementChild.append(input);
    });

    // Show new round form
    this.newRoundForm.parentElement.classList.remove('visually-hidden');
  }

  renderSetupMode(players) {
    // Enable and show new player form
    this.newPlayerForm.firstElementChild.firstElementChild.disabled = false;
    this.newPlayerForm.lastElementChild.firstElementChild.disabled = false;
    this.newPlayerForm.classList.remove('visually-hidden');

    // Rerender players
    this.renderPlayers(players);

    // Enable and show "Start Game" button
    this.startGameButton.disabled = false;
    this.startGameButton.classList.remove('visually-hidden');

    // Reset rounds table
    while (
      this.roundsTable.firstElementChild.firstElementChild.lastElementChild &&
      this.roundsTable.firstElementChild.firstElementChild.childElementCount > 1
    ) {
      this.roundsTable.firstElementChild.firstElementChild.lastElementChild.remove();
    }

    // Reset new round form
    while (
      this.newRoundForm.firstElementChild.lastElementChild &&
      this.newRoundForm.firstElementChild.childElementCount > 1
    ) {
      this.newRoundForm.firstElementChild.lastElementChild.remove();
    }

    // Hide rounds table & new round form
    this.roundsTable.parentElement.parentElement.classList.add(
      'visually-hidden'
    );
    this.newRoundForm.parentElement.classList.add('visually-hidden');
  }

  refreshScoreboard(game) {
    // Empty rounds table
    const tbody = this.roundsTable.lastElementChild;
    while (tbody.firstElementChild) {
      tbody.firstElementChild.remove();
    }

    // Add rounds of current game to rounds table
    game.rounds.forEach((round, index) => {
      const rowEl = document.createElement('tr');
      const roundNumberEl = document.createElement('td');
      roundNumberEl.textContent = `Round ${index + 1}`;
      rowEl.append(roundNumberEl);
      round.forEach((points) => {
        const pointsEl = document.createElement('td');
        pointsEl.textContent = points.points;
        rowEl.append(pointsEl);
      });
      tbody.append(rowEl);
    });

    // Adjust player points
    game.players.forEach((player) => {
      const playerEl = this.playerListEl.querySelector(
        `[data-id="${player.id}"]`
      );
      const overallPoints = playerEl.querySelectorAll('small')[1];
      overallPoints.textContent = `Points: ${player.overallPoints}`;
    });

    if (game.rounds.length >= 1) {
      // Show scoreboard
      this.roundsTable.parentElement.parentElement.classList.remove(
        'visually-hidden'
      );
      // Disable edit players button
      this.editPlayersButton.disabled = true;
    }
  }

  resetScoreboard(players) {
    // Reset rounds table
    while (this.roundsTable.lastElementChild.firstElementChild) {
      this.roundsTable.lastElementChild.firstElementChild.remove();
    }
    this.roundsTable.parentElement.parentElement.classList.add(
      'visually-hidden'
    );

    // Reset overall points in player elements
    const playersEls = document.querySelectorAll('.player');
    playersEls.forEach((playerEl) => {
      const smalls = playerEl.querySelectorAll('small');
      // Update wins
      const playedId = playerEl.parentElement.getAttribute('data-id');
      const wins = smalls[0];
      const player = players.find((player) => player.id === playedId);
      wins.textContent = `Wins: ${player.wins}`;

      // Reset overall points
      const overallPoints = smalls[1];
      overallPoints.textContent = 'Points: 0';
    });

    // Enable edit players button
    this.editPlayersButton.disabled = false;

    // Dismiss modal
    const gameOverModal = Modal.getInstance(this.gameOverModal);
    if (gameOverModal) {
      gameOverModal.hide();
    }
  }

  displayGameOverModal(winnerName) {
    // Set winner name
    this.gameOverModal.querySelector('#winner-name').textContent = winnerName;

    // Show modal
    const gameOverModal = new Modal(this.gameOverModal);
    gameOverModal.show();
  }
}

export default UIManager;
