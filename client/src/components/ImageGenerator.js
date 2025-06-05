import React, { useState } from "react";
import axios from "axios";

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
      <input
        type="text"
        placeholder="Describe an image..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={generateImage} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>

      {image && (
        <>
          <img src={image} alt="AI Result" className="output" />
          <a href={image} download="generated-image.png">
            <button>Download Image</button>
          </a>
        </>
      )}
    </div>
  );
};

export default ImageGenerator;
