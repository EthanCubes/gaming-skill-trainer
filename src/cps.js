let test_time = 5;

let click_counter = document.getElementById("click_counter");
let click_timer = document.getElementById("click_timer");
let message = document.getElementById("message");
let interval;

let testing = false;
let start_time;
let stop_time = Date.now();
let clicks = 0;
let cps;

let isMouseDown;

document.addEventListener("click", function() {
    console.log("hi");
    if ((!(testing)) && ((Date.now() - stop_time) >= 1000)) {
        clicks = 0;
        cps = 0;
        testing = true;
        start_time = Date.now();
        interval = setInterval(test_loop, 10);
    }
    clicks += 1;
})

document.addEventListener("mousedown", () => {isMouseDown = true;});
document.addEventListener("mouseup", () => {isMouseDown = false;});

function test_loop() {
    if (isMouseDown) {
        document.body.style.backgroundColor = "rgb(25, 25, 25";
    }
    else {
        document.body.style.backgroundColor = "black";
    }
    if (testing === true) {
        message.style.display = "none";
        let time = (Date.now() - start_time) / 1000;
        console.log(time)
        cps = (clicks / time).toFixed(1);
        click_counter.innerHTML = clicks + " Clicks | " + cps + " CPS";
        click_timer.innerHTML = (test_time - time).toFixed(2);
        if (time > test_time) {
            testing = false;
            clearInterval(interval);
            interval = null;
            document.body.style.backgroundColor = "black";
            alert("You have gotten " + cps + " cps!");
            stop_time = Date.now()
            message.style.display = "block";
        }
    }
}
