const inputPlayerForm = document.getElementById('inputPlayerForm');
const playerInput = inputPlayerForm.querySelector('.form-control');
const addPlayerBtn = inputPlayerForm.querySelector('.btn');
const playerList = document.getElementById('playerList');
const startGameBtn = document.getElementById('startGameBtn');
const roundsTable = document.getElementById('roundsTable');
const inputRoundForm = document.getElementById('inputRoundForm');

function addPlayer(e) {
  e.preventDefault();

  // Validate input
  if (playerInput.value === '') {
    alert('Please enter a player name!');
    return;
  }

  const newPlayer = playerInput.value;
  const players = getValueFromLocalStorage('players');

  if (players.includes(newPlayer)) {
    alert('This player already exists!');
    return;
  }

  addPlayerToDOM(newPlayer);

  addPlayerToLocalStorage(newPlayer);

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
  innerDiv.className = 'position-relative p-3 rounded shadow-sm player';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'btn-close position-absolute top-0 end-0 m-2';
  const h4 = document.createElement('h4');
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
  if (e.target.classList.contains('btn-close')) {
    e.target.parentElement.parentElement.remove();

    // Add back filler text if all players were removed
    const players = playerList.querySelectorAll('.player');
    if (players.length === 0) {
      const div = document.createElement('div');
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
  const playersFromLocalStorage = getValueFromLocalStorage('players');
  playersFromLocalStorage.push(player);
  localStorage.setItem('players', JSON.stringify(playersFromLocalStorage));
}

function removePlayerFromLocalStorage(player) {
  let playersFromLocalStorage = getValueFromLocalStorage('players');
  playersFromLocalStorage = playersFromLocalStorage.filter((p) => p !== player);
  localStorage.setItem('players', JSON.stringify(playersFromLocalStorage));
}

function getValueFromLocalStorage(value) {
  let valueFromLocalStorage;

  if (localStorage.getItem(value) === null) {
    valueFromLocalStorage = [];
  } else {
    valueFromLocalStorage = JSON.parse(localStorage.getItem(value));
  }

  return valueFromLocalStorage;
}

function enterPlayMode() {
  // Disable and hide inputPlayerForm
  playerInput.disabled = true;
  addPlayerBtn.disabled = true;
  inputPlayerForm.parentElement.classList.add('visually-hidden');

  // Remove "Remove Player" buttons from players & add score
  const playersElems = playerList.querySelectorAll('.player');
  playersElems.forEach((playerElement) => {
    playerElement.firstElementChild.remove();
    const small = document.createElement('small');
    const points = document.createTextNode('Overall Points: 0');
    small.appendChild(points);
    playerElement.appendChild(small);
  });

  // Disable and hide "Start Game" button
  startGameBtn.disabled = true;
  startGameBtn.classList.add('visually-hidden');

  // Add players to scoreboard
  const players = getValueFromLocalStorage('players');
  players.forEach((player) => {
    // Add player to scoreboard
    const th = document.createElement('th');
    th.scope = 'col';
    th.textContent = player;
    roundsTable.firstElementChild.firstElementChild.appendChild(th);

    // Add player to inputRoundForm
    const input = document.createElement('input');
    input.type = 'number';
    input.min = 0;
    input.max = 50;
    input.name = `${player}-points`;
    input.className = 'form-control';
    input.placeholder = `${player}'s points`;
    inputRoundForm.firstElementChild.appendChild(input);
  });

  // Show inputRoundForm
  inputRoundForm.parentElement.classList.remove('visually-hidden');
}

function finishRound(e) {
  e.preventDefault();
  formData = new FormData(e.target);

  const newRound = [];
  const players = getValueFromLocalStorage('players');

  for (let player of players) {
    points = parseInt(formData.get(`${player}-points`));
    if (isNaN(points)) {
      alert(`Please enter points for ${player}`);
      return;
    }
    newRound.push(points);
  }

  addRoundToLocalStorage(newRound);

  refreshScoreboard();
}

function addRoundToLocalStorage(round) {
  const roundsFromLocalStorage = getValueFromLocalStorage('rounds');
  roundsFromLocalStorage.push(round);
  localStorage.setItem('rounds', JSON.stringify(roundsFromLocalStorage));
}

function refreshScoreboard() {
  const rounds = getValueFromLocalStorage('rounds');

  // Add round to rounds table
  const tbody = roundsTable.querySelector('tbody');
  while (tbody.firstElementChild) {
    tbody.firstElementChild.remove();
  }

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
  const overallPoints = {};
  const playerElems = playerList.querySelectorAll('.player');

  playerElems.forEach((playerElem, index) => {
    const points = rounds.reduce((acc, cur) => acc + cur[index], 0);
    if (points === 100) {
      points = 50;
    }
    overallPoints[playerElem.firstElementChild.textContent] = points;
    playerElem.querySelector('small').textContent = `Overall Points: ${points}`;
  });

  // Get player with highest amount of points
  const playerHighestAmountOfPoints = Object.entries(overallPoints).reduce(
    (max, [key, value]) => (value > max[1] ? [key, value] : max)
  );
  console.log(playerHighestAmountOfPoints);

  // Get player with lowest amount of points
  const playerLowestAmountOfPoints = Object.entries(overallPoints).reduce(
    (min, [key, value]) => (value < min[1] ? [key, value] : min)
  );
  console.log(playerLowestAmountOfPoints);

  if (playerHighestAmountOfPoints[1] > 100) {
    let winnerModal = document.getElementById('winnerModal');
    winnerModal.querySelector('.modal-title').textContent =
      playerLowestAmountOfPoints[0];
    winnerModal = new bootstrap.Modal(winnerModal);
    winnerModal.show();
  }

  // Show scoreboard
  if (rounds.length >= 1) {
    roundsTable.parentElement.classList.remove('visually-hidden');
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  const players = getValueFromLocalStorage('players');
  const rounds = getValueFromLocalStorage('rounds');
  players.forEach((player) => {
    addPlayerToDOM(player);
  });

  if (rounds.length > 0) {
    enterPlayMode();
    refreshScoreboard();
  }
});
inputPlayerForm.addEventListener('submit', addPlayer);
playerList.addEventListener('click', removePlayer);
startGameBtn.addEventListener('click', enterPlayMode);
inputRoundForm.addEventListener('submit', finishRound);
