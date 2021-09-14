import Phaser from 'phaser';
import * as LeaderBoardAPI from '../API/ldboard';
import Button from '../Objects/Button';

class HighScoresScene extends Phaser.Scene {
  constructor() {
    super('HighScores');
  }

  create() {
    this.title = this.add.text(this.game.config.width * 0.4, 50, 'High Scores', { fontSize: 32 });

    this.getScores()
      .then((response) => {
        this.print(response.result);
      });

    this.menuButton = new Button(this, 400, 550, 'archaicBtn', 'archaicBtn', 'Menu', 'Title');
  }

  getScores = () => {
    const result = LeaderBoardAPI.getScores();

    return result.then((response) => response.json());
  }

  print(data) {
    let yPosition = 100;
    data.every((element, index) => {
      if (index > 9) {
        return false;
      }

      this.add.text(this.game.config.width * 0.3, yPosition, element.user, { fontSize: 24 });
      this.add.text(this.game.config.width * 0.65, yPosition, element.score, { fontSize: 24 });
      yPosition += 50;

      return true;
    });
  }
}

export default HighScoresScene;