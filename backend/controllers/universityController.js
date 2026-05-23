const University = require('../models/University');
const scrapeUniversities = require('../scraper/universityScraper');

/**
 * @desc    Scrape and store universities
 * @route   GET /api/universities/scrape
 * @access  Public (Should be Admin in production)
 */
const scrapeAndStore = async (req, res) => {
  try {
    const saved = await scrapeUniversities();

    if (!saved || saved.length === 0) {
      return res.status(404).json({ success: false, message: 'No data fetched from scraper' });
    }

    const scraped = saved.filter(u => u.source === 'scraped').length;
    const fallback = saved.filter(u => u.source === 'fallback').length;

    res.status(200).json({
      success: true,
      message: 'Scraping complete',
      total: saved.length,
      scraped,
      fallback,
    });

  } catch (error) {
    console.error('[scrapeAndStore Error]:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error during scraping' });
  }
};

/**
 * @desc    Get all universities with filters and pagination
 * @route   GET /api/universities
 * @access  Public
 */
const getUniversities = async (req, res) => {
  try {
    const { search, city, program, type, page = 1, limit = 50 } = req.query;
    const filters = {};

    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } }
      ];
    }

    if (city) {
      filters.city = { $regex: city, $options: 'i' };
    }

    if (program) {
      filters['programs.name'] = { $regex: program, $options: 'i' };
    }

    if (type && type !== 'All') {
      filters.type = type;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const universities = await University.find(filters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await University.countDocuments(filters);

    res.status(200).json({
      success: true,
      count: universities.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      universities,
    });

  } catch (error) {
    console.error('[getUniversities Error]:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch universities' });
  }
};

/**
 * @desc    Get single university by ID
 * @route   GET /api/universities/:id
 * @access  Public
 */
const getUniversityById = async (req, res) => {
  try {
    const uni = await University.findById(req.params.id);

    if (!uni) {
      return res.status(404).json({ success: false, message: 'University not found' });
    }

    res.status(200).json({ success: true, university: uni });

  } catch (error) {
    console.error('[getUniversityById Error]:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/**
 * @desc    Add a university manually
 * @route   POST /api/universities
 * @access  Public (Should be Admin)
 */
const addUniversity = async (req, res) => {
  try {
    const uni = await University.create(req.body);
    res.status(201).json({ success: true, university: uni });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'University already exists' });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  scrapeAndStore,
  getUniversities,
  getUniversityById,
  addUniversity,
};