//***********************************************************************************
// SACk Attack build 2.3
// AUTHOR: Reginald Hardin
// DATE: 3 Dec 17
//
// PURPOSE: Attempted SA build using modular format (multiple JS and html files)
// 
//				DEMO VERSION
//**********************************************************************************

// boot.js

var bootState = { // create "boot" state for game
	create: function() {
		// load ARCADE physics system and load the game
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.state.start('load');
	}
};
