// Document selection.
const key1 = document.getElementById("key1");
const key2 = document.getElementById("key2");
const key3 = document.getElementById("key3");
const key4 = document.getElementById("key4");
const key5 = document.getElementById("key5");
const key6 = document.getElementById("key6");
const key7 = document.getElementById("key7");
const key8 = document.getElementById("key8");

// Position list
const position_position_index = [[80, 20], [90, 20], [80, 40], [90, 40], [80, 60], [90, 60], [80, 80], [90, 80]];
let position_list = [key1, key2, key3, key4, key5, key6, key7, key8];
const default_positions = [key1, key2, key3, key4, key5, key6, key7, key8];

let key_move_count = 0;
let key_move_interval;

// Event listeners and user input
document.addEventListener("click", user_input)
document.addEventListener("keydown", function(event) {collect_key(event.key)});

reset();

// All the functions and stuff.
function reset() {
    position_list = deepcopy(default_positions);
    position_keys();
}

// This program moves all the keys instantly, which is therefore not suitable for usage in actually moving the keys, only in reseting the keys.
function user_input() {
    // pass
}

function collect_key(pressed) {
    console.log(pressed);
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
    if (key_move_count === 1) {
        key_move_interval = setInterval(key_movement, 250);
        return;
    }
    if (key_move_count === 27) {
        key_move_count = 0;
        clearInterval(key_move_interval);
        return;
    }
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
            small_rotation();
            break;
        case 1:
            big_rotation();
            break;
        case 2:
            shuffle();
            break;
        case 3: 
            top_bottom_swap();
            break;
        case 4:
            swap();
            break;
        case 5:
            diagonal_swap();
            break;
    }
}

function get_key_pos(start_pos, end_pos, delay, duration) {
    let slope;
    let x_pos;
    let y_pos;
    if (start_pos[0] === end_pos[0]) { // startpos and endpos 0 is the x position. This checks for a vertical line.
        // how to deal with vertical slope
        x_pos = start_pos[0];
        y_pos = (end_pos[1] - start_pos[1]) * delay / duration;
        y_pos += start_pos[1];
        return [x_pos, y_pos];
    }
    slope = (end_pos[1] - start_pos[1]) / (end_pos[0] - start_pos[0]);
    x_pos = (end_pos[0] - start_pos[0]) * delay / duration;
    y_pos = x_pos * slope;
    x_pos += start_pos[0];
    y_pos += start_pos[1];
    return [x_pos, y_pos];
}

// Determining the final position of the keys
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
