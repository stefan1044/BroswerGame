import EnemyBaseClass from "./EnemyBaseClass"
import {EnemyShapes, EnemyTypes} from "./EnemyEnums";


class Random extends EnemyBaseClass {
    constructor(x: number, y: number, id: number) {
        super(x, y, id);
        this.type = EnemyTypes.Random;
        this.shape = EnemyShapes.Square;
    }

    public move(playerX:number, playerY:number){

    }
    public onHitTarget(): string {
        return "Over";
    }
}


export default Random;
