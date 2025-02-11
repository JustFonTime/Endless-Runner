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
        this.maxACSpeed = -400
        
        
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

        

        //up difficulty every 100m
        this.difficultyTimer = this.time.addEvent({
            delay: 10000,
            callback: this.difficultyIncrease,
            callbackScope: this,
            loop: true
        })
                
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
        let songNum = Phaser.Math.Between(1,2)

        this.bgm = this.sound.add('bgm' + songNum,{
            mute: false,
            volume: 0.5,
            rate: 1,
            loop: true,
        })
        this.bgm.play()


    }

    addObstacle(){
            //random lane
            let randLane = Phaser.Math.Between(1,4)

            //random car sprite
            let randCar = "car" + Phaser.Math.Between(1,4)

            //random speeds, spahgetti attempt
            let speedVarianceCar = this.carSpeed - Phaser.Math.Between(0, 50)
            let speedVarianceAC = this.ACSpeed - Phaser.Math.Between(0, 50)
            
            if(this.carSpeed - speedVarianceCar < this.maxCarSpeed){
                speedVarianceCar = this.carSpeed
            }

            if(this.ACSpeed - speedVarianceAC < this.maxACSpeed){
                speedVarianceAC = this.ACSpeed
            }
            
            //based on lane determine which sprite to show
            if(randLane == 2 || randLane == 3){
                let carObstacle = new Obstacle(this, this.game.config.width, null, randCar, 0, randLane, speedVarianceCar).setOrigin(0,0).setScale(3)
                carObstacle.play(randCar + '-drive')
                this.obstacleGroup.add(carObstacle)


            }
            else{
                let animaControlObstacle = new Obstacle(this, this.game.config.width, null, 'animacontrol', 0, randLane, speedVarianceAC).setOrigin(0,0)
                animaControlObstacle.play('acontrol-walk')
                this.obstacleGroup.add(animaControlObstacle)
            }
        }

    update(){

        //check if the game had ended
        if(!this.gameOver){
            //perform collision check to determine if game end
            this.physics.add.overlap(this.raccoon, this.obstacleGroup, this.collision, null, this)
        }

        if(this.gameOver){
            //handle end screen
            this.bgm.stop()
            this.scene.stop()
            this.scene.start("gameoverScene")   
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
    //plays sound according to obstacle hit
    collision(raccoon, obstacle){
        if(!obstacle.hit){
            obstacle.hit = true
            if (obstacle.texture.key.includes("car")) {
                endCause = 'crash'
                this.sound.play("crash") // Ensure 'carHit' is preloaded
                
            }
            else if(obstacle.texture.key.includes("animacontrol")){
                //this.cameras.main.fade(100, 0, 0, 0)
                endCause = 'ac'
                let rNum = Phaser.Math.Between(1,2)
                this.sound.play("caught" + rNum,)
            }
            this.gameOver = true
        }
        


    }

    difficultyIncrease(){
        //play sound
        this.sound.play('scoreSFX')

        //increase base speed of obstacles
        if(this.carSpeed >= this.maxCarSpeed){
            this.carSpeed -= 25
            //change bgm rate
            this.bgm.rate += 0.002
        }

        //increase base speed of obstacles
        if(this.ACSpeed >= this.maxACSpeed){
            this.ACSpeed -= 25
            //change bgm rate
            this.bgm.rate += 0.01
        }
    }

    
}