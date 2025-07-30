const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "5mb" })); // Increase payload size limit to 5MB
app.use(express.urlencoded({ limit: "5mb", extended: true })); // Increase URL-encoded payload size limit

// Serve static files for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pearl_website';
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes'); // Import product routes
const galleryRoutes = require('./routes/galleryRoutes'); // Import gallery routes
const testimonialRoutes = require('./routes/testimonialRoutes'); // Import testimonial routes
const trainingRoutes = require('./routes/trainingRoutes'); // Import training routes
const blogRoutes = require('./routes/blogRoutes'); // Import blog routes
const contactRoutes = require('./routes/contactRoutes'); // Import contact routes
const faqRoutes = require('./routes/faqRoutes'); // Import FAQ routes
app.use('/api', authRoutes);
app.use('/api', productRoutes); // Use product routes
app.use('/api', galleryRoutes); // Use gallery routes
app.use('/api', testimonialRoutes); // Use testimonial routes
app.use('/api', trainingRoutes); // Use training routes
app.use('/api', blogRoutes); // Use blog routes
app.use('/api', contactRoutes); // Use contact routes
app.use('/api', faqRoutes); // Use FAQ routes

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});