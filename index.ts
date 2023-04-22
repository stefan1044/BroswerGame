import Game from "./src/Game";

let chaserValue = document.getElementById("chaserValue");
let randomValue = document.getElementById("randomValue");
let escapeValue = document.getElementById("escapeValue");
let randomEnemyValue = document.getElementById("randomEnemyValue");


const chaserSlider = document.getElementById("chaserRange");
const randomSlider = document.getElementById("randomRange");
const escapeSlider = document.getElementById("escapeRange");
const randomEnemySlider = document.getElementById("randomEnemyRange");

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


const game = new Game();
document.getElementById("startButton").addEventListener("click", () => {
    const chasers = parseInt((document.getElementById("chaserRange") as HTMLInputElement).value);
    const randoms = parseInt((document.getElementById("randomRange") as HTMLInputElement).value);
    const escapes = parseInt((document.getElementById("escapeRange") as HTMLInputElement).value);
    const randomEnemies = parseInt((document.getElementById("randomEnemyRange") as HTMLInputElement).value);
    game.startGame(chasers, randoms, escapes, randomEnemies);
});


