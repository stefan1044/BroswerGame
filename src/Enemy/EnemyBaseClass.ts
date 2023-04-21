import {EnemyTypes, EnemyShapes} from "./EnemyEnums";

export default abstract class EnemyBaseClass {
    private readonly id:number;
    protected x:number;
    protected y:number;
    protected readonly speed:number;
    protected readonly size:number;
    protected shape: EnemyShapes;
    type: EnemyTypes;
    protected constructor(x: number, y: number, id: number) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.speed = Math.random()/1000;
        if (this.speed < 0.0001)
            this.speed = 0.0001;
        this.size = Math.floor(Math.random()*6) + 6;
    }
    public getCoordinates(): [number, number]{
        return [this.x, this.y]
    }
    public getSize(): number{
        return this.size;
    }
    public getSpeed(): number{
        return this.speed;
    }
    public getShape(): EnemyShapes{
        return this.shape;
    }
    public getId():number{
        return this.id;
    }
    abstract move(x: number, y: number): void;
    abstract onHitTarget(): string;
}
