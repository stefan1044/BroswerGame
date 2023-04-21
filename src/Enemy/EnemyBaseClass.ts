import {EnemyTypes, EnemyShapes} from "./EnemyEnums";

export default abstract class EnemyBaseClass {
    private readonly id:number;
    protected x:number;
    protected y:number;
    protected speed:number;
    protected readonly height:number;
    protected readonly width:number;
    protected shape: EnemyShapes;
    protected html: HTMLDivElement;
    protected type: EnemyTypes;
    protected constructor(x: number, y: number, id: number) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.speed = Math.random()/500;
        if (this.speed < 0.001)
            this.speed = 0.001;
        const size = Math.floor(Math.random()*6) + 6;
        this.height =size;
        this.width = size*0.48802;
    }
    public getCoordinates(): [number, number]{
        return [this.x, this.y]
    }
    public getHeight(): number{
        return this.height;
    }
    public getWidth(): number{
        return this.width;
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

    public appendToHtml(body: HTMLElement){
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
    abstract move(x: number, y: number): void;
    abstract onHitTarget(): string;
}
