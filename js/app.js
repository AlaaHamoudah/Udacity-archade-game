// const x_width = 101;
// const y_height = 83;

// Enemies our player must avoid
var Enemy = function(x, y) {
  // Variables applied to each of our instances go here,
  // location of enemy on the X axis
  this.x = 0;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
  // random number for location calculation
  this.ranNumForLocation = Math.floor(Math.random() * 3);
  // an array of locations for the enemy to start from
  this.initialLocationArray = [48, 131, 214];
  // location of enemy on the Y axis
  this.y = this.initialLocationArray[this.ranNumForLocation];
  // needed for the speed calculation
  this.ranNumForSpeed = Math.floor(Math.random() * 8);
  // random speeds for the enemies
  this.speedArray = [100, 150, 200, 250, 300, 350, 400, 450, 500];
  this.speed = this.speedArray[this.ranNumForSpeed];
  // row of canvas, in which the enemy is in
  this.row = null;
  // column of canvas, in which the enemy is in
  this.col = 1;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  // Sets the speed of the enemy
  this.x = this.x + this.speed * dt;

  // Sets the column based on the location of the enemy
  if (this.x < 62) {
    this.col = 1;
  } else if (this.x < 163) {
    this.col = 2;
  } else if (this.x < 264) {
    this.col = 3;
  } else if (this.x < 365) {
    this.col = 4;
  } else if (this.x < 465) {
    this.col = 5;
  } else if (this.x < 510) {
    this.col = 7;
  }

  // Changes the column based on the location of the enemy
  switch (this.y) {
    case 48:
      this.row = 2;
      break;
    case 131:
      this.row = 3;
      break;
    case 214:
      this.row = 4;
  }

  // Monitors collisions by comparing the player's and the enemy's columns and rows
  for (const enemy of allEnemies) {
    if (this.col === player.col && this.row === player.row) {
      player.reset();
      allEnemies = [];
    }
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {

  constructor() {
    this.x = 200;
    this.y = 400;
    this.sprite = "images/char-cat-girl.png";
    this.row = 6;
    this.col = 3;
  }
  update() {
    if (this.row === 1) {
        this.reset();
        allEnemies = [];
      }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(keyCode) {
    switch (keyCode) {
      case "left":
        console.log("left key" + (this.x - x_width) + this.sprite);

        this.x = this.x - 101;
        this.col -= 1;
        console.log("done");
        break;
      case "up": //up
      this.y = this.y - 83;
          this.row -= 1;
        break;
      case "right": //right
      this.x = this.x + 101;
      this.col += 1;
        
        break;
      case "down": //down
      this.y = this.y + 83;
          this.row += 1;
        break;
    }
  }
   //Resets the location of the player
   reset() {
    this.x = 200;
    this.y = 380;
    this.row = 6;
    this.col = 3;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];
setInterval(function() {
    // create an enemy every second
    let enemy = new Enemy();
    // Place all enemy objects in an array called allEnemies
    allEnemies.push(enemy);
  }, 1000);
  
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
