import Chaser from "./Chaser";
import Escape from "./Escape";
import Random from "./Random";
import {EnemyTypes} from "./EnemyEnums";


// Factory class to create new enemies
class EnemyFactory {
    private enemiesCreated: number;
    private speedMultiplier: number;

    constructor(speedMultiplier: number) {
        this.enemiesCreated = 0;
        this.speedMultiplier = speedMultiplier / 100;
    }

    // Creates a random enemy at a random location
    public getRandomEnemy(): Chaser | Escape | Random {

        const temp: number = Math.floor(Math.random() * 3);
        let x: number = Math.random() * 88;
        let y: number = Math.random() * 88;
        while ((x > 35 && x < 65) && (y > 35 && y < 65)) {
            x = Math.random() * 88;
            y = Math.random() * 88;
        }

        if (temp === 1) {
            this.enemiesCreated++;
            return new Chaser(x, y, this.enemiesCreated, this.speedMultiplier);
        } else if (temp === 2) {
            this.enemiesCreated++;
            return new Escape(x, y, this.enemiesCreated, this.speedMultiplier)
        } else {
            this.enemiesCreated++;
            return new Random(x, y, this.enemiesCreated, this.speedMultiplier);
        }
    }

    // Creates a specific enemy at a random location.
    public getSpecificEnemy(type: EnemyTypes): Chaser | Escape | Random {
        let x: number = Math.random() * 88;
        let y: number = Math.random() * 88;
        while ((x > 35 && x < 65) && (y > 35 && y < 65)) {
            x = Math.random() * 88;
            y = Math.random() * 88;
        }

        this.enemiesCreated++;
        if (type === EnemyTypes.Chaser) {
            return new Chaser(x, y, this.enemiesCreated, this.speedMultiplier);
        }
        if (type === EnemyTypes.Escape) {
            return new Escape(x, y, this.enemiesCreated, this.speedMultiplier);
        }
        if (type === EnemyTypes.Random) {
            return new Random(x, y, this.enemiesCreated, this.speedMultiplier);
        }

    }

    public getEnemiesCreated(): number {
        return this.enemiesCreated;
    }
}


export default EnemyFactory;
