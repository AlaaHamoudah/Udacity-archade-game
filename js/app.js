const x_width = 101;
const y_height = 83;

// Enemies our player must avoid
var Enemy = function (x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get starte
    this.x = x;
    this.y = y;
    this.speed = 200;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    console.log((this.x +  x_width))
     setInterval(function(){
        ctx.drawImage(Resources.get(this.sprite), (this.x +  x_width), this.y);
    }, dt * this.speed)


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    x;
    y;
    sprite;
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-cat-girl.png';
    }
    update(params) {

    }
    render() { 
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(keyCode) {
        
        switch (keyCode) {
            case 'left':   
                 console.log("left key"+ (this.x - x_width) + this.sprite)
                  
                 let width =  this.x - 101;
                 //ctx.drawImage(Resources.get(this.sprite), 202 , this.y);
                 console.log("done")
                break;
            case 'up':  //up
                break;
            case 'right':  //right
                console.log("right")
                ctx.drawImage(Resources.get(this.sprite), (this.x + x_width), this.y);
                break;
            case 'down':  //down
                break;

        }



    }

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [];
allEnemies.push(new Enemy(x_width, y_height));
allEnemies.push(new Enemy(x_width*2,y_height*2));
allEnemies.push(new Enemy(x_width*3, y_height*3));
allEnemies.push(new Enemy(x_width*4, y_height*4));
allEnemies.push(new Enemy(0, y_height));
allEnemies.push(new Enemy(x_width, y_height*3));
const player = new Player(x_width*3,  y_height*5);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
