import {EnemyShapes, EnemyTypes} from "./EnemyEnums";


// Abstract class that defines the common characteristics of all enemies.
export default abstract class EnemyBaseClass {
    private readonly id: number;
    protected x: number;
    protected y: number;
    protected speed: number;
    protected readonly height: number;
    protected readonly width: number;
    protected shape: EnemyShapes;
    protected html: HTMLDivElement;
    protected type: EnemyTypes;
    private brightness: boolean;

    protected constructor(x: number, y: number, id: number) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.speed = Math.random() / 500;
        if (this.speed < 0.001)
            this.speed = 0.001;
        const size = Math.floor(Math.random() * 6) + 6;
        this.height = size;
        this.width = size * 0.48802;
        this.brightness = true;
    }

    // Getters for different attributes
    public getCoordinates(): [number, number] {
        return [this.x, this.y]
    }

    public getHeight(): number {
        return this.height;
    }

    public getWidth(): number {
        return this.width;
    }

    public getSpeed(): number {
        return this.speed;
    }

    public getShape(): EnemyShapes {
        return this.shape;
    }

    public getId(): number {
        return this.id;
    }

    // Method to be called once we want to render the enemy. The html div is stored for later changes
    public appendToHtml(body: HTMLElement) {
        this.html = document.createElement("div");
        const coordinates = this.getCoordinates();

        this.html.className = this.getShape();
        this.html.id = this.getId().toString();
        this.html.style.left = `${coordinates[0].toString()}vw`;
        this.html.style.top = `${coordinates[1].toString()}vh`;
        this.html.style.width = `${this.width}vw`;
        this.html.style.height = `${this.height}vh`;
        this.html.style.zIndex = this.getId().toString();
        body.appendChild(this.html);
    }

    // Method that lowers the brightness and opacity of enemies. Called when the menu opens.
    public swapBrightness(): void{
        if (this.brightness === true){
            this.brightness = false;
            this.html.style.filter = `brightness(70%)`;
            this.html.style.opacity = `50%`;
            return
        }
        this.brightness = true;
        this.html.style.filter = `brightness(100%)`
        this.html.style.opacity = `100%`;
    }

    // Method that checks if an enemy is in collision with another enemy.
    public checkCollision(enemy: EnemyBaseClass): boolean {
        const enemyCoordinates = enemy.getCoordinates();
        if (enemyCoordinates[0] + enemy.getWidth() < this.x) {
            return false;
        }
        if (enemyCoordinates[0] > this.x + this.width) {
            return false;
        }
        if (enemyCoordinates[1] + enemy.getHeight() < this.y) {
            return false;
        }
        if (enemyCoordinates[1] > this.y + this.height) {
            return false;
        }

        return true;
    }

    // Method that need to be defined by all enemies. All enemies should be able to move and have a trigger on-hit.
    abstract move(x: number, y: number): void;

    abstract onHitTarget(): string;
}
