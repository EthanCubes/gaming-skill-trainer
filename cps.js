let click_counter = document.getElementById("click_counter");
let click_timer = document.getElementById("click_timer");
let message = document.getElementById("message");
let interval;

let testing = false;
let start_time;
let stop_time = Date.now();
let clicks = 0;
let cps;

document.addEventListener("click", function() {
    console.log("hi");
    if ((!(testing)) && (stop_time >= 1000)) {
        clicks = 0;
        cps = 0;
        testing = true;
        start_time = Date.now();
        interval = setInterval(test_loop, 10);
    }
    clicks += 1;
})

function test_loop() {
    if (testing === true) {
        message.style.display = "none";
        let time = (Date.now() - start_time) / 1000;
        console.log(time)
        cps = (clicks / time).toFixed(1);
        click_counter.innerHTML = clicks + " Clicks | " + cps + " CPS";
        click_timer.innerHTML = (5 - time).toFixed(2);
        if (time > 5) {
            testing = false;
            clearInterval(interval);
            interval = null;
            alert("You have gotten " + cps + " cps!");
            stop_time = Date.now()
            message.style.display = "block";
        }
    }
}