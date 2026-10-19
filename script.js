// ============================================
// Fetch API and Dynamic Planet Details
// ============================================

// API endpoint
const API_URL = "https://anurella.github.io/json/planet.json";

// Search elements
const searchForm = document.querySelector("main > form");
const searchInput = document.querySelector("#search-bar");
const searchStatus = document.querySelector("#search-status");

// Planet details elements
const planetSection = document.querySelector(
    'main > section[aria-labelledby="planet-name"]'
);

const planetCard = planetSection.querySelector("article");

const planetImage = planetCard.querySelector(":scope > img");
const planetName = planetCard.querySelector("#planet-name");
const planetCategory = planetCard.querySelector(":scope > span");
const planetDescription = planetCard.querySelector(".earth-description");

// Primary statistics: Gravity, Mass, Period
const primaryStats = planetCard.querySelector(":scope > dl:first-of-type");

const gravityValue = primaryStats.children[0].querySelector("dd");
const massValue = primaryStats.children[1].querySelector("dd");
const periodValue = primaryStats.children[2].querySelector("dd");

// Icon statistics: Temperature, Moons, Diameter, Distance
const iconStats = planetCard.querySelector(":scope > dl:nth-of-type(2)");

const temperatureValue = iconStats.children[0].querySelector("dd");
const moonsValue = iconStats.children[1].querySelector("dd");
const diameterValue = iconStats.children[2].querySelector("dd");
const distanceValue = iconStats.children[3].querySelector("dd");

// Keep the original icon images so that updating their values
// does not remove the icons.
const statElements = [
    temperatureValue,
    moonsValue,
    diameterValue,
    distanceValue
];

const statIcons = statElements.map((element) =>
    element.querySelector("img")
);


// ============================================
// LOADING STATE
// ============================================

function showLoading(planet) {
    searchStatus.textContent = `Searching for ${planet}...`;
    searchStatus.setAttribute("aria-busy", "true");

    searchInput.disabled = true;
    searchForm.querySelector('button[type="submit"]').disabled = true;
}


// ============================================
// END LOADING STATE
// ============================================

function hideLoading() {
    searchStatus.setAttribute("aria-busy", "false");

    searchInput.disabled = false;
    searchForm.querySelector('button[type="submit"]').disabled = false;
}


// ============================================
// DISPLAY ERROR MESSAGES
// ============================================

function showError(message) {
    searchStatus.textContent = message;
}


// ============================================
// UPDATE PLANET DETAILS
// ============================================

function updatePlanet(planet) {
    // Update the planet name
    planetName.textContent = planet.name ?? "Unknown planet";

    // Update the planet category
    planetCategory.textContent =
        planet.type ?? planet.category ?? "Planet";

    // Update the description
    planetDescription.textContent =
        planet.description ?? "No description available.";

    // Update the image only when the API supplies an image URL.
    // Otherwise, retain the existing image.
    const imageUrl =
        planet.image ??
        planet.imageUrl ??
        planet.img ??
        planet.planetImage;

    if (imageUrl) {
        planetImage.src = imageUrl;
        planetImage.alt = `Image of ${planet.name ?? "the planet"}`;
    }

    // Update Gravity, Mass, and Period
    gravityValue.textContent =
        planet.gravity ?? "N/A";

    massValue.textContent =
        planet.mass ?? "N/A";

    periodValue.textContent =
        planet.period ?? planet.orbitalPeriod ?? "N/A";

    // Update the four icon statistics
    updateStat(
        temperatureValue,
        statIcons[0],
        planet.temperature ?? planet.avgTemperature
    );

    updateStat(
        moonsValue,
        statIcons[1],
        planet.moons ?? planet.numberOfMoons
    );

    updateStat(
        diameterValue,
        statIcons[2],
        planet.diameter
    );

    updateStat(
        distanceValue,
        statIcons[3],
        planet.distanceFromSun ??
        planet.distance ??
        planet.orbitalDistance
    );

    // Clear the loading message after a successful update.
    searchStatus.textContent = "";
}


// ============================================
// UPDATE A STATISTIC WITHOUT REMOVING ITS ICON
// ============================================

function updateStat(element, icon, value) {
    // Remove the old number and preserve the icon.
    element.replaceChildren(icon, document.createTextNode(
        value ?? "N/A"
    ));
}


// ============================================
// FETCH PLANET DATA FROM THE API
// ============================================

async function searchPlanet(planetNameToFind) {
    const searchTerm = planetNameToFind.trim();

    // Does not search if the input is empty.
    if (!searchTerm) {
        showError("Please enter a planet name.");
        searchInput.focus();
        return;
    }

    // Display the loading state immediately.
    showLoading(searchTerm);

    try {
        // Request the planet data from the API.
        const response = await fetch(API_URL);

        // Handle unsuccessful HTTP responses.
        if (!response.ok) {
            throw new Error(
                `The server returned an error (${response.status}).`
            );
        }

        // Convert the response into JavaScript data.
        const data = await response.json();

        // Support an API that returns either an array directly
        // or an object containing planets array.
        const planets = Array.isArray(data)
            ? data
            : data.planets ?? data.planet ?? data.data;

        if (!Array.isArray(planets)) {
            throw new Error(
                "The API response does not contain a valid planet list."
            );
        }

        // Find the requested planet without case sensitivity.
        const selectedPlanet = planets.find((planet) => {
            const name = planet.name ?? planet.planetName;

            return (
                typeof name === "string" &&
                name.trim().toLowerCase() === searchTerm.toLowerCase()
            );
        });

        // Handle a planet that does not exist in the API data.
        if (!selectedPlanet) {
            showError(
                `No planet found for "${searchTerm}". Please check the name and try again.`
            );
            return;
        }

        // Update only the planet details card.
        updatePlanet(selectedPlanet);

    } catch (error) {
        console.error("Planet search failed:", error);

        showError(
            "Unable to load planet data. Please check your connection and try again."
        );

    } finally {
        // Always stop the loading state, whether the request
        // succeeds or fails.
        hideLoading();
    }
}


// ============================================
// HANDLE THE SEARCH FORM
// ============================================

searchForm.addEventListener("submit", (event) => {
    // Prevent the form from reloading the page.
    event.preventDefault();

    // Search for the entered planet.
    searchPlanet(searchInput.value);
});

/* const themeToggle = document.querySelector(
    'header button[aria-label="Toggle color theme"]'
);

const themeLabel = themeToggle.firstChild;
const root = document.documentElement;

function setTheme(theme) {
    root.dataset.theme = theme;

    const isDark = theme === "dark";

    themeLabel.textContent = isDark ? "LIGHT" : "DARK";

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
    );

    themeToggle.setAttribute("aria-pressed", String(isDark));
}

themeToggle.addEventListener("click", () => {
    const currentTheme = root.dataset.theme || "light";

    setTheme(currentTheme === "light" ? "dark" : "light");
});

/* Start in light mode, preserving current appearance. */
// setTheme("light"); 

const themeToggle = document.querySelector(
    'header button[aria-label="Toggle color theme"]'
);

const themeLabel = themeToggle.querySelector("span");
const themeIcon = themeToggle.querySelector("img");
const root = document.documentElement;

function setTheme(theme) {
    root.dataset.theme = theme;

    const isDark = theme === "dark";

    // Update the button label.
    themeLabel.textContent = isDark ? "LIGHT" : "DARK";

    // Update the icon to match the selected theme.
    themeIcon.src = isDark
        ? "./assets/Theme Icon.svg"
        : "./assets/theme_toggle.svg";

    // Keep the accessibility information updated.
    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
    );

    themeToggle.setAttribute("aria-pressed", String(isDark));
}

themeToggle.addEventListener("click", () => {
    const currentTheme = root.dataset.theme || "light";

    setTheme(currentTheme === "light" ? "dark" : "light");
});

/* Start in light mode, preserving the existing appearance. */
setTheme("light");