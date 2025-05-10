import React, { useState } from "react";

export default function RegistrationForm({ game, onClose }) {
  // Initialize the formData state dynamically based on the fields from the `game` prop
  const [formData, setFormData] = useState(
    game.fields.reduce((acc, field) => {
      acc[field.name] = ""; // Initialize each field in the formData state with an empty string
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create the payload with the dynamic form data and game title
    const payload = {
      gameName: game.title,
      ...formData, // Spread the formData to include all dynamic fields
    };

    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert("Registration failed!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed!");
    }

    onClose(); // Close form after submission
  };

  return (
    <div className="registration-form-overlay">
      <div className="registration-form">
        <h3>Register for {game.title}</h3>
        <form onSubmit={handleFormSubmit}>
          {/* Loop through the fields in the `game.fields` array and render inputs dynamically */}
          {game.fields.map((field) => (
            <div key={field.name}>
              <label>{field.label}:</label>
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
