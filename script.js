let link = window.location.href;
console.log(link);

cps_button = document.getElementById("cps_test");
cps_button.addEventListener("click", () => redirect("cps.html")); // The () => is AI because I don't know how to code apparently.

aim_trainer_button = document.getElementById("aim_trainer");
aim_trainer_button.addEventListener("click", () => redirect("aim_trainer.html"));

alt_spam_button = document.getElementById("alt_spam_test");
alt_spam_button.addEventListener("click", () => redirect("alt_spam.html"));

typing_speed_button = document.getElementById("typing_speed_test");
typing_speed_button.addEventListener("click", () => redirect("typing_speed.html"));

reaction_time_test = document.getElementById("reaction_time_test");
reaction_time_test.addEventListener("click", () => redirect("reaction.html"));

function redirect(page) {
    const LINK_REL = {"eth":"https://ethancubes.github.io/gaming-skill-trainer/", 
        "oca":"http://localhost:5500/", 
        "27.":"http://127.0.0.1:5500/"}
    let link_short = link[8] + link[9] + link[10];
    url = LINK_REL[link_short] + page;
    console.log(url)
    window.open(url, "_self");
}

