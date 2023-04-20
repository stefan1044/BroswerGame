import EnemyBaseClass from "./src/Enemy/EnemyBaseClass";
import EnemyFactory from "./src/Enemy/EnemyFactory";
import Player from "./src/Player";

function setMouseCoordinates(event: any){
    mouseX = event.pageX/windowWidth * 100;
    mouseY = event.pageY/windowHeight * 100;
}

function startGame(numberOfEnemies: number){
    const enemyFactory = new EnemyFactory();


    for(let i:number = 0;i<numberOfEnemies;i++){
        const newEnemy = enemyFactory.getEnemy();
        const coordinates = newEnemy.getCoordinates();
        enemies.push(newEnemy);

        const newDiv = document.createElement("div");
        newDiv.className = newEnemy.getShape();
        newDiv.id = newEnemy.getId().toString();
        newDiv.style.left = `${coordinates[0].toString()}vw`;
        newDiv.style.top = `${coordinates[1].toString()}vh`;
        newDiv.style.width = `${Math.floor(newEnemy.getSize() * 6 + 6)}vh`;
        newDiv.style.height = `${Math.floor(newEnemy.getSize() * 6) + 6}vh`;
        newDiv.style.zIndex = newEnemy.getId().toString();
        body.appendChild(newDiv);
    }

    console.log(enemies);

}

function redraw(){
    const playerCoordinates = player.getCoordinates();
    document.getElementById("0").style.left = `${playerCoordinates[0]}vw`;
    document.getElementById("0").style.top = `${playerCoordinates[1]}vh`;

    for(const enemy of enemies){
        document.getElementById(enemy.getId().toString()).style.left = `${enemy.getCoordinates()[0]}vw`;
        document.getElementById(enemy.getId().toString()).style.top = `${enemy.getCoordinates()[1]}vh`;
    }
}

function actionQueue(){
    const playerCoordinates = player.getCoordinates();
    if (mouseX !== undefined && mouseY !== undefined) {
        let newX = playerCoordinates[0] + (mouseX - playerCoordinates[0]) * player.getSpeed();
        let newY = playerCoordinates[1] + (mouseY - playerCoordinates[1]) * player.getSpeed();
        player.move(newX, newY);
    }

    for(const enemy of enemies){
        enemy.move(playerCoordinates[0], playerCoordinates[1]);
    }

    redraw();

}

const body = document.getElementById("canvas");
const enemies:Array<EnemyBaseClass> = new Array<EnemyBaseClass>();
const player = new Player(50, 50, 0.01);
const playerDiv = document.createElement("div");
playerDiv.id = "0";
playerDiv.className = "player";
playerDiv.style.left = `50vw`;
playerDiv.style.top = `50vh`;
playerDiv.style.zIndex = `10000`;
body.appendChild(playerDiv);

let mouseX:number, mouseY: number;
const windowHeight: number = window.innerHeight, windowWidth:number = window.innerWidth;
document.addEventListener("mousemove", setMouseCoordinates);

console.log(player.getCoordinates());
startGame(10);
setInterval(actionQueue, 5);
