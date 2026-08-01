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
[] Start and end the program
[] Circle is triggered.
[] Circle moves across the screen
[] Calculation of accuracy
[] Alerting the user of accuracy
*/

// States
let testing = false;

// Time
let start_time;
let circle_start_time;
let circle_last_time = Date.now();
let end_time = Date.now();
let circle_calculation_interval;

// Selection
let message = document.getElementById("message");
let circle = document.getElementById("precision_circle");
let line = document.getElementById("hit_line");

// Intervals and event listeners
setInterval(gameloop, 10);
document.addEventListener("click", () => {
    if (testing) {
        // Determine if there is a circle on the board, and how close the user was to getting a perfect score.
        // I don't know how much of a window I should give the user
    }
    else {
        // Activation
        if ((Date.now() - end_time) > 500) {
            testing = true;
            start_time = Date.now();
        }
    }
});

// Functions
function gameloop() {
    switch(testing) {
        case true:
            message.style.display = "none";
            if ((Date.now() - circle_last_time) > 750) {
                // trigger the circle to go darting across the screen.
           	    circle_start_time = Date.now(); 
                circle_calculation_interval = setInterval(calculate_circle, 10);
            }
            if ((Date.now() - start_time) > 20000) {
                // Code to terminate the testing thing.
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
    let time_difference = Date.now() - circle_start_time;
    // Time lasts roughly 2 seconds, 1 second too early and 1 second too late. This is actually 2000 milliseconds, which is exactly 20 times the 100% width of the screen.
    circle.style.left = 100 - time_difference; // Moves the circle
    if (time_difference > 1990) {
        // clear the interval after the circle is done moving
        clearInterval(circle_calculation_interval);
        circle_calculation_interval = null;
        circle_last_time = Date.now();
    }
}