// Enemies our player must avoid
//Below-- uses an image
var Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y =y;
    this.speed = (250 * Math.random() + 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < 705){
      this.x += (this.speed * dt)
    }else{
//the enemy will reset to the beginning of the x axis with new random speed
      this.x = 0;
      this.speed = (250 * Math.random() + 100);
    }
};

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
//score of the player
  this.score = 0;
}
//holds high score
var highScore = 0;

//checks if player reaches water and calculates score if gained
Player.prototype.update = function(){
  //player hits water
  if(this.y < 0.5){
    //reset x & y
    this.x = 200;
    this.y = 475;
    this.score += 10;
  }
}

Player.prototype.checkCollisions = function(){
//checks bug locations for possible collisions -- if hit, player location resets and score is compared to high score
  for(i = 0; i < 4; i++){
    if(this.x < allEnemies[i].x + 50 &&
    this.x + 50 > allEnemies[i].x &&
    this.y < allEnemies[i].y + 75 &&
    75 + this.y > allEnemies[i].y) {
//reset position
    this.x = 200;
    this.y = 475;
//checks high score
      if(this.score > highScore){
        highScore = this.score;
        this.score = 0;
      }else{
        this.score = 0;
      }
    }
  }
};

//renders player onto canvas
Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  ctx.font = '30px Impact';
  ctx.fillText(' = x' +this.score, 105, 700);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies[0] = new Enemy(0, 60);
allEnemies[1] = new Enemy(0, 140);
allEnemies[2] = new Enemy(0, 230);
allEnemies[3] = new Enemy(0, 310);

var player = new Player(200, 475);


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
//allows keyboard key movements
Player.prototype.handleInput = function(key){
  if(key === "left" && this.x > 0){
    this.x -=100;
  }
  if(key === "right" && this.x < 600){
    this.x += 100;
  }
  if(key === "up" && this.y > 0){
    this.y -= 85;
  }
  if(key === "down" && this.y < 600){
    this.y += 85;
  }
};
