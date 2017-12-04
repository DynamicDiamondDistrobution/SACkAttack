//***********************************************************************************
// SACk Attack build 2.3
// AUTHOR: Reginald Hardin
// DATE: 3 Dec 17
//
// PURPOSE: Attempted SA build using modular format (multiple JS and html files)
// 
//				DEMO VERSION
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
		game.load.image('book', 'assets/newBook.png');
		game.load.image('tiles', 'assets/testworld.png');
		
		
		game.load.spritesheet('roller', 'assets/rollerSprite.png', 36, 48);
		game.load.spritesheet('boss', 'assets/bossSprite3.png', 94, 123);
		game.load.spritesheet('dude', 'assets/PedroSan.png', 32, 48);
		game.load.spritesheet('ranged', 'assets/rangedBaddie.png', 32,32);
		game.load.spritesheet('tBook', 'assets/bookCLOCKwise.png', 32,32);
		
		
		// game.load.tilemap('level1', 'data/levelOneTest.json', null, Phaser.Tilemap.TILED_JSON);
		// game.load.tilemap('level2', 'data/levelTwoTest1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('level3', 'data/levelThreeTest1.json', null, Phaser.Tilemap.TILED_JSON);
		
		
		
		// load sounds
		
	},
	create: function(){
		game.state.start('title');
	}
};
