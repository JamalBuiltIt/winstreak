import React from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './Navbar.css';

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <nav className="navbar">
      <h1>Winstreak</h1>
      <div>
        {!user ? (
          <>
            <Link to="/">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <>
  <div className="container">
    <Link to="/dashboard" className="nav-link">Dashboard</Link>
    <button className="nav-button" onClick={handleLogout}>Logout</button>
  </div>
</>

        )}
      </div>
    </nav>
  );
};

export default Navbar;
