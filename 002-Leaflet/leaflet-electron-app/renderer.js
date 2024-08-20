console.log("Running");

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

    console.log(earthquakes);

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
