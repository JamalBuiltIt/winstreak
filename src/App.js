import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase"; // Import auth
import Login from "./Login";
import SignUp from "./Signup";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  // Set up listener for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar user={user} /> {/* Pass the user state to Navbar */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
