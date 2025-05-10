import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Header.css";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); // 👈 Needed for redirect

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".search-bar-container") && !e.target.closest(".search-button")) {
      setShowSearch(false);
    }
    if (!e.target.closest(".account-container")) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // 👇 Add the logout handler here
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.jpg" alt="Logo" />
      </div>

      <nav className="nav">
        <Link to="/tournaments">Tournaments</Link>
        <Link to="/gear">Gaming Gear</Link>
        <Link to="/news">Latest News</Link>
        <Link to="/scoreboard">Scoreboard</Link>
        <Link to="/live">Live</Link>
        <Link to="/community">Community</Link>
      </nav>

      <div className="actions">
        <div className="account-container" onClick={toggleDropdown}>
          <div className="account">Settings</div>
          {showDropdown && (
            <div className="account-dropdown">
              <ul>
                <li>Profile</li>
                {/* 🔽 Change Link to a button and call handleLogout */}
                <li>
                  <button onClick={handleLogout} className="logout-button">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;