import { useNavigate } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/login"); // Go to login instead of home
  };

  return (
    <div className="welcome">
      <h1>Welcome to the Greatest Online Gaming Tournament</h1>
      <button className="explore-btn" onClick={handleExploreClick}>
        Explore
      </button>
    </div>
  );
};

export default Welcome;
