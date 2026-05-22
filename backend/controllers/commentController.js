const Comment = require('../models/Comment');
const University = require('../models/University');

/**
 * @desc    Add comment to university
 * @route   POST /api/comments/:universityId
 * @access  Private
 */
const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { universityId } = req.params;

    if (!text) {
      return res.status(400).json({ success: false, message: 'Comment text is required' });
    }

    const university = await University.findById(universityId);
    if (!university) {
      return res.status(404).json({ success: false, message: 'University not found' });
    }

    const comment = await Comment.create({
      user: req.user.id,
      userName: req.user.name,
      university: universityId,
      text,
    });

    res.status(201).json({ success: true, comment });
  } catch (error) {
    console.error('[addComment Error]:', error.message);
    res.status(500).json({ success: false, message: 'Failed to add comment' });
  }
};

/**
 * @desc    Delete comment
 * @route   DELETE /api/comments/:id
 * @access  Private
 */
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    // Check ownership
    if (comment.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    await comment.deleteOne();

    res.status(200).json({ success: true, message: 'Comment deleted' });
  } catch (error) {
    console.error('[deleteComment Error]:', error.message);
    res.status(500).json({ success: false, message: 'Failed to delete comment' });
  }
};

/**
 * @desc    Get comments for a university
 * @route   GET /api/comments/:universityId
 * @access  Public
 */
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ university: req.params.universityId })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error('[getComments Error]:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch comments' });
  }
};

module.exports = {
  addComment,
  deleteComment,
  getComments,
};
