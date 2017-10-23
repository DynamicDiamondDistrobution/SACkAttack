//***********************************************************************************
// SACk Attack build 2.0
// AUTHOR: Reginald Hardin
// DATE: 19 Oct 17
//
// PURPOSE: Attempted SA build using modular format (multiple JS and html files
//
//**********************************************************************************

// load.js

var loadState = {
	preload: function(){
		var loadingLabel = game.add.text(350, 300, 'loading...', {font: '30px Tahoma', fill: '#ffffff'}); 
		
		// scale the game/screen
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.stage.backgroundColor = '#7f7fff';
		
		// load graphics
		game.load.image('sky', 'assets/sky.png');
		game.load.image('ground', 'assets/testg.png');
		game.load.image('book', 'assets/newBook.png');
		game.load.image('spike', 'assets/spike.png');
		game.load.image('roller', 'assets/OGBaddie.png', 32, 32);
		game.load.image('dude', 'assets/newDude.png', 32, 32);
		game.load.tilemap('level1', 'assets/levelOneTest.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tiles', 'assets/testworld.png');
		game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
		game.load.spritesheet('ranged', 'assets/rangedBaddie.png', 32,32);
		
		// load sounds
		
	},
	create: function(){
		game.state.start('title');
	}
};
