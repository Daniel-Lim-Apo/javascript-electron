# Electron React Card Game Example

This guide will help you set up an Electron application using React for the frontend. The example project will implement a simple card game interface that fetches card data from the Deck of Cards API.

## Project Structure

Here’s a basic structure for the project:

```
electron-react-card-game/
├── public/
│   ├── index.html
├── src/
│   ├── main.js
│   ├── renderer.js
│   ├── App.js
│   ├── CardGame.js
│   └── api.js
├── babel.config.json
├── package.json
└── webpack.config.js
```

## 1. Initialize a New Project

```bash
mkdir electron-react-card-game
cd electron-react-card-game
npm init -y
```

## 2. Install Dependencies

You need to install Electron, React, and other necessary packages:

```bash
npm install electron react react-dom
npm install @babel/preset-react @babel/preset-env babel-loader
```

## 3. Configuring Webpack and Babel

### `webpack.config.js`

```javascript
const path = require('path');

module.exports = {
  entry: './src/renderer.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
};
```

### `babel.config.json`

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

## 4. Creating the Electron Main Process

### `src/main.js`

```javascript
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile('public/index.html');
}

app.on('ready', createWindow);
```

## 5. Creating the React Frontend

### `public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Card Game</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="../dist/bundle.js"></script>
  </body>
</html>
```

### `src/renderer.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

### `src/App.js`

```javascript
import React from 'react';
import CardGame from './CardGame';

const App = () => (
  <div>
    <h1>Card Game</h1>
    <CardGame />
  </div>
);

export default App;
```

## 6. Implementing the Card Game Component

This component will handle the UI and the logic for the card game.

### `src/CardGame.js`

```javascript
import React, { useState, useEffect } from 'react';
import { fetchCardData } from './api';

const CardGame = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    fetchCardData().then(setCards);
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  return (
    <div>
      <h2>Select a Card</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            style={{
              border: '1px solid #000',
              padding: '20px',
              margin: '10px',
              cursor: 'pointer',
            }}
          >
            <p>{card.name}</p>
            <img src={card.imageUrl} alt={card.name} style={{ width: '100px' }} />
          </div>
        ))}
      </div>
      {selectedCard && (
        <div>
          <h2>Selected Card</h2>
          <p>{selectedCard.name}</p>
          <img src={selectedCard.imageUrl} alt={selectedCard.name} style={{ width: '200px' }} />
        </div>
      )}
    </div>
  );
};

export default CardGame;
```

## 7. Handling API Calls

You can use the Deck of Cards API to fetch card data. Here’s how to implement the API call:

### `src/api.js`

```javascript
export const fetchCardData = async () => {
  const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=10');
  const data = await response.json();

  // Transform the data to match the structure used in the CardGame component
  return data.cards.map((card, index) => ({
    id: index,
    name: `${card.value} of ${card.suit}`,
    imageUrl: card.image,
  }));
};
```

## 8. Running the Application

Add the following script to your `package.json`:

### `package.json`

```json
"scripts": {
  "start": "webpack && electron ."
}
```

Run the application with:

```bash
npm start
```
