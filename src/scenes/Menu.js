class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
        this.currentSelection = 0;
    }

    create() {     
        // animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        })

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '21px',
            backgroundColor: '#00FF00',
            color: '#000',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            left: 5,
            right: 5
            },
            fixedWidth: 0
        }

        // display menu text
        this.add.text(game.config.width/2, game.config.height/3 - borderUISize - borderPadding, 'ROCKET PATROL REMAKE',  menuConfig).setOrigin(0.5)

        menuConfig.backgroundColor = '#F3B141'
        menuConfig.color = '#843605'
        this.add.text(game.config.width/2, game.config.height/2.5, 'P1 Use ←→  arrows to move & (F) to fire', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2.15, 'P2 Use ad  keys to move & (E) to fire  ', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2.29 + borderUISize + borderPadding, 'Press ← for Novice or →  for Expert    ', menuConfig).setOrigin(0.5)
        
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        this.singlePlayerText = this.add.text(game.config.width/2, game.config.height/1.5, '1. Single Player', menuConfig).setOrigin(0.5)
        this.twoPlayerText = this.add.text(game.config.width/2, game.config.height/1.365, '2. Two Player   ', menuConfig).setOrigin(0.5)

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png')
        this.load.image('rocket02', './assets/rocket02.png')
        this.load.image('spaceship', './assets/spaceship.png')
        this.load.image('fastspaceship', './assets/fastspaceship.png')
        this.load.image('starfield', './assets/starfield.png')

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })

        // load audio
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
      }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.currentSelection = Math.max(this.currentSelection - 1, 0)
            this.updateMenuDisplay();
        } else if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.currentSelection = Math.min(this.currentSelection + 1, 1)
            this.updateMenuDisplay();
        }
        
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
            }
            this.sound.play('sfx-select')
            if (this.currentSelection === 0) {
                this.scene.start('playScene')
            }
            else {
                this.scene.start('playScene2')
            }
        }

        else if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
            }
            this.sound.play('sfx-select')
            if (this.currentSelection === 0) {
                this.scene.start('playScene')
            }
            else {
                this.scene.start('playScene2')
            }
        }
    }

    // update mod selection
    updateMenuDisplay() {
        if (this.currentSelection === 0) {
            this.singlePlayerText.setBackgroundColor('#08bf08'); // Highlight
            this.twoPlayerText.setBackgroundColor('#00FF00'); // Normal
        } else {
            this.singlePlayerText.setBackgroundColor('#00FF00'); // Normal
            this.twoPlayerText.setBackgroundColor('#08bf08'); // Highlight
        }
    }
}