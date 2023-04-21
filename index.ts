import EnemyBaseClass from "./src/Enemy/EnemyBaseClass";
import EnemyFactory from "./src/Enemy/EnemyFactory";
import Player from "./src/Player";
import {EnemyTypes} from "./src/Enemy/EnemyEnums";
import Random from "./src/Enemy/Random";

function setMouseCoordinates(event: any){
    mouseX = event.pageX/windowWidth * 100;
    mouseY = event.pageY/windowHeight * 100;
    // console.log(`Mouse coordinates ${mouseX}, ${mouseY}`);
}

function startGame(numberOfChasers: number, numberOfRandoms: number, numberOfEscapes: number, numberOfRandomEnemies: number){
    score = 0;
    actionInterval = setInterval(actionQueue, 5);
    scoreInterval = setInterval(() => {
        score++;
        console.log(`SCORE IS ${score}`);
    }, 1000);

    player = new Player(50, 50, 0.03);
    playerDiv = document.createElement("div");
    playerDiv.id = "0";
    playerDiv.className = "player";
    playerDiv.style.left = `50vw`;
    playerDiv.style.top = `50vh`;
    playerDiv.style.zIndex = `10000`;
    body.appendChild(playerDiv);

    const enemyFactory = new EnemyFactory();

    for(let i:number = 0;i<numberOfChasers;i++){
        let newEnemy = enemyFactory.getSpecificEnemy(EnemyTypes.Chaser);
        while (checkCollision(player.getCoordinates(), newEnemy)){
            newEnemy = enemyFactory.getRandomEnemy();
        }
        newEnemy.appendToHtml(body);
        enemies.push(newEnemy);
    }
    for(let i:number = 0;i<numberOfEscapes;i++){
        let newEnemy = enemyFactory.getSpecificEnemy(EnemyTypes.Escape);
        while (checkCollision(player.getCoordinates(), newEnemy)){
            newEnemy = enemyFactory.getRandomEnemy();
        }
        newEnemy.appendToHtml(body);
        enemies.push(newEnemy);
    }
    for(let i:number = 0;i<numberOfRandoms;i++){
        let newEnemy = enemyFactory.getSpecificEnemy(EnemyTypes.Random);
        while (checkCollision(player.getCoordinates(), newEnemy)){
            newEnemy = enemyFactory.getRandomEnemy();
        }
        newEnemy.appendToHtml(body);
        enemies.push(newEnemy);
    }
    for(let i:number = 0;i<numberOfRandomEnemies;i++){
        let newEnemy = enemyFactory.getRandomEnemy();
        while (checkCollision(player.getCoordinates(), newEnemy)){
            newEnemy = enemyFactory.getRandomEnemy();
        }
        newEnemy.appendToHtml(body);
        enemies.push(newEnemy);
    }

    console.log(enemies);
}

function endGame(): void{
    alert(`GAME OVER! SCORE IS ${score}`);
    score = 0;

    clearInterval(actionInterval);
    clearInterval(scoreInterval);

    playerDiv.remove();
    for(const enemy of enemies){
        const enemyDiv = document.getElementById(enemy.getId().toString());
        enemyDiv.remove();
    }
    while (enemies.length > 0)
        enemies.pop();
}

// TODO: Check collision for each enemy type
function checkCollision(objectCoordinates: [number, number], enemy: EnemyBaseClass): boolean{
    const enemyCoordinates = enemy.getCoordinates();

    if (enemy.getShape() !== "triangle") {
        if (enemyCoordinates[0] + enemy.getWidth() < objectCoordinates[0])
            return false;
        if (enemyCoordinates[0] > objectCoordinates[0] + 3)
            return false;
        if (enemyCoordinates[1] + enemy.getHeight() < objectCoordinates[1])
            return false;
        if (enemyCoordinates[1] > objectCoordinates[1] + 6)
            return false;
    }
    else {
        if (enemyCoordinates[0] + enemy.getWidth() * 0.9  < objectCoordinates[0]) {
            // console.log(`RIGHT DISTANCE IS OK!`);
            return false;
        }
        if (enemyCoordinates[0] > objectCoordinates[0] + 6*0.48802*0.9) {
            // console.log(`LEFT DISTANCE IS OK!`);
            return false;
        }
        if (enemyCoordinates[1] + enemy.getHeight() < objectCoordinates[1]) {
            // console.log(`DOWN DISTANCE IS OK!`);
            return false;
        }
        if (enemyCoordinates[1] > objectCoordinates[1] + 4.5) {
            // console.log(`UP DISTANCE IS OK!`);
            return false;
        }
    }

    return true

}

function redraw(){
    const playerCoordinates = player.getCoordinates();
    // console.log(`Player coordinates ${playerCoordinates[0]}, ${playerCoordinates[1]}`);
    document.getElementById("0").style.left = `${playerCoordinates[0]}vw`;
    document.getElementById("0").style.top = `${playerCoordinates[1]}vh`;

    for(const enemy of enemies){
        //console.log(`Coordinates of enemy${enemy.getId()}: ${enemy.getCoordinates()[0]},
        // ${enemy.getCoordinates()[1]}`)
        document.getElementById(enemy.getId().toString()).style.left = `${enemy.getCoordinates()[0]}vw`;
        document.getElementById(enemy.getId().toString()).style.top = `${enemy.getCoordinates()[1]}vh`;
    }
}

function actionQueue(){
    const playerCoordinates = player.getCoordinates();
    if (mouseX !== undefined && mouseY !== undefined) {
        player.move(mouseX, mouseY);
    }

    for(const enemy of enemies){
        if (checkCollision(playerCoordinates, enemy)){
            const collisionResponse: string = enemy.onHitTarget();

            if(collisionResponse === "Over"){
                // console.log(`END: ${enemy.getCoordinates()}`);
                endGame();
                startGame(3,3,3,3);
            }
            else if (collisionResponse === "Score"){
                score+=5;
                console.log(`SCORE`);
            }
        }

        if (enemy.getShape() === "square") {
            (enemy as Random).move();
        }
        else {
            enemy.move(playerCoordinates[0], playerCoordinates[1])
        }
    }

    redraw();

}

const body = document.getElementById("canvas");
const enemies:Array<EnemyBaseClass> = new Array<EnemyBaseClass>();
let player : Player;
let playerDiv: HTMLDivElement;


let score: number;
let mouseX:number, mouseY: number;
const windowHeight: number = window.innerHeight, windowWidth:number = window.innerWidth;
const heightToWidthRatio = windowHeight/windowWidth;
document.addEventListener("mousemove", setMouseCoordinates);

// console.log(player.getCoordinates());
startGame(3,3,3,3);
let actionInterval: NodeJS.Timer;
let scoreInterval: NodeJS.Timer;

setInterval(()=>{
    console.log(`MOUSE POSITION: ${mouseX}, ${mouseY}`);
}, 500);