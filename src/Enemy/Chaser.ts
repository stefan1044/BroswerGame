import EnemyBaseClass from "./EnemyBaseClass"
import {EnemyShapes, EnemyTypes} from "./EnemyEnums";


class Chaser extends EnemyBaseClass {
    private static chaserArray: Array<Chaser> = new Array<Chaser>();
    private oldX: number;
    private oldY: number;

    constructor(x: number, y: number, id: number, speedMultiplier: number) {
        super(x, y, id, speedMultiplier);
        this.type = EnemyTypes.Chaser;
        this.shape = EnemyShapes.Triangle;
        Chaser.chaserArray.push(this);
        this.speed *= 6;
    }

    private static getChaserArray(): Chaser[] {
        return Chaser.chaserArray;
    }


    // Method to revert to old position if it collides with something
    public revert(): void {
        this.x = this.oldX;
        this.y = this.oldY;
    }

    // Method to stop the spinning animation
    public stopSpinning(body: HTMLElement): void {
        this.html.style.animation = "";
        body.appendChild(this.html);
    }

    // Chasers follow the player. If the player is farther away they move faster.
    public move(playerX: number, playerY: number): void {
        this.oldX = this.x;
        this.oldY = this.y;
        this.x += this.speed  * (this.x > playerX ? -1 : 1);
        this.y += this.speed  * (this.y > playerY ? -1 : 1)

        if (this.x > 100 - this.width)
            this.x = 100 - this.width;
        else if (this.x < 0)
            this.x = 0;
        if (this.y > 100 - this.height)
            this.y = 100 - this.height;
        else if (this.y < 0)
            this.y = 0;


        const chaserArray = Chaser.getChaserArray();
        for (let j = 0; j < chaserArray.length; j++) {
            if (this.getId() === chaserArray[j].getId() )
                continue;
            if (this.checkCollision(chaserArray[j])) {
                this.revert();
                return
            }
        }

    }

    // Chasers end the game on collision.
    public onHitTarget(): string {
        return "Over";
    }
}

export default Chaser;
