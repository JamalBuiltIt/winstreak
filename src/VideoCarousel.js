import React, { useState, useEffect } from "react";
import "./VideoCarousel.css";

const VideoCarousel = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
      }, 5000); // Change slide every 5 seconds
    }
    return () => clearInterval(timer);
  }, [isPlaying, videos.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="video-carousel">
      <video
        src={videos[currentIndex]}
        controls
        autoPlay
        loop
        className="carousel-video"
      ></video>
      <div className="controls">
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default VideoCarousel;
