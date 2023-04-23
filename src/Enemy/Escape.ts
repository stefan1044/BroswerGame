import EnemyBaseClass from "./EnemyBaseClass"
import {EnemyShapes, EnemyTypes} from "./EnemyEnums";


class Escape extends EnemyBaseClass {
    private canGiveScore: boolean;
    private evade: boolean;
    private canMove: boolean;
    private pushX: number;
    private pushY: number;

    constructor(x: number, y: number, id: number, speedMultiplier: number) {
        super(x, y, id, speedMultiplier);
        this.type = EnemyTypes.Escape;
        this.shape = EnemyShapes.Circle;
        this.speed *= 0.5;
        this.canGiveScore = true;
        this.canMove = true;
        this.evade = true;
    }

    // Escapes will run from the player. The closer the player is to them the faster they get.
    public move(playerX: number, playerY: number): void {
        if (!this.canMove)
            return;

        this.x += this.speed * (100 - Math.abs(this.x - playerX) / 2 + 1) * (this.x > playerX ? 1 : -1);
        this.y += this.speed * (100 - Math.abs(this.y - playerY) / 2 + 1) * (this.y > playerY ? 1 : -1);

        if (this.x > 100 - this.width)
            this.x = 100 - this.width;
        else if (this.x < 0)
            this.x = 0;
        if (this.y > 100 - this.height)
            this.y = 100 - this.height;
        else if (this.y < 0)
            this.y = 0;
    }

    // Method to move Escapes in a specific direction.
    private forceMove(): void {
        this.x += this.pushX;
        this.y += this.pushY;

        if (this.x > 100 - this.width)
            this.x = 100 - this.width;
        else if (this.x < 0)
            this.x = 0;
        if (this.y > 100 - this.height)
            this.y = 100 - this.height;
        else if (this.y < 0)
            this.y = 0;
    }

    // Method that initiates the push in a direction.
    private push(step: number): void {
        if (step === 100) {
            this.canMove = true;
            this.canGiveScore = true;
            this.html.style.opacity = "100%"
            this.evade = true;
            return;
        }
        setTimeout(() => {
            this.forceMove();
            this.push(step + 1);
        }, 5)
    }

    // Escapes give points if touched, but only every 0.5 seconds. When touched they turn less opaque and gain a burst
    // of speed in a direction. If touched again they will change their direction and increase their speed.
    public onHitTarget(): string {
        if (this.canGiveScore) {
            this.canGiveScore = false;
            this.canMove = false;
            this.html.style.opacity = "30%"
            this.pushX = Math.random() / 6 * (Math.random() > 0.5 ? 1 : -1) * this.speedMultiplier;
            this.pushY = Math.random() / 6 * (Math.random() > 0.5 ? 1 : -1) * this.speedMultiplier;
            this.push(0);
            return "Score";
        } else if (this.evade) {
            this.evade = false;
            setTimeout(() => {
                this.evade = true;
            }, 50);
            this.pushX *= 1.5;
            this.pushY *= 1.5;
        }

        return "";
    }
}


export default Escape;
