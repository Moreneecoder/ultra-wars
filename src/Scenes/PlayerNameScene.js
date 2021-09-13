import Phaser from 'phaser';
// import Button from '../Objects/Button';
import archaicBtn from '../assets/ui/button.png';

class PlayerNameScene extends Phaser.Scene {
    constructor() {
        super('PlayerName');       
    }

    preload() {
        this.load.image('archaicBtn', archaicBtn);
    }

    create() {
      this.text = this.add.text(this.game.config.width * 0.28, 100, 'ENTER YOUR NAME', { fontSize: 40 });

      const input = document.createElement('input')
      this.style(input);
      
      this.nameInput = this.add.dom(this.game.config.width / 2, this.game.config.height / 2.5, input)
    
      this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

      this.returnKey.on("down", () => {        

        let userName = this.setName(input.value, this.localStore)

        if(userName){
            this.scene.start('Game')
        }

      });
    }

    setName = (value, callback) => {
        let output = false;

        if(value != "") {
            // this.message.setText("Hello, " + name.value);            
            callback(value)
            value = "";

            output = true;
        }

        return output;
    }

    localStore = (value) => {
        localStorage.setItem('ultraName', value)
    }

    style = element => {
      element.style.padding = '1em'
      element.style.width = `${(this.game.config.width / 2).toString()}px`
      element.style.fontSize = '1.5em'
      element.style.textAlign = 'center'
      element.style.fontWeight = 'bold'
    }
}

export default PlayerNameScene