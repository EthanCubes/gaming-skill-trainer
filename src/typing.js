let testing_time = 15; // In this specific case, this refers to the time in seconds. But I really should make it consistent so that anyone reading the horrible code of mine does not get more confused.

let data_fetched = false;
let data_fetching = false;
let words;
let word_list;

let mode = 0; // 0 is idle, 1 is typing, 2 is ended

let start_time;
let time_elapsed;

let characters_typed; 
let string = 0;
let next_character;

// Used for displaying text before and after the cursor according to whether or not they have been typed.
let before;
let after;

// Selection of HTML elements
const text = document.getElementById("text");
const message = document.getElementById("message");

// Intervals and Event Listeners.
setInterval(gameloop, 10);
document.addEventListener("keydown", function(event) {user_input(event);});

// Actual executed code
reset();

// Functions and stuff
function fetch_data () {
    data_fetching = true;
    // The following code is copied partially from my other project CubeTrainer, which attributes this code to a geeksForGeeks page at https://www.geeksforgeeks.org/javascript/read-json-file-using-javascript/
    // For some reason, this only works (offline while testing) with Live Server. I can't just run this from file because it breaks. I have to keep VSCode running because I need the live server in VSCode, I need to find a way to run a localhost server without VSCode.
    fetch("src/assets/words.txt")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {words = data; data_fetched = true; process_data();})
        .catch(error => {console.error("Failed to fetch data:", error);});
}

// As of this point in time, this function prints out a list of words 5 times (or more, I didn't really count). I'm going to try removing the concept of resetting altogether until a later stage when I know that everything works.
function process_data() {
    let modifier
    word_list = words.split("\n");
    string = "";
    // 45 is the maximum reasonable typing speed in 15 seconds.
    for (let i = 0; i < 45; i++) {
        if (i < 44) {
            modifier = " ";
        }
        else {
            modifier = "";
        }
        string += word_list[Math.floor(Math.random()*word_list.length)] + modifier;
    }
    console.log(string);
}

function reset() {
    mode = 0;
    time_passed = 0;
    characters_typed = 0;
    string = 0;
    message.style.display = "none";
    // If the data has not yet been fetched, the processing script will run when the data is fetched.
    if (!data_fetched) {
        console.log("Data not yet fetched!");
        return;
    }
    process_data();
}

// Renders already typed characters and characters needed to be typed on both sides.
function gameloop() {
    if (!data_fetched && !data_fetching) {
        fetch_data();
        return;
    }
    // Render the characters according to how many have already been typed.
    before = "";
    after = "";
    // code here calculates the before and the after according to the characters that have alreay been typed and the string
    // I definitely did not intend for it to behave like the default monkeytype display, but I mean there's a reason that monkeytype used what Monkeytype uses.
    for (let i = 0; i < characters_typed; i++) {
        before += string[i];
    }
    for (let i = characters_typed; i < string.length; i++) {
        after += string[i];
    }
    text.innerHTML = "<span style='color: grey'>" + before + "</span><span style='color: blue;'>|</span><span style='color: white'>" + after + "</span>";

    next_character = string[characters_typed];

    if (mode === 1) {
        time_elapsed = (Date.now() - start_time) / 1000;
    }
}

function user_input(key) {
    if (string === 0) {
        return;
    }
    if (mode === 2 && key.key === "Enter") {
        reset();
        return;
    } 
    // This uh is the trigger, only if the key isn't enter.
    if ((mode === 0) && !(key.key === "Enter")) {
        mode = 1;
        start_time = Date.now();
    }
    if (key.key === next_character) {
        characters_typed += 1;
    }
    if (characters_typed >= string.length) {
        mode = 2;
        // calculate the wpm
        // words / seconds * 60
        let wpm = (45 / time_elapsed * 60).toFixed(2);
        message.innerHTML = "You have typed all the words in " + time_elapsed + " seconds, at " + wpm + " words per minute. Press enter to continue.";
        message.style.top = "25%";
        message.style.display = "block";
    }
}
