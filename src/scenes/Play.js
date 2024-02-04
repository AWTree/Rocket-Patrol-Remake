class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    handelCollision = function(rocket, ship) {
        console.log("Hit!")
        rocket.reset()
        this.shipExplode(ship)
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)

        // add rocket (p1)
        this.p1Rocket = new Rocket3(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0)
        this.ship03 = new FastSpaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'fastspaceship', 0, 10).setOrigin(0,0)

        this.physics.add.collider (
            this.p1Rocket,
            this.ship01,
            this.handelCollision,
            null,
            this
        )

        this.physics.add.collider (
            this.p1Rocket,
            this.ship02,
            this.handelCollision,
            null,
            this
        )

        this.physics.add.collider (
            this.p1Rocket,
            this.ship03,
            this.handelCollision,
            null,
            this
        )

        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        // mouse control
        this.input.on('pointermove', (pointer) => {
            this.p1Rocket.x = pointer.x;
        })

        this.input.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown() && !this.p1Rocket.isFiring) {
                this.p1Rocket.fire()
            }
        })

        // initialize score
        this.p1Score = 0

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)


        // fire text
        this.fireText = this.add.text(game.config.width / 2, borderUISize + borderPadding*3.8, 'FIRE', scoreConfig).setOrigin(0.5)
        this.fireText.setVisible(false)

        this.input.on('pointerdown', (pointer) => {
            if (this.p1Rocket.isFiring) {
                this.p1Rocket.isFiring = true
                this.fireText.setVisible(true)
            }
        })

        // increase speed
        this.time.addEvent({
            delay: 30000, // 30 seconds
            callback: this.increaseSpeed,
            callbackScope: this
        })

        // display time
        let timer = this.scoreLeft.x + this.scoreLeft.width + 10;
        this.remainingTime = game.settings.gameTimer
        this.timeDisplay = this.add.text(timer, this.scoreLeft.y, `Time: ${this.remainingTime}`, scoreConfig)
    
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.remainingTime --
                this.timeDisplay.setText(`Time: ${this.remainingTime}`)
                if (this.remainingTime <= 0) {
                    this.timeDisplay.setText('Time: 0')
                }
            },
            callbackScope: this,
            loop: true
        })

        // GAME OVER flag
        this.gameOver = false

        // 60-second play clock
        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for', scoreConfig).setOrigin(0.5)
                this.gameOver = true
        }, null, this)
    }

    update() {
        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
        }

        this.starfield.tilePostitionX -= 4

        if(!this.gameOver) {               
            this.p1Rocket.update()         // update rocket sprite
            this.ship01.update()           // update spaceships (x4)
            this.ship02.update()
            this.ship03.update()
        }         
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0             

        this.remainingTime += 3; // Add 3 seconds, adjust as needed
        this.timeDisplay.setText(`Time: ${this.remainingTime}`);

        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0)
        boom.anims.play('explode')           // play explode animation
        boom.on('animationcomplete', () => { // callback after ani completes
            ship.reset()                       // reset ship position
            ship.alpha = 1                     // make ship visible again
            boom.destroy()                     // remove explosion sprite
        })

        // score add and text update
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score       

        this.sound.play('sfx-explosion')
    }

    increaseSpeed() {
        this.ship01.moveSpeed += 1;
        this.ship02.moveSpeed += 1;
        this.ship03.moveSpeed += 1;
    }

}