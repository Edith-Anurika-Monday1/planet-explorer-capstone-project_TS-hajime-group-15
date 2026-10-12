const API_URL = "https://anurella.github.io/json/planet.json";

// Function to get data from the API
async function fetchPlanetData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error loading planet data:", error);
    }
}

// Function to update the top stats card
function updateStatsCard(planet) {
    document.getElementById('stat-gravity').innerText = planet.gravity;
    document.getElementById('stat-mass').innerText = planet.mass;
    document.getElementById('stat-period').innerText = planet.period;
    document.getElementById('stat-temp').innerText = planet.temperature;
    document.getElementById('stat-moons').innerText = planet.moons;
    document.getElementById('stat-diameter').innerText = planet.diameter;
    document.getElementById('stat-rotation').innerText = planet.rotation;
}

// Function to build the table rows
function buildPlanetTable(planets) {
    const tableBody = document.getElementById('planet-table-body');
    tableBody.innerHTML = ""; // Clear the table first

    planets.forEach(planet => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${planet.type}</td>
            <td>${planet.name}</td>
            <td>${planet.mass}</td>
            <td>${planet.diameter}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Main function to initialize everything
async function initProject() {
    const planets = await fetchPlanetData();
    
    if (planets) {
        // 1. Populate the table with all planets
        buildPlanetTable(planets);
        
        // 2. Default the card to the first planet (e.g., Earth)
        // In a real app, this would change based on the search bar
        const earth = planets.find(p => p.name === "Earth");
        updateStatsCard(earth);
    }
}

// Run the project when the page loads
window.onload = initProject;
