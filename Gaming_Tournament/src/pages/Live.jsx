import React, { useState, useRef, useEffect } from "react";
import "./Live.css";
import { FaSearch } from "react-icons/fa"; // Search icon

const liveStreams = [
  {
    id: 1,
    title: "Valorant Championship",
    description: "Watch the best teams compete in this intense Valorant showdown!",
    video: "./public/valo vid.mp4",
    link: "https://www.twitch.tv/valorant"
  },
  {
    id: 2,
    title: "Free Fire World Series",
    description: "Battle Royale action at its finest. Who will survive?",
    video: "./public/free fire vid.mp4",
    link: "https://www.youtube.com/freefire"
  },
  {
    id: 3,
    title: "CS2 Tournament",
    description: "Counter-Strike 2 global tournament, featuring top players worldwide!",
    video: "./public/cs2 vid.mp4",
    link: "https://www.twitch.tv/cs2"
  },
  {
    id: 4,
    title: "Smash Karts Battle",
    description: "Fast-paced, explosive kart battles in real-time.",
    video: "./public/smashkarts.mp4",
    link: "https://www.twitch.tv/smashkarts"
  },
];

export default function Live() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);

  // Filter live streams based on search input
  const filteredStreams = liveStreams.filter((stream) =>
    stream.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close search bar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`live-container ${showSearch ? "search-active" : ""}`}>
      <h1>Live Tournaments</h1>

      {/* Search Icon */}
      <div className="search-icon-container" onClick={() => setShowSearch(true)}>
        <FaSearch className="search-icon" />
      </div>

      {/* Search Bar (Only visible when clicked) */}
      {showSearch && (
        <div className="search-bar-container" ref={searchRef}>
          <input
            type="text"
            placeholder="Search live tournaments..."
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>
      )}

      <div className="live-grid">
        {filteredStreams.length > 0 ? (
          filteredStreams.map((stream) => (
            <div key={stream.id} className="live-card">
              <video 
                className="live-video" 
                src={stream.video} 
                muted 
                loop 
                playsInline
                onMouseOver={(e) => e.target.play()}
                onMouseOut={(e) => e.target.pause()}
              />
              <h3>{stream.title}</h3>
              <p>{stream.description}</p>
              <a href={stream.link} target="_blank" rel="noopener noreferrer" className="watch-btn">
                Watch Live
              </a>
            </div>
          ))
        ) : (
          <p className="no-results">No live tournaments found.</p>
        )}
      </div>
    </div>
  );
}
