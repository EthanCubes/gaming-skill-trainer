let link = window.location.href;
console.log(link);

cps_button = document.getElementById("cps_test");
cps_button.addEventListener("click", () => redirect("src/pages/cps.html")); // The () => is AI because I don't know how to code apparently.

aim_trainer_button = document.getElementById("aim_trainer");
aim_trainer_button.addEventListener("click", () => redirect("src/pages/aim_trainer.html"));

alt_spam_button = document.getElementById("alt_spam_test");
alt_spam_button.addEventListener("click", () => redirect("src/pages/alt_spam.html"));

typing_speed_button = document.getElementById("typing_speed_test");
typing_speed_button.addEventListener("click", () => redirect("src/pages/typing_speed.html"));

function redirect(page) {
    url = link + page;
    
    window.open((link+page), "_self");
}

