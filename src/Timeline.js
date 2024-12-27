import React, { useState } from "react";
import './Timeline.css';

const Timeline = () => {
  const [posts, setPosts] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState("");

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const newPost = { videoUrl, description, hashtags };
    setPosts([...posts, newPost]);
    setVideoUrl("");
    setDescription("");
    setHashtags("");
  };

  return (
    <div className="timeline-container">
      {/* Post input area */}
      <form className="post-form" onSubmit={handlePostSubmit}>
        <input
          type="text"
          placeholder="Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
        />
        <textarea
          placeholder="Write a description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Hashtags"
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>

      {/* Timeline (horizontal scroll) */}
      <div className="timeline">
        {posts.map((post, index) => (
          <div key={index} className="post">
            <video className="post-video" controls>
              <source src={post.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="post-info">
              <p>{post.description}</p>
              <p>{post.hashtags}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
