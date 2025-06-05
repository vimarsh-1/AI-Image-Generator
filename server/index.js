const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const mongoose = require("mongoose");
const Image = require("./models/Image");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/ai_image_gen", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Route to generate image
app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim().length < 5) {
    return res.status(400).json({ error: "Prompt is too short or missing." });
  }

  try {
    const response = await axios.post(
      "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
      {
        text_prompts: [{ text: prompt }],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        samples: 1,
        steps: 30,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const base64Image = response.data.artifacts[0].base64;
    const fullImage = `data:image/png;base64,${base64Image}`;

    // Save to MongoDB
    await Image.create({
      prompt,
      image: fullImage,
    });

    res.json({ image: fullImage });
  } catch (err) {
    console.error("Image generation error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate image." });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
