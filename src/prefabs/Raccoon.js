class Raccoon extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, lane){
        super(scene, x, y, texture, frame, lane)

        scene.add.existing(this)
        
        this.runSpeed = 2
        this.currentLane = lane
    }

    update(){
        
        //move raccoon based on player input
        if(keyUP.isDown && this.y >= lane01_top){
            this.y -= this.runSpeed
        }

        if(keyDOWN.isDown && this.y < lane04_bottom){
            this.y += this.runSpeed
        }


        //determine which lane raccoon is currently in
        if(this.y < lane01_bottom){
            this.currentLane = 1

        }else if(this.y >= lane02_top && this.y <= lane02_bottom){
            this.currentLane = 2
            
        }else if(this.y >= lane03_top && this.y <= lane03_bottom){
            this.currentLane = 3

        }else if(this.y >= lane04_top && this.y <= lane04_bottom){
            this.currentLane = 4

        }

    }
}