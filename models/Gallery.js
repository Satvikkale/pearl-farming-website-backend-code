const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  image: {
    type: String, // Store image as Base64 string
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Gallery", gallerySchema);
