import { useState } from "react";
import ExpandedCard from "./ExpandedCard.jsx";

export default function Cards({ games, onRegister }) {
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null); // Track the selected game for registration

  const handleViewCard = (id) => {
    setExpandedCardId(id);
  };

  const handleCloseExpandedCard = () => {
    setExpandedCardId(null);
  };

  const handleRegister = (card) => {
    setSelectedGame(card); // Set the selected game for registration
    setExpandedCardId(card.id); // Open the expanded card for the selected game
  };

  const handleCloseForm = () => {
    setSelectedGame(null); // Close the registration form
  };

  return (
    <div className="cards-background">
      <div className="cards-container">
        {games.map((card) => (
          <div key={card.id} className="card">
            <img src={card.image} alt={card.title} />
            <div className="card-content">
              <h3>{card.title}</h3>
              <div className="buttons">
                <button onClick={() => handleViewCard(card.id)}>View</button>
                <button onClick={() => handleRegister(card)}>Register</button> {/* ✅ Pass selected game */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {expandedCardId && (
        <ExpandedCard
          card={games.find((card) => card.id === expandedCardId)}
          onClose={handleCloseExpandedCard}
          selectedGame={selectedGame} // Pass the selected game for registration
          onCloseForm={handleCloseForm} // Pass the function to close the form
        />
      )}
    </div>
  );
}

/* CSS Styles */
const styles = `
/* Full-screen background */
.cards-background {
  background: url('./public/omen.jpg') no-repeat center top fixed;
  background-size: cover;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column; /* Makes sure content stacks properly */
  justify-content: center;
  align-items: center;
  padding-top: 200px; /* Push background down */
}

/* Container for the cards */
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Adjusts layout dynamically */
  gap: 20px; /* Space between cards */
  max-width: 1300px;
  width: 100%;
  justify-content: center;
  margin: 100px auto 0;
}

/* Individual card styling */
.card {
  background: rgba(0, 0, 0, 0.65);
  color: white;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  width: 250px; /* Fixed width */
  height: 320px; /* Adjusted height */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center; /* Center content */
  overflow: hidden; /* Prevents content from overflowing */
}

/* Ensure images are fully visible */
.card img {
  width: 100%;
  height: 180px; /* Ensures consistent height */
  object-fit: cover; /* Prevents distortion */
  border-radius: 10px;
}

/* Title text styling */
.card h3 {
  margin: 10px 0;
  font-size: 18px;
  color: #00ff99;
}

/* Center buttons */
.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px; /* Adds space between title and buttons */
}

.buttons button {
  background-color: blue;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.buttons button:hover {
  background-color: darkblue;
}
`;
document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);