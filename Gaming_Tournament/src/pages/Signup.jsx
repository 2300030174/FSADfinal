import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    age: "",
    country: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, username, password, age, country } = form;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!name || !email || !username || !password || !age || !country) {
      return "All fields are required.";
    }
    if (!emailRegex.test(email)) {
      return "Invalid email format.";
    }
    if (!passwordRegex.test(password)) {
      return "Password must be at least 6 characters, include a letter and a number.";
    }
    if (username.length < 3 || username.length > 20) {
      return "Username must be between 3 and 20 characters.";
    }
    if (isNaN(age) || age < 13 || age > 120) {
      return "Age must be a number between 13 and 120.";
    }
    return "";
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(""); // Clear previous errors

    const res = await fetch("http://localhost:8080/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Signup successful!");
      navigate("/login");
    } else {
      const msg = await res.text();
      setError(msg || "Signup failed. Email or username may already exist.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Your Player Profile</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        {error && <div className="error">{error}</div>}
        <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <input type="number" name="age" placeholder="Age" required onChange={handleChange} />
        <input type="text" name="country" placeholder="Country" required onChange={handleChange} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
