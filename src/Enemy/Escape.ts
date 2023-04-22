import EnemyBaseClass from "./EnemyBaseClass"
import {EnemyShapes, EnemyTypes} from "./EnemyEnums";


class Escape extends EnemyBaseClass {
    private canGiveScore: boolean;
    private evade: boolean;
    private canMove: boolean;
    private pushX: number;
    private pushY: number;

    constructor(x: number, y: number, id: number) {
        super(x, y, id);
        this.type = EnemyTypes.Escape;
        this.shape = EnemyShapes.Circle;
        this.speed *= 0.5;
        this.canGiveScore = true;
        this.canMove = true;
        this.evade = true;
    }

    public move(playerX: number, playerY: number): void {
        if (!this.canMove)
            return;

        this.x += this.speed * (100 - Math.abs(this.x - playerX)/2 + 1) * (this.x > playerX ? 1 : -1);
        this.y += this.speed * (100 - Math.abs(this.y - playerY)/2 + 1) * (this.y > playerY ? 1 : -1);

        if (this.x > 100 - this.width)
            this.x = 100 - this.width;
        else if (this.x < 0)
            this.x = 0;
        if (this.y > 100 - this.height)
            this.y = 100 - this.height;
        else if (this.y < 0)
            this.y = 0;
    }

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

    public onHitTarget(): string {
        if (this.canGiveScore) {
            this.canGiveScore = false;
            this.canMove = false;
            this.html.style.opacity = "30%"
            this.pushX = Math.random() / 4 * (Math.random() > 0.5 ? 1 : -1);
            this.pushY = Math.random() / 4 * (Math.random() > 0.5 ? 1 : -1);
            this.push(0);
            return "Score";
        } else if (this.evade){
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
