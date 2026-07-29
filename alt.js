const click_counter = document.getElementById("click_counter");
const click_timer = document.getElementById("click_timer");
const message = document.getElementById("message");

let testing = false;
let clicks = 0;
let cps;

let start_time;
let end_time = Date.now();

let interval = setInterval(gameloop, 10);

document.addEventListener("keyup", () => key_pressed());

function key_pressed() {
    if ((!(testing)) && ((Date.now() - end_time) > 1500)) {
        start_time = Date.now();
        clicks = 1;
        message.style.display = "none";
        testing = true;
    }
    else {
        clicks += 1;
    }
}

function gameloop() {
    if (testing) {
        let time = Date.now() - start_time;
        let timer = time / 1000;
        let cps = (clicks / timer).toFixed(2);
        click_timer.innerHTML = (10 - timer).toFixed(2);
        click_counter.innerHTML = clicks + " Clicks | " + cps + " CPS";
        if (timer > 10) {
            end_time = Date.now();
            message.style.display = "block";
            testing = false;
            interval = null;
            fake_alert("You have gotten " + cps + " CPS");
        }
    }
    else {
        if ((Date.now() - end_time) > 1500) {
            message.innerHTML = "Spam any key to start";
            document.body.style.backgroundColor = "black";
        }
    }
}

function fake_alert(alert_message) {
    message.innerHTML = alert_message;
    document.body.style.backgroundColor = "red";
}