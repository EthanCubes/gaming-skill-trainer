let testing_time = 15; // In this specific case, this refers to the time in seconds. But I really should make it consistent so that anyone reading the horrible code of mine does not get more confused.

let data_fetched = false;
let data_fetching = false;
let words;
let word_list;

let mode = 0; // 0 is idle, 1 is typing, 2 is ended

let time_passed;
let characters_typed; 
let string = 0;

// Used for displaying text before and after the cursor according to whether or not they have been typed.
let before;
let after;

// Selection of HTML elements
const text = document.getElementById("text");

// Intervals and Event Listeners.
setInterval(gameloop, 10);

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
    time_passed = 0;
    characters_typed = 0;
    // If the data has not yet been fetched, the processing script will run when the data is fetched.
    if (!data_fetched) {
        return;
    }
    process_data();
    string = 0;
}

// Renders already typed characters and characters needed to be typed on both sides.
function gameloop() {
    if (!data_fetched && !data_fetching) {
        fetch_data();
        return;
    }
    if (string === 0) {
        return;
    }
    // Render the characters according to how many have already been typed.
    before = "";
    after = "";
    // code here calculates the before and the after according to the characters that have alreay been typed and the string
    for (let i = 0; i < characters_typed; i++) {
        before += string[i];
    }
    for (let i = characters_typed; i < string.length; i++) {
        after += string[i];
    }
    text.innerHTML = "<span style='color: grey'>" + before + "</span><span style='color: blue;'>|</span><span style='color: white'>" + after + "</span>";
}
