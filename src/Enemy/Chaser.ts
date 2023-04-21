import EnemyBaseClass from "./EnemyBaseClass"
import {EnemyShapes, EnemyTypes} from "./EnemyEnums";


class Chaser extends EnemyBaseClass {
    constructor(x: number, y: number, id: number) {
        super(x, y, id);
        this.type = EnemyTypes.Chaser;
        this.shape = EnemyShapes.Triangle;
    }

    public move(playerX:number, playerY:number){
        this.x += this.speed * Math.abs(this.x - playerX) * (this.x > playerX? -1:1);
        this.y += this.speed * Math.abs(this.y - playerY) * (this.y > playerY? -1:1);

        if (this.x > 100 - this.size/2)
            this.x = 100 - this.size/2;
        else if (this.x < 0)
            this.x = 0;
        if (this.y > 100 - this.size)
            this.y = 100 - this.size;
        else if (this.y < 0)
            this.y = 0;
    }
    public onHitTarget(): string {
        return "Over";
    }
}

export default Chaser;
