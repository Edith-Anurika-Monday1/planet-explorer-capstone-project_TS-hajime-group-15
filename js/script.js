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