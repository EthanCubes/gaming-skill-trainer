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
[] Calculation of accuracy
[] Alerting the user of accuracy

How accuracy is calculated
- Click when circle isn't even active = -100 points. At the end, if the number is below 0, it gets set to 0
- Click 15% before or after = +50 points
- Click 10% before or after = +100 points
- Click 5% before or after = +300 points
- Miss the circle entirely and don't click before the circle reaches the end = -100 points
*/

// States
let testing = false;

// Time
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

// Selection
const message = document.getElementById("message");
const circle = document.getElementById("precision_circle");
const line = document.getElementById("hit_line");
const screen_dimension_searcher = document.getElementById("screen_dimension_searcher");

let screen_x = get_screen_dimensions(-100, -50)[0];
let screen_y = get_screen_dimensions(-100, -50)[1];

// Intervals and event listeners
setInterval(gameloop, 10);
document.addEventListener("click", () => {
    if (testing) {
        // Determine if there is a circle on the board, and how close the user was to getting a perfect score.
        let circle_x = remove_suffix(getComputedStyle(circle).left) / remove_suffix(screen_x) * 100;
        let valid = false;
        if (circle_active && (45 < circle_x < 55) && !(valid) && !(circle_click_attempt)) {
            score += 300;
            valid = true;
            console.log(+300);
        }
        if (circle_active && (40 < circle_x < 60) && !(valid) && !(circle_click_attempt)) {
            score += 100;
            valid = true;
            console.log(+100);
        }
        if (circle_active && (35 < circle_x < 65) && !(valid) && !(circle_click_attempt)) {
            score += 50;
            valid = true;
            console.log(+100);
        }
        if (circle_active && circle_click_attempt && !(valid)) {
            score -= 100;
            valid = true;
            console.log(-100);
        }
        if (!(circle_active)) {
            score -= 100;
            valid = true;
            console.log(-100);
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
});

// Functions
function gameloop() {
    switch(testing) {
        case true:
            message.style.display = "none";
            document.body.style.backgroundColor = "rgb(25,25,25)";
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
                alert(score);
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
            console.log(-100);
        }
    }
}

function calculate_accuracy(total, user_score) {
    let highest_possible_score = total * 300;
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