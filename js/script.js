const API_URL = "https://api.le-systeme-solaire.net/rest/bodies/";

// Replace this placeholder with your API key.
// Do not commit a real API key to a public repository.
const API_KEY = "YOUR_API_KEY";

const planetSelect = document.getElementById("planetSelect");
const planetInfo = document.getElementById("planetInfo");
const errorMessage = document.getElementById("errorMessage");

// Fetch planet data from the API
async function fetchPlanets() {
  try {
    planetInfo.innerHTML = "<p>Loading planets...</p>";
    errorMessage.textContent = "";

    const response = await fetch(API_URL, {
      headers: {
        Authorization: Bearer ${ API_KEY }
            }
        });

if (!response.ok) {
  throw new Error(API request failed: ${ response.status });
}

const data = await response.json();

// Keep only planets
const planets = data.bodies.filter(
  body => body.isPlanet === true
);

// Populate the dropdown dynamically
planetSelect.innerHTML =
  '<option value="">Select a planet</option>';

planets.forEach(planet => {
  const option = document.createElement("option");

  option.value = planet.id;
  option.textContent = planet.englishName;

  planetSelect.appendChild(option);
});

planetInfo.innerHTML =
  "<p>Select a planet to view its information.</p>";

// Display the selected planet
planetSelect.addEventListener("change", () => {
  const selectedPlanet = planets.find(
    planet => planet.id === planetSelect.value
  );

  if (selectedPlanet) {
    displayPlanet(selectedPlanet);
  } else {
    planetInfo.innerHTML = "";
  }
});

    } catch (error) {
  console.error("Error fetching planets:", error);

  planetInfo.innerHTML = "";

  errorMessage.textContent =
    "Unable to load planet data. Please try again later.";
}
}

// Display planet information dynamically
function displayPlanet(planet) {
  const moonCount = planet.moons
    ? planet.moons.length
    : 0;

  planetInfo.innerHTML = `
        <h2>${planet.englishName}</h2>
        <p><strong>Planet type:</strong> ${planet.bodyType}</p>
        <p><strong>Mean radius:</strong> ${planet.meanRadius ?? "Unavailable"
    } km</p>
        <p><strong>Gravity:</strong> ${planet.gravity ?? "Unavailable"
    } m/s²</p>
        <p><strong>Number of moons:</strong> ${moonCount}</p>
        <p><strong>Average temperature:</strong> ${planet.avgTemp ?? "Unavailable"
    } K</p>
    `;
}

// Start the application
fetchPlanets();
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

