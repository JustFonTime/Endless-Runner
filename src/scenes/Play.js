class Play extends Phaser.Scene{
    constructor(){
        super("playScene")
    }

    create(){

        //add in tilesprite for scrolling background
        this.street = this.add.tileSprite(0,0,this.game.config.width, this.game.config.height, 'street').setOrigin(0).setScrollFactor(1)


        //define key bindings
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

        //game over flag
        this.gameOver = false

        //max obstacles allowed at a time
        this.carSpeed = -200
        this.maxCarSpeed = -800
        this.ACSpeed = -150
        this.maxACSpeed = - 300
        
        
        //initialize variable to store player current score
        this.playerScore = 0

        //config for displaqying the score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#FFFFFF',
            align: 'center',
            padd: {
                top: 5,
                bottom: 5,
            },
            
        }   

        //display the players current score
        this.scoreText = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.playerScore + 'm', scoreConfig)

        //every 1 second, add to the score
        this.scoreClock()

        //draw in the player character and start the running animation
        this.raccoon = new Raccoon(this, this.game.config.width/16, this.game.config.height/2, 'raccoon', 0, 0).setOrigin(0,0).setScale(1.5)
        this.physics.add.existing(this.raccoon)
        this.raccoon.play('raccoon-run')

        this.time.addEvent({
            delay: 1700,
            callback: this.addObstacle,
            callbackScope: this,
            loop: true
        });

        this.obstacleGroup = this.add.group({
            runChildUpdate: true
        })


        //background music

        let bgmConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            loop: true,
            delay: 0,
        }
        // const bgm = this.sound.add('bgm', bgmConfig);
        // bgm.play()

    }

    addObstacle(){
            //random lane
            let randLane = Phaser.Math.Between(1,4)
            let randCar = "car" + Phaser.Math.Between(1,4)
            
            //based on lane determine which sprite to show
            if(randLane == 2 || randLane == 3){
                let carObstacle = new Obstacle(this, this.game.config.width, null, randCar, 0, randLane, this.carSpeed).setOrigin(0,0).setScale(3)
                carObstacle.play(randCar + '-drive')
                this.obstacleGroup.add(carObstacle)
            }
            else{
                let animaControlObstacle = new Obstacle(this, this.game.config.width, null, 'animacontrol', 0, randLane, this.ACSpeed).setOrigin(0,0)
                animaControlObstacle.play('acontrol-walk')
                this.obstacleGroup.add(animaControlObstacle)
            }
            
        }

    update(){

        //check if the game had ended
        if(!this.gameOver){
            //perform collision check to determine if game end
            this.physics.add.collider(this.raccoon, this.obstacleGroup, this.collision, null, this)


            if((this.playerScore % 200) == 0 && this.playerScore > 0){
                this.difficultyIncrease()
            }
        }

        if(this.gameOver){
            this.scene.restart()
        }

        //scroll the background
        this.street.tilePositionX += 3

        //update player positions
        this.raccoon.update()
        
    }

    //recursive call to update the player score
    scoreClock(){
        this.clock = this.time.delayedCall(100, () => {
            this.playerScore += 1
            this.scoreText.setText(`${this.playerScore}m`)
            this.clock.remove()
            this.scoreClock()
        }, null, this)
    }

    //checks collision between raccoon and obstacle
    collision(){
        this.gameOver = true
    }

    difficultyIncrease(){
        console.log('increasing difficulty')
    }

    
}