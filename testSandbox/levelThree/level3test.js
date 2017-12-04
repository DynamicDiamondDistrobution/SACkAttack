//***********************************************************************************
// SACk Attack build 2.3
// AUTHOR: Reginald Hardin
// DATE: 3 Dec 17
//
// PURPOSE: Attempted SA build using modular format (multiple JS and html files)
// 
//				DEMO VERSION
//**********************************************************************************

// level3test.js


var playState = {
  
  // playstate global variables
  player: null,
  mob: null,
  books: null,
  layer: null,
  score: null,
  scoreText: null,
  //shootBooks: null,
  heldBooks: null,
  bookHud: null,
  bookText: null,
  
	// create function
	// add things to the world
	
  create: function() {
    var self = this;
	
	// create map from tileset
    var map = game.add.tilemap('level3');
    map.addTilesetImage('testworld', 'tiles');

    game.world.setBounds(0, 0, 3200, 600);
    
    self.layer = map.createLayer('Tile Layer 1');
	self.layer.resizeWorld();
	game.physics.enable(self.layer, Phaser.Physics.ARCADE);
	
	//self.layer.debug = true;
	
	// create player
    self.player = new Player(50, game.world.height - 150);
    game.add.existing(self.player);
    game.physics.enable(self.player, Phaser.Physics.ARCADE);
	self.player.body.gravity.y = 310;
	self.player.body.collideWorldBounds = true;
	
	
	
	// add book to collect
	self.books = game.add.group();
	game.physics.enable(self.books, Phaser.Physics.ARCADE);
	

    self.books.enableBody = true;
	
	map.setCollisionBetween(1, 6, true, 'Tile Layer 1');
	map.setTileIndexCallback(5, self.resetPlayer, self);

    //  Here we'll create 12 books evenly spaced apart
    for (var i = 1; i < 6; i++)
    {
        //  Create a book inside of the 'books' group
        var book = self.books.create(i * 250, 0, 'book');

        //  Let gravity do its thing
        book.body.gravity.y = 200;
		book.body.collideWorldBounds = true;
        
		//  This just gives each book a slightly random bounce value
        // book.body.bounce.y = 0.2 + Math.random() * 0.2;
    }
	
	// create the enemy mob
    self.mob = game.add.group();
	self.mob.add(Enemy(2950, game.world.height - 150));
    self.mob.forEach(function(enemy, index) {
      game.physics.enable(enemy, Phaser.Physics.ARCADE);
	  enemy.body.gravity.y = 300;
	  enemy.body.collideWorldBounds = true;      
    });
    
	// controls
		cursors = game.input.keyboard.createCursorKeys();
	
	// add the text for the score
    scoreText = game.add.text(32, 16, 'Score: 0', { font: "32px ", fill: "#ffffff", align: "center" });
    scoreText.fixedToCamera = true;
	bookText = game.add.text(64, 64, ': 0', {font: "32px ", fill: "#ffffff", align: "center"});
	bookText.fixedToCamera = true;
	bookHud = game.add.sprite(32, 68, 'book');
	bookHud.fixedToCamera = true;
    
	
	// camera follow player
	game.camera.follow(self.player);
  },
  
  // for debugging info
  render: function(){
	  var self = this;
    //game.debug.geom(this.bar,'#0fffff')
	//game.debug.cameraInfo(game.camera, 500, 32);
	 //game.debug.body(self.player); 
	 //game.debug.body(self.mob);
	 
  },
  
  // update function is for game and object info
  // updates constantly to keep game running
  update: function() {
    var self = this;
	
	// physics updates
    
	game.physics.arcade.collide(self.player, self.layer);
	game.physics.arcade.collide(self.mob, self.layer);
	game.physics.arcade.collide(self.books, self.layer);
	
	
	
	
    self.mob.forEach(function(enemy, index) {
      enemy.animations.play('wait');
      enemy.update();
    });
    self.player.body.velocity.x = 0;
		 if (cursors.left.isDown)
		{
			//  Move to the left
			self.player.body.velocity.x = -150;
			self.player.scale.x = -1;
			self.player.animations.play('left'); //only needed with spritesheet
		}
		else if (cursors.right.isDown)
		{
			//  Move to the right
			self.player.body.velocity.x = 150;
			self.player.scale.x = 1;
			self.player.animations.play('right'); //only needed with spritesheet
		}
		else
		{
			self.player.animations.play('wait');
		}
		 //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && self.player.body.onFloor())
    {
        self.player.body.velocity.y = -325;
    }
    self.player.update();
    game.physics.arcade.collide(self.player, self.mob, function(p, e) {
      p.kill();
	  p.reset(50, game.world.height - 150);
	  e.state = 'patrol';
    });
	game.physics.arcade.collide(self.player, self.books, function(p, b){
		b.kill();
		self.score +=10;
		scoreText.text = 'Score: ' + self.score;
		self.heldBooks += 1;
		bookText.text = ': ' + self.heldBooks;
	});
    game.physics.arcade.collide(self.player, self.layer, function(p, l) {
		p.kill();
		p.reset(50, game.world.height - 150);
    });
  }
};

function Player(x, y) {
  var player = game.add.sprite(x, y, 'dude');
  player.frame = 0;
  player.anchor.setTo(.5, 1);
  player.animations.add('wait', [0, 1], 4);
  player.animations.add('right', [1, 2, 3], 10, true);
  player.animations.add('left', [1, 2, 3], 10, true);
  //player.sfx = {}
  //player.sfx.collide = game.add.audio('hit');
	
  
  player.stop = function() {
    var self = this;
    self.xDest = self.x;
    self.yDest = self.y;
	resetPlayer();
    //player.sfx.collide.play();

  }
  return player;
};

function Enemy(x, y) {
  var enemy = game.add.sprite(x, y, 'boss');
  enemy.state = 'patrol';
  enemy.xDest = x;
  enemy.yDest = y;
  enemy.animations.add('patrol', [0, 1], 6, true);
  enemy.direction = 1;
  enemy.frame = 0;
  enemy.anchor.setTo(.5, 1);
  //enemy.scale.x = -1;

  enemy.goToXY = function(x, y) {
    enemy.xDest = x;
    enemy.yDest = y;
  }

  enemy.update = function() {
    var self = this;
    switch (self.state) {
      case 'patrol':
        self.speed = 200;
        self.patrol();
		self.animations.play('patrol');
        break;
      }
    move(self);
  }

  enemy.stop = function() {
    var self = this;
    self.xDest = self.x;
    self.yDest = self.y;
  }

  enemy.patrol = function() {
    var self = this;
    if (Math.floor(self.x / 10) == Math.floor(self.xDest / 10)) {
      self.direction = self.direction * -1;
      self.goToXY(self.x + self.direction * 350);
    }
  }
  return enemy;
};

function resetPlayer(){
		var self = this;
		self.player.kill();
		self.player.reset(50, game.world.height - 150);
	}


// Helper Functions
function move(self){
  if (Math.floor(self.x / 10) == Math.floor(self.xDest / 10)) {
    self.body.velocity.x = 0;
  } else if (Math.floor(self.x) < Math.floor(self.xDest)) {
    self.body.velocity.x = self.speed;
    self.scale.x = -1;
  } else if (Math.floor(self.x) > Math.floor(self.xDest)) {
    self.body.velocity.x = -self.speed;
    self.scale.x = 1;
  }
  if (Math.floor(self.y / 10) === Math.floor(self.yDest / 10)) {
    self.body.velocity.y = 0;
  } else if (Math.floor(self.y) < Math.floor(self.yDest)) {
    self.body.velocity.y = self.speed;
  } else if (Math.floor(self.y) > Math.floor(self.yDest)) {
    self.body.velocity.y = -self.speed;
  }
}

