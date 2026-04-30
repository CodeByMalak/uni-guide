const mongoose = require('mongoose');
const User = require('../models/User');
const University = require('../models/University');

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// ✅ Get favorites
const getFavorites = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const user = await User.findById(req.user.id).populate('favorites');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      count: user.favorites.length,
      favorites: user.favorites,
    });

  } catch (error) {
    console.error('[getFavorites]', error.message);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Add favorite
const addFavorite = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const universityId = req.params.id;

    if (!isValidId(universityId)) {
      return res.status(400).json({ message: 'Invalid university ID' });
    }

    const university = await University.findById(universityId);
    if (!university) {
      return res.status(404).json({ message: 'University not found' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const alreadySaved = user.favorites.some(
      (id) => id.toString() === universityId
    );

    if (alreadySaved) {
      return res.status(400).json({ message: 'Already in favorites' });
    }

    user.favorites.push(universityId);
    await user.save();

    res.status(200).json({
      message: 'Added to favorites',
      count: user.favorites.length,
    });

  } catch (error) {
    console.error('[addFavorite]', error.message);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Remove favorite
const removeFavorite = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const universityId = req.params.id;

    if (!isValidId(universityId)) {
      return res.status(400).json({ message: 'Invalid university ID' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.favorites = user.favorites.filter(
      (id) => id.toString() !== universityId
    );

    await user.save();

    res.status(200).json({
      message: 'Removed from favorites',
      count: user.favorites.length,
    });

  } catch (error) {
    console.error('[removeFavorite]', error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
};