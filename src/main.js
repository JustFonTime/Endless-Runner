//
// Game Title: Raccoon Runna
//     im so sorry for the lacking title
//
// Name: Justin Fong
//
// Time Spent: 22 hours (approximately)
//
//
//
//
// Creative Tilt Justification:
// 
// Techincal Aspect:
//
//      I guess the only somewhat technically interesting technique I could get implemented was how I did the prefab for the obstacles, rather than having it be individual for the two sprite types, the car and animal control people,
//      I combined it so it could be used for both, with potential for even more if I had time. Basically when I did the random generation for the sprites I had it go through if statements to see which sprite it would be spawning in, and 
//      limited them to certain lanes in the game. Unfortunately I was unable to figure out a way to implement some of my ideas that I thought would be actually be technically interesting, my first idea was having a day/night cycle that would trigger 
//      after checkpoints (i.e Dino Run), and then during the night phase there would be light sources from the obstacle sprites. For example, the car would have a light source from the headlight, and the animal control would have an alternate image with 
//      a flashlight, which would be the other light source. I tried to de-scope and just go for a sort of game wide tint to simulate day and night, however I couldn't quite get it to work with the time I had left.       
//
//  Artistic Aspect:
//      
//      Seeing as I couldn't get everything I was going for with the technical aspect, I tried to put a lot more of the remaining time into making the art assets for the game. I have very limited experience with art let alone the pixel art, so 
//      it did take me longer than I had expected to get some of the assets looking how I wanted. As I meantion below, I used a reference for the running animation of the raccoon, and mostly just recolored it. However, all the other art was fully
//      just me doing it. I would say I'm most proud of the animal control people, I know the animation ended up a little wonky for this and the others, but for how much experience I had I think it turned out not as bad as I thought it would while 
//      making it. I did also add game over art that would swap out based on what ended your run of the game, I'm pretty proud of how those ended up looking in the end. 
// 
//      Anyways, Thank You for Playing! 🦝
//
// Credits:
//     raccoon drawing original: https://www.reddit.com/r/animation/comments/qwbg1h
//         just for remaking and recoloring the animated raccoon
//
//     music: https://freemusicarchive.org
//         Melancholic Piano - Universefield
//         Happy Twist - Universefield
//         In the Tunnel - Fish_Lim
//         Apple Cider - Zane Little
//
//     sfx: https://sfbgames.itch.io/chiptone
//         forgot to mention in the credits page but the raccoon sounds were from the google search of raccoons, there are two soundbytes that you can get when you press the button
//

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

