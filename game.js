const leftClock = document.getElementById("leftClock");
const rightClock = document.getElementById("rightClock");
const pauseToggle = document.getElementById("pauseToggle");
const retryButton = document.getElementById("retryButton");
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
let myInterval;

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

// pause button code
pauseToggle.addEventListener("click", function() {
    if(isPaused) {
        isPaused = false;
        if(leftToMove) {
            myInterval = setInterval(updateCountdownLeft, 1000);
            leftClock.style.backgroundColor = "#f7a400";
        }
        else {
            myInterval = setInterval(updateCountdownRight, 1000);
            rightClock.style.backgroundColor = "#f7a400";
        }

    }
    else {
        isPaused = true;
        clearInterval(myInterval);
        leftClock.style.backgroundColor = colorSecondary;
        rightClock.style.backgroundColor = colorSecondary;
    }
});

//retry button code
retryButton.addEventListener("click", function() {
    isPaused = true;
    clearInterval(myInterval);
    if(leftPlayer == "black") {
        leftToMove = false;
    }
    else {
        leftToMove = true;
    }
    leftTime = rightTime = startingMinutes * 60;
    leftClock.textContent = startingMinutes + ":00";
    rightClock.textContent = startingMinutes + ":00";
    

    leftClock.style.backgroundColor = colorSecondary;
    rightClock.style.backgroundColor = colorSecondary;
});

// timer code

// initialize clocks
let isPaused = true;
let leftTime = rightTime = startingMinutes * 60;
let leftToMove = true;
if(leftPlayer == "black") {
    leftToMove = false;
}

leftClock.textContent = startingMinutes + ":00";
rightClock.textContent = startingMinutes + ":00";


    function updateCountdownLeft() {
        if(isPaused) {
            return;
        }
        const leftMinutes = Math.floor(leftTime / 60);
        let leftSeconds = leftTime % 60;

        leftSeconds = leftSeconds < 10 ? "0" + leftSeconds : leftSeconds;
        
        leftClock.textContent = `${leftMinutes}:${leftSeconds}`;
        leftTime--;
    }

    function updateCountdownRight() {
        if(isPaused) {
            return;
        }
        const rightMinutes = Math.floor(rightTime / 60);
        let rightSeconds = righTtime % 60;

        rightSeconds = rightSeconds < 10 ? "0" + rightSeconds : rightSeconds;
        
        rightClock.textContent = `${rightMinutes}:${rightSeconds}`;
        rightTime--;
    }