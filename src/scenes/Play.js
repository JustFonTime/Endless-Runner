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
        this.raccoon = new Raccoon(this, this.game.config.width/16, this.game.config.height/2, 'raccoon', 0, 0).setOrigin(0,0).setScale(2)
        //const raccoon = this.add.sprite(100, 225, 'raccoon').setScale(4)
        this.raccoon.play('raccoon-run')


        // this.car1 = new Obstacle(this, this.game.config.width, this.game.config.height/2, 'car1', 0, 1).setOrigin(0,0).setScale(2)
        // this.car1.play('car1-drive')


        this.car2 = new Obstacle(this, this.game.config.width, this.game.config.height/2, 'car2', 0, 2).setOrigin(0,0).setScale(2)
        this.car2.play('car2-drive')
        this.car3 = new Obstacle(this, this.game.config.width, this.game.config.height/2, 'car3', 0, 3).setOrigin(0,0).setScale(2)
        this.car3.play('car3-drive')
        

    }

    update(){

        //check if the game had ended

            //perform collision check to determine if game end


        //scroll the background
        this.street.tilePositionX += 3


        //update player positions
        this.raccoon.update()


        //randomize obstacle position (the lane it spawns in)

        //update obstacle positions

        //this.car1.update()
        this.car2.update()
        this.car3.update()
        
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
    checkCollision(raccoon, obstacle){

    }

}