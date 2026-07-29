// 0 is idle, 1 is red, 2 is green, 3 is paused
let mode = 0;

let start_time;
let reaction_time;
let end_time = Date.now();

message = document.getElementById("message");

interval = setInterval(gameloop, 10);

document.addEventListener("click", () => clicked())

function clicked() {
    console.log("Clicked!")
    switch(mode) {
        case 0:
            start_time = Date.now();
            mode = 1;
            break;
        case 1:
            if ((Date.now() - start_time) > 500) {
                message.innerHTML = "You Clicked Too Early!"
                mode = 3;
                break;
            }
        case 2:
            if ((Date.now() - start_time) > 500) {
                message.innerHTML = "Your reaction time is " + reaction_time + " milliseconds.";
                mode = 3;
                break;
            }
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
                let wait_time = Math.floor(Math.random()*3000+750);
                if ((Date.now() - start_time) > wait_time) {
                    start_time = Date.now();
                    reaction_time = Date.now() - 10; // delay rebalancing
                }
            }
            break;
        case 2:
            document.body.style.backgroundColor = "green";
            message.innerHTML = "Click!";
            break;
        case 3:
            if ((Date.now() - end_time) > 1000) {
                mode = 0;
            }
            break;
    }
}