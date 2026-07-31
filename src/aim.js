let testing = false;
let mouse_over = false;

let hit_circle = document.getElementById("hit_circle");
let aim_timer = document.getElementById("aim_timer");
let message = document.getElementById("message");

let x = 50;
let y = 50;

let clicks = 0;
let start_time = 0;
let end_time = Date.now();

let interval;

hit_circle.addEventListener("click", () => circle_clicked());
    console.log("hi")
function circle_clicked() {
    clicks += 1;
    if ((!(testing)) && (end_time > 500)) {
        testing = true;
        start_time = Date.now();
        interval = setInterval(update_time, 10);
        clicks = 0;
        message.style.display = "none";
    }
    if (clicks >= 16) {
        testing = false;
        alert("You hit all the circles in " + time + " seconds.");
        end_time = Date.now();
        message.style.display = "block";
        
    }
    if (testing) {
        x = Math.floor(Math.random()*80) + 10;
        y = Math.floor(Math.random()*80) + 10;
    }
    else {
        x = 50;
        y = 25;
    }
    hit_circle.style.left = x + "%";
    hit_circle.style.top = y + "%";
}

function update_time() {
    if (testing) {
        time = ((Date.now() - start_time)/1000).toFixed(2);
        aim_timer.innerHTML = time;
    }
}