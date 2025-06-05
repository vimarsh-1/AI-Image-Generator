import React, { useState } from "react";
import axios from "axios";
import "./ImageGenerator.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import rightarrow from "../../Assets/rightarrow.png";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setImage(null);

    try {
      const res = await axios.post("http://localhost:5000/generate", {
        prompt,
      });
      setImage(res.data.image);
    } catch (err) {
      alert("Error generating image");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="generator">
      <div>
      <h1 style={{ color: "white" }}>Start making images by your words !</h1>
      <input
        type="text"
        placeholder="Create magic by your words...."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button
        className="navbarbtn"
        onClick={generateImage}
        disabled={loading}
        variant="dark"
      >
        {loading ? "Generating..." : "Generate"}
        <img className="btnarrowimg" src={rightarrow} alt="" />
      </Button>
      </div>
      {/* <Button onClick={generateImage} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </Button> */}
      <div className="image-container">
      {image && (
        <>
          <img src={image} alt="AI Result" className="output" />
          <a href={image} download="generated-image.png">
            <button>Download Image</button>
          </a>
        </>
      )}
      </div>
    </div>
  );
};

export default ImageGenerator;
