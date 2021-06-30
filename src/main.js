/*
Name: Melissa Liu
Project Title: Rocket Patrol Mod
Date: June 30, 2021
Time Spent: ~12 hours

Points Breakdown:
30 points - Implement a simultaneous two-player mode.
60 points - Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi).

Total points: 90 (+ 20 points for completing the tutorial)
*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT, keyA, keyD, keyL;