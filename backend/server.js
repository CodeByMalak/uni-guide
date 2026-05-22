require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const University = require('./models/University');
const universitiesData = require('./data/universities');

// 🔹 Connect to MongoDB
connectDB().then(async () => {
  // Auto-seed if database is empty
  try {
    const count = await University.countDocuments();
    if (count === 0) {
      console.log('⚠️ Database is empty. Auto-seeding 50+ KPK universities...');
      await University.insertMany(universitiesData);
      console.log('✅ Auto-seeding complete!');
    } else {
      console.log(`✅ Database already has ${count} universities.`);
    }
  } catch (err) {
    console.error('❌ Auto-seeding failed:', err.message);
  }
});

const app = express();

// 🔹 Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 🔹 Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/universities', require('./routes/universityRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));

// 🔹 Root route
app.get('/', (req, res) => {
  res.send('UniSelector Backend API is running ✅');
});

// 🔹 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// 🔹 Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// 🔹 Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});