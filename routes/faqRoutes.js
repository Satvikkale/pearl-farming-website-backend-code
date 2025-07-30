const express = require("express");
const FAQ = require("../models/FAQ");

const router = express.Router();

// Add a new FAQ
router.post("/add-faq", async (req, res) => {
  const { question } = req.body;

  try {
    const faq = new FAQ({ question });
    await faq.save();
    res.status(201).json({ message: "Question added successfully", faq });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add question" });
  }
});

// Get all FAQs
router.get("/faqs", async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ createdAt: -1 });
    res.status(200).json(faqs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve FAQs" });
  }
});

// Reply to a question
router.put("/reply-faq/:id", async (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;

  try {
    const faq = await FAQ.findByIdAndUpdate(id, { reply }, { new: true });
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    res.status(200).json({ message: "Reply added successfully", faq });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add reply" });
  }
});

module.exports = router;
