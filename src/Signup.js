import React, { useState } from "react";
import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import './firebase.js'

const db = getFirestore(); // Initialize Firestore

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: email,
        name: name,
        position: position,
        createdAt: new Date().toISOString(),
      });

      // Redirect to dashboard after successful signup
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during sign-up:", error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="PSN/Xbox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
        <button type="submit" className = 'btn'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
