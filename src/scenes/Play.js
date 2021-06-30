class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    init() {

    }
    preload() {
        // load images/tile sprites
        this.load.image('rocket1', './assets/rocket.png');
        this.load.image('rocket2', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    create() {
        // this.add.text(20, 20, "Rocket Patrol Play");

        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);

        //green UI background
        this.add.rectangle(0, borderUISize + borderPadding,
            game.config.width,
            borderUISize * 2, 0xFFF0F5).setOrigin(0,0);
        
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);

        // add Rocket (p1)
        this.p1Rocket = new Rocket(this,
            game.config.width / 2,
            game.config.height - (borderUISize + borderPadding),
            'rocket1').setOrigin(0.5, 0);

        // add Rocket (p2)
        this.p2Rocket = new Rocket(this,
            game.config.width / 2,
            game.config.height - (borderUISize + borderPadding),
            'rocket2').setOrigin(0.5, 0);
        
        // add spaceships (x3)
        this.ship01 = new Spaceship(this,
            game.config.width + borderUISize * 6,
            borderUISize * 4,
            'spaceship', 0 , 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this,
            game.config.width + borderUISize * 3,
            borderUISize * 5 + borderPadding * 2,
            'spaceship', 0 , 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this,
            game.config.width,
            borderUISize * 6 + borderPadding * 4,
            'spaceship', 0 , 10).setOrigin(0,0);
        
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30});
        
        // initialize score
        this.p1Score = 0;
        this.p2Score = 0;

        // display score for p1
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#B0C4DE',
            color: '#00008B',
            align: 'right',
            padding: {
                top: 5, bottom: 5
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p2Score, scoreConfig); // FIX UI SPACING FOR RIGHT SIDE!!!

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart / menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4; // update tile sprite

        if(!this.gameOver) {
            this.p1Rocket.update(); // update p1
            this.p2Rocket.update(); // update p2
            this.ship01.update(); // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();
        }

        // check collsions for p1
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        
        // check collsions for p2
        if(this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket1, ship) {
        // simple AABB checking
        if(rocket1.x < ship.x + ship.width &&
            rocket1.x + rocket1.width > ship.x &&
            rocket1.y < ship.y + ship.height &&
            rocket1.height + rocket1.y > ship.y) {
                return true;
        }
        return false;
    }

    checkCollision(rocket2, ship) {
        // simple AABB checking
        if(rocket2.x < ship.x + ship.width &&
            rocket2.x + rocket2.width > ship.x &&
            rocket2.y < ship.y + ship.height &&
            rocket2.height + rocket2.y > ship.y) {
                return true;
        }
        return false;
    }

    shipExplode(ship) {
        ship.alpha = 0; // temporarily hide the ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode'); // play explode animation
        this.sound.play('sfx_explosion');
        boom.on('animationcomplete', () => { // callback after anim completes
            ship.reset(); // reset ship position
            ship.alpha = 1; // make ship visible again
            boom.destroy(); // remove explosion sprite
        })

        // add score and repaint score display for p1
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        // add score and repaint score display for p2
        this.p2Score += ship.points;
        this.scoreRight.text = this.p2Score;
    }
}