// Rocket prefab
class Rocket3 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
  
        // add object to existing scene
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.isFiring = false
        this.moveSpeed = 2
        this.sfxShot = scene.sound.add('sfx-shot')
    }

    update() {
        // Modify left/right movement to follow mouse if not firing
        if(!this.isFiring) {
            this.x = Phaser.Math.Clamp(this.mouseX, borderUISize + this.width / 2, game.config.width - borderUISize - this.width / 2);
        }

        // If fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }

        // Reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    fire() {
        if (!this.isFiring) {
            this.isFiring = true
            this.sfxShot.play()
        }
    }

    // reset rocket to "ground"
    reset() {
        this.isFiring = false
        this.y = game.config.height - borderUISize - borderPadding
        this.scene.fireText.setVisible(false);
    }
  }