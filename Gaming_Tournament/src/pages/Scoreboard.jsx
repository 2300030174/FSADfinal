import { useState } from "react";
import "./Scoreboard.css";

const sampleLeaderboards = {
  "Valorant": [
    { rank: 1, player: "AceHunter", score: 4000 },
    { rank: 2, player: "ShadowNinja", score: 3800 },
    { rank: 3, player: "PhoenixRider", score: 3600 },
  ],
  "League of Legends": [
    { rank: 1, player: "DragonSlayer", score: 5000 },
    { rank: 2, player: "ArcaneMaster", score: 4700 },
    { rank: 3, player: "StormCaller", score: 4500 },
  ],
  "CS:GO": [
    { rank: 1, player: "Deadshot", score: 4200 },
    { rank: 2, player: "BulletTime", score: 3900 },
    { rank: 3, player: "HeadshotKing", score: 3750 },
  ],
};

export default function Scoreboard() {
  const gameNames = Object.keys(sampleLeaderboards);
  const [selectedGame, setSelectedGame] = useState(gameNames[0]);

  return (
    <div className="scoreboard-container">
      <h1 className="scoreboard-title">Scoreboard</h1>
      
      <select
        className="game-selector"
        value={selectedGame}
        onChange={(e) => setSelectedGame(e.target.value)}
      >
        {gameNames.map((game) => (
          <option key={game} value={game}>
            {game}
          </option>
        ))}
      </select>

      <div className="leaderboard">
        {sampleLeaderboards[selectedGame].map(({ rank, player, score }) => (
          <div key={rank} className="leaderboard-row animate-row">
            <span className="rank">#{rank}</span>
            <span className="player">{player}</span>
            <span className="score">{score} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}
