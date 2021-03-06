import Phaser from 'phaser';

import archaicBtn from '../assets/ui/button.png';
import phaserLogo from '../assets/logo.png';
import box from '../assets/ui/grey_box.png';
import checkedBox from '../assets/ui/blue_boxCheckmark.png';
import bgMusic from '../assets/TownTheme.mp3';
import background from '../assets/nebula-bg.jpeg';

class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    const logoImg = this.add.image(450, 200, 'ultraLogo');
    logoImg.setDisplaySize(400, 300);

    const heroImg = this.add.image(
      this.game.config.width * 0.35,
      this.game.config.height / 3,
      'heroImg',
    );

    heroImg.setDisplaySize(100, 100);

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });

    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    this.load.image('background', background);
    this.load.image('archaicBtn', archaicBtn);
    this.load.image('phaserLogo', phaserLogo);

    this.load.image('box', box);
    this.load.image('checkedBox', checkedBox);
    this.load.audio('bgMusic', [bgMusic]);
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.scene.start('Title');

    this.readyCount += 1;

    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}

export default PreloaderScene;
