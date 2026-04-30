const express = require('express');
const router = express.Router();

const {
  getFavorites,
  addFavorite,
  removeFavorite,
} = require('../controllers/favoriteController');

const { protect } = require('../middleware/authMiddleware');

// ✅ Get all favorites
router.get('/', protect, getFavorites);

// ✅ Add favorite
router.post('/:id', protect, addFavorite);

// ✅ Remove favorite
router.delete('/:id', protect, removeFavorite);

module.exports = router;