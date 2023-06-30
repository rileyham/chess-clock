const themeButton = document.getElementById("themeIcon");
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