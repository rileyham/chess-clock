const leftClock = document.getElementById("leftClock");
const rightClock = document.getElementById("rightClock");
const leftTimer = document.getElementById("leftTimer");
const rightTimer = document.getElementById("rightTimer");
const pauseToggle = document.getElementById("pauseToggle");
const retryButton = document.getElementById("retryButton");
const leftLine = document.getElementById("leftLine");
const rightLine = document.getElementById("rightLine");
const root = document.documentElement;

const click = new Audio("click.wav");
const pauseClick = new Audio("pause.wav");
const endBell = new Audio("end.wav");

// load in variables from menu page
let currentTheme = sessionStorage.getItem("currentTheme");
let startingMinutes = sessionStorage.getItem("startingMinutes");
let increment = sessionStorage.getItem("increment");
increment = parseInt(increment) + 1;
let leftPlayer = sessionStorage.getItem("leftPlayer");

let colorBackground;
let colorSecondary;
let colorText;
let colorTextSecondary;
let myIntervalLeft;
let myIntervalRight;
let leftToMove;
let gameBegun = false;
let gameOver = false;


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
    if(gameOver){
        return;
    }
    if(!gameBegun) {
        click.play();
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
        click.play();
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
        pauseClick.play();
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
    gameBegun = false;
    gameOver = false;
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
    if(gameOver) {
        return;
    }
    click.play();

    if(!gameBegun) {
        gameBegun = true;
    }
    else if(!isPaused){
        if(!leftToMove){
            leftTime += increment;
  
            const leftMinutes = Math.floor(leftTime / 60);
            let leftSeconds = leftTime % 60;
    
            leftSeconds = leftSeconds < 10 ? "0" + leftSeconds : leftSeconds;
            leftClock.textContent = `${leftMinutes}:${leftSeconds}`;      
        }
        else {
            rightTime += increment;

            const rightMinutes = Math.floor(rightTime / 60);
            let rightSeconds = rightTime % 60;
    
            rightSeconds = rightSeconds < 10 ? "0" + rightSeconds : rightSeconds;
            rightClock.textContent = `${rightMinutes}:${rightSeconds}`;
        }
    }
    isPaused = false;
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
        if(gameOver){
            return;
        }
        if(leftTime == 0) {
            endBell.play();
            isPaused = true;
            gameOver = true;
            leftClock.textContent = "0:00";
            leftTimer.style.backgroundColor = "#F64141";
            return;
        }

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
        if(gameOver){
            return;
        }
        if(rightTime == 0) {
            endBell.play();
            isPaused = true;
            gameOver = true;
            rightClock.textContent = "0:00";
            rightTimer.style.backgroundColor = "#F64141";
            console.log("over");
            return;
        }

        if(isPaused) {
            return;
        }
        const rightMinutes = Math.floor(rightTime / 60);
        let rightSeconds = rightTime % 60;

        rightSeconds = rightSeconds < 10 ? "0" + rightSeconds : rightSeconds;
        
        rightClock.textContent = `${rightMinutes}:${rightSeconds}`;
        rightTime--;
    }
