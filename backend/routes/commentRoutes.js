const express = require('express');
const router = express.Router();
const { addComment, deleteComment, getComments } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:universityId', getComments);
router.post('/:universityId', protect, addComment);
router.delete('/:id', protect, deleteComment);

module.exports = router;
