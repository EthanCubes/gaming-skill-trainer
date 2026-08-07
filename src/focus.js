/*
Steps I need to do:
Change color back to match limbo while keys are moving
Add selected key glowing green at the start of the program
Add keys bursting into colors at the end
Add selection of keys
Add indication of whether you got the key write.
*/

// Document selection.
const key1 = document.getElementById("key1");
const key2 = document.getElementById("key2");
const key3 = document.getElementById("key3");
const key4 = document.getElementById("key4");
const key5 = document.getElementById("key5");
const key6 = document.getElementById("key6");
const key7 = document.getElementById("key7");
const key8 = document.getElementById("key8");

const message = document.getElementById("message");
const buttons = document.getElementById("select_buttons");

// Position list
const position_position_index = [[80, 20], [90, 20], [80, 40], [90, 40], [80, 60], [90, 60], [80, 80], [90, 80]];
let position_list = [key1, key2, key3, key4, key5, key6, key7, key8];
const default_positions = [key1, key2, key3, key4, key5, key6, key7, key8];
let temp_position;

let key_move_count = 0;
let key_move_interval;

let mode = 0; // 0 is idle, 1 is picking which key and displaying to the user, 2 is running, 3 picking the key, 4 is ended
let mode_start_time = Date.now();

// Program randomly selects a key that the user will have to track and related stuff.
let key_picked = false;
let selected_key = undefined;

// Event listeners and intervals
document.addEventListener("click", user_input)
document.addEventListener("keydown", function(event) {collect_key(event.key)});
setInterval(gameloop, 10);

if (localStorage.getItem("has_visited_before")) {
    console.log("welcome back");
}
else {
    alert("Warning: This test is extremely difficult");
    localStorage.setItem("has_visited_before", "true");
}

reset();

// All the functions and stuff.

function gameloop() {
    switch(mode) {
        case 0:
            message.innerHTML = "Click anywhere to start...";
            break;
        case 1:
            message.innerHTML = "Focus...";
            if ((Date.now() - mode_start_time) > 500) {
                mode = 2;
                key_move_interval = setInterval(key_movement, 300);
            }
            if (!(key_selected)) {
                let index = Math.round(Math.random() * 7);
                switch(index) {
                    case 0:
                        selected_key = key1;
                        break;
                    case 1:
                        selected_key = key2;
                        break;
                    case 2:
                        selected_key = key3;
                        break;
                    case 3:
                        selected_key = key4;
                        break;
                    case 4:
                        selected_key = key5;
                        break;
                    case 5: 
                        selected_key = key6;
                        break;
                    case 6:
                        selected_key = key7;
                        break;
                    case 7:
                        selected_key = key8;
                        break;
                }
                selected_key.style.backgroundColor = "green";
                key_selected = true;
            }
            break;
        case 2:
            message.innerHTML = "FOCUS";
            selected_key.style.backgroundColor = "rgb(200, 125, 50)";
            break;
        case 3:
            message.innerHTML = "Pick a key";
            buttons.style.display = "block";
            if ((Date.now() - mode_start_time) > 250) {
                colorize();
            }
            break;
        case 4:
            break;
    }
}

function colorize() {
    const color_list = ["red", "orange", "yellow", "green", "cyan", "blue", "purple", "pink"];
    for (let i = 0; i < 8; i++) {
        position_list[i].style.backgroundColor = color_list[i];
    }
}

function reset() {
    buttons.style.display = "none";
    position_list = deepcopy(default_positions);
    position_keys();
    key_move_count = 0;
    mode = 0;
    key_selected = false;
    for (let i = 0; i < 8; i++) {
        position_list[i].style.backgroundColor = "rgb(200, 125, 50)";
    }
}

function user_input() {
    switch(mode) {
        case 0:
            mode = 1;
            mode_start_time = Date.now();
            break;
        case 4:
            reset();
            break;
    } 
}

function collect_key(pressed) {
    let user_selected_key;
    if (!(mode === 3)) {
        // return;
    }
    switch(pressed) {
        case "1":
            user_selected_key = position_list[0];
            break;
        case "2":
            user_selected_key = position_list[1];
            break;
        case "3":
            user_selected_key = position_list[2];
            break;
        case "4":
            user_selected_key = position_list[3];
            break;
        case "5":
            user_selected_key = position_list[4];
            break;
        case "6":
            user_selected_key = position_list[5];
            break;
        case "7":
            user_selected_key = position_list[6];
            break;
        case "8":
            user_selected_key = position_list[7];
            break;
        default:
            console.log("default");
            return;
    }
    if (selected_key === user_selected_key) {
        message.innerHTML = "Correct! Click anywhere to continue."
    }
    else {
        // key is selected incorrectly, get rickrolled
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        message.innerHTML = "Incorrect. Click anywhere to continue."
    }
    mode = 4;
}

function position_keys() {
    for (let i = 0; i < 8; i++) {
        const key = position_list[i];
        key.style.left = position_position_index[i][0] + "%";
        key.style.top = position_position_index[i][1] + "%";
    }
}

function key_movement() {
    key_move_count += 1;
    if (key_move_count === 27) {
        key_move_count = 0;
        clearInterval(key_move_interval);
        mode = 3;
        mode_start_time = Date.now();
        return;
    }
    console.log(key_move_count);
    if (key_move_count === 6) {
        block_swap();
        return;
    }
    if ((key_move_count === 10) || (key_move_count === 19)) {
        key_rotation();
        return;
    }
    index = Math.floor(Math.random()*6);
    switch(index) {
        case 0:
            temp_position = deepcopy(small_rotation());
            break;
        case 1:
            temp_position = deepcopy(big_rotation());
            break;
        case 2:
            temp_position = deepcopy(shuffle());
            break;
        case 3: 
            temp_position = deepcopy(top_bottom_swap());
            break;
        case 4:
            temp_position = deepcopy(swap());
            break;
        case 5:
            temp_position = deepcopy(diagonal_swap());
            break;
    }
    move_keys();
}

function move_keys() {
    for (let i = 0; i < 8; i++) {
        let current_position = position_list[i];
        let desired_position_key = temp_position.indexOf(current_position);
        let desired_position_left = position_position_index[desired_position_key][0];
        let desired_position_top = position_position_index[desired_position_key][1];
        current_position.style.left = desired_position_left + "%";
        current_position.style.top = desired_position_top + "%";
    }
    position_list = deepcopy(temp_position);
}

// Determining the final position of the keys like during movement, not lik final final.
function small_rotation() {
    let temporary_list = deepcopy(position_list);
    if (Math.random() < 0.5) {
        temporary_list[0] = position_list[2];
        temporary_list[1] = position_list[0];
        temporary_list[2] = position_list[3];
        temporary_list[3] = position_list[1];
    }
    else {
        temporary_list[0] = position_list[1];
        temporary_list[1] = position_list[3];
        temporary_list[2] = position_list[0];
        temporary_list[3] = position_list[2];
    }
    if (Math.random() < 0.5) {
        temporary_list[4] = position_list[6];
        temporary_list[5] = position_list[4];
        temporary_list[6] = position_list[7];
        temporary_list[7] = position_list[5];
    }
    else {
        temporary_list[4] = position_list[5];
        temporary_list[5] = position_list[7];
        temporary_list[6] = position_list[4];
        temporary_list[7] = position_list[6];
    }
    return temporary_list;
}
function big_rotation() {
    let temporary_list = deepcopy(position_list);
    if (Math.random() < 0.5) {
        temporary_list[0] = position_list[2];
        temporary_list[1] = position_list[0];
        temporary_list[2] = position_list[4];
        temporary_list[3] = position_list[1];
        temporary_list[4] = position_list[6];
        temporary_list[5] = position_list[3];
        temporary_list[6] = position_list[7];
        temporary_list[7] = position_list[5];
    }
    else {
        temporary_list[0] = position_list[1];
        temporary_list[1] = position_list[3];
        temporary_list[2] = position_list[0];
        temporary_list[3] = position_list[5];
        temporary_list[4] = position_list[2];
        temporary_list[5] = position_list[7];
        temporary_list[6] = position_list[4];
        temporary_list[7] = position_list[6];
    }
    return temporary_list;
}
function shuffle() {
    let temporary_list = deepcopy(position_list);
    if (Math.random() < 0.5) {
        temporary_list[0] = position_list[0];
        temporary_list[1] = position_list[2];
        temporary_list[2] = position_list[1];
        temporary_list[3] = position_list[4];
        temporary_list[4] = position_list[3];
        temporary_list[5] = position_list[6];
        temporary_list[6] = position_list[5];
        temporary_list[7] = position_list[7];
    }
    else {
        temporary_list[0] = position_list[3];
        temporary_list[1] = position_list[1];
        temporary_list[2] = position_list[5];
        temporary_list[3] = position_list[0];
        temporary_list[4] = position_list[7];
        temporary_list[5] = position_list[2];
        temporary_list[6] = position_list[6];
        temporary_list[7] = position_list[4];
    }
    return temporary_list;
}
function top_bottom_swap() {
    let temporary_list = deepcopy(position_list);
    if (Math.random() < 0.5) {
        temporary_list[0] = position_list[2];
        temporary_list[1] = position_list[3];
        temporary_list[2] = position_list[4];
        temporary_list[3] = position_list[5];
        temporary_list[4] = position_list[6];
        temporary_list[5] = position_list[7];
        temporary_list[6] = position_list[0];
        temporary_list[7] = position_list[1];
    }
    else {
        temporary_list[0] = position_list[6];
        temporary_list[1] = position_list[7];
        temporary_list[2] = position_list[0];
        temporary_list[3] = position_list[1];
        temporary_list[4] = position_list[2];
        temporary_list[5] = position_list[3];
        temporary_list[6] = position_list[4];
        temporary_list[7] = position_list[5];
    }
    return temporary_list;
}
function swap() {
    let temporary_list = deepcopy(position_list);
    temporary_list[0] = position_list[1];
    temporary_list[1] = position_list[0];
    temporary_list[2] = position_list[3];
    temporary_list[3] = position_list[2];
    temporary_list[4] = position_list[5];
    temporary_list[5] = position_list[4];
    temporary_list[6] = position_list[7];
    temporary_list[7] = position_list[6];
    return temporary_list;
}
function diagonal_swap() {
    let temporary_list = deepcopy(position_list);
    temporary_list[0] = position_list[3];
    temporary_list[1] = position_list[2];
    temporary_list[2] = position_list[1];
    temporary_list[3] = position_list[0];
    temporary_list[4] = position_list[7];
    temporary_list[5] = position_list[6];
    temporary_list[6] = position_list[5];
    temporary_list[7] = position_list[4];
    return temporary_list;
}
function block_swap() {
    let temporary_list = deepcopy(position_list);
    temporary_list[0] = position_list[4];
    temporary_list[1] = position_list[5];
    temporary_list[2] = position_list[6];
    temporary_list[3] = position_list[7];
    temporary_list[4] = position_list[1];
    temporary_list[5] = position_list[2];
    temporary_list[6] = position_list[3];
    temporary_list[7] = position_list[4];
    return temporary_list;
}
function key_rotation() {
    let temporary_list = deepcopy(position_list);
    temporary_list[0] = position_list[7];
    temporary_list[1] = position_list[6];
    temporary_list[2] = position_list[5];
    temporary_list[3] = position_list[4];
    temporary_list[4] = position_list[3];
    temporary_list[5] = position_list[2];
    temporary_list[6] = position_list[1];
    temporary_list[7] = position_list[0];
    return temporary_list;
}

function deepcopy(list) {
    let copy = [];
    for (let i = 0; i < list.length; i++) {
        copy.push(list[i]);
    }
    return copy;
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
