import EnemyBaseClass from "./EnemyBaseClass"
import {EnemyShapes, EnemyTypes} from "./EnemyEnums";


class Random extends EnemyBaseClass {
    private xPath: number;
    private yPath: number;

    constructor(x: number, y: number, id: number) {
        super(x, y, id);
        this.type = EnemyTypes.Random;
        this.shape = EnemyShapes.Square;
        this.xPath = Math.random() * (Math.random() > 0.5 ? 1 : -1) * 80;
        this.yPath = Math.random() * (Math.random() > 0.5 ? 1 : -1) * 80;

    }

    private changePath(): void {
        this.xPath = Math.random() * (Math.random() > 0.5 ? 1 : -1) * 110;
        this.yPath = Math.random() * (Math.random() > 0.5 ? 1 : -1) * 110;
        if (this.xPath < 15) {
            this.xPath += 15;
        }
        if (this.yPath < 15) {
            this.yPath += 15;
        }
        //console.log(`PATHS: ${this.xPath}, ${this.yPath}`);
    }

    public move() {
        if (this.x > 100 - this.width) {
            this.x = 100 - this.width;
            this.changePath();
        } else if (this.x < 0) {
            this.changePath();
            this.x = 0;
            this.changePath();
        }
        if (this.y > 100 - this.height) {
            this.y = 100 - this.height;
            this.changePath();
        } else if (this.y < 0) {
            this.y = 0;
            this.changePath();
        }
        this.x += this.xPath * this.speed;
        this.y += this.yPath * this.speed;

    }

    public onHitTarget(): string {
        return "Over";
    }
}


export default Random;
