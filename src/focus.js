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

function deepcopy(list) {
    let copy = [];
    for (const item in list) {
        copy.push(item);
    }
    return copy;
}
