class GameOver extends Phaser.Scene{
    constructor(){
        super("gameoverScene")
    }


    create(){
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)



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

        this.bgm = this.sound.add('gameOverBGM',{
            mute: false,
            volume: 0.5,
            rate: 1,
            loop: true,
        })
        this.bgm.play()
        
        if(endCause == 'crash'){
            this.add.image(game.config.width/6,game.config.height/10 - borderUISize*2, 'crashRaccoon').setOrigin(0).setScale(5) 
        }
        else if(endCause == 'ac'){
            this.add.image(game.config.width/6,game.config.height/8 - borderUISize*2, 'caughtRaccoon').setOrigin(0).setScale(5) 
        }
        
        
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', textConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', textConfig).setOrigin(0.5)
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.sound.stopAll()
            this.sound.play('menuSFX', { volume: 0.5 }); 
            this.scene.stop()
            this.scene.start("menuScene")
            endCause = null
        }


        if (Phaser.Input.Keyboard.JustDown(keyRESET)){
            this.sound.stopAll()
            this.sound.play('menuSFX', { volume: 0.5 }); 
            this.scene.stop()
            this.scene.start("playScene")
            endCause = null
        }
    }
}