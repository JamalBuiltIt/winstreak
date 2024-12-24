import React, { useState } from "react";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import "./UploadModal.css";

const db = getFirestore();

const UploadModal = ({ onClose }) => {
  const [file, setFile] = useState(null);

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a video file.");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const videoURL = reader.result;
        await addDoc(collection(db, "posts"), {
          videoURL,
          createdAt: new Date(),
        });
        alert("Video uploaded successfully!");
        onClose();
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading video:", error.message);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h3>Upload Video</h3>
        <div className="file-input-wrapper">
          <input
            id= "input-field"
            type="file"
            accept="video/mp4"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="button-group">
          <button onClick={handleFileUpload}>Upload</button>
          <button onClick={onClose} className="close-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
