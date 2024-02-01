// Arno Wu
// Rocket Patrol Remake
// 10 hours
// Implement the 'FIRE' UI text from the original game (1)
// Implement the speed increase that happens after 30 seconds in the original game (1)
// Display the time remaining (in seconds) on the screen (3)
// Create a new title screen (e.g., new artwork, typography, layout) (3)
// Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
// Implement an alternating two-player mode (5)
// Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses (5)
// Implement mouse control for player movement and left mouse click to fire (5)
// Phaser Documentation

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play, Play2]
}

let game = new Phaser.Game(config)

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyFIRE2, keyLEFT2, keyRIGHT2


