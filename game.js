const leftClock = document.getElementById("leftClock");
const rightClock = document.getElementById("rightClock");
const pauseToggle = document.getElementById("pauseToggle");
const root = document.documentElement;

// load in variables from menu page
let currentTheme = sessionStorage.getItem("currentTheme");
let startingMinutes = sessionStorage.getItem("startingMinutes");
let increment = sessionStorage.getItem("increment");
let leftPlayer = sessionStorage.getItem("leftPlayer");
let colorBackground;
let colorSecondary;
let colorText;
let colorTextSecondary;

root.className = currentTheme;

if(root.className == "light") {
    colorBackground = "#f9f9f9";
    colorSecondary = "#e4e4e7";
    colorText = "#2e2f31";
    colorTextSecondary = "#515354";
}
else {
    colorBackground = "#2e2f31";
    colorSecondary = "#515354";
    colorText = "#f9f9f9";
    colorTextSecondary = "#e4e4e7";
}


let isPaused = true;
let time = startingMinutes * 60;

leftClock.textContent = startingMinutes + ":00";
rightClock.textContent = startingMinutes + ":00";


pauseToggle.addEventListener("click", function() {
    if(isPaused) {
        isPaused = false;
        setInterval(updateCountdown, 1000);
        leftClock.style.backgroundColor = "#f7a400";
    }
    else {
        isPaused = true;
        leftClock.style.backgroundColor = colorSecondary;
        rightClock.style.backgroundColor = colorSecondary;
    }
});


// timer code


    function updateCountdown() {
        if(isPaused) {
            return;
        }
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        seconds = seconds < 10 ? "0" + seconds : seconds;
        
        leftClock.textContent = `${minutes}:${seconds}`;
        time--;
    }