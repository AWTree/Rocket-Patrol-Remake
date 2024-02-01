class FastSpaceship extends Spaceship {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame, pointValue)
        this.points = 20
        this.moveSpeed = 4
        this.setScale(0.8)
    }
}