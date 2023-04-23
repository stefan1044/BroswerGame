import Game from "./src/Game";

// Listeners for slider elements
let chaserValue = document.getElementById("chaserValue");
let randomValue = document.getElementById("randomValue");
let escapeValue = document.getElementById("escapeValue");
let randomEnemyValue = document.getElementById("randomEnemyValue");
let enemySpeedValue = document.getElementById("enemySpeedValue");
let playerSpeedValue = document.getElementById("playerSpeedValue");

const chaserSlider = document.getElementById("chaserRange");
const randomSlider = document.getElementById("randomRange");
const escapeSlider = document.getElementById("escapeRange");
const randomEnemySlider = document.getElementById("randomEnemyRange");
const enemySpeedSlider = document.getElementById("enemySpeedRange");
const playerSpeedSlider = document.getElementById("playerSpeedRange");


chaserSlider.oninput = () => {
    chaserValue.innerHTML = `Chasers: ${(chaserSlider as HTMLInputElement).value}`
}
randomSlider.oninput = () => {
    randomValue.innerHTML = `Randoms: ${(randomSlider as HTMLInputElement).value}`
}
escapeSlider.oninput = () => {
    escapeValue.innerHTML = `Escapes: ${(escapeSlider as HTMLInputElement).value}`
}
randomEnemySlider.oninput = () => {
    randomEnemyValue.innerHTML = `Random enemies: ${(randomEnemySlider as HTMLInputElement).value}`
}
enemySpeedSlider.oninput = () => {
    enemySpeedValue.innerHTML = `Enemy speed: ${(enemySpeedSlider as HTMLInputElement).value}%`;
}
playerSpeedSlider.oninput = () => {
    playerSpeedValue.innerHTML = `Player speed: ${(playerSpeedSlider as HTMLInputElement).value}%`;
}


const game = new Game();
// Start button listener
document.getElementById("startButton").addEventListener("click", () => {
    const chasers = parseInt((document.getElementById("chaserRange") as HTMLInputElement).value);
    const randoms = parseInt((document.getElementById("randomRange") as HTMLInputElement).value);
    const escapes = parseInt((document.getElementById("escapeRange") as HTMLInputElement).value);
    const randomEnemies = parseInt((document.getElementById("randomEnemyRange") as HTMLInputElement).value);
    const enemySpeedMultiplier = parseInt((document.getElementById("enemySpeedRange") as HTMLInputElement).value);
    const playerSpeedMultiplier = parseInt((document.getElementById("playerSpeedRange") as HTMLInputElement).value);


    game.startGame(chasers, randoms, escapes, randomEnemies, enemySpeedMultiplier, playerSpeedMultiplier);
});


