const themeButton = document.getElementById("themeIcon");
const exchangeButton = document.getElementById("exchangeIcon");
const startButton = document.getElementById("startButton");
const leftBox = document.getElementById("leftBox");
const leftPlayer = document.getElementById("leftPlayer");
const rightBox = document.getElementById("rightBox");
const rightPlayer = document.getElementById("rightPlayer");
const minutesInput = document.getElementById("minutes");
const incrementInput = document.getElementById("increment");

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
    themeButton.addEventListener("click", function (){
        setTheme();
    });

// swaps player sides
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

startButton.addEventListener("click", function (){
    // store data before leaving the page
    sessionStorage.setItem("currentTheme", root.className);
    sessionStorage.setItem("startingMinutes", minutesInput.value);
    sessionStorage.setItem("increment", incrementInput.value);
    sessionStorage.setItem("leftPlayer", leftPlayer.textContent);
});