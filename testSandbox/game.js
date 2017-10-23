//***********************************************************************************
// SACk Attack build 2.0
// AUTHOR: Reginald Hardin
// DATE: 19 Oct 17
//
// PURPOSE: Attempted SA build using modular format (multiple JS and html files
//
//**********************************************************************************

// game.js

// build world
var game = new Phaser.Game(800, 600, Phaser.AUTO, null, 'gameDiv');

// add each game state

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('title', titleState);
game.state.add('play', playState);

//call bootState
game.state.start('boot');
