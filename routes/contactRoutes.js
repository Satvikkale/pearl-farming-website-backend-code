const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

// Contact form endpoint
router.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "satvikale07@gmail.com", // Admin email
        pass: "Satvikkale@143", // Admin email password
      },
    });

    // Email content
    const mailOptions = {
      from: email,
      to: "satvikale07@gmail.com", // Send to admin email
      subject: "New Contact Form Submission",
      text: `You have received a new message from the contact form:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Failed to send email", error);
    res.status(500).json({ message: "Failed to send message. Please try again later." });
  }
});

module.exports = router;
