import Chaser from "./Chaser";
import Escape from "./Escape";
import Random from "./Random";

class EnemyFactory {
    private enemiesCreated;
    constructor(){
        this.enemiesCreated = 0;
    }

    public getEnemy(){

        const temp:number = Math.floor(Math.random() * 3);
        const x: number = Math.floor(Math.random() * 76) + 12;
        const y: number = Math.floor(Math.random() * 76) + 2;

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

    public getEnemiesCreated(): number{
        return this.enemiesCreated;
    }
}


export default EnemyFactory;
