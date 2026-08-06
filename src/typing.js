let testing_time = 15; // In this specific case, this refers to the time in seconds. But I really should make it consistent so that anyone reading the horrible code of mine does not get more confused.

let data_fetched = false;
let words;

let mode = 0; // 0 is idle, 1 is typing, 2 is ended

// Intervals and Event Listeners.
setInterval(gameloop, 10);

// Actual executed code
fetch_data();

// Functions and stuff
function fetch_data () {
    // The following code is copied partially from my other project CubeTrainer, which attributes this code to a geeksForGeeks page at https://www.geeksforgeeks.org/javascript/read-json-file-using-javascript/
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

// Renders already typed characters and characters needed to be typed on both sides.
function gameloop() {
    if (!data_fetched) {
        return;
    }
    switch(mode) {
        case 0:
            break;
        case 1:
            break;
        case 2: 
            break;
    }
}
