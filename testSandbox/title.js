//***********************************************************************************
// SACk Attack build 2.0
// AUTHOR: Reginald Hardin
// DATE: 19 Oct 17
//
// PURPOSE: Attempted SA build using modular format (multiple JS and html files
//
//**********************************************************************************

// title.js

var titleState = {
	create: function(){
		var nameLabel = game.add.text(350, 300, "Click anywhere to start", {
		font: '14px Tahoma', fill: '#ffffff'});
		
		//game.input.activePointer.capture = true;
		
		//******************
		// Only  for testing!!!! This is removed for normal operation
		//**********************
		
		game.state.start('play')
	},
	update: function(){
		if (game.input.activePointer.isDown) {
			game.state.start('play')
		}
	}
}