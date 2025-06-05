// server/models/Image.js
const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  image: { type: String }, // base64 (optional, or store image URL)
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Image", ImageSchema);
