class Obstacle extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, lane){
        super(scene, x, y, texture, frame, lane)

        scene.add.existing(this)
        this.currentLane = lane
        this.speed = 4
    }

    update(){

        //spawn location of object
        switch (this.currentLane) {
            case 1:
                this.setY(Math.ceil((lane01_top + lane01_bottom)/2))
                break;
            case 2:
                this.setY(Math.ceil((lane02_top + lane02_bottom)/2))
                break;
            case 3:
                this.setY(Math.ceil((lane03_top + lane03_bottom)/2))
                break;
            case 4:
                this.setY(Math.ceil((lane04_top + lane04_bottom)/2))
                break;
        
            default:
                break;
        }

        //move obstacles, if obstacle reaches off screen destroy it 
        if(this.x < (0 - this.width * 2)){
            this.destroy()
        }
        else{
            this.x -= this.speed
        }
    }
}