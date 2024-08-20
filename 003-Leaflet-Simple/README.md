Leaflet is a popular JavaScript library for interactive maps, into an Electron application.

Here is a step-by-step guide to setting up a basic Electron application that displays a Leaflet map.

### Step 1: Set Up the Electron Project

1. **Initialize the Project**
   First, create a new directory for your Electron project and initialize it with `npm`:

   ```bash
   mkdir electron-leaflet
   cd electron-leaflet
   npm init -y
   ```

2. **Install Electron**
   Install Electron as a development dependency:

   ```bash
   npm install electron --save-dev
   ```

### Step 2: Create the Electron Application Structure

1. **Create the Main Process File**

   Create a `main.js` file in the root directory of your project. This file will handle the main process of your Electron app:

   ```javascript
   // main.js

   const { app, BrowserWindow } = require("electron");
   const path = require("path");

   function createWindow() {
     const win = new BrowserWindow({
       width: 800,
       height: 600,
       webPreferences: {
         preload: path.join(__dirname, "preload.js"),
         nodeIntegration: true,
       },
     });

     win.loadFile("index.html");
   }

   app.whenReady().then(() => {
     createWindow();

     app.on("activate", () => {
       if (BrowserWindow.getAllWindows().length === 0) createWindow();
     });
   });

   app.on("window-all-closed", () => {
     if (process.platform !== "darwin") {
       app.quit();
     }
   });
   ```

2. **Create the Preload Script**

   The preload script is used to set up the context for the renderer process. For now, this can be a simple file:

   ```javascript
   // preload.js

   window.addEventListener("DOMContentLoaded", () => {
     console.log("DOM fully loaded and parsed");
   });
   ```

3. **Create the HTML File**

   Create an `index.html` file that will be loaded by the `BrowserWindow`. This file will include the Leaflet map:

   ```html
   <!-- index.html -->

   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Electron Leaflet Map</title>
       <link
         rel="stylesheet"
         href="https://unpkg.com/leaflet/dist/leaflet.css"
       />
       <style>
         #map {
           height: 100vh;
           width: 100%;
         }
       </style>
     </head>
     <body>
       <div id="map"></div>

       <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
       <script>
         // Initialize the Leaflet map
         var map = L.map("map").setView([51.505, -0.09], 13);

         L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
           attribution:
             '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
         }).addTo(map);

         var marker = L.marker([51.5, -0.09])
           .addTo(map)
           .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
           .openPopup();
       </script>
     </body>
   </html>
   ```

### Step 3: Run the Electron Application

1. **Update the `package.json` File**

   Modify the `package.json` file to include a start script for Electron:

   ```json
   {
     "name": "electron-leaflet",
     "version": "1.0.0",
     "description": "A simple Electron app with Leaflet",
     "main": "main.js",
     "scripts": {
       "start": "electron ."
     },
     "devDependencies": {
       "electron": "^26.1.0"
     }
   }
   ```

2. **Start the Application**

   Run the application using the following command:

   ```bash
   npm start
   ```

   This will open an Electron window displaying a Leaflet map centered on London with a marker.

### Final Project Structure

After following these steps, your project structure should look like this:

```
electron-leaflet/
│
├── main.js
├── preload.js
├── index.html
├── package.json
└── node_modules/
```
