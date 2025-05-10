// components/Explore.jsx
import { useNavigate } from "react-router-dom";

export default function Explore() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/home'); // Navigate to Home page
  };

  return (
    <div className="homee">
      <h1>Welcome to the Greatest Online Gaming Tournament</h1>
      <button className="explore-btn" onClick={handleExploreClick}>
        Explore
      </button>
    </div>
  );
}
