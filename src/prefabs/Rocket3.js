class Rocket3 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
  
        // Add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 2;
        this.sfxShot = scene.sound.add('sfx-shot');

        // Enable input
        this.setInteractive();

        // Mouse movement listener
        scene.input.on('pointermove', (pointer) => {
            if (!this.isFiring) {
                // Make sure the rocket doesn't move out of bounds
                this.x = Phaser.Math.Clamp(pointer.x, borderUISize + this.width, game.config.width - borderUISize - this.width);
            }
        })

        // Mouse click listener
        scene.input.on('pointerdown', (pointer) => {
            this.fire();
        })
    }

    update() {
        // Movement is now handled by pointermove event

        // If fired, move up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        // Reset on miss
        if (this.y <= borderUISize * 3 + borderPadding) {
            this.missed = true
            this.reset()
        }
    }

    fire() {
        if (!this.isFiring) {
            this.isFiring = true;
            this.sfxShot.play();
        }
    }

    // Reset rocket to "ground"
    reset() {
        this.isFiring = false
        this.y = game.config.height - borderUISize - borderPadding
        this.scene.fireText.setVisible(false)
    }
}
