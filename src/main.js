// Game Title:
// Name: Justin Fong
// Time Spent:

// Creative Tilt Justification:

//Credits:
    //raccoon drawing original: https://www.reddit.com/r/animation/comments/qwbg1h
        //I only remade and recolored the raccoon for this
    //music: https://freemusicarchive.org
        //
    //sfx: https://sfbgames.itch.io/chiptone

'use strict'

const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        },
    },
    scene: [ Menu, Help, Credits, Play, GameOver],
}

const game = new Phaser.Game(config)

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// set lane borders
let lane01_top = 62
let lane01_bottom = 136
let lane02_top = 150
let lane02_bottom = 238
let lane03_top = 252
let lane03_bottom = 338
let lane04_top = 356
let lane04_bottom = 438


//key bindings
let keyUP, keyDOWN, keyLEFT, keyRIGHT, keyENTER, keyRESET

let menuMusicIsPlaying
let highScore
let endCause

