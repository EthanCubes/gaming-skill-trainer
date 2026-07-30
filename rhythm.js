let testing = false;

let start_time;
let end_time;

let click_time;
let rhythm_click = false;
let last_click_time = Date.now();

const message = document.getElementById("message");

document.addEventListener("click", clicked);
setInterval(gameloop, 10);

function clicked() {
    if (!(testing)) {
        testing = true;
        start_time = Date.now();
        last_click_time = Date.now();
    }
    else {
        if (rhythm_click) {
            last_click_time = Date.now();
            rhythm_click = false;
            console.log(Date.now() - click_time);
            document.body.style.backgroundColor = "black";
        }
    }
}

function gameloop() {
    if (testing) {
        message.innerHTML = "Go";
        // Terminate statement once time limit is reached.
        if ((Date.now() - start_time) > 15000) {
            testing = false;
            end_time = Date.now();
        }
        if ((Date.now() - last_click_time) > 333) {
            if (Math.random() < 0.2) {
                rhythm_click = true;
                document.body.style.backgroundColor = "grey";
            }
        }
    }
    else {
        message.innerHTML = "Click here to start the rhythm test.";
    }
}