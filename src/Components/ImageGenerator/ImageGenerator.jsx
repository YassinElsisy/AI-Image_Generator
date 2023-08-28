import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import defaultImage from "../Assets/default_image.svg";

const apiKey = process.env.REACT_APP_API_KEY;

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState("/");
  const [loading, setLoading] = useState(false);
  let inputReference = useRef(null);

  const imageGenerator = async () => {
    if (inputReference.current.value === "") {
      return 0;
    }
    setLoading(true);
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + apiKey,
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputReference.current.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );
    let data = await response.json();
    let data_array = data.data;
    setImage_url(data_array[0].url);
    setLoading(false);
  };

  return (
    <div className="ai-image-container">
      <div className="header">
        AI Image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img
            src={image_url === "/" ? defaultImage : image_url}
            alt="generated-img"
          />
        </div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : "display-none"}>
            Generating image...
          </div>
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          ref={inputReference}
          className="search-input"
          placeholder="Describe what you would like to see..."
        />
        <button
          className="generate-btn"
          onClick={() => {
            imageGenerator();
          }}
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default ImageGenerator;
