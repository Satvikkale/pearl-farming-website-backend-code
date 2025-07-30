const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Add a new product
router.post("/add-product", async (req, res) => {
  const { category, image, description, price } = req.body;

  try {
    // Check if the image size exceeds 1MB
    const imageSizeInBytes = Buffer.from(image.split(",")[1], "base64").length;
    const maxSizeInBytes = 1 * 1024 * 1024; // 1MB
    if (imageSizeInBytes > maxSizeInBytes) {
      return res.status(400).json({ message: "Image size exceeds 1MB limit" });
    }

    const product = new Product({ category, image, description, price });
    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add product" });
  }
});

// Get all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve products" });
  }
});

module.exports = router;
