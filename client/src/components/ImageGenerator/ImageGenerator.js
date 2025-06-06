import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ImageGenerator.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import rightarrow from "../../Assets/rightarrow.png";
import AOS from "aos";
import "aos/dist/aos.css";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastUsedPrompt, setLastUsedPrompt] = useState("");

  const generateImage = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setImage(null);

    try {
      const res = await axios.post("http://localhost:5000/generate", {
        prompt,
      });
      setImage(res.data.image);
      setLastUsedPrompt(prompt);
    } catch (err) {
      alert("Error generating image");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  });

  return (
    <div className="parentdivImgGenerator">
      <div className="parentinsiderdiv">
        <div className="firstframe">
          <h1
            className="headingAIpage"
            data-aos="fade-down-right"
            data-aos-delay={600}
          >
            ⚛ Generate image with prompt
          </h1>
          <h3
            className="heading2AIpage"
            data-aos="fade-down-right"
            data-aos-delay={700}
          >
            Write your prompt according to the image you want to gererate!
          </h3>
          <input
            type="text"
            placeholder=" ⚡Create magic by your words...."
            value={prompt}
            className="inputboxai"
            disabled={loading}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="imggeneratebtn">
            <Button
              className="navbarbtn"
              onClick={generateImage}
              disabled={loading || !prompt.trim() || prompt === lastUsedPrompt}
              variant="dark"
            >
              {loading ? "Generating..." : "Generate"}
              <img className="btnarrowimg" src={rightarrow} alt="" />
            </Button>
          </div>
        </div>
        <div style={{ padding: "30px" }}>
          <div className="image-container">
            {!image && (
              <h1
                className="headingAIpage1"
                data-aos="zoom-in"
                data-aos-delay={600}
              >
                {loading
                  ? "⏳ AI is Generating your image currently..."
                  : "⚛ Your generated image will appear here"}
              </h1>
            )}
            {image && (
              <>
                <img src={image} alt="AI Result" className="output" />
                <a
                  href={image}
                  style={{ textDecoration: "none" }}
                  download="AIgenerated-image.png"
                >
                  <Button
                    className="navbarbtn"
                    data-aos="zoom-in"
                    data-aos-delay={600}
                    variant="dark"
                  >
                    Download Image 📂
                  </Button>
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
