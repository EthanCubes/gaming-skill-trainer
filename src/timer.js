let timing = 0; // 0 is not timing, 1 is timing, 2 is paused
let start_time;
let end_time = Date.now();
let pause_start;

let timer_interval;

document.addEventListener("click", user_input);

timer = document.getElementById("timer");

function user_input() {
    switch(timing) {
        case 0:
            // start the timer
            timer_interval = setInterval(update_timer, 10);
            timing = 1;
            start_timer = Date.now();
            break;
        case 1:
            pause_start = Date.now();
            timing = 2;
            break;
        case 2: 
            timing = 1;
            break;
    }
}

function update_timer() {
    let second_display;
    let minute_display;
    let ms_elapsed = Date.now() - start_timer;
    let seconds_left = 1200 - ms_elapsed / 1000;
    seconds_left = Math.round(seconds_left);
    // reset the timer when the timer runs out.
    if (seconds_left <= 0) {
        timing = 0;
        clearInterval(timer_interval);
        timer_interval = null;
        timer_end();
    } 
    minute_display = Math.floor((seconds_left / 60));
    second_display = seconds_left - minute_display * 60;
    timer.innerHTML = minute_display + ":" + second_display; 
}

function timer_end() {
    // idk
}
