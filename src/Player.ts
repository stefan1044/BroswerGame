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
        if (x > 97)
            x = 97
        else if (x < 3)
            x = 3
        if (y > 97)
            y = 97
        else if (y < 3)
            y = 3
        this.x = x;
        this.y = y;
    }

}