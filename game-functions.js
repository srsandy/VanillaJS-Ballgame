const canvas = document.getElementById("game");
const c = canvas.getContext('2d');

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let score = 0;
let life = 3;


const scoreContainer = document.getElementById("score");
const lifeContainer = document.getElementById("life");
const model = document.getElementById("model");
const fileScoreContainer = document.getElementById("final-score");

function updateLife() {
    life -= 1;
    lifeContainer.innerHTML = life;
}

function updateScore() {
    score += 5;
    scoreContainer.innerHTML = score;
}

function gameOver() {
	model.style.display = "flex";
	fileScoreContainer.innerHTML = score;
}


//  Classes
class Game {
    constructor(gamewidth, gameheight) {
        this.gamewidth = gamewidth;
        this.gameheight = gameheight;
    }

    start() {
        this.stick = new Stick(this);
        this.blackball = new Blackball(this);
        this.greenball = new Greenball(this);
        this.redball = new Redball(this);
        this.blueball = new Blueball(this)

        this.gameObject = [
            this.blackball,
            this.greenball,
            this.redball,
            this.blueball,
            this.stick,
        ];

        new InputHandler(this.stick);
    }

    draw(c) {
        this.gameObject.forEach(object => object.draw(c));
    }

    update(change) {
        this.gameObject.forEach(object => object.update(change));
    }

    didBallCollide(ball) {
        if (ball.x <= this.stick.x + this.stick.width && (this.stick.y <= ball.y && this.stick.y + this.stick.height >= ball.y)) {
            if (ball instanceof Redball) {
                updateLife();
                if (life === 0) {
                	gameOver();
                }
            } else {
                updateScore();
            }

            return true;
        }
        return false;
    }
}

class Blackball {
    constructor(game) {
        this.image = document.getElementById('blackball');
        this.heightLimit = game.gameheight;
        this.x = 700;
        this.y = (Math.random() * 1000) % this.heightLimit;
        this.width = 20;
        this.height = 20;
        this.speed = Math.floor(Math.random() * 8) + 1;
    }

    draw(c) {
        c.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    update() {
        this.x -= this.speed;
        if (game.didBallCollide(this) || this.x < 0) {
            this.x = GAME_WIDTH;
            this.y = (Math.random() * 1000) % this.heightLimit;
        }

    }

}


// Greeen ball
class Greenball {
    constructor(game) {
        this.image = document.getElementById('greenball');
        this.heightLimit = game.gameheight;
        this.x = 700;
        this.y = (Math.random() * 1000) % this.heightLimit;
        this.width = 20;
        this.height = 20;
        this.speed = Math.floor(Math.random() * 8) + 1;
    }

    draw(c) {
        c.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    update() {
        this.x -= this.speed;
        if (game.didBallCollide(this) || this.x < 0) {
            this.x = GAME_WIDTH;
            this.y = (Math.random() * 1000) % this.heightLimit;
        }

    }
}


class Redball {
    constructor(game) {
        this.image = document.getElementById('redball');
        this.heightLimit = game.gameheight;
        this.x = 700;
        this.y = (Math.random() * 1000) % this.heightLimit;
        this.width = 20;
        this.height = 20;
        this.speed = Math.floor(Math.random() * 8) + 1;
    }

    draw(c) {
        c.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    update() {
        this.x -= this.speed;
        if (game.didBallCollide(this) || this.x < 0) {
            this.x = GAME_WIDTH;
            this.y = (Math.random() * 1000) % this.heightLimit;
        }
    }
}

// Blue ball
class Blueball {
    constructor(game) {
        this.image = document.getElementById('blueball');
        this.heightLimit = game.gameheight;
        this.x = 700;
        this.y = (Math.random() * 1000) % this.heightLimit;
        this.width = 20;
        this.height = 20;
        this.speed = Math.floor(Math.random() * 8) + 1;
    }

    draw(c) {
        c.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    update() {
        this.x -= this.speed;
        if (game.didBallCollide(this) || this.x < 0) {
            this.x = GAME_WIDTH;
            this.y = (Math.random() * 1000) % this.heightLimit;
        }

    }
}


class Stick {
    constructor(game) {
        this.x = 0;
        this.y = 0;
        this.width = 10;
        this.height = 90;
        this.speed = 20;
        this.heightLimit = game.gameheight - this.height;
    }

    moveUp() {
        const move = this.y - this.speed;

        if (move >= 0) {
            this.y -= this.speed;
        }
    }

    moveDown() {
        const move = this.y + this.speed;
        if (move <= this.heightLimit) {
            this.y += this.speed;
        }
    }

    draw(c) {
        c.fillStyle = "yellow";
        c.fillRect(this.x, this.y, this.width, this.height);
        c.stroke();
    }
}

class InputHandler {
    constructor(stick) {
        document.addEventListener('keyup', (event) => {
            switch (event.keyCode) {
                case 38:
                    stick.moveUp();
                    break;
                case 40:
                    stick.moveDown();
                    break;
            }
        });
    }
}

// Classes end


//  Raw code
let previous = 0;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

game.start();

function gameLoop(position) {
    let change = position - previous;
    previous = position;
    c.clearRect(0, 0, innerWidth, innerHeight);
    game.draw(c);
    game.update(change);
    if(life !=0)
    	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);