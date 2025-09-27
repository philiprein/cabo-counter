class Game {
  constructor(players) {
    this.id = Math.random().toString(16).slice(2);
    this.players = players.map((player) => ({
      id: player.id,
      overallPoints: 0,
    }));
    this.rounds = [];
  }

  addRound(round) {
    this.rounds.push(round);

    round.forEach((points) => {
      const player = this.players.find((player) => player.id === points.id);
      player.overallPoints += points.points;
      if (player.overallPoints === 100) {
        player.overallPoints = 50;
      }
    });
  }

  checkWinner() {
    // Get player with highest amount of points
    const playerHighestAmountOfPoints = this.players.reduce((max, player) =>
      player.overallPoints > max.overallPoints ? player : max
    );

    // Get player with lowest amount of points
    const playerLowestAmountOfPoints = this.players.reduce((min, player) =>
      player.overallPoints < min.overallPoints ? player : min
    );

    if (playerHighestAmountOfPoints.overallPoints > 100) {
      return playerLowestAmountOfPoints;
    } else {
      return null;
    }
  }
}

export default Game;
