import Chaser from "./Chaser";
import Escape from "./Escape";
import Random from "./Random";
import {EnemyTypes} from "./EnemyEnums";

class EnemyFactory {
    private enemiesCreated;
    constructor(){
        this.enemiesCreated = 0;
    }

    public getRandomEnemy(){

        const temp:number = Math.floor(Math.random() * 3);
        const x: number = Math.floor(Math.random() * 90) + 3;
        const y: number = Math.floor(Math.random() * 90) + 3;

        if (temp === 1){
            this.enemiesCreated++;
            return new Chaser(x, y, this.enemiesCreated);
        }
        else if (temp === 2){
            this.enemiesCreated++;
            return new Escape(x, y, this.enemiesCreated)
        }
        else {
            this.enemiesCreated++;
            return new Random(x, y, this.enemiesCreated);
        }
    }
    public getSpecificEnemy(type:  EnemyTypes): Chaser | Escape | Random {
        const x: number = Math.floor(Math.random() * 90) + 3;
        const y: number = Math.floor(Math.random() * 90) + 3;
        this.enemiesCreated++;
        if (type === EnemyTypes.Chaser){
            return new Chaser(x, y, this.enemiesCreated);
        }
        if (type === EnemyTypes.Escape){
            return new Escape(x, y, this.enemiesCreated);
        }
        if (type === EnemyTypes.Random){
            return new Random(x, y, this.enemiesCreated);
        }

    }

    public getEnemiesCreated(): number{
        return this.enemiesCreated;
    }
}


export default EnemyFactory;
