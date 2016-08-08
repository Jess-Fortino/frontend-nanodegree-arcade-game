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
//checks if the player collides with a bug
Enemy.prototype.checkCollisions = function(){
  if(this.x < player.x + 50 &&
     this.x + 70 > player.x &&
     this.y < player.y + 30 &&
     this.y + 30 > player.y){
      //player = new Player();
      //  allEnemies = [new Enemy];
       console.log("collision");
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
//checks if player reaches water and calculates score if gained
Player.prototype.update = function(){
  //player hits water, resets player position
  if(this.y < 0.5){
    //reset x & y
    this.x = 200;
    this.y = 475;
    this.score += 1;
  }
}
//allows keyboard key movements
Player.prototype.handleInput = function(key){
  if(key === "left" && this.x > 0){
    this.x -=100;
  }
  if(key === "right" && this.x < 606){
    this.x += 100;
  }
  if(key === "up" && this.y > 0){
    this.y -= 85;
  }
  if(key === "down" && this.y < 600){
    this.y += 85;
  }
};
//renders player onto canvas
Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//create winning profile
var score = 0;
var newLabelScore = document.createElement("label");
var newTextScore = document.createTextNode("Your Score: " + score);
newLabelScore.appendChild(newTextScore);
document.body.appendChild(newLabelScore);

Player.prototype.win = function(){
  this.y = 400;
  var i;
  if((i = 5) || (i > 5)){
    this.sprite[i] = this.sprite[i + 1];
  }
  score++;
  newTextScore.nodeValue = "Your Score: " + score;
}


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
