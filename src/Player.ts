export default class Player {
    private x: number;
    private y: number;
    private readonly speed: number;

    constructor(x: number, y: number, speed: number) {
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    public getCoordinates(): [number, number] {
        return [this.x, this.y];
    }

    public getSpeed(): number {
        return this.speed;
    }

    public move(x: number, y: number): void {
        this.x += (x - this.x)*this.speed/7 + ((x - this.x) > 0? 1:-1)*this.speed;
        this.y += (y - this.y)*this.speed /7 + ((y - this.y) > 0? 1:-1)*this.speed;

        if (this.x > 97)
            this.x = 97
        else if (this.x < 0)
            this.x = 0
        if (this.y > 94)
            this.y = 94
        else if (this.y < 0)
            this.y = 0
    }

}