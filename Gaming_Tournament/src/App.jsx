import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./pages/Signup";
import Header from "./components/Header.jsx";
import Cards from "./components/Cards.jsx";
import Tournaments from "./pages/Tournaments.jsx";
import GamingGear from "./pages/GamingGear.jsx";
import LatestNews from "./pages/LatestNews.jsx";
import ScoreBoard from "./pages/Scoreboard.jsx"; // lowercase 'b'
import Live from "./pages/Live.jsx";
import Community from "./pages/Community.jsx";
import Home from "./pages/Home.jsx";
import Explore from "./pages/Explore.jsx"; // Import Explore component
import Logout from './pages/Logout';

import Login from "./pages/Login"; // Add login route
import ProtectedRoute from "./pages/ProtectedRoute"; // Adjust path if needed
import "./App.css";

export default function App() {
  const tournaments = [
    { id: 1, title: "Valorant", type: "FPS", description: "Valorant is a first-person shooter (FPS) game where two teams of five players compete in rounds to win the match. Players choose from a variety of characters, called Agents, each with their own unique abilities.", image: "./public/valo.jpg", video: "./public/valo vid.mp4" },
    { id: 2, title: "Free Fire", type: "BattleRoyale", description: "Free Fire is the ultimate survival shooter game available on mobile. Each 10-minute game places you on a remote island where you are pit against 49 other players, all seeking survival.", image: "./public/free fire.jpg", video: "./public/free fire vid.mp4" },
    { id: 3, title: "CS2", type: "FPS", description: "The game pits two teams, Terrorists and Counter-Terrorists, against each other in different objective-based game modes.", image: "./public/cs2.jpg", video: "./public/cs2 vid.mp4" },
    { id: 4, title: "Smash karts", type: "Racing", description: "Smash Karts is a fast-paced multiplayer game where players race against each other in colourful kart battles.", image: "./public/smashkarts.jpg", video: "./public/smashkarts.mp4" },
    { id: 5, title: "COD", type: "FPS", description: "Call of Duty is a first-person shooter (FPS) video game franchise that includes single-player, multiplayer, and battle royale modes.", image: "./public/cod.jpg", video: "./public/cod.mp4" },
    { id: 6, title: "Fortnite", type: "BattleRoyale", description: "Fortnite is a popular battle royale game that includes building mechanics and seasonal updates.", image: "./public/fortnite.jpg", video: "./public/fortnite.mp4" },
    { id: 7, title: "BGMI", type: "BattleRoyale", description: "Battlegrounds Mobile India (BGMI) is an online multiplayer mobile battle royale for Indian players.", image: "./public/bgmi.jpg", video: "./public/bgmi.mp4" },
    { id: 8, title: "League of Legends", type: "MOBA", description: "League of Legends is a multiplayer online battle arena (MOBA) game where two teams of five players battle to destroy the other team's base.", image: "./public/lol.jpg", video: "./public/lol.mp4" }
  ];

  const gearItems = [
    { title: "Gaming Mouse", description: "High precision gaming mouse.", image: "./public/mouse.jpg" },
    { title: "Mechanical Keyboard", description: "RGB mechanical keyboard.", image: "./public/keyboard.jpg" },
    { title: "Gaming Headset", description: "Surround sound headset.", image: "./public/headset.jpg" },
    { title: "Gaming Chair", description: "Comfortable gaming chair.", image: "./public/chair.jpg" },
  ];
  




  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home tournaments={tournaments} gearItems={gearItems} />
              </ProtectedRoute>
                

            }
          />
          <Route
            path="/tournaments"
            element={
              <ProtectedRoute>
                <Tournaments tournaments={tournaments} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gear"
            element={
              <ProtectedRoute>
                <GamingGear />
              </ProtectedRoute>
            }
          />
          <Route
            path="/news"
            element={
              <ProtectedRoute>
                <LatestNews />
              </ProtectedRoute>
                
            }
          />
          <Route
            path="/scoreboard"
            element={
              <ProtectedRoute>
                <Scoreboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/live"
            element={
              <ProtectedRoute>
                <Live />
              </ProtectedRoute>
            }
          />
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}
