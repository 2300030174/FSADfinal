import { useState } from "react";
import Cards from "../components/Cards";

export default function Tournaments({ tournaments }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const gameTypes = ["All", "FPS", "MOBA", "Battle Royale", "Racing"];

  // Filtering logic
  const filteredTournaments = tournaments.filter(
    (game) =>
      (selectedType === "All" || game.type === selectedType) &&
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="tournaments-page">
      {/* 🔹 Tournaments Heading */}
      <h2 className="tournaments-heading">Tournaments</h2>

      {/* 🔹 Search & Filter Section */}
      <div className="tournament-controls">
        {/* Search Bar (Always Visible) */}
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search tournaments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
        </div>

        {/* Game Type Filter */}
        <div className="filter-section">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="filter-dropdown"
          >
            {gameTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 🔹 Display Tournament Cards */}
      <Cards games={filteredTournaments} />
    </div>
  );
}