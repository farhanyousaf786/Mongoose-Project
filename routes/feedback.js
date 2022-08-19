const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/auth')
const feedbackController = require('../controllers/feedback');

// routes for feedback page
// route to create feedback
router.post('/:id/feedback', feedbackController.create);
// route to delete feedback
router.delete('/feedback/:id', isLoggedIn, feedbackController.delete);

module.exports = router;