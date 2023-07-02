const leftClock = document.getElementById("leftClock");
const rightClock = document.getElementById("rightClock");

// load in variables from menu page
let currentTheme = sessionStorage.getItem("currentTheme");
let startingMinutes = sessionStorage.getItem("startingMinutes");
let increment = sessionStorage.getItem("increment");
let leftPlayer = sessionStorage.getItem("leftPlayer");

leftClock.textContent = startingMinutes + ":00";
rightClock.textContent = startingMinutes + ":00";

// timer code

    let time = startingMinutes * 60;

    setInterval(updateCountdown, 1000);

    function updateCountdown() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        seconds = seconds < 10 ? "0" + seconds : seconds;
        
        leftClock.textContent = `${minutes}:${seconds}`;
        time--;
    }