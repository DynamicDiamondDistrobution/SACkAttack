//***********************************************************************************
// SACk Attack build 2.3
// AUTHOR: Reginald Hardin
// DATE: 3 Dec 17
//
// PURPOSE: Attempted SA build using modular format (multiple JS and html files)
// 
//				DEMO VERSION
//**********************************************************************************

// title.js

var titleState = {
	create: function(){
		var nameLabel0 = game.add.text(200, 100, "SACk ATTACK!!", {
		font: '48px Tahoma', fill: '#670202'});
		var nameLabel1 = game.add.text(300, 200, "Use Arrow Keys to move: LEFT, RIGHT, and UP.", {
		font: '14px Tahoma', fill: '#ffffff'});
		var nameLabel2 = game.add.text(350, 300, "Click anywhere to start", {
		font: '14px Tahoma', fill: '#ffffff'});
		
		game.input.activePointer.capture = true;
		
		/*********************************
		*
		*  REMOVE game.state line before final
		*
		/**********************************/
		
		// game.state.start('level1')
	},
	update: function(){
		if (game.input.activePointer.isDown) {
			game.state.start('level2')
		}
	}
}