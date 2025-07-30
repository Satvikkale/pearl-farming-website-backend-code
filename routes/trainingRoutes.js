const express = require("express");
const nodemailer = require("nodemailer");
const Training = require("../models/Training");

const router = express.Router();

// Add a new training or workshop
router.post("/add-training", async (req, res) => {
  const { title, date, location, fee, description } = req.body;

  try {
    const training = new Training({ title, date, location, fee, description });
    await training.save();
    res.status(201).json({ message: "Training added successfully", training });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add training" });
  }
});

// Get all trainings and workshops
router.get("/trainings", async (req, res) => {
  try {
    const trainings = await Training.find();
    res.status(200).json(trainings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve trainings" });
  }
});

// Register for a course
router.post("/register-course", async (req, res) => {
  const { name, email, course } = req.body;

  try {
    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL, // Admin email
        pass: process.env.ADMIN_EMAIL_PASSWORD, // Admin email password
      },
    });

    // Email content for the admin
    const adminMailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "New Course Registration",
      text: `A new user has registered for the course.\n\nName: ${name}\nEmail: ${email}\nCourse: ${course}`,
    };

    // Email content for the user
    const userMailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: "Course Registration Confirmation",
      text: `Thank you for registering for the course "${course}".\n\nWe will contact you soon with more details.`,
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(200).json({ message: "Registration successful and emails sent" });
  } catch (error) {
    console.error("Failed to send emails", error);
    res.status(500).json({ message: "Failed to register for the course" });
  }
});

module.exports = router;
