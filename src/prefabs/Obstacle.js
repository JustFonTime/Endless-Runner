class Obstacle extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, lane, speed){
        super(scene, x, y, texture, frame, lane, speed)

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.body.setVelocityX(speed)
        this.currentLane = lane
    }

    update(){

        //spawn location of object
        switch (this.currentLane) {
            case 1:
                this.setY(Math.ceil((lane01_top + lane01_bottom)/2) - this.height/3)
                break;
            case 2:
                this.setY(Math.ceil((lane02_top + lane02_bottom)/2) - this.height/2)
                break;
            case 3:
                this.setY(Math.ceil((lane03_top + lane03_bottom)/2) - this.height/2)
                break;
            case 4:
                this.setY(Math.ceil((lane04_top + lane04_bottom)/2) - this.height/3)
                break;
            default:
                break;
        }

        //move obstacles, if obstacle reaches off screen destroy it 
        if(this.x < -this.width){
            this.destroy()
        }
        
    }
}