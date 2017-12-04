//***********************************************************************************
// SACk Attack build 2.3
// AUTHOR: Reginald Hardin
// DATE: 3 Dec 17
//
// PURPOSE: Attempted SA build using modular format (multiple JS and html files)
// 
//				DEMO VERSION
//**********************************************************************************

// game.js

// build world
var game = new Phaser.Game(800, 600, Phaser.AUTO, null, 'gameDiv');

// add each game state

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('title', titleState);
game.state.add('level1', playState);
/* game.state.add('level2', playState);
game.state.add('level3', playState); */

//call bootState
game.state.start('boot');
