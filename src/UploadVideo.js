import React from "react";
import "./UploadVideo.css";

const UploadVideo = ({ onVideoUpload }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const videoURLs = files.map((file) => URL.createObjectURL(file));
    onVideoUpload(videoURLs);
  };

  return (
    <div className="upload-video">
      <label htmlFor="video-upload" className="upload-label">
        Upload Videos
      </label>
      <input
        type="file"
        id="video-upload"
        multiple
        accept="video/*"
        onChange={handleFileChange}
        className="file-input"
      />
    </div>
  );
};

export default UploadVideo;
