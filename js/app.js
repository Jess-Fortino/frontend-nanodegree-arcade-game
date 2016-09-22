// Enemies our player must avoid
//Below-- uses an image
var Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y =y;
    this.speed = 80 + Math.random() * 400;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.updatePosition(dt);
    this.checkCollisions();
  };
  //updates enemy position
Enemy.prototype.updatePosition = function(dt){
  this.x = this.x + this.speed * dt;
    if(this.x > 606){
      this.x = -20;
    }
}
//checks if the player collides with a bug, if the player does collide with a bug, the game resets and the player loses their score.
Enemy.prototype.checkCollisions = function(){
  if(this.x < player.x + 50 &&
     this.x + 70 > player.x &&
     this.y < player.y + 30 &&
     this.y + 30 > player.y){
       new Player();
       player.x = 200;
       player.y = 410;
       alert("You lost! You had " + score + " points");
       document.location.reload();
     }
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){
  this.sprite = 'images/char-cat-girl.png';
  this.x = x;
  this.y = y;
};


//checks if player reaches water and calculates score
Player.prototype.update = function(){
  //player hits water, resets player position
  if(this.y < 0.5){
    new Player()
    this.x = 200;
    this.y = 410;
    console.log("I hit the water!");
    //alert("You won!");
    console.log(score++);
    if(score === 5){
      alert("You Win with " +score + " points!");
      document.location.reload();
    }
  }
}

//Begin Scoreboard
var score = 0;
var drawScore = function() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Score: "+score, 50, 100);
}
drawScore();

//allows keyboard key movements
Player.prototype.handleInput = function(key){
  if(key === "left" && this.x > 0){
    this.x -=100;
  }
  if(key === "right" && this.x < 400){
    this.x += 100;
  }
  if(key === "up" && this.y > 0){
    this.y -= 85;
  }
  if(key === "down" && this.y < 400){
    this.y += 85;
  }
};
//renders player onto canvas
Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies[0] = new Enemy(0, 50);
allEnemies[1] = new Enemy(0, 140);
allEnemies[2] = new Enemy(0, 230);
// allEnemies[3] = new Enemy(0, 310); //If you want 4 enemies

var player = new Player(200, 410);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
