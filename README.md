# Frogger README

## Files Contained:
  * app.js - where the magic happens
  * engine.js - creates the canvas & keeps it running
  * resources.js - image loader
  * index.html - facilitator to the browser- hosts the canvas
  * style.css - the style of the page

## How to Run the game
Run index.html with the files above and the game on an HTML canvas will appear.
Specific explanation below.

## How to Play the Game
Player and characters automatically starts when index.html is loaded.
Player is moveable with keyboard _up, down, left and right keys_.
The goal is to get the player to the water without hitting any of the bugs. Each time the player hits the water, the player gets 5 points!
The player is given an initial score of 0, the winning score is 50.
The player is given 3 lives, when those 3 lives are gone, the player loses. The player loses a life when they hit a bug.
The game is reset both when the player loses all their lives, and when the player wins the game!

## The App.js file explained
**enemyWidth & enemyHeight** declaring sprite height and width is important for collision detection.
**score & lives** initially gives the score a set amount of 0 and lives a set amount of 3
**Enemy** creating the enemy function-- assigning the sprite image, the speed of the bugs, and creating an easy way to keep track of x and y with object oriented programming this.
**Enemy.prototype.update** is the function that makes the game run the exact same on every computer no matter of how slow or how fast they run.
**Enemy.prototype.checkCollisions** detects collisions between player and the bugs, if the player does collide, the player is reset to starting position and a life is lost. This function also has the if statement that allows the game to end if the players lives reach 0. This function also contains a clearRect which allows the lives tracker to be updated with the new number.
**Enemy.prototype.render** is what renders the bug onto the screen in the first place, basically draws the image over and over, pulling the if statement for player value.
**Player** creating the player function -- assigning the sprite image and giving the player the constant tracking function of this with location values.
**Player.prototype.update** checks if the player hits the water, if the player hits the water, the player is reset to it's starting position and the player is given 5 points. When the player reaches 50 points, the player is congratulated then the game is reset. Which also contains a clearRect which allows the scoreboard to be updated with the new score.
**Player.prototype.handleInput** is the function that allows the player to move a specified amount via keyboard arrows. Also blocks the user from moving off the screen.
**Player.prototype.render** renders the player onto the canvas, as well as the scoreboard and the lives tracker.
**allEnemies & player** creates the actual enemies and players and their start locations
**document.addEventListener** makes the arrow keys the only keys available for movement.
