export const fetchCardData = async () => {
  const response = await fetch(
    "https://deckofcardsapi.com/api/deck/new/draw/?count=10"
  );
  const data = await response.json();

  // Transform the data to match the structure used in the CardGame component
  return data.cards.map((card, index) => ({
    id: index,
    name: `${card.value} of ${card.suit}`,
    imageUrl: card.image,
  }));
};
