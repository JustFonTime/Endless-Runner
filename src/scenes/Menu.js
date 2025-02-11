class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene")
    }

    preload(){
        //load player
        this.load.path = './assets/';
        this.load.image('street', 'street.png')
        this.load.spritesheet('raccoon', "raccoon.png", {
            frameWidth: 42,
            frameHeight: 22,
            startFrame: 0,
            endFrame: 15,
        })

        //load obstacles
        this.load.spritesheet('car1', "car1.png", {
            frameWidth: 64,
            frameHeight: 28,
            startFrame: 0,
            endFrame: 3,
        })
        this.load.spritesheet('car2', "car2.png", {
            frameWidth: 64,
            frameHeight: 28,
            startFrame: 0,
            endFrame: 3,
        })
        this.load.spritesheet('car3', "car3.png", {
            frameWidth: 64,
            frameHeight: 28,
            startFrame: 0,
            endFrame: 3,
        })
        this.load.spritesheet('car4', "car4.png", {
            frameWidth: 64,
            frameHeight: 28,
            startFrame: 0,
            endFrame: 3,
        })
        this.load.spritesheet('animacontrol', "animalcontrol.png", {
            frameWidth: 60,
            frameHeight: 88,
            startFrame: 0,
            endFrame: 5,
        })

        //load sounds
        this.load.audio('crash', "./sfx/deathSound.wav")
        this.load.audio('caught1', "./sfx/raccoon_01.mp3")
        this.load.audio('caught2', "./sfx/raccoon_02.mp3")
        
        this.load.audio('menuSFX', "./sfx/menuSound.wav")
        this.load.audio('scoreSFX', "./sfx/beep.wav")

        //load music
        this.load.audio('titleBGM', "./bgm/Fish_Lim - In the tunnel.mp3")
        this.load.audio('bgm1', "./bgm/Universfield - Happy Twist.mp3")
        this.load.audio('bgm2', "./bgm/Zane Little - Apple Cider.mp3")
        this.load.audio('gameOverBGM', "./bgm/Universfield - Melancholic Sad Piano.mp3")

        //load other images
        this.load.image('crashRaccoon', "crash.png")
        this.load.image('caughtRaccoon',"caught.png")
    }

    create(){
        //set keybinds
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        //create the animations
        if (!this.anims.exists('raccoon-run')) {
            this.anims.create({
                key: 'raccoon-run',
                frames: this.anims.generateFrameNumbers('raccoon', {start: 0, end: 15, first: 0}),
                framerate: 30,
                repeat: -1,
            })
        }

        if(!this.anims.exists('car1-drive') || !this.anims.exists('car2-drive') || !this.anims.exists('car3-drive') || !this.anims.exists('car4-drive')){
            this.anims.create({
                key: 'car1-drive',
                frames: this.anims.generateFrameNumbers('car1', {start: 0, end: 3, first: 0}),
                framerate: 30,
                repeat: -1,
            })
            this.anims.create({
                key: 'car2-drive',
                frames: this.anims.generateFrameNumbers('car2', {start: 0, end: 3, first: 0}),
                framerate: 30,
                repeat: -1,
            })
            this.anims.create({
                key: 'car3-drive',
                frames: this.anims.generateFrameNumbers('car3', {start: 0, end: 3, first: 0}),
                framerate: 30,
                repeat: -1,
            })
            this.anims.create({
                key: 'car4-drive',
                frames: this.anims.generateFrameNumbers('car4', {start: 0, end: 3, first: 0}),
                framerate: 30,
                repeat: -1,
            })
        }

        if(!this.anims.exists('acontrol-walk')){
            this.anims.create({
                key: 'acontrol-walk',
                frames: this.anims.generateFrameNumbers('animacontrol', {start: 0, end: 5, first: 0}),
                framerate: 12,
                repeat: -1,
            })
        }

        this.bgm = this.sound.add('titleBGM',{
            mute: false,
            volume: 0.5,
            rate: 1,
            loop: true,
        })

        if(!(menuMusicIsPlaying)){
            this.bgm.play()
            menuMusicIsPlaying = true
        }
        
    }

    update(){

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.sound.play('menuSFX', { volume: 0.5 }); 
            this.scene.start("creditsScene")
        }


        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            this.sound.play('menuSFX', { volume: 0.5 }); 
            this.scene.start("helpScene")
        }


        if (Phaser.Input.Keyboard.JustDown(keyENTER)){
            this.sound.stopAll()
            this.sound.play('menuSFX', { volume: 0.5 }); 
            this.scene.stop()
            this.scene.start("playScene")
            menuMusicIsPlaying = false
            endCause = null
        }

    }
}