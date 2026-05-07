const express = require('express');
const router = express.Router();
const {
  scrapeAndStore,
  getUniversities,
  getUniversityById,
  addUniversity,
  addComment,
} = require('../controllers/universityController');
const { protect } = require('../middleware/authMiddleware');

// GET /api/universities/scrape  → scrape web + save to MongoDB
router.get('/scrape', scrapeAndStore);

// GET /api/universities          → list all (optional ?search= & ?city=)
router.get('/', getUniversities);

// GET /api/universities/:id      → single university
router.get('/:id', getUniversityById);

// POST /api/universities         → manually add a university
router.post('/', addUniversity);

// POST /api/universities/:id/comment → add a comment
router.post('/:id/comment', protect, addComment);

module.exports = router;
