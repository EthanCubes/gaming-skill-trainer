let testing = false;
let mouse_over = false;

let hit_circle = document.getElementById("hit_circle");
let x = 50;
let y = 50;

hit_circle.addEventListener("click", () => circle_clicked());

function circle_clicked() {
    x = Math.floor(Math.random()*80) + 10;
    y = Math.floor(Math.random()*80) + 10;
    hit_circle.style.left = x + "%";
    hit_circle.style.top = y + "%";
}