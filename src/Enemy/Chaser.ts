import EnemyBaseClass from "./EnemyBaseClass"
import {EnemyShapes, EnemyTypes} from "./EnemyEnums";


class Chaser extends EnemyBaseClass {
    private oldX: number;
    private oldY: number;

    constructor(x: number, y: number, id: number) {
        super(x, y, id);
        this.type = EnemyTypes.Chaser;
        this.shape = EnemyShapes.Triangle;
    }

    public revert(): void {
        this.x = this.oldX;
        this.y = this.oldY;
    }

    public move(playerX: number, playerY: number): void {
        this.oldX = this.x;
        this.oldY = this.y;
        this.x += this.speed * ((100 - Math.abs(this.x - playerX)) / 5 + 1) * (this.x > playerX ? -1 : 1);
        this.y += this.speed * ((100 - Math.abs(this.y - playerY)) / 5 + 1) * (this.y > playerY ? -1 : 1)

        if (this.x > 100 - this.width)
            this.x = 100 - this.width;
        else if (this.x < 0)
            this.x = 0;
        if (this.y > 100 - this.height)
            this.y = 100 - this.height;
        else if (this.y < 0)
            this.y = 0;

    }

    public onHitTarget(): string {
        return "Over";
    }
}

export default Chaser;
