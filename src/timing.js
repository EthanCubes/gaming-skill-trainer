/*
# Game workflow
First, the program starts off idle
When a button is clicked, the test starts.

When the test is started, every once in a while, a dot will try to move across the screen. 
You have to click the mouse just as the dot hits the line.
The test goes on for 20 seconds. After the test is done, the program resets back to what it used to be.

If you click the circle just as it's on the line, you gain 300 points (like osu!). 
And then, you only get 100 points, then you only get 50 points, then you don't get any points.

At the end, something is broadcast to the user telling them how many points they got out of the maximum points they could have gotten.

Now, how the hell do I do this?

To-do list
[x] Start and end the program
[x] Circle is triggered.
[x] Circle moves across the screen
[x] Calculation of accuracy
[x] Alerting the user of accuracy

How accuracy is calculated
- Click when circle isn't even active = -100 points. At the end, if the number is below 0, it gets set to 0
- Click 15% before or after = +50 points
- Click 10% before or after = +100 points
- Click 5% before or after = +300 points
- Miss the circle entirely and don't click before the circle reaches the end = -100 points

Now that I've done everything that this comment says I need to do, I could like delete it, but I'm just going to leave it here because why now? And also because I'm too lazy to delete it.
*/
// States
let testing = false; // Time
let start_time;
let circle_start_time;
let circle_last_time = Date.now();
let end_time = Date.now();

// Circle
let circle_calculation_interval;
let circle_active = false;
let circle_click_attempt = false;
let circle_active_count;
let score;

// Pulse
let pulse_start;
let pulse_interval;

// Selection
const message = document.getElementById("message");
const circle = document.getElementById("precision_circle");
const line = document.getElementById("hit_line");
const screen_dimension_searcher = document.getElementById("screen_dimension_searcher");
const score_display = document.getElementById("score_display");
const pulse = document.getElementById("popup");
const timer = document.getElementById("timing_timer");

let screen_x = get_screen_dimensions(0, -50)[0];
let screen_y = get_screen_dimensions(0, -50)[1];

// Intervals and event listeners
setInterval(gameloop, 10);
document.addEventListener("click", user_input);
document.addEventListener("keyup", user_input);

// Functions
function user_input() {
    if (testing) {
        // Determine if there is a circle on the board, and how close the user was to getting a perfect score.
        let circle_x = remove_suffix(getComputedStyle(circle).left) / remove_suffix(screen_x) * 100;
        let valid = false;
        if (circle_active && ((44.25 < circle_x) && (circle_x < 54.25)) && !(valid) && !(circle_click_attempt)) {
            score += 150;
            pulse_popup(150);
            console.log("Great");
            valid = true;
        }
        if (circle_active && ((39.25 < circle_x) && (circle_x < 59.25)) && !(valid) && !(circle_click_attempt)) {
            score += 100;
            pulse_popup(100);
            console.log("Okay");
            valid = true;
        }
        if (circle_active && ((34.25 < circle_x) && (circle_x < 64.25)) && !(valid) && !(circle_click_attempt)) {
            score += 50;
            pulse_popup(50);
            console.log("Meh");
            valid = true;
        }
        if (circle_active && circle_click_attempt && !(valid)) {
            score -= 100;
            pulse_popup(-100);
            console.log("Miss");
            valid = true;
        }
        if (!(circle_active)) {
            score -= 100;
            pulse_popup(-100);
            console.log("miss");
            valid = true;
        }
        if (valid) {
            update_score_display(score, circle_active_count*150);
        }
        else {
            pulse_popup(0);
        }
        circle_click_attempt = true;
    }
    else {
        // Activation
        if ((Date.now() - end_time) > 500) {
            testing = true;
            start_time = Date.now();
            circle_active_count = 0;
            score = 0;
        }
    }
}

function gameloop() {
    switch(testing) {
        case true:
            message.style.display = "none";
            let delay = (20 - ((Date.now() - start_time) / 1000)).toFixed(2);
            timer.innerHTML = delay;
            if (((Date.now() - circle_last_time) > 750) && !(circle_active) && ((Date.now() - start_time) < 17500)) {
                // trigger the circle to go darting across the screen. we know that this is triggered from a previous debug statement that i have now removed
           	    circle_start_time = Date.now(); 
                circle_active = true;
                circle_active_count += 1;
                circle_click_attempt = false;
                circle_calculation_interval = setInterval(calculate_circle, 10);
            }
            if ((Date.now() - start_time) > 20000) {
                // Code to terminate the testing thing.
                document.body.style.backgroundColor = "black";
                testing = false;
                alert("You have gotten " + calculate_accuracy(circle_active_count, score) + "% accuracy");
            }
            break;
        case false:
            document.body.style.backgroundColor = "black";
            message.style.display = "block";
            message.innerHTML = "Click to start the timing test.";
            break;
    }
}

function calculate_circle() {
    let time_difference = (Date.now() - circle_start_time)/20; // Maximum of 2000
    // Time lasts roughly 2 seconds, 1 second too early and 1 second too late. This is actually 2000 milliseconds, which is exactly 20 times the 100% width of the screen.
    circle.style.left = (100 - time_difference) + "%"; // Moves the circle
    if ((time_difference > 99)) {
        // clear the interval after the circle is done moving
        clearInterval(circle_calculation_interval);
        circle_calculation_interval = null;
        circle_last_time = Date.now();
        end_timer = Date.now();
        circle_active = false;
        circle.style.left = "100%";
        if (!(circle_click_attempt)) {
            score -= 100;
            pulse_popup(-100)
            update_score_display(score, circle_active_count*150);
        }
    }
}

function calculate_accuracy(total, user_score) {
    let highest_possible_score = total * 150;
    let accuracy = ((user_score / highest_possible_score) * 100).toFixed(2); 
    return accuracy;
}

function get_screen_dimensions(translate_x, translate_y) {
    screen_dimension_searcher.style.transform = "translate(" + translate_x + "%, " + translate_y + "%)";
    screen_dimension_searcher.style.top = "100%";
    let screen_height = getComputedStyle(screen_dimension_searcher).top;
    screen_dimension_searcher.style.left = "100%";
    let screen_width = getComputedStyle(screen_dimension_searcher).left;
    screen_dimension_searcher.style.top = "90%";
    return [screen_width, screen_height];
}

function remove_suffix(text) {
    let result = "";
    let dot_count = 0;
    for (let i = 0; i < text.length; i++) {
        if (!(isNaN(text[i]/2)) || (text[i] === "." && dot_count === 0)) {
            if (text[i] === ".") {
                dot_count += 1;
            }
            result += text[i];
        }
    }
    return result;
}

function update_score_display(score, total_possible) {
    let percentage;
    if (total_possible === 0) {
        percentage = "100.00";
    }
    else {
        percentage = ((score / total_possible)*100).toFixed(2);
    }
    text = score + " / " + total_possible + " | " + percentage + "%";
    score_display.innerHTML = text;
}

function pulse_popup(score_gotten) {
    // hello there
    pulse_start = Date.now();
    clearInterval(pulse_interval);
    pulse_interval = setInterval(calculate_pulse, 10, score_gotten);
}

function calculate_pulse(score_gotten) { // I hope that this code works. I haven't tested it, and also Vim doesn't show any errors or warnings.
    let pulse_delay = Date.now() - pulse_start;
    if (pulse_delay > 500) {
        clearInterval(pulse_interval);
        pulse_interval = null;
        pulse.style.display = "none";
        return;
    }
    pulse.style.display = "block";
    // The following switch statement was written entirely in Vim. I really feel like I'm getting faster and that the mindblock that used to come with using vim is now almost gone.
    switch(score_gotten){
        case 150:
            pulse.innerHTML = "Great! +150";
            pulse.style.color = "cyan";
            break;
        case 100:
            pulse.innerHTML = "Okay. +100";
            pulse.style.color = "lime";
            break;
        case 50:
            pulse.innerHTML = "Meh. +50";
            pulse.style.color = "yellow";
            break;
        case -100:
            pulse.innerHTML = "Really bad miss! -100";
            pulse.style.color = "Red";
            break;
        default:
            pulse.innerHTML = "Miss.";
            pulse.style.color = "orange";
            break;
    }
}
