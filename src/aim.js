let testing = false;
let mouse_over = false;

const hit_circle = document.getElementById("hit_circle");
const aim_timer = document.getElementById("timer");
const accuracy_counter = document.getElementById("counter");
const message = document.getElementById("message");

let x = 50;
let y = 50;

let correct_clicks = 0;
let clicks = 0;
let accuracy;
let start_time = 0;
let end_time = Date.now();

let interval;

document.addEventListener("click", function() {if (testing) {clicks += 1; accuracy = ((correct_clicks / (clicks - 1)) * 100).toFixed(2); if (isNaN(accuracy)) {accuracy = 100;}; accuracy_counter.innerHTML = accuracy + "% Accuracy"; console.log("clicked");}});
hit_circle.addEventListener("click", () => circle_clicked());
function circle_clicked() {
    correct_clicks += 1;
    if ((!(testing)) && (end_time > 500)) {
        testing = true;
        start_time = Date.now();
        interval = setInterval(update_time, 10);
        correct_clicks = 0;
        clicks = 0;
        message.style.display = "none";
    }
    if (correct_clicks >= 16) {
        testing = false;
        alert("You hit all the circles in " + time + " seconds at " + accuracy + "% accuracy.");
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
