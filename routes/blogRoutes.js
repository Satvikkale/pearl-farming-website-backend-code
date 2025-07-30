const express = require("express");
const Blog = require("../models/Blog");

const router = express.Router();

// Add a new blog post
router.post("/add-blog", async (req, res) => {
  const { title, content } = req.body;

  try {
    const blog = new Blog({ title, content });
    await blog.save();
    res.status(201).json({ message: "Blog added successfully", blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add blog" });
  }
});

// Get all blog posts
router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve blogs" });
  }
});

module.exports = router;
