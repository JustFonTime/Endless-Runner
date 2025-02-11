class Credits extends Phaser.Scene{
    constructor(){
        super("creditsScene")
    }

    create(){
         //set keybinds
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        let textConfig = {
            fontFamily: 'Comic Sans',
            fontSize: '30px',
            color: '#FFFFFF',
            align: 'center',
            padd: {
                top: 5,
                bottom: 5,
            },
            
        }   

        this.add.text(game.config.width/2, game.config.height/2, 'CREDITS', textConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press ← for Menu', textConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 128, 'Press → for Help', textConfig).setOrigin(0.5)
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.sound.play('menuSFX', { volume: 0.5 }); 
            this.scene.start("menuScene")
        }


        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            this.sound.play('menuSFX', { volume: 0.5 }); 
            this.scene.start("helpScene")
        }
    }
}