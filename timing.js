let testing = false;
let interval;
let start_time;
let end_time = Date.now();

document.addEventListener("click", mouse_clicked())

function mouse_clicked() {
    if (testing) {
        if ((Date.now() - start_time) > 15000) {
            testing = false;
            end_time = Date.now();
            clearInterval(interval);
            interval = null;
        }
    }
    else {
        if ((Date.now() - end_time) > 500) {
            testing = true;
            interval = setInterval(gameloop(), 10);
            start_time = Date.now();
        }
    }
}

function gameloop() {}