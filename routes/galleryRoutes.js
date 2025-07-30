const express = require("express");
const Gallery = require("../models/Gallery");

const router = express.Router();

// Add a new image to the gallery
router.post("/add-image", async (req, res) => {
  const { image } = req.body;

  try {
    // Check if the image size exceeds 1MB
    const imageSizeInBytes = Buffer.from(image.split(",")[1], "base64").length;
    const maxSizeInBytes = 1 * 1024 * 1024; // 1MB
    if (imageSizeInBytes > maxSizeInBytes) {
      return res.status(400).json({ message: "Image size exceeds 1MB limit" });
    }

    const galleryImage = new Gallery({ image });
    await galleryImage.save();
    res.status(201).json({ message: "Image added successfully", galleryImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add image" });
  }
});

// Get all gallery images
router.get("/gallery", async (req, res) => {
  try {
    const images = await Gallery.find();
    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve images" });
  }
});

module.exports = router;
