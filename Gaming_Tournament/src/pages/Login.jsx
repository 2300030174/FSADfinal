import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Add error state for feedback
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const isValid = await res.json();

    if (isValid) {
      localStorage.setItem("isLoggedIn", "true");  // Set login status
      localStorage.setItem("username", username);  // Store username
      setError(""); // Clear error message on successful login
      navigate("/home"); // Redirect to home page
    } else {
      setError("Invalid credentials!"); // Set error message for invalid login
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Enter the Arena</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
      </form>
      <div className="signin-link">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
