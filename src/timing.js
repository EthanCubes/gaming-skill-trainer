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
*/

// States
let testing = false;

// Time
let start_time;
let end_time = Date.now();

// Selection
let message = document.getElementById("message");
let circle = document.getElementById("precision_circle");
let line = document.getElementById("hit_line");

// Intervals and event listeners
addEventListener(gameloop(), 10);
document.addEventListener("click", () => {
    if (testing) {}
    else {
        // Activation
        if ((Date.now() - end_time) > 500) {
            testing = true;
        }
    }
});

// Functions
function gameloop() {
    switch(testing) {
        case true:
            console.log("hi")
            break;
        case false:
            document.body.style.backgroundColor = "black";
            message.style.display = "block";
            message.innerHTML = "Click to start the timing test.";
            break;
    }
}