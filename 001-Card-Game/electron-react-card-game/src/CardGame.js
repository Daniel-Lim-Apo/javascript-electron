import React, { useState, useEffect } from "react";
import { fetchCardData } from "./api";

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
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            style={{
              border: "1px solid #000",
              padding: "20px",
              margin: "10px",
              cursor: "pointer",
            }}
          >
            <p>{card.name}</p>
            <img
              src={card.imageUrl}
              alt={card.name}
              style={{ width: "100px" }}
            />
          </div>
        ))}
      </div>
      {selectedCard && (
        <div>
          <h2>Selected Card</h2>
          <p>{selectedCard.name}</p>
          <img
            src={selectedCard.imageUrl}
            alt={selectedCard.name}
            style={{ width: "200px" }}
          />
        </div>
      )}
    </div>
  );
};

export default CardGame;
