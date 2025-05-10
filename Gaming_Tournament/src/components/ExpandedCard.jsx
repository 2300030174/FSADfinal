import { useEffect, useState } from 'react';

export default function ExpandedCard({ card, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false); // State to manage form visibility
  const [formData, setFormData] = useState({}); // Dynamic form data

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100); // Delay for animation effect
  }, []);

  // Define form fields for each game type
  const formFieldsConfig = {
  FPS: [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'ingameName', label: 'In-Game Name', type: 'text', required: true },
    { name: 'rank', label: 'Rank', type: 'text', required: true },
  ],
  MOBA: [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'ingameName', label: 'In-Game Name', type: 'text', required: true },
    { name: 'rank', label: 'Rank', type: 'text', required: true },
  ],
  Racing: [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'ingameName', label: 'In-Game Name', type: 'text', required: true },
    { name: 'rank', label: 'Rank', type: 'text', required: true },
  ],
  BattleRoyale: [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'ingameName', label: 'In-Game Name', type: 'text', required: true },
    { name: 'rank', label: 'Rank', type: 'text', required: true },
  ],
  // Add more game types as needed
};

  // Get the form fields for the current game
  const formFields = formFieldsConfig[card.type] || [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
  ];

  const handleRegisterClick = () => {
    setShowRegistrationForm(true); // Show the registration form
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      gameName: card.title, // e.g., "Valorant"
      fields: formData,     // dynamic form data collected from user
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        alert('Registration successful!');
      } else {
        alert('Registration failed!');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed!');
    }
  
    setShowRegistrationForm(false); // Close form after submission
  };
  
  const handleCloseForm = () => {
    setShowRegistrationForm(false); // Close the form without submitting
  };

  return (
    <div className="expanded-card">
      {/* Background Video */}
      <video className="background-video" autoPlay loop muted>
        <source src={card.video} type="video/mp4" />
      </video>

      {/* Dynamic & Fully Centered Text Box */}
      <div className={`expanded-card-content ${isVisible ? 'visible' : ''}`}>
        <h2>{card.title}</h2>
        <p>{card.description}</p>
        <div className="button-container">
          <button onClick={onClose}>Back</button>
          <button onClick={handleRegisterClick}>Register</button>
        </div>
      </div>

      {/* Registration Form Modal */}
      {showRegistrationForm && (
        <div className="registration-modal">
          <div className="registration-form">
            <h3>Register for {card.title}</h3>
            <form onSubmit={handleFormSubmit}>
              {formFields.map((field) => (
                <div key={field.name}>
                  <label>{field.label}:</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleFormChange}
                    required={field.required}
                  />
                </div>
              ))}
              <div className="form-buttons">
                <button type="submit">Submit</button>
                <button type="button" onClick={handleCloseForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* Fully Fixed CSS */
const styles = `
.expanded-card {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  background: rgba(0, 0, 0, 0.7); /* Slight fade for focus */
}

.background-video {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.expanded-card-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Ensures perfect centering */
  background: rgba(0, 0, 0, 0.3); /* Even more transparent */
  padding: 20px;
  color: white;
  text-align: center;
  border-radius: 10px;
  width: auto; /* Adjust width based on content */
  max-width: 80%; /* Prevent it from getting too wide */
  min-width: 300px; /* Ensure it doesn’t get too small */
  max-height: 90vh; /* Prevents overflow */
  overflow: auto; /* Enables scrolling if text overflows */
  opacity: 0;
  transform: translate(-50%, -50%); /* Start slightly below */
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.expanded-card-content.visible {
  opacity: 1;
  transform: translate(-50%, -50%); /* Move to center */
}

.button-container {
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  margin: 10px;
  background: #ff4a4a;
  color: white;
  border: none;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #ff2222;
}

/* Registration Modal Styles */
.registration-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
}

.registration-form {
  background: rgba(0, 0, 0, 0.9);
  padding: 20px;
  border-radius: 10px;
  color: white;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.registration-form h3 {
  margin-bottom: 20px;
}

.registration-form label {
  display: block;
  margin-bottom: 5px;
}

.registration-form input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.registration-form input::placeholder {
  color: #ccc;
}

.form-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
}

.form-buttons button {
  background: #00ff99;
  color: black;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.form-buttons button:hover {
  background: #00cc77;
}
`;

document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);