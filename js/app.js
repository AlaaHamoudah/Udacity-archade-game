// Enemies our player must avoid
class Enemy {
  constructor(x, y) {
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
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
  update(dt) {
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
      allGems = [];
      Gem.reset(3);
 
    }
  }
}

  // Draw the enemy on the screen, required method for game
  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

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
    this.score = 0;
  }
  update() {
    if (this.row === 1) {
      this.reset();
      allEnemies = [];
      allGems = [];
      Gem.reset(4);
 
      
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(keyCode) {
    switch (keyCode) {
      case "left":
        if (this.x > 4) {
          this.x = this.x - 100;
          this.col -= 1;
        }
        break;
      case "up": //up
        if (this.y > -20) {
          this.y = this.y - 83;
          this.row -= 1;
          break;
        }
      case "right": //right
        if (this.x < 396) {
          this.x = this.x + 100;
          this.col += 1;
          break;
        }
      case "down": //down
        if (this.y < 380) {
          this.y = this.y + 83;
          this.row += 1;
          break;
        }
    }
    
  }
  //Resets the location of the player
  reset() {
    this.x = 200;
    this.y = 380;
    this.row = 6;
    this.col = 3;
    this.score = 0;
    document.querySelector("#gems").innerHTML = "0";
  }
}
class Gem {
  constructor() {
    this.x;
    this.y;
    this.col;
    this.row;
    this.gemInitialArray = ["Gem-Blue.png", "Gem-Orange.png", "Gem-Green.png"];
    this.ranNumForLocation = Math.floor(Math.random() * 3);
    //randomly choose an image for the gem
    this.sprite = `images/${this.gemInitialArray[this.ranNumForLocation]}`;
    // an array of Y locations for the gems to start from
    this.initiaYlLocationArray = [55, 145, 245];
    // location of gem on the Y axis
    this.y = this.initiaYlLocationArray[this.ranNumForLocation];
   // an array of X location fot the gems to start from
    this.initiaXlLocationArray = [0, 100, 200, 300, 400];
    this.ranNumForLocation = Math.floor(Math.random() * 5);
    //location of gem on X axis
    this.x = this.initiaXlLocationArray[this.ranNumForLocation];
 
  }

  update() {
    // Changes the column based on the location of the gem
    switch (this.y) {
      case 55:
        this.row = 2;
        break;
      case 145:
        this.row = 3;
        break;
      case 245:
        this.row = 4;
    }
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
 
    // Monitors winning the gem by comparing the player's and the gem's columns and rows
    for (const gem of allGems) {
      if (this.col === player.col && this.row === player.row) {
          //hide the gem
        this.x = -200;
        this.y = -200;
        this.col = -1;
        this.row = -1;
        //increase suer score
        player.score++;
        document.querySelector("#gems").innerHTML = player.score;
        // create new gem after user win a gem
        this.createNewGem(1);

      }
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  //this method is used when user win a new gem
  createNewGem(limit){
    for(let i= 0; i< limit ; i++){
        allGems.push(new Gem())
    }
  }
  //this method is used when reset the game
  static reset(limit){
    for(let i= 0; i< limit ; i++){
        allGems.push(new Gem())
    }
    
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
let allGems = [];
//create array of gems
allGems.push(new Gem());
allGems.push(new Gem());
allGems.push(new Gem());

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
