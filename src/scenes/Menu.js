class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
        this.currentSelection = 0
        this.difficulty = 'regular'
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
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            left: 5,
            right: 5
            },
            fixedWidth: 0
        }

        // display menu text
        this.add.text(game.config.width/2, game.config.height/3.5 - borderUISize - borderPadding, 'ROCKET PATROL REMAKE', menuConfig).setOrigin(0.5)
       
        menuConfig.backgroundColor = '#F3B141'
        menuConfig.color = '#843605'
        this.add.text(game.config.width/2, game.config.height/3.1, 'Use ←→  arrows to move & (F) to fire ', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2.6, 'P2 use ad  keys to move & (E) to fire', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2.22, 'Press ↑↓ to select player numbers    ', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/1.95, 'Press ← for Novice or →  for Expert  ', menuConfig).setOrigin(0.5)
        
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        menuConfig.fixedWidth = 500
        this.onePlayerText = this.add.text(game.config.width/2, game.config.height/1.5, '1. ONE PLAYER', menuConfig).setOrigin(0.5)
        this.onePlayerText.setInteractive()
        
        this.twoPlayerText = this.add.text(game.config.width/2, game.config.height/1.37, '2. TWO PLAYER', menuConfig).setOrigin(0.5)
        this.twoPlayerText.setInteractive()

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    }

    updateMenuDisplay() {
       // Display updated selection with some indication (e.g., a different color or an arrow)
       // This is a basic example, you should integrate it with your existing menu display code
       if (this.currentSelection === 0) {
           this.onePlayerText.setBackgroundColor('#00cc00'); // Highlight
           this.twoPlayerText.setBackgroundColor('#00FF00'); // Normal
       } else {
           this.onePlayerText.setBackgroundColor('#00FF00'); // Normal
           this.twoPlayerText.setBackgroundColor('#00cc00'); // Highlight
       }
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
            this.updateMenuDisplay()
        }   
        else if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.currentSelection = Math.min(this.currentSelection + 1, 1)
            this.updateMenuDisplay()
        }

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // Start game with current selection and regular difficulty
            // easy mode
            this.startGame('regular')
        }
        else if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            this.startGame('expert')
        }
    }


    startGame(difficulty) {
        // Set game settings based on selection and difficulty
        let spaceshipSpeed = difficulty === 'regular' ? 3 : 4
        let gameTimer = difficulty === 'regular' ? 60000 : 45000

        game.settings = {
            spaceshipSpeed: spaceshipSpeed,
            gameTimer: gameTimer
        };

        if (this.currentSelection === 0) {
            this.scene.start('playScene')
        }
        else if (this.currentSelection === 1) {
            this.scene.start('playScene2')
        }

        this.sound.play('sfx-select')
      
    }

}