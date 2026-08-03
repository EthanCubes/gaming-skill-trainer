const key1 = document.getElementById("key1");
const key2 = document.getElementById("key2");
const key3 = document.getElementById("key3");
const key4 = document.getElementById("key4");
const key5 = document.getElementById("key5");
const key6 = document.getElementById("key6");
const key7 = document.getElementById("key7");
const key8 = document.getElementById("key8");

const position_position_index = [[80, 20], [90, 20], [80, 40], [90, 40], [80, 60], [90], [60], [80, 80], [90, 80]];
let position_list = [key1, key2, key3, key4, key5, key6, key7, key8];
const default_positions = [key1, key2, key3, key4, key5, key6, key7, key8];
let desired_position;
let time_offset = 0;

let key_move_count = 0;

let move_keys;
let render_move_keys;

function position_keys() {
    index = 0;
    for (const element of position_list) {
        index += 1;
        if (Math.round(index/2) === (index/2)) {
            element.style.left = "80%";
        }
        else {
            element.style.left = "90%";
        }
        switch(index) {
            case 1:
            case 2:
                element.style.top = "20%";
                break;
            case 3:
            case 4:
                element.style.top = "40%";
                break;
            case 5:
            case 6:
                element.style.top = "60%";
                break;
            case 7:
            case 8:
                element.style.top = "80%";
                break;
        }
    }
}

position_keys();

// Movement 
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
        temporary_list[2] = posiiton_list[0];
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
        temporary_list[2] = posiiton_list[1];
        temporary_list[3] = position_list[4];
        temporary_list[4] = position_list[3];
        temporary_list[5] = position_list[6];
        temporary_list[6] = position_list[5];
        temporary_list[7] = position_list[7];
    }
    else {
        temporary_list[0] = position_list[3];
        temporary_list[1] = position_list[1];
        temporary_list[2] = posiiton_list[5];
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
        temporary_list[2] = posiiton_list[4];
        temporary_list[3] = position_list[5];
        temporary_list[4] = position_list[6];
        temporary_list[5] = position_list[7];
        temporary_list[6] = position_list[0];
        temporary_list[7] = position_list[1];
    }
    else {
        temporary_list[0] = position_list[6];
        temporary_list[1] = position_list[7];
        temporary_list[2] = posiiton_list[0];
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
    temporary_list[2] = posiiton_list[3];
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
    temporary_list[2] = posiiton_list[1];
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
    temporary_list[2] = posiiton_list[6];
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
    temporary_list[2] = posiiton_list[5];
    temporary_list[3] = position_list[4];
    temporary_list[4] = position_list[3];
    temporary_list[5] = position_list[2];
    temporary_list[6] = position_list[1];
    temporary_list[7] = position_list[0];
    return temporary_list;
}

function render_key_movement(start_pos, end_pos, delay, duration) {
    if (start_pos[0] === end_pos[0]) {
        // slope is vertical (infinity), switch to vertical calculation of distance
        let x_pos = start_position[0];
        let y_pos = Math.abs(start_position[1] - end_position[1]) * delay / duration;
        x_pos += start_pos[0];
        y_pos += start_pos[1];
        return [x_pos, y_pos];
    } 
    let slope = (start_pos[1] - end_pos[1]) / (start_pos[0] - end_pos[0]);
    // y = kx + b. For every millisecond, it move [x distance] / 250. Somehow. IDK how.
    // This should theoretically work with when the slope is 0
    let x_pos = (Math.abs(start_pos[0] - end_pos[0]) / duration) * delay;
    let y_pos = slope * x_pos
    x_pos += start_pos[0];
    y_pos += start_pos[1];
    return [x_pos, y_pos];
}

/*
 * So I'm about to drop an entire essay on how this script is about to work because this is that hard.
 * Let's go
 * For each indiviual key, they take 250 milliseconds to move completely. So they have to travel the entire course of the distance from the current position to the desired position in exactly 250 milliseconds. So when we are given the start position, end position, the offset, and the time that has been traveled thus far, we can use some linear algebra to calculate the exact position of the key at any point in time. Depending on your mathematical proficiency, you could think it's easier or hard. To me, it seemed easy at first, but now that I've though about it slightly, I have no fricking idea of how I'm supposed to accoplish it. If my parents (Asian) knew I was struggling on this problem, they'd be so disappointed.
 *
 * I'm just going to talk it out because that's like how Harvard's CS50 recommends how to solve problems: by talking to a rubber duck. Since I don't have a rubber duck on my desk, and I can't be bothered to get something I can talk to, I'm just going to be typing stuff inside this comment. Which is going to be long as hell. 
 *
 * First, we need to have a function with several inputs: starting position, target position, and time passed. This entire comment is going to be split into two parts: sending the required data to the function, and actually writing the function itself. Considering that I have a somewhat solid understanding of math, I should write the entire function first. So that's what I am going to be figuring out first:
 * 
 * The first step to finding the position of the key at the current moment is to find the slope of the line segement between the two points of the starting position and the ending position. Then, we have to get the position of the key relative to the starting position, which isn't even that hard. IDK why I'm struggling on this so much. THen, we have to add like hte actual position of the starting position in order to find the actual position of the key. Lastly, we have to do this for all 8 keys and return a value that works regardless of screen resolution. I am running a 1600x900 screen from 2013, so yeah... if it works on my screen it should work on yours.
*/

function move_keys() {
    key_move_count += 1;
    if (key_move_count === 1) {
        move_keys_interval = setInterval(move_keys, 250);
    }
    if (key_move_count > 26) {
        clearInterval(moveKeys);
        move_keys = null;
        key_move_count = 0;
    }
    if (key_move_count === 6) {
        block_swap();
    }
    else {
        if ((key_move_count === 10) || (key_move_count)) {
            key_rotation();
        }
        else {
            let random = Math.round(Math.random()*6);
            switch(random) {
                case 1:
                    desired_position = small_rotation();
                case 2:
                    desired_position = big_rotation();
                case 3:
                    desired_position = shuffle();
                case 4:
                    desired_position = top_bottom_swap();
                case 5:
                    desired_position = swap();
                case 6:
                    desired_position = diagonal_swap();
            }
            render_move_keys = setInterval(render_key_movement, 10, desired_position)
        }
    }
}

function deepcopy(list) {
    let copy = [];
    for (const item in list) {
        copy.push(item);
    }
    return copy;
}
