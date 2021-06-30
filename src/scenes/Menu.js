class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    init() {

    }
    preload() {
        // load images
        this.load.image('toaster', './assets/toaster.png');
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/splat.wav');
        this.load.audio('sfx_rocket', './assets/pop2.wav');
    }
    create() {
        // this.add.text(20, 20, "Rocket Patrol Menu");
        // this.scene.start("playScene");

        this.toaster = this.add.tileSprite(0, 0, 640, 480, 'toaster').setOrigin(0,0);

        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFF8DC',
            color: '#191970',
            align: 'right',
            padding: {
                top: 5, bottom: 5
            },
            fixedWidth: 0
        }
        // show menu text
        this.add.text(game.config.width / 2, game.config.height / 2 - (borderUISize + borderPadding), 'BUTTER', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = "#EEDDE4";
        menuConfig.color = "#000";
        this.add.text(game.config.width / 2, game.config.height / 2, 'Use ←→ arrows to move & (L) to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + (borderUISize + borderPadding), 'Use (A), (D) to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = "#FFB6C1";
        menuConfig.color = "#000";
        this.add.text(game.config.width / 2, game.config.height / 2 + (borderUISize + borderPadding) + (borderUISize + borderPadding), 'Press ← of Novice or → Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // Novice mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // Expert mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}