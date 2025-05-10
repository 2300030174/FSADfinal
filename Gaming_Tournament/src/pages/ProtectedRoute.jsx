import { Navigate } from "react-router-dom";

// ProtectedRoute component checks if the user is logged in
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // If logged in, return the children components; otherwise, redirect to the login page
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
