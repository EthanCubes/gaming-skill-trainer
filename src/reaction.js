// 0 is idle, 1 is red, 2 is green, 3 is paused
let mode = 0;

let start_time;
let reaction_time;
let wait_time;
let end_time = Date.now();

message = document.getElementById("message");

interval = setInterval(gameloop, 10);

document.addEventListener("click", () => clicked())

function clicked() {
    switch(mode) {
        case 0:
            start_time = Date.now();
            wait_time = Math.floor(Math.random()*3000+750);
            mode = 1;
            break;
        case 1:
            if ((Date.now() - start_time) > 50) {
                message.innerHTML = "You Clicked Too Early!"
                mode = 3;
                end_time = Date.now();
                break;
            }
        case 2:
            reaction_time = Date.now() - start_time;
            message.innerHTML = "Your reaction time is " + reaction_time + " milliseconds.";
            mode = 3;
            end_time = Date.now();
            break;
        default:
            console.log("Error");
            break;
    }
}

function gameloop() {
    switch(mode) {
        case 0:
            message.innerHTML = "Click to start the reaction time test.";
            document.body.style.backgroundColor = "black";
            break;
        case 1:
            document.body.style.backgroundColor = "red";
            message.innerHTML = "Prepare...";
            if ((Date.now() - start_time) > 750) {
                if ((Date.now() - start_time) > wait_time) {
                    start_time = Date.now() - 10; // delay rebalancing
                    mode = 2;
                }
            }
            break;
        case 2:
            document.body.style.backgroundColor = "green";
            message.innerHTML = "Click!";
            break;
        case 3:
            if ((Date.now() - end_time) > 1500) {
                mode = 0;
            }
            break;
    }
}
