require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// 🔹 Connect to MongoDB
connectDB();

const app = express();

// 🔹 Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 🔹 Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/universities', require('./routes/universityRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));

// 🔹 Root route (test)
app.get('/', (req, res) => {
  res.send('UniSelector Backend API is running ✅');
});

// 🔹 404 handler (NEW - important)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// 🔹 Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // log error

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// 🔹 Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ✅`);
});