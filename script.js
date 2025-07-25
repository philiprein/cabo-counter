const inputPlayerForm = document.getElementById('inputPlayerForm');
const playerInput = inputPlayerForm.querySelector('.form-control');
const addPlayerBtn = inputPlayerForm.querySelector('.btn');
const playerList = document.getElementById('playerList');
const startGameBtn = document.getElementById('startGameBtn');
const roundsTable = document.getElementById('roundsTable');
const inputRoundPointsForm = document.getElementById('inputRoundPointsForm');
const newGameBtn = document.getElementById('newGameBtn');
const editPlayersBtn = document.getElementById('editPlayersBtn');
const winnerModal = document.getElementById('winnerModal');
let bootstrapWinnerModal;

function addPlayer(e) {
  e.preventDefault();

  // Validate that a name has been entered
  if (playerInput.value === '') {
    alert('Please enter a player name!');
    return;
  }

  // Validate that player does not already exist
  const newPlayer = playerInput.value;
  const players = getListValueFromLocalStorage('players');

  if (players.includes(newPlayer)) {
    alert('This player already exists!');
    return;
  }

  // Add player to DOM
  addPlayerToDOM(newPlayer);

  // Add player to local storage
  addPlayerToLocalStorage(newPlayer);

  // Empty player input
  playerInput.value = '';
}

function addPlayerToDOM(name) {
  // Remove filler text if present
  const players = playerList.querySelectorAll('.player');
  if (players.length === 0) {
    playerList.firstElementChild.remove();
  }

  // Create player element
  const outerDiv = document.createElement('div');
  outerDiv.className = 'col-4';
  const innerDiv = document.createElement('div');
  innerDiv.className = 'position-relative p-3 rounded shadow player';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'btn btn-sm btn-close position-absolute top-0 end-0 m-1';
  const h4 = document.createElement('h4');
  h4.className = 'm-2';
  const playerName = document.createTextNode(name);
  h4.appendChild(playerName);
  innerDiv.appendChild(button);
  innerDiv.appendChild(h4);
  outerDiv.appendChild(innerDiv);

  // Add player element to player list
  playerList.appendChild(outerDiv);

  // Enable "Start Game" button if 2 (+1 to account for player that was just added) players were added
  if (players.length + 1 >= 2) {
    startGameBtn.classList.remove('disabled');
  }
}

function removePlayer(e) {
  // Validate that close button has been pressed
  if (e.target.classList.contains('btn-close')) {
    // Remove player from DOM
    e.target.parentElement.parentElement.remove();

    // Add back filler text if all players were removed
    const players = playerList.querySelectorAll('.player');
    if (players.length === 0) {
      const div = document.createElement('div');
      div.classList = 'col-12';
      div.textContent = 'Please add at least 2 players to start';
      playerList.appendChild(div);
    }

    // Disable "Start Game" button if number of players is lower than 2
    if (players.length < 2) {
      startGameBtn.classList.add('disabled');
    }

    // Remove player from local storage
    removePlayerFromLocalStorage(e.target.nextElementSibling.textContent);
  }
}

function addPlayerToLocalStorage(player) {
  // Get list of players from local storage
  const playersFromLocalStorage = getListValueFromLocalStorage('players');

  // Add new player to list of players
  playersFromLocalStorage.push(player);

  // Write list of players to local storage
  localStorage.setItem('players', JSON.stringify(playersFromLocalStorage));
}

function removePlayerFromLocalStorage(player) {
  // Get list of players from local storage
  let playersFromLocalStorage = getListValueFromLocalStorage('players');

  // Remove player from list of players
  playersFromLocalStorage = playersFromLocalStorage.filter((p) => p !== player);

  // Write list of players to local storage
  localStorage.setItem('players', JSON.stringify(playersFromLocalStorage));
}

function getListValueFromLocalStorage(key) {
  // Set list value depeding on if it is already present or not
  let listValueFromLocalStorage;
  if (localStorage.getItem(key) === null) {
    listValueFromLocalStorage = [];
  } else {
    listValueFromLocalStorage = JSON.parse(localStorage.getItem(key));
  }

  return listValueFromLocalStorage;
}

function enterPlayMode() {
  // Disable and hide player input form
  playerInput.disabled = true;
  addPlayerBtn.disabled = true;
  inputPlayerForm.parentElement.classList.add('visually-hidden');

  // Remove "Remove Player" buttons from players & add score
  const playersElems = playerList.querySelectorAll('.player');
  playersElems.forEach((playerElem) => {
    playerElem.firstElementChild.remove();
    const small = document.createElement('small');
    const points = document.createTextNode('Overall Points: 0');
    small.appendChild(points);
    playerElem.appendChild(small);
  });

  // Disable and hide "Start Game" button
  startGameBtn.disabled = true;
  startGameBtn.classList.add('visually-hidden');

  // Add players to scoreboard & input round points form
  const players = getListValueFromLocalStorage('players');
  players.forEach((player) => {
    // Add player to scoreboard
    const th = document.createElement('th');
    th.scope = 'col';
    th.textContent = player;
    roundsTable.firstElementChild.firstElementChild.appendChild(th);

    // Add player to input round points form
    const input = document.createElement('input');
    input.type = 'number';
    input.min = 0;
    input.max = 50;
    input.name = `${player}-points`;
    input.className = 'form-control';
    input.placeholder = `${player}'s points`;
    inputRoundPointsForm.firstElementChild.appendChild(input);
  });

  // Show input round points form
  inputRoundPointsForm.parentElement.classList.remove('visually-hidden');

  // Adjust round number in input round points form
  inputRoundPointsForm.firstElementChild.firstElementChild.textContent =
    'Round 1';
}

function enterSetupMode() {
  // Emable and show player input form
  playerInput.disabled = false;
  addPlayerBtn.disabled = false;
  inputPlayerForm.parentElement.classList.remove('visually-hidden');

  // Add "Remove Player" buttons to players & remove score
  const playersElems = playerList.querySelectorAll('.player');
  playersElems.forEach((playerElem) => {
    playerElem.lastElementChild.remove();
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-sm btn-close position-absolute top-0 end-0 m-1';
    playerElem.prepend(button);
  });

  // Enable and show "Start Game" button
  startGameBtn.disabled = false;
  startGameBtn.classList.remove('visually-hidden');

  // Reset scoreboard
  while (
    roundsTable.firstElementChild.firstElementChild.lastElementChild &&
    roundsTable.firstElementChild.firstElementChild.childElementCount > 1
  ) {
    roundsTable.firstElementChild.firstElementChild.lastElementChild.remove();
  }

  // Reset input rounds form
  while (
    inputRoundPointsForm.firstElementChild.lastElementChild &&
    inputRoundPointsForm.firstElementChild.childElementCount > 1
  ) {
    inputRoundPointsForm.firstElementChild.lastElementChild.remove();
  }

  // Hide scoreboard & input round points form
  inputRoundPointsForm.parentElement.classList.add('visually-hidden');
  roundsTable.parentElement.classList.add('visually-hidden');

  // Delete rounds from storage
  localStorage.removeItem('rounds');
}

function finishRound(e) {
  e.preventDefault();
  formData = new FormData(e.target);

  const newRound = [];
  const players = getListValueFromLocalStorage('players');

  // Add points of each player to the new round
  for (let player of players) {
    // Validate that a number has been entered
    points = parseInt(formData.get(`${player}-points`));
    if (isNaN(points)) {
      alert(`Please enter points for ${player}`);
      return;
    }

    // Add player's points to the new round
    newRound.push(points);
  }

  // Validate that at least one player has 0 points
  if (!newRound.includes(0)) {
    alert('At least one player must have 0 points');
    return;
  }

  // Validate that only one player has 0 points
  if (newRound.reduce((count, x) => (x === 0 ? count + 1 : count), 0) >= 2) {
    alert('Only one player can have 0 points');
    return;
  }

  // Add new round to local storage
  addRoundToLocalStorage(newRound);

  // Reset form inputs
  inputRoundPointsForm.reset();

  // Calcule overall amount of points for all players
  const rounds = getListValueFromLocalStorage('rounds');
  const overallPoints = getOverallPoints(players, rounds);

  // Refresh the scoreboard
  refreshScoreboard(rounds, overallPoints);

  // Check there is a winner
  const winner = getWinner(overallPoints);

  // Display winner modal if there is a winner
  if (winner) {
    winnerModal.querySelector(
      '.modal-body'
    ).firstElementChild.textContent = `Congratulations, ${winner} won the game!`;
    bootstrapWinnerModal = new bootstrap.Modal(winnerModal);
    bootstrapWinnerModal.show();
  }
}

function addRoundToLocalStorage(round) {
  // Get list of rounds from local storage
  const roundsFromLocalStorage = getListValueFromLocalStorage('rounds');

  // Add new round to list of rounds
  roundsFromLocalStorage.push(round);

  // Write list of rounds to local storage
  localStorage.setItem('rounds', JSON.stringify(roundsFromLocalStorage));
}

function refreshScoreboard(rounds, overallPoints) {
  // Add round to scoreboard
  // Remove all currently displayed rounds from DOM
  const tbody = roundsTable.querySelector('tbody');
  while (tbody.firstElementChild) {
    tbody.firstElementChild.remove();
  }

  // Create new row element for each round and add to DOM
  rounds.forEach((round, index) => {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.textContent = index + 1;
    tr.appendChild(td);
    round.forEach((point) => {
      const td = document.createElement('td');
      td.textContent = point;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  // Adjust player points
  const playerElems = playerList.querySelectorAll('.player');
  playerElems.forEach((playerElem) => {
    const points = overallPoints[playerElem.firstElementChild.textContent];
    playerElem.querySelector('small').textContent = `Overall Points: ${points}`;
  });

  // Show scoreboard if at least one round has been played, hide if not
  rounds.length >= 1
    ? roundsTable.parentElement.classList.remove('visually-hidden')
    : roundsTable.parentElement.classList.add('visually-hidden');

  // Adjust round number in input round points form
  inputRoundPointsForm.firstElementChild.firstElementChild.textContent = `Round ${
    rounds.length + 1
  }`;
}

function getOverallPoints(players, rounds) {
  const overallPoints = {};

  players.forEach((player, index) => {
    // Calculate amount of points for player accross all rounds
    let points = rounds.reduce((acc, cur) => {
      acc = acc + cur[index];
      // Implement special Cabo rule that if a player has exactly 100 points, their score is reduced to 50
      if (acc === 100) {
        acc = 50;
      }
      return acc;
    }, 0);

    // Add player's points to overall points dict
    overallPoints[player] = points;
  });

  return overallPoints;
}

function getWinner(overallPoints) {
  // Get player with highest amount of points
  const playerHighestAmountOfPoints = Object.entries(overallPoints).reduce(
    (max, [key, value]) => (value > max[1] ? [key, value] : max)
  );

  // Get player with lowest amount of points
  const playerLowestAmountOfPoints = Object.entries(overallPoints).reduce(
    (min, [key, value]) => (value < min[1] ? [key, value] : min)
  );

  if (playerHighestAmountOfPoints[1] > 100) {
    return playerLowestAmountOfPoints[0];
  } else {
    return null;
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  const players = getListValueFromLocalStorage('players');
  const rounds = getListValueFromLocalStorage('rounds');
  players.forEach((player) => {
    addPlayerToDOM(player);
  });

  if (rounds.length > 0) {
    enterPlayMode();
    refreshScoreboard(rounds, getOverallPoints(players, rounds));
  }
});
inputPlayerForm.addEventListener('submit', addPlayer);
playerList.addEventListener('click', removePlayer);
startGameBtn.addEventListener('click', enterPlayMode);
inputRoundPointsForm.addEventListener('submit', finishRound);
editPlayersBtn.addEventListener('click', enterSetupMode);
newGameBtn.addEventListener('click', (e) => {
  bootstrapWinnerModal.hide();
  localStorage.removeItem('rounds');
  refreshScoreboard(
    [],
    getOverallPoints(getListValueFromLocalStorage('players'), [])
  );
});
