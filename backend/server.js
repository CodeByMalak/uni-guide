require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const University = require('./models/University');
const universitiesData = require('./data/universities');

const app = express();

// ── CORS ────────────────────────────────────────────────────────────────────
const normalizeOrigin = (origin) => origin.replace(/\/$/, '');

const envOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URLS,
  process.env.CLIENT_URL,
]
  .filter(Boolean)
  .flatMap((origins) => origins.split(','))
  .map((origin) => normalizeOrigin(origin.trim()))
  .filter(Boolean);

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  ...envOrigins,
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server requests (no origin header, e.g. Postman, curl).
      if (!origin) return callback(null, true);

      const normalizedOrigin = normalizeOrigin(origin);

      if (allowedOrigins.includes(normalizedOrigin)) return callback(null, true);
      // Allow all Netlify preview/deploy URLs.
      if (normalizedOrigin.endsWith('.netlify.app')) return callback(null, true);
      // Allow all Vercel preview/production URLs.
      if (normalizedOrigin.endsWith('.vercel.app')) return callback(null, true);

      callback(new Error(`CORS: Origin ${origin} not allowed`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ── Body parsers ─────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };

  res.status(200).json({
    success: true,
    message: 'API is healthy',
    environment: process.env.NODE_ENV || 'development',
    database: dbStatus[dbState] || 'unknown',
    timestamp: new Date().toISOString(),
  });
});

// ── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth',         require('./routes/authRoutes'));
app.use('/api/universities', require('./routes/universityRoutes'));
app.use('/api/favorites',    require('./routes/favoriteRoutes'));
app.use('/api/comments',     require('./routes/commentRoutes'));
app.use('/api/stats',        require('./routes/statsRoutes'));

// ── Root ─────────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: 'UniSelection Backend API is running',
    version: '1.0.0',
    endpoints: [
      'GET  /api/health',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET  /api/auth/me',
      'PUT  /api/auth/profile',
      'GET  /api/universities',
      'GET  /api/universities/:id',
      'POST /api/universities',
      'GET  /api/favorites',
      'POST /api/favorites/:id',
      'DELETE /api/favorites/:id',
      'GET  /api/comments/:universityId',
      'POST /api/comments/:universityId',
      'DELETE /api/comments/:id',
      'GET  /api/stats',
    ],
  });
});

// ── 404 handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found` });
});

// ── Global error handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Unhandled Error:', err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
});

// ── Startup ───────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

connectDB()
  .then(async () => {
    // Auto-seed on first run
    try {
      const count = await University.countDocuments();
      if (count === 0) {
        console.log('📦 Database is empty — auto-seeding universities...');
        await University.insertMany(universitiesData);
        console.log(`✅ Auto-seeding complete: ${universitiesData.length} universities added.`);
      } else {
        console.log(`📊 Database already has ${count} universities.`);
      }
    } catch (err) {
      console.error('⚠️  Auto-seeding failed:', err.message);
    }
  })
  .catch((err) => {
    console.error('❌ Failed to start server — DB connection error:', err.message);
  });

// Only listen on a port if not running as a Vercel Serverless Function
if (!process.env.VERCEL) {
  const server = app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
    console.log(`   Health check: http://localhost:${PORT}/api/health\n`);
  });

  // ── Graceful shutdown ────────────────────────────────────────────────────
  // Handles SIGTERM (Render, Docker) and SIGINT (Ctrl+C locally).
  const shutdown = async (signal) => {
    console.log(`\n⏳ Received ${signal} — shutting down gracefully...`);
    server.close(async () => {
      try {
        await mongoose.connection.close();
        console.log('✅ MongoDB connection closed.');
      } catch (err) {
        console.error('⚠️  Error closing MongoDB:', err.message);
      }
      console.log('👋 Server shut down.');
      process.exit(0);
    });

    // Force-kill after 10 seconds if connections linger.
    setTimeout(() => {
      console.error('⚠️  Force-killing after 10s timeout.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT',  () => shutdown('SIGINT'));
}

// Export the app for Vercel Serverless
module.exports = app;
