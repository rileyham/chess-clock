const leftClock = document.getElementById("leftClock");
const rightClock = document.getElementById("rightClock");
const leftTimer = document.getElementById("leftTimer");
const rightTimer = document.getElementById("rightTimer");
const pauseToggle = document.getElementById("pauseToggle");
const retryButton = document.getElementById("retryButton");
const leftLine = document.getElementById("leftLine");
const rightLine = document.getElementById("rightLine");
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
let myIntervalLeft;
let myIntervalRight;
let leftToMove;
let gameBegun = false;

// set theme
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
    if(!gameBegun) {
        isPaused = false;
        if(leftToMove) {
            myIntervalLeft = setInterval(updateCountdownLeft, 1000);
            leftTimer.style.backgroundColor = "#f7a400";
            leftToMove = false;
        }
        else {
            myIntervalRight = setInterval(updateCountdownRight, 1000);
            rightTimer.style.backgroundColor = "#f7a400";
            leftToMove = true;
        }
        gameBegun = true; 
        return;
    }
    
    if(isPaused) {
        isPaused = false;
        if(leftToMove) {
            myIntervalLeft = setInterval(updateCountdownLeft, 1000);
            leftTimer.style.backgroundColor = "#f7a400";
            leftToMove = false;
        }
        else {
            myIntervalRight = setInterval(updateCountdownRight, 1000);
            rightTimer.style.backgroundColor = "#f7a400";
            leftToMove = true;
        }

    }
    else {
        isPaused = true;
        clearInterval(myIntervalLeft);
        clearInterval(myIntervalRight);
        leftTimer.style.backgroundColor = colorSecondary;
        rightTimer.style.backgroundColor = colorSecondary;

        if(leftToMove) {
            leftToMove = false;
        }
        else {
            leftToMove = true;
        }
    }
});

// retry button code
retryButton.addEventListener("click", function() {
    isPaused = true;
    clearInterval(myIntervalLeft);
    clearInterval(myIntervalRight);
    if(leftPlayer == "Black") {
        leftToMove = false;
    }
    else {
        leftToMove = true;
    }
    leftTime = rightTime = (startingMinutes * 60) - 1;
    leftClock.textContent = startingMinutes + ":00";
    rightClock.textContent = startingMinutes + ":00";
    

    leftTimer.style.backgroundColor = colorSecondary;
    rightTimer.style.backgroundColor = colorSecondary;
});

// switchClock buttons
window.onkeydown = function(event) {
    if(event.which == 32) {
        switchClock();
    }
}

// switchClock
function switchClock() {
    isPaused = false;
    if(!gameBegun) {
        gameBegun = true;
    }
    if(leftToMove) {
        myIntervalLeft = setInterval(updateCountdownLeft, 1000);
        leftTimer.style.backgroundColor = "#f7a400";
        rightTimer.style.backgroundColor = colorSecondary;
        leftToMove = false;
        clearInterval(myIntervalRight);
    }
    else {
        myIntervalRight = setInterval(updateCountdownRight, 1000);
        rightTimer.style.backgroundColor = "#f7a400";
        leftTimer.style.backgroundColor = colorSecondary;
        leftToMove = true;
        clearInterval(myIntervalLeft);
    }
}

// timer code

// initialize clocks
let isPaused = true;
let leftTime = rightTime = (startingMinutes * 60) - 1;
if(leftPlayer == "White") {
    leftToMove = true;
    leftLine.style.backgroundColor = "#f9f9f9";
    rightLine.style.backgroundColor = "#2e2f31";
}
else {
    leftToMove = false;
    leftLine.style.backgroundColor = "#2e2f31";
    rightLine.style.backgroundColor = "#f9f9f9";
}

leftClock.innerHTML = startingMinutes + ":00";
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
        let rightSeconds = rightTime % 60;

        rightSeconds = rightSeconds < 10 ? "0" + rightSeconds : rightSeconds;
        
        rightClock.textContent = `${rightMinutes}:${rightSeconds}`;
        rightTime--;
    }
