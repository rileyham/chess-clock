const themeButton = document.getElementById("themeIcon");
const exchangeButton = document.getElementById("exchangeIcon");
const startButton = document.getElementById("startButton");
const leftBox = document.getElementById("leftBox");
const leftPlayer = document.getElementById("leftPlayer");
const rightBox = document.getElementById("rightBox");
const rightPlayer = document.getElementById("rightPlayer");
const leftClock = document.getElementById("leftClock");
const rightClock = document.getElementById("rightClock");
const minutesInput = document.getElementById("minutes");
const incrementInput = document.getElementById("increment")
const root = document.documentElement;

// set initial theme
const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
if (darkThemeMq.matches) {
    root.className = "dark"
} else {
    root.className = "light"
}

function setTheme() {
    const newTheme = root.className === 'light' ? 'dark' : 'light';
    root.className = newTheme; 
    console.log("theme");
}
if(themeButton){
    themeButton.addEventListener("click", function (){
        setTheme();
    });
}

// swaps player sides
if(exchangeButton) {
    exchangeButton.addEventListener("click", function (){
        if (leftPlayer.textContent == "White") {
            leftPlayer.textContent = "Black";
            leftBox.style.backgroundColor = "#2e2f31";
    
    
            rightPlayer.textContent = "White";
            rightBox.style.backgroundColor = "#f9f9f9";
        }
        else {
            rightPlayer.textContent = "Black";
            rightBox.style.backgroundColor = "#2e2f31";
    
            leftPlayer.textContent = "White";
            leftBox.style.backgroundColor = "#f9f9f9";
        }
    });
}

let startingMinutes = 9;
// start button code
if(startButton) {
    startButton.addEventListener("click", function (){
       startingMinutes = minutesInput.value;
    });
}


// timer
if(leftClock) {
    
    let time = startingMinutes * 60;

    setInterval(updateCountdown, 1000);

    function updateCountdown() {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        
        leftClock.textContent = `${minutes}:${seconds}`;
        time--;
    }

}


let leftMinute = 0;
let leftSecond = 0;
let rightMinute = 0;
let rightSecond = 0;


