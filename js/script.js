console.log("THEME SCRIPT LOADED");

const themeToggle = document.getElementById("theme-toggle");
const themeLabel = document.getElementById("theme-label");
const themeIcon = document.getElementById("theme-icon");

const moonIcon = `
<path d="M21 14.2A8.5 8.5 0 0 1 9.8 3
8.8 8.8 0 1 0 21 14.2Z"></path>
`;

const sunIcon = `
<circle cx="12" cy="12" r="4"></circle>
<g stroke="currentColor" stroke-width="2"
stroke-linecap="round" fill="none">
<path d="M12 2v2"></path>
<path d="M12 20v2"></path>
<path d="M4.93 4.93l1.42 1.42"></path>
<path d="M17.65 17.65l1.42 1.42"></path>
<path d="M2 12h2"></path>
<path d="M20 12h2"></path>
<path d="M4.93 19.07l1.42-1.42"></path>
<path d="M17.65 6.35l1.42-1.42"></path>
</g>
`;

function updateTheme(isDarkMode) {
document.body.classList.toggle("dark-mode", isDarkMode);

themeLabel.textContent = isDarkMode ? "LIGHT" : "DARK";
themeIcon.innerHTML = isDarkMode ? sunIcon : moonIcon;

themeToggle.setAttribute(
"aria-label",
isDarkMode ? "Switch to light mode" : "Switch to dark mode"
);

themeToggle.setAttribute("aria-pressed", String(isDarkMode));
}

themeToggle.addEventListener("click", function () {
console.log("THEME BUTTON CLICKED");

const isDarkMode = !document.body.classList.contains("dark-mode");
updateTheme(isDarkMode);
});

updateTheme(false);

