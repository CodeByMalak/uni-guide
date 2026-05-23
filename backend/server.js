require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const University = require('./models/University');
const universitiesData = require('./data/universities');

const app = express();

// 🔹 CORS — allow configured origins (local dev + production frontend)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean); // remove undefined/empty values

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. curl, Postman, same-origin)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: Origin ${origin} not allowed`));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 🔹 Health check endpoint (used by frontend to verify connection)
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is healthy ✅' });
});

// 🔹 Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/universities', require('./routes/universityRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));

// 🔹 Root route
app.get('/', (req, res) => {
  res.send('UniSelection Backend API is running ✅');
});

// 🔹 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// 🔹 Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// 🔹 Connect to MongoDB, auto-seed if empty, then start server
const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  // Auto-seed if database is empty
  try {
    const count = await University.countDocuments();
    if (count === 0) {
      console.log('⚠️  Database is empty. Auto-seeding universities...');
      await University.insertMany(universitiesData);
      console.log('✅ Auto-seeding complete!');
    } else {
      console.log(`✅ Database already has ${count} universities.`);
    }
  } catch (err) {
    console.error('❌ Auto-seeding failed:', err.message);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}).catch((err) => {
  console.error('❌ Failed to connect to MongoDB:', err.message);
  process.exit(1);
});