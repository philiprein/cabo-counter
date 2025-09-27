class Player {
  constructor(name) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.wins = 0;
    this.isPlaying = true;
  }
}

export default Player;
