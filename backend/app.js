require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const categorieRoutes = require('./routes/categorieRoutes');
const recetteRoutes = require('./routes/recetteRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/categories', categorieRoutes);
app.use('/api/recettes', recetteRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
