//***********************************************************************************
// SACk Attack build 2.0
// AUTHOR: Reginald Hardin
// DATE: 19 Oct 17
//
// PURPOSE: Attempted SA build using modular format (multiple JS and html files
//
//**********************************************************************************

// play.js


var playState = {
	player: null,
	layer: null,
	mob: null,
	enemy: null,
	cursors: null,
	
	create: function(){
		// set world boundaries
		game.world.setBounds(0, 0, 3200, 600);
		
		// add the player
		var self = this;
		
		var map = game.add.tilemap('level1');
		map.addTilesetImage('testworld', 'tiles');
		
		
		self.layer = map.createLayer('Tile Layer 1');
		self.layer.resizeWorld();
		
		map.setCollision([0, 1, 2, 3, 4, 5]);
		
		map.setTileIndexCallback(5, self.resetPlayer,self);
		
		map.setTileIndexCallback(2, self.getBook,self);
		
		self.mob = game.add.group();
		self.mob.enableBody = true;
		
		
	
		
		
		self.player = game.add.sprite(50, 500, 'dude');
		self.player.frame = 0;
		game.add.existing(self.player);
		self.player.anchor.setTo(.5, 1);
		
		
		// controls
		cursors = game.input.keyboard.createCursorKeys();
		
		// set physics for player
		game.physics.enable(self.player, Phaser.Physics.ARCADE);
		game.physics.enable(self.layer, Phaser.Physics.ARCADE);
		/*game.physics.enable(self.mob, Phaser.Physics.ARCADE); //from spike to mob
		game.physics.enable(self.spike, Phaser.Physics.ARCADE); */
		
		
		//  Player physics properties.
		self.player.body.bounce.y = 0.1;
		self.player.body.gravity.y = 300;
		self.player.body.collideWorldBounds = true;
		
		/* self.spike.setAll('body.gravity.y', 25); */
		
		//Add enemy or enemies
		self.enemy = game.add.sprite(1000, game.world.height - 150, 'roller' );
		self.enemy.frame = 1;
		self.enemy.anchor.setTo(.5, 1);
		self.enemy.animations.add('wait',[0,1],2);
		game.physics.enable(self.enemy, Phaser.Physics.ARCADE);
		self.enemy.body.gravity.y = 300; 
		self.enemy.body.collideWorldBounds = true;
		
		
		
		 
		
		// camera follow player
		game.camera.follow(self.player);
		//
	},
	update: function(){
		var self = this;
		game.physics.arcade.collide(self.player, self.layer);
		game.physics.arcade.collide(self.enemy, self.layer);
		game.physics.arcade.collide(self.enemy, self.player);
		/*game.physics.arcade.collide(self.spike, self.platforms);

		 self.spike.body.velocity.x = 0; */
		 
		 
		 
		self.player.body.velocity.x = 0;
		 if (cursors.left.isDown)
		{
			//  Move to the left
			self.player.body.velocity.x = -150;
			self.player.scale.x = -1;
			// player.animations.play('left'); only needed with spritesheet
		}
		else if (cursors.right.isDown)
		{
			//  Move to the right
			self.player.body.velocity.x = 150;
			self.player.scale.x = 1;
			// player.animations.play('right'); only needed with spritesheet
		}
	
			/* else
		{
			//  Stand still
			player.animations.stopPlayer();
		
		} */

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && self.player.body.onFloor())
    {
        self.player.body.velocity.y = -350;
    }
	},
	
	resetPlayer: function(){
		var self = this;
		self.player.reset(50,500);
	},
	
	getBook: function(){
		var self = this;
		map.putTile(-1, self.layer.getTileX(self.player.x), self.layer.getTileY(self.player.y));
		
	}
	
};

	