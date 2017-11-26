//***********************************************************************************
// SACk Attack build 2.1
// AUTHOR: Reginald Hardin
// DATE: 25 Nov 17
//
// PURPOSE: Attempted SA build using modular format (multiple JS and html files
//
//**********************************************************************************

// play.js


var playState = {
  
  // playstate global variables
  player: null,
  mob: null,
  books: null,
  layer: null,
  score: null,
  scoreText: null,
  
	// create function
	// add things to the world
  create: function() {
    var self = this;
	
	// create map from tileset
    var map = game.add.tilemap('level1');
    map.addTilesetImage('testworld', 'tiles');

    game.world.setBounds(0, 0, 3200, 600);
    map.setCollision([0, 1, 2, 3, 4, 5]);
    self.layer = map.createLayer('Tile Layer 1');
	self.layer.resizeWorld();
	game.physics.enable(self.layer, Phaser.Physics.ARCADE);
	
	// create player
    self.player = new Player(50, game.world.height - 150);
    game.add.existing(self.player);
    game.physics.enable(self.player, Phaser.Physics.ARCADE);
	self.player.body.gravity.y = 300;
	self.player.body.collideWorldBounds = true;
	
	// add book to collect
	self.books = game.add.group();
	game.physics.enable(self.books, Phaser.Physics.ARCADE);
	

    self.books.enableBody = true;

    //  Here we'll create 12 books evenly spaced apart
    for (var i = 1; i < 13; i++)
    {
        //  Create a book inside of the 'books' group
        var book = self.books.create(i * 250, 0, 'book');

        //  Let gravity do its thing
        book.body.gravity.y = 200;
		book.body.collideWorldBounds = true;
        //  This just gives each book a slightly random bounce value
        book.body.bounce.y = 0.2 + Math.random() * 0.2;
    }
	
	// create the enemy mob
    self.mob = game.add.group();
	self.mob.add(Enemy(1100, 300));
    self.mob.add(Enemy(1400, 500));
	self.mob.add(Enemy(1800, 500));
	self.mob.add(Enemy(2200, 500));
	self.mob.add(Enemy(2550, 200));
	self.mob.add(Enemy(2550, 500));
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
    
	
	// camera follow player
	game.camera.follow(self.player);
  },
  
  // for debugging info
  render: function(){
    //game.debug.geom(this.bar,'#0fffff')
	 //game.debug.cameraInfo(game.camera, 500, 32);
  },
  
  // update function is for game and object info
  // updates constantly to keep game running
  update: function() {
    var self = this;
	
	// physics updates
    self.player.animations.play('wait');
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
			// player.animations.play('left'); only needed with spritesheet
		}
		else if (cursors.right.isDown)
		{
			//  Move to the right
			self.player.body.velocity.x = 150;
			self.player.scale.x = 1;
			// player.animations.play('right'); only needed with spritesheet
		}
		 //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && self.player.body.onFloor())
    {
        self.player.body.velocity.y = -350;
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
	});
    game.physics.arcade.collide(self.player, self.layer, function() {
      self.player.stop();
    });
  }
};

function Player(x, y) {
  var player = game.add.sprite(x, y, 'dude');
  player.frame = 0;
  player.anchor.setTo(.5, 1);
  player.animations.add('wait', [0, 0], 4);
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
  var enemy = game.add.sprite(x, y, 'roller');
  enemy.state = 'patrol';
  enemy.xDest = x;
  enemy.yDest = y;
  enemy.animations.add('wait', [0, 0], 4);
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
        self.speed = 100;
        self.patrol();
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
      self.goToXY(self.x + self.direction * 125);
    }
  }
  return enemy;
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
	