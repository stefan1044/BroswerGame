import EnemyBaseClass from "./Enemy/EnemyBaseClass";
import EnemyFactory from "./Enemy/EnemyFactory";
import Player from "./Player";
import {EnemyTypes} from "./Enemy/EnemyEnums";
import Random from "./Enemy/Random";
import Chaser from "./Enemy/Chaser";


class Game {
    private mouseX: number;
    private mouseY: number;
    private readonly windowHeight: number;
    private readonly windowWidth: number;
    private score: number;
    private scoreDiv: HTMLElement;
    private readonly body: HTMLElement;
    private readonly enemies: Array<EnemyBaseClass>;
    private readonly chasers: Array<Chaser>;
    private player: Player;
    private playerDiv: HTMLDivElement
    private endMenu: HTMLElement;
    private actionInterval: NodeJS.Timer;
    private scoreInterval: NodeJS.Timer;
    private startSetting: Array<number>;

    // Event listener for mouse coordinates.
    private setMouseCoordinates(event: any) {
        this.mouseX = event.pageX / this.windowWidth * 100;
        this.mouseY = event.pageY / this.windowHeight * 100;
    }

    constructor() {
        this.body = document.getElementById("canvas");
        this.enemies = new Array<EnemyBaseClass>();
        this.chasers = new Array<Chaser>();

        this.windowHeight = window.innerHeight;
        this.windowWidth = window.innerWidth;

        document.addEventListener("mousemove", this.setMouseCoordinates.bind(this));
    }

    // Performs cleanup once the game is over and displays the menu or restarts.
    private cleanup(restart: boolean): void{
        this.endMenu.remove();
        this.playerDiv.remove();
        this.scoreDiv.remove();
        for (const enemy of this.enemies) {
            const enemyDiv = document.getElementById(enemy.getId().toString());
            enemyDiv.remove();
        }
        while (this.enemies.length > 0)
            this.enemies.pop();
        while (this.chasers.length > 0)
            this.chasers.pop();
        this.body.style.filter = `brightness(100%)`;

        if (restart === true) {
            this.startGame(this.startSetting[0], this.startSetting[1], this.startSetting[2], this.startSetting[3],
                this.startSetting[4], this.startSetting[5], this.startSetting[6] === 1);
            return;
        }

        document.getElementById("difficultyPage").style.display = "initial";
    }

    // Cleans up intervals and display end menu.
    private endGame(): void {

        clearInterval(this.actionInterval);
        clearInterval(this.scoreInterval);


        this.endMenu = document.createElement("div");
        this.endMenu.className = "endMenu";
        const endText = document.createElement("h1");
        endText.innerHTML = `Ended game with score ${this.score}\n             Restart?`;
        this.endMenu.appendChild(endText);
        const restartButton = document.createElement("button");
        restartButton.innerHTML = `RESTART`;
        restartButton.addEventListener('click', this.cleanup.bind(this, true));
        this.endMenu.appendChild(restartButton);
        const menuButton = document.createElement("button");
        menuButton.innerHTML = `MENU`;
        menuButton.className = `endMenuButton`;
        menuButton.addEventListener('click', this.cleanup.bind(this, false))
        this.endMenu.appendChild(menuButton);

        this.score = 0;
        for(const enemy of this.enemies){
            enemy.swapBrightness();
        }
        this.body.style.filter = `brightness(60%)`;
        this.playerDiv.style.filter = `brightness(70%)`;
        this.playerDiv.style.opacity = `50%`;

        for(const chaser of this.chasers){
            chaser.stopSpinning(this.body);
        }

        this.body.appendChild(this.endMenu);
    }

    // Draws all the graphic components
    private redraw(): void {
        const playerCoordinates = this.player.getCoordinates();
        document.getElementById("0").style.left = `${playerCoordinates[0]}vw`;
        document.getElementById("0").style.top = `${playerCoordinates[1]}vh`;

        for (const enemy of this.enemies) {
            document.getElementById(enemy.getId().toString()).style.left = `${enemy.getCoordinates()[0]}vw`;
            document.getElementById(enemy.getId().toString()).style.top = `${enemy.getCoordinates()[1]}vh`;
        }
        this.scoreDiv.innerHTML = `${this.score}`;
    }

    // Gets all the actions of the components and checks collisions and sets new positions.
    private actionQueue() {
        const playerCoordinates = this.player.getCoordinates();
        if (this.mouseX !== undefined && this.mouseY !== undefined) {
            this.player.move(this.mouseX, this.mouseY);
        }

        for (const enemy of this.enemies) {
            if (this.player.checkCollision(enemy)) {
                const collisionResponse: string = enemy.onHitTarget();

                if (collisionResponse === "Over") {
                    this.redraw();
                    this.endGame();
                    return;
                } else if (collisionResponse === "Score") {
                    this.score += 5;
                }
            }

            if (enemy.getShape() === "square") {
                (enemy as Random).move();
            } else  {
                enemy.move(playerCoordinates[0], playerCoordinates[1])
            }
        }


        this.redraw();
    }

    // Initial game setup
    public startGame(numberOfChasers: number, numberOfRandoms: number, numberOfEscapes: number,
                     numberOfRandomEnemies: number, enemySpeedMultiplier: number, playerSpeedMultiplier: number, playerMode: boolean) {
        document.getElementById("difficultyPage").style.display = "none"; // Hide the menu page
        this.startSetting = [numberOfChasers, numberOfRandoms, numberOfEscapes, numberOfRandomEnemies, enemySpeedMultiplier,
            playerSpeedMultiplier, playerMode === true? 1:0];

        // Create score component
        this.score = 0;
        this.scoreDiv = document.createElement("h1");
        this.scoreDiv.className = "score";
        this.scoreDiv.innerHTML = `${this.score}`;
        this.scoreDiv.style.zIndex = `-1`;
        this.body.appendChild(this.scoreDiv);

        // Create player component
        this.player = new Player(50, 50, 0.06 * (playerSpeedMultiplier/100), playerMode);
        this.playerDiv = document.createElement("div");
        this.playerDiv.id = "0";
        this.playerDiv.className = "player";
        this.playerDiv.style.left = `50vw`;
        this.playerDiv.style.top = `50vh`;
        this.playerDiv.style.zIndex = `2000000`;
        this.body.appendChild(this.playerDiv);

        this.actionInterval = setInterval(this.actionQueue.bind(this), 5);
        this.scoreInterval = setInterval(() => {
            this.score++;
        }, 1000);

        const enemyFactory = new EnemyFactory(enemySpeedMultiplier);

        for (let i: number = 0; i < numberOfChasers; i++) {
            let newEnemy = enemyFactory.getSpecificEnemy(EnemyTypes.Chaser);

            newEnemy.appendToHtml(this.body);
            this.enemies.push(newEnemy);
            this.chasers.push(newEnemy as Chaser);
        }
        for (let i: number = 0; i < numberOfEscapes; i++) {
            let newEnemy = enemyFactory.getSpecificEnemy(EnemyTypes.Escape);

            newEnemy.appendToHtml(this.body);
            this.enemies.push(newEnemy);
        }
        for (let i: number = 0; i < numberOfRandoms; i++) {
            let newEnemy = enemyFactory.getSpecificEnemy(EnemyTypes.Random);

            newEnemy.appendToHtml(this.body);
            this.enemies.push(newEnemy);
        }
        for (let i: number = 0; i < numberOfRandomEnemies; i++) {
            let newEnemy = enemyFactory.getRandomEnemy();

            newEnemy.appendToHtml(this.body);
            this.enemies.push(newEnemy);
            if (newEnemy.getShape() === "triangle")
                this.chasers.push(newEnemy as Chaser);
        }

    }
}

export default Game;
