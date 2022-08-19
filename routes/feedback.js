const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/auth')


const feedbackController = require('../controllers/feedback');

router.post('/:id/feedback', feedbackController.create);

router.delete('/feedback/:id', isLoggedIn, feedbackController.delete);


module.exports = router;