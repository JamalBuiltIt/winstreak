import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import "./Dashboard.css";
import UploadModal from "./UploadModal";

const db = getFirestore();

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [posts, setPosts] = useState([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedRating = localStorage.getItem("userRating");
    if (savedRating) {
      setRating(parseInt(savedRating, 10));
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setName(userDoc.data().name);
        }

        const postsQuery = query(
          collection(db, "posts"),
          where("userId", "==", currentUser.uid)
        );
        const postsSnapshot = await getDocs(postsQuery);
        const userPosts = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(userPosts);
      } else {
        setName("");
        setPosts([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDeletePost = async (postId) => {
    if (user) {
      try {
        const postDocRef = doc(db, "posts", postId);
        await deleteDoc(postDocRef);
        setPosts(posts.filter((post) => post.id !== postId));
        alert("Post deleted successfully!");
      } catch (error) {
        console.error("Error deleting post:", error.message);
      }
    } else {
      alert("You need to be logged in to delete a post.");
    }
  };

  const handleStarClick = (starValue) => {
    setRating(starValue);
    localStorage.setItem("userRating", starValue);
  };

  const handleStarHover = (starValue) => {
    setHoverRating(starValue);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      {user ? (
        <>
          <p>
            Welcome, {name || "User"}{" "}
            <span className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${
                    star <= (hoverRating || rating) ? "selected" : ""
                  }`}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  onMouseLeave={handleStarLeave}
                >
                  ★
                </span>
              ))}
            </span>
          </p>
          <div className="timeline-container">
            {posts.length === 0 ? (
              <p>There are no video posts from this user.</p>
            ) : (
              <div className="video-post-list">
                {posts.map((post, index) => (
                  <div key={index} className="video-post-item">
                    <video controls className="video-player">
                      <source src={post.videoURL} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="delete-post-wrapper">
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="delete-post-button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => setShowModal(true)} className="add-post-button">
              Add Video Post
            </button>
          </div>
        </>
      ) : (
        <p>You are not logged in.</p>
      )}

      {showModal && <UploadModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Dashboard;
