const express = require("express");
const Testimonial = require("../models/Testimonial");

const router = express.Router();

// Add a new testimonial
router.post("/add-testimonial", async (req, res) => {
  const { name, role, feedback, image } = req.body;

  try {
    // Check if the image size exceeds 1MB
    const imageSizeInBytes = Buffer.from(image.split(",")[1], "base64").length;
    const maxSizeInBytes = 1 * 1024 * 1024; // 1MB
    if (imageSizeInBytes > maxSizeInBytes) {
      return res.status(400).json({ message: "Image size exceeds 1MB limit" });
    }

    const testimonial = new Testimonial({ name, role, feedback, image });
    await testimonial.save();
    res.status(201).json({ message: "Testimonial added successfully", testimonial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add testimonial" });
  }
});

// Get all testimonials
router.get("/testimonials", async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json(testimonials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve testimonials" });
  }
});

module.exports = router;
