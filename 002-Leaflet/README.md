# Leaflet in Electron Project Example

This project demonstrates how to create an Electron application that uses Leaflet to display a map with data fetched from a free API.

## Project Setup

### 1. Initialize the Project

First, create a new directory for your project and initialize it with npm:

```bash
mkdir leaflet-electron-app
cd leaflet-electron-app
npm init -y
```

### 2. Install Electron

Install Electron as a development dependency:

```bash
npm install electron --save-dev
```

### 3. Install Leaflet

Install Leaflet as a dependency:

```bash
npm install leaflet
```

### 4. Create the Project Structure

Create the following basic structure:

```
leaflet-electron-app/
├── public
  ├── index.html
  └── style.css
├── package.json
├── main.js
├── renderer.js
```

## Main Process Setup (`main.js`)

The main process is the entry point for the Electron application. Here's a simple setup:

```javascript
const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "renderer.js"),
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
```

## Renderer Process Setup

The renderer process is responsible for the frontend of the Electron application. You'll use `renderer.js` to fetch data from an API and update the Leaflet map.

### 1. Create the HTML File (`index.html`)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Leaflet in Electron</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div id="map" style="height: 100%;"></div>
    <script src="renderer.js"></script>
  </body>
</html>
```

### 2. Create the Renderer Script (`renderer.js`)

In this script, you'll fetch data from an API and display it on the Leaflet map.

```javascript
const L = require("leaflet");

// Initialize the map
const map = L.map("map").setView([51.505, -0.09], 13);

// Add a tile layer to the map (OpenStreetMap)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Fetch data from a free API (for this example, let's use a mock API for earthquake data)
fetch(
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
)
  .then((response) => response.json())
  .then((data) => {
    const earthquakes = data.features;

    earthquakes.forEach((earthquake) => {
      const coords = earthquake.geometry.coordinates;
      const lat = coords[1];
      const lon = coords[0];
      const magnitude = earthquake.properties.mag;

      // Add a marker for each earthquake
      L.marker([lat, lon]).addTo(map).bindPopup(`Magnitude: ${magnitude}`);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));
```

### 3. Add Some Basic CSS (`style.css`)

```css
body,
html,
#map {
  height: 100%;
  margin: 0;
  padding: 0;
}
```

## Update `package.json` to Run Electron

Update the `scripts` section in your `package.json` to start Electron:

```json
"scripts": {
  "start": "electron ."
}
```

## Running the Electron Application

Now, you can start your Electron application:

```bash
npm start
```

## Explanation

- **Leaflet Map:** The map is initialized with a view centered on `[51.505, -0.09]` and zoom level `13`.
- **Tile Layer:** OpenStreetMap tiles are used for the map background.
- **API Integration:** The script fetches earthquake data from the USGS Earthquake API. This data includes coordinates (latitude and longitude) and the magnitude of each earthquake.
- **Markers:** Markers are added to the map for each earthquake, and the magnitude is shown in a popup when the marker is clicked.

This setup provides a basic Electron application with a Leaflet map that displays real-time data from an external API. You can modify the API endpoint and map settings to fit your project's requirements.
