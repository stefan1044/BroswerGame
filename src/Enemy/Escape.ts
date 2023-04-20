import EnemyBaseClass from "./EnemyBaseClass"
import {EnemyShapes, EnemyTypes} from "./EnemyEnums";


class Escape extends EnemyBaseClass {
    constructor(x: number, y: number, id: number) {
        super(x, y, id);
        this.type = EnemyTypes.Escape;
        this.shape = EnemyShapes.Circle;
    }

    public move(playerX:number, playerY:number){
        if (this.x > playerX)
            this.x += this.speed;
        else
            this.x -=this.speed;

        if (this.y > playerX)
            this.y += this.speed;
        else
            this.y -=this.speed;

        if (this.x > (100 - (this.size*6 + 6)/2))
            this.x = (100 - (this.size*6 + 6)/2);
        else if (this.x < (this.size*6 + 6)/2)
            this.x = (this.size*6 + 6)/2;

        if (this.y > (100 - (this.size*6 + 6)/2))
            this.y = (100 - (this.size*6 + 6)/2);
        else if (this.y < (this.size*6 + 6)/2)
            this.y = (this.size*6 + 6)/2;
    }
}


export default Escape;
