# 🌍 Planet Explorer

Planet Explorer is a frontend capstone project built to help users explore planets in our solar system through planetary information, statistics, and a comparison table.

The goal was to bring the design from Figma to life using HTML, CSS, and JavaScript while making sure the website works on both desktop and mobile screens.

This project gave me the opportunity to work on more than just the appearance of a webpage. I worked on semantic HTML, responsive layouts, fetching data from an API, updating the DOM with JavaScript, handling search errors, and implementing a light and dark theme.

It was also a learning experience in understanding how different parts of a frontend application work together.

## Features

#### Here are the main features we implemented:

- Search for planets: Users can enter a planet's name to retrieve its information from an API.
- View planetary details: The details card displays the planet's name, category, description, image, gravity, mass, orbital period, temperature, number of moons, diameter, and distance from the Sun, depending on the data available from the API.
- Loading feedback: When a search is in progress, users see a message instead of being left wondering whether the search is working.
- Error handling: The application handles empty searches, planet names that are not found, unsuccessful server responses, and network or data-loading errors.
- Planetary comparison table: A table presents planetary facts for the terrestrial planets, gas giants, ice giants, and Pluto (Dwarf planet).
- Light and dark themes: Users can switch between light and dark appearances using the theme toggle.
- Responsive layout: The page adjusts to smaller screens, including changes to the planet details card, statistics, search form, comparison table, and footer.
- Accessible structure: Semantic HTML, form labels, descriptive headings, and a live status region help make the page easier to understand and use.

---

## Technologies & Tools

- Built With
 - HTML5 — For the structure and semantic organisation of the page.
 - CSS3 — For styling, responsive layouts, CSS Grid, custom properties, and theme colours.
 - JavaScript — For handling form submissions, fetching data, updating the page, and switching themes.
 - Fetch API — For requesting planetary information.
 - JSON — For working with the data returned by the API.
 - Git and GitHub — For version control and project collaboration.
 - Figma — For the design reference.


## 🪐 How the Planet Search Works

One of the main interactive parts of this project is the search feature.

we used the Fetch API to request planetary data from the endpoint below:

https://anurella.github.io/json/planet.json

When a user enters a planet's name and submits the form, JavaScript prevents the page from reloading and starts the search process.

The application then requests the data, looks for a matching planet name without being affected by uppercase or lowercase letters, and updates the details card when a match is found.

For example, searching for earth, Earth, or EARTH should match the same planet if it exists in the returned data.

We also added a loading message and temporarily disabled the search input and button while the request was in progress. This provides feedback and prevents users from submitting another search while the current request is running.

If the entered name is empty, the application asks the user to enter a planet name. If no matching planet is found, it displays an appropriate message. If the request fails, it informs the user that the data could not be loaded.

We used async/await to make the asynchronous request easier to follow and try...catch...finally to handle errors and ensure the loading state is cleared when the request finishes.

---

## Updating the page with JavaScript

Instead of reloading the entire page for every search, we update the relevant HTML elements through the DOM.

The planet's name, category, description, image when a suitable image URL is available, and statistics are updated using the returned data.

We also made sure that updating the temperature, moons, diameter, and distance values does not remove their existing SVG icons. The JavaScript preserves each icon while replacing the corresponding value.

This helped us understand how JavaScript can work with existing HTML instead of rebuilding the entire page every time the data changes.

## 📊 The Planetary Comparison Table

The comparison table presents planetary facts attributed to NASA and includes the terrestrial planets, gas giants, ice giants, and Pluto.

The table contains the planet names, mass, and diameter.

We used semantic table elements such as <table>, <caption>, <thead>, <tbody>, <th>, and <td>. We also used rowspan and colspan to group related planets and represent the categories shown in the design.

---

## 🎨 Bringing the Figma Design to Life

Recreating the design in code required us to think about how the page should look and behave at different screen sizes.

We used CSS Grid to organise the planet details card and its statistics. We also worked with spacing, typography, backgrounds, borders, and image sizing to reproduce the intended design.

We used Google Fonts; Inter and Space Mono, to establish the typography used across the page.

The styling is organised into sections covering the global styles, header, search form, planet details, statistics, comparison table, footer, and mobile responsiveness.

We copied the css reset file from the previous lessons and also used CSS custom properties for the main colours. This made it possible to manage the theme colours in one place rather than having to rewrite the styling for every individual element.

## Making the layout responsive

The desktop and mobile designs required different arrangements of the same content.

For smaller screens, We adjusted the page width, search form spacing, planet image size, typography, statistics layout, table spacing, and footer arrangement.

We also worked on keeping the table within the available screen width and preventing long values from breaking the layout.

The aim was to make the existing content fit smaller screens without losing the information users and visitors need.

---

## Implementing dark mode

The dark theme was another part of the project that required attention to detail.

We wanted the theme toggle to change the appearance of the page without changing the layout or breaking the existing light theme.

So, we used a data-theme attribute on the root HTML element and CSS selectors that apply when the dark theme is active.

The JavaScript updates the theme attribute when the toggle is clicked and changes the button label between DARK and LIGHT. It also switches the theme icon to match the selected theme.

The table retains its own readable cell colours instead of automatically turning every cell dark. This was important for preserving the contrast and appearance of the table.

Rather than redesigning the page, we focused on changing the colours while keeping the existing layout intact.

## ♿ Accessibility Considerations

Accessibility was considered in the HTML structure and interactive features.

Some of the things we implemented include:

- Semantic elements to organise the page into meaningful sections.
- A proper label for the planet search input, visually hidden to preserve the design.
- A role="status" region with aria-live="polite" to announce search feedback.
- Visually hidden labels for the icon-based planetary statistics, so their meanings are available even when the labels are not displayed visually.
- Table headers and appropriate scope attributes to communicate relationships between categories and data.
- Alternative text for the planet image, updated when the API provides a different planet image.
- An accessible label on the theme toggle that changes to reflect the available action.

These decisions helped make the interface more understandable beyond its visual appearance.

---

## Challenges We Worked Through

This project involved several challenges that helped us understand frontend development more practically.

1. Matching the Figma design without losing responsiveness

The design provided specific desktop and mobile references, but the page still needed to work at other screen widths.

We worked through the layout using CSS Grid, flexible widths, spacing adjustments, and a mobile media query. We also had to consider how the statistics and comparison table would fit on smaller screens.

2. Understanding how API fetching works

Fetching data introduced a different kind of challenge from styling a static webpage.

We needed to understand how the application requests data, waits for a response, converts the response to JSON, searches the returned data, and displays the result.

Using async/await, try...catch...finally, and DOM updates helped us organise that process.

3. Keeping the search experience informative
A search should not leave users staring at the page without knowing what is happening.

we added a loading message, disabled the search controls while a request was running, and provided feedback for empty searches, missing planets, and failed requests.

4. Implementing dark mode without breaking light mode

The light theme was already styled, so we did not want to rewrite the entire stylesheet to introduce dark mode.

we used the existing CSS custom properties and added dark-theme overrides at the end of the stylesheet. We also worked on the elements that needed special treatment, including the logo, search placeholder, statistic icons, and table colours.

5. Making the theme icon change with the theme

Changing the background and text colours was not enough. The theme toggle also needed to show the appropriate icon and label.

We connected the icon source and button label to the active theme so that they update together.

6. Structuring the planetary table

The table needed to communicate the relationship between terrestrial planets, gas giants, ice giants, and Pluto.

We used grouped header cells and spanning attributes to organise the categories while keeping the planetary names, mass, and diameter in their appropriate columns.

9. Working with Git and GitHub during a team project

The project also involved working within a team and using GitHub to manage the code.

Working with branches, commits, and pull requests helped us understand how changes can be developed and reviewed without everyone having to make changes directly to the same branch.

It also reinforced the importance of checking that code matches the design and works with the rest of the project before merging changes.

---

## 💡 What I Improved and Learned

This project helped us connect concepts that can initially feel separate when learning frontend development.

We worked with semantic HTML, CSS layout, responsive design, JavaScript events, asynchronous requests, JSON data, and DOM manipulation in one application.

We also gained practical experience with:

* Organising CSS into understandable sections.
* Using CSS custom properties to manage colours.
* Building layouts that adapt to mobile screens.
* Keeping static content separate from API-driven content.
* Preserving existing HTML elements during DOM updates.
* Providing loading and error feedback.
* Updating theme labels, icons, and accessibility attributes together.
* Using Git and GitHub as part of a collaborative workflow.
* Comparing an implementation against a Figma reference rather than styling by guesswork.

Most importantly, we had to think about how the different parts of the application interact. A change to the JavaScript should not break the icons, a theme change should not alter the layout, and a search should not interfere with the comparison table.

## 🚀 Possible Future Improvements

- There are still improvements that could make Planet Explorer more useful.

Some ideas include:

  - Remembering the user's preferred theme after refreshing the page.
  - Providing more specific feedback when an image cannot load.
  - Adding automated tests for the search, error handling, and theme toggle.
  - Reviewing keyboard navigation and colour contrast across both themes.
  - Adding more detailed planetary information if a suitable data source becomes available.
  - highlighting the searched planet's data on the comparison table immediately while been searched.

---

## ▶️ Running the Project

To run the project locally:

1. Clone the repository.
2. Open the project folder in your code editor.
3. Run index.html using a local development server.
4. Search for a planet and test the theme toggle.
5. Resize the browser to check the responsive layout.

An internet connection is needed for the Google Fonts and remote planetary API used by the project.

## 👥 The Team

This project was completed as the TS Academy HAJIME Frontend Development Capstone Project.

## 🙌 Acknowledgements
TS Academy — For the frontend development learning experience and capstone project.
Amaka Ndukwu — For the CSS reset used in the project and the figma design.