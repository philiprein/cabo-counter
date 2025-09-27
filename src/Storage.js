class Storage {
  static getPlayers() {
    const players = localStorage.getItem('players');
    return players === null ? [] : JSON.parse(players);
  }

  static savePlayers(players) {
    localStorage.setItem('players', JSON.stringify(players));
  }

  static getCurrentGame() {
    const currentGame = localStorage.getItem('currentGame');
    return currentGame === null ? null : JSON.parse(currentGame);
  }

  static saveCurrentGame(currentGame) {
    localStorage.setItem('currentGame', JSON.stringify(currentGame));
  }

  static deleteCurrentGame() {
    localStorage.removeItem('currentGame');
  }
}

export default Storage;
