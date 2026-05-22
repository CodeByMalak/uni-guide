const University = require('../models/University');

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/stats
 * @access  Public
 */
const getStats = async (req, res) => {
  try {
    const totalUniversities = await University.countDocuments();
    const publicUniversities = await University.countDocuments({ type: 'Public' });
    const privateUniversities = await University.countDocuments({ type: 'Private' });
    
    // Calculate total programs (sum of programs array length)
    const universities = await University.find({}, 'programs');
    const totalPrograms = universities.reduce((acc, uni) => acc + (uni.programs ? uni.programs.length : 0), 0);

    res.status(200).json({
      success: true,
      stats: {
        totalUniversities,
        publicUniversities,
        privateUniversities,
        totalPrograms,
      },
    });
  } catch (error) {
    console.error('[getStats Error]:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch statistics' });
  }
};

module.exports = { getStats };
