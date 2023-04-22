import EnemyBaseClass from "./Enemy/EnemyBaseClass";


// Player class to handle all player functions
export default class Player {
    private x: number;
    private y: number;
    private readonly speed: number;

    constructor(x: number, y: number, speed: number) {
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    // Getters.
    public getCoordinates(): [number, number] {
        return [this.x, this.y];
    }

    public getSpeed(): number {
        return this.speed;
    }

    // Players move toward their cursor, gaining bonus speed if the cursor is farther away.
    public move(x: number, y: number): void {
        this.x += (x - this.x) * this.speed / 10 + ((x - this.x) > 0 ? 1 : -1) * this.speed;
        this.y += (y - this.y) * this.speed / 10 + ((y - this.y) > 0 ? 1 : -1) * this.speed;

        if (this.x > 97)
            this.x = 97
        else if (this.x < 0)
            this.x = 0
        if (this.y > 94)
            this.y = 94
        else if (this.y < 0)
            this.y = 0
    }

    // Method to check if player has collied with any enemies.
    public checkCollision(enemy: EnemyBaseClass): boolean {
        const enemyCoordinates = enemy.getCoordinates();

        if (enemy.getShape() !== "triangle") {
            if (enemyCoordinates[0] + enemy.getWidth() < this.x)
                return false;
            if (enemyCoordinates[0] > this.x + 3)
                return false;
            if (enemyCoordinates[1] + enemy.getHeight() < this.y)
                return false;
            if (enemyCoordinates[1] > this.y + 6)
                return false;
        } else {
            if (enemyCoordinates[0] + enemy.getWidth() * 0.9 < this.x) {
                return false;
            }
            if (enemyCoordinates[0] > this.x + 6 * 0.48802 * 0.9) {
                return false;
            }
            if (enemyCoordinates[1] + enemy.getHeight() < this.y) {
                return false;
            }
            if (enemyCoordinates[1] > this.y + 4.5) {
                return false;
            }
        }

        return true
    }
}