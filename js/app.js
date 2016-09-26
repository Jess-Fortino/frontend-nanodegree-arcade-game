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
       lives--;
       ctx.clearRect(0, 0, 500, 500);
       ctx.fillStyle = "#000";
       ctx.fillText("Lives: " + lives, 310, 25);
//if you run out of lives the game is reloaded
       if(lives === 0){
         alert("You lost! You had " + score + " points");
         document.location.reload();
       }
     }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// var blueGem = function(x, y){ //gains 10 points
//   this.sprite = "images/GemBlue.png";
//   this.x = x;
//   this.y = y;
// }//need to use check collisions and render --  needs to be in engine.js
//
// blueGem.prototype.checkCollisions = function(){
//   if(this.x < player.x + 50 &&
//      this.x + 70 > player.x &&
//      this.y < player.y + 30 &&
//      this.y + 30 > player.y){
//        score += 10;
//        new blueGem();
//      }
// }
// blueGem.prototype.render = function(){
//   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };
//
// var heart = function(x, y){ //gives the player an extra life
//   this.sprite = "images/Heart.png";
//   this.x = x;
//   this.y = y;
// }// need to use checkCollisions and render -- needs to be in engine.js
// heart.prototype.checkCollisions = function(){
//   if(this.x < player.x + 50 &&
//      this.x + 70 > player.x &&
//      this.y < player.y + 30 &&
//      this.y + 30 > player.y){
//        lives++ //NEED TO ADD A LIFE THING!
//        //You need to create a life counter, starting with 3 lives -- when the counter gets to 0 then the next collision results in the end of the game.
//        new heart();
//      }
// }
//
// heart.prototype.render = function(){
//   ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
// };
//
// var Star = function(x, y){ //gains 20 points
//   this.sprite = "images/Star.png";
//   this.x = x;
//   this.y = y;
// }
//
// Star.prototype.checkCollisions = function(){
//   if(this.x < player.x + 50 &&
//      this.x + 70 > player.x &&
//      this.y < player.y + 30 &&
//      this.y + 30 > player.y){
//        score += 20;
//        //new Star;
//      }
// }
//
// Star.prototype.render = function(){
//   ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
// };

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
    console.log("I hit the water!"); //lets me know when it hits
    score += 5; //adds 5 points when the player hits the water
//scoreboard scoring
      ctx.clearRect(0, 0, 500, 500);
      ctx.fillStyle = "#000";
      ctx.fillText("Score: " + score, 100, 25);
    if(score === 100){
      alert("You Win with " + score + " points!");
      document.location.reload();
    }
  }
};
//starting the score at 0
var score = 0;

//starting lives at 3
var lives = 3;

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
//renders the score onto canvas
  ctx.font = "30px Arial Narrow";
  ctx.fillStyle = "#000";
  ctx.fillText("Score: " + score, 100, 25);
//renders lives onto canvas
  ctx.font = "30px Arial Narrow";
  ctx.fillStyle = "#000";
  ctx.fillText("Lives: " + lives, 310, 25);
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

// var bluegem = new blueGem(100, 140);
//
// var Heart = new heart(200, 230);
//
// var star = new Star(300, 140);
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
