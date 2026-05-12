const University = require('../models/University');
const scrapeUniversities = require('../scraper/universityScraper');

// ✅ Scrape
const scrapeAndStore = async (req, res) => {
  try {
    const saved = await scrapeUniversities();

    if (!saved || saved.length === 0) {
      return res.status(404).json({ message: 'No data fetched' });
    }

    const scraped = saved.filter(u => u.source === 'scraped').length;
    const fallback = saved.filter(u => u.source === 'fallback').length;

    res.status(200).json({
      message: 'Scraping complete',
      total: saved.length,
      scraped,
      fallback,
    });

  } catch (error) {
    console.error('[scrapeAndStore]', error.message);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all
const getUniversities = async (req, res) => {
  try {
    const { search, city, program, type } = req.query;
    const filters = [];

    if (search) {
      const regex = { $regex: search, $options: 'i' };
      filters.push({ $or: [{ name: regex }, { city: regex }] });
    }

    if (city) {
      filters.push({ city: { $regex: city, $options: 'i' } });
    }

    if (program) {
      filters.push({ programs: { $regex: program, $options: 'i' } });
    }

    if (type) {
      filters.push({ type: type });
    }

    const query = filters.length ? { $and: filters } : {};

    const universities = await University.find(query);

    res.status(200).json({
      count: universities.length,
      universities,
    });

  } catch (error) {
    console.error('[getUniversities]', error.message);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get by ID
const getUniversityById = async (req, res) => {
  try {
    const uni = await University.findById(req.params.id);

    if (!uni) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json(uni);

  } catch (error) {
    console.error('[getUniversityById]', error.message);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Add
const addUniversity = async (req, res) => {
  try {
    const uni = await University.create(req.body);
    res.status(201).json(uni);

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Duplicate university' });
    }

    res.status(400).json({ message: error.message });
  }
};

// ✅ Add Comment
const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const uni = await University.findById(req.params.id);

    if (!uni) {
      return res.status(404).json({ message: 'University not found' });
    }

    const newComment = {
      user: req.user.id,
      userName: req.user.name,
      text,
    };

    uni.comments.push(newComment);
    await uni.save();

    res.status(201).json(uni.comments);

  } catch (error) {
    console.error('[addComment]', error.message);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Comment
const deleteComment = async (req, res) => {
  try {
    const uni = await University.findById(req.params.id);
    if (!uni) return res.status(404).json({ message: 'University not found' });

    const comment = uni.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    // Only the comment author can delete
    if (comment.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    comment.deleteOne();
    await uni.save();

    res.status(200).json({ message: 'Comment deleted', comments: uni.comments });
  } catch (error) {
    console.error('[deleteComment]', error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  scrapeAndStore,
  getUniversities,
  getUniversityById,
  addUniversity,
  addComment,
  deleteComment,
};