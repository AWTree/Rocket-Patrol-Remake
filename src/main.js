// Arno Wu
// Rocket Patrol Remake
// 12h
/*
Implement the 'FIRE' UI text from the original game (1)
Implement the speed increase that happens after 30 seconds in the original game (1)
Create a new title screen (e.g., new artwork, typography, layout) (3)
Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
Implement an alternating two-player mode (5)
Implement mouse control for player movement and left mouse click to fire (5)
*/
// citations for any sources you used (you do not need to cite Nathan or Phaser documentation)

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play, Play2 ],
    physics: {
        default: 'arcade',
        arcade: {
           debug: false
        }
    }
}

let game = new Phaser.Game(config)

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT, keyFIRE2, keyLEFT2, keyRIGHT2, keyUP, keyDOWN, keySWITCH


