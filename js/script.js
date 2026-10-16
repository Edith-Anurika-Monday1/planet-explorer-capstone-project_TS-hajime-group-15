
// Elizabeth Samuel — API integration and dynamic rendering
// Babatunde Ewegbemi — planet data/statistics presentation and Git workflow support
const API_URL = "https://anurella.github.io/json/planet.json";
let planets = [];
let selectedPlanetName = "Earth";

const elements = {
  status: document.getElementById("app-status"),
  tableBody: document.getElementById("planet-table-body"),
  name: document.getElementById("detail-name"),
  type: document.getElementById("detail-category"),
  description: document.getElementById("detail-desc"),
  image: document.getElementById("planet-image"),
  gravity: document.getElementById("stat-gravity"),
  mass: document.getElementById("stat-mass"),
  period: document.getElementById("stat-period"),
  temperature: document.getElementById("fact-temp"),
  moons: document.getElementById("fact-moons"),
  diameter: document.getElementById("fact-diameter"),
  distance: document.getElementById("fact-distance")
};

const numberFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 6
});

function formatNumber(value) {
  const number = Number(value);
  return Number.isFinite(number)
    ? numberFormat.format(number)
    : "Not available";
}

function setStatus(message, isError = false) {
  elements.status.textContent = message;
  elements.status.classList.toggle("error", isError);
}

function createCell(tagName, text, className = "", attributes = {}) {
  const cell = document.createElement(tagName);
  cell.textContent = text;

  if (className) cell.className = className;

  Object.entries(attributes).forEach(([name, value]) => {
    cell.setAttribute(name, value);
  });

  return cell;
}

function createPlanetRow(planet, categoryCells = []) {
  const row = document.createElement("tr");
  row.className = "planet-row";
  row.dataset.planetName = planet.name;

  categoryCells.forEach(cell => row.appendChild(cell));

  const nameCell = createCell("td", "", "planet-name-cell");
  const selectButton = document.createElement("button");

  selectButton.type = "button";
  selectButton.className = "planet-select-button";
  selectButton.textContent = planet.name;
  selectButton.setAttribute(
    "aria-label",
    `Show details for ${planet.name}`
  );
  selectButton.setAttribute(
    "aria-pressed",
    String(planet.name === selectedPlanetName)
  );

  selectButton.addEventListener("click", () => {
    updatePlanetCard(planet.name);
  });

  nameCell.appendChild(selectButton);
  row.appendChild(nameCell);
  row.appendChild(createCell("td", formatNumber(planet.mass)));
  row.appendChild(createCell("td", formatNumber(planet.diameter)));

  return row;
}

function createCategoryCell(label, rowSpan, colSpan = 1) {
  return createCell("th", label, "category-cell", {
    scope: "rowgroup",
    rowspan: String(rowSpan),
    colspan: String(colSpan)
  });
}

function renderTable() {
  elements.tableBody.replaceChildren();

  const terrestrial = planets.filter(
    planet => planet.type === "Terrestrial"
  );

  const gasGiants = planets.filter(
    planet => planet.type === "Gas Giant"
  );

  const iceGiants = planets.filter(
    planet => planet.type === "Ice Giant"
  );

  const dwarfPlanets = planets.filter(
    planet => planet.type === "Dwarf Planet"
  );

  terrestrial.forEach((planet, index) => {
    const categories = index === 0
      ? [
          createCategoryCell(
            "Terrestrial Planets",
            terrestrial.length,
            2
          )
        ]
      : [];

    elements.tableBody.appendChild(
      createPlanetRow(planet, categories)
    );
  });

  const jovianPlanets = [...gasGiants, ...iceGiants];

  jovianPlanets.forEach((planet, index) => {
    const categories = [];

    if (index === 0) {
      categories.push(
        createCategoryCell("Jovian Planets", jovianPlanets.length)
      );
    }

    const subgroup = gasGiants.includes(planet)
      ? gasGiants
      : iceGiants;

    if (subgroup[0] === planet) {
      const subgroupName = gasGiants.includes(planet)
        ? "Gas Giants"
        : "Ice Giants";

      categories.push(
        createCategoryCell(subgroupName, subgroup.length)
      );
    }

    elements.tableBody.appendChild(
      createPlanetRow(planet, categories)
    );
  });

  dwarfPlanets.forEach((planet, index) => {
    const categories = index === 0
      ? [
          createCategoryCell(
            "Dwarf Planets",
            dwarfPlanets.length,
            2
          )
        ]
      : [];

    elements.tableBody.appendChild(
      createPlanetRow(planet, categories)
    );
  });

  if (elements.tableBody.children.length === 0) {
    showTableMessage("No planet data is available.");
  }

  highlightSelectedRow();
}

function showTableMessage(message) {
  const row = document.createElement("tr");

  row.appendChild(
    createCell("td", message, "table-message", {
      colspan: "5"
    })
  );

  elements.tableBody.replaceChildren(row);
}

function updatePlanetCard(name) {
  const planet = planets.find(
    item => item.name.toLowerCase() === name.toLowerCase()
  );

  if (!planet) return;

  selectedPlanetName = planet.name;

  elements.name.textContent = planet.name;
  elements.type.textContent = planet.type;
  elements.description.textContent = planet.description;
  elements.gravity.textContent =
    `${formatNumber(planet.gravity)} m/s²`;
  elements.mass.textContent = formatNumber(planet.mass);
  elements.period.textContent =
    `${formatNumber(planet.period)} days`;
  elements.temperature.textContent =
    `${formatNumber(planet.temperature)} K`;
  elements.moons.textContent =
    `${formatNumber(planet.moons)} ${
      Number(planet.moons) === 1 ? "moon" : "moons"
    }`;
  elements.diameter.textContent =
    `${formatNumber(planet.diameter)} km`;
  elements.distance.textContent =
    `${formatNumber(planet.distanceFromSun)} million km`;

  elements.image.onerror = () => {
    elements.image.onerror = null;
    elements.image.removeAttribute("src");
    elements.image.alt = `Image unavailable for ${planet.name}`;
  };

  elements.image.src = planet.image;
  elements.image.alt = `${planet.name}, ${planet.type}`;

  highlightSelectedRow();
}

function highlightSelectedRow() {
  document.querySelectorAll(".planet-row").forEach(row => {
    const selected = row.dataset.planetName === selectedPlanetName;

    row.classList.toggle("selected", selected);

    const button = row.querySelector(".planet-select-button");

    if (button) {
      button.setAttribute("aria-pressed", String(selected));
    }
  });
}

async function loadPlanets() {
  setStatus("Loading planet data…");

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(
        `API request failed with status ${response.status}`
      );
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("The API response was not a list.");
    }

    const requiredFields = [
      "name",
      "type",
      "distanceFromSun",
      "image",
      "mass",
      "diameter",
      "period",
      "temperature",
      "gravity",
      "moons",
      "description"
    ];

    planets = data.filter(planet =>
      planet &&
      requiredFields.every(
        field =>
          planet[field] !== undefined &&
          planet[field] !== null
      )
    );

    if (!planets.length) {
      throw new Error(
        "The API did not return valid planet records."
      );
    }

    renderTable();

    updatePlanetCard(
      planets.some(planet => planet.name === selectedPlanetName)
        ? selectedPlanetName
        : planets[0].name
    );

    setStatus(
      `Loaded ${planets.length} objects from the Planet Explorer API.`
    );
  } catch (error) {
    console.error("Could not load planet data:", error);

    showTableMessage(
      "Planet data could not be loaded. Check your internet connection and refresh the page."
    );

    setStatus(
      "Unable to load planet data. Check your internet connection and refresh the page.",
      true
    );
  }
}

loadPlanets();
=======
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

