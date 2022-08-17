const express = require('express');
const router = express.Router();

const feedbackController = require('../controllers/feedback');

router.post('/mobiles/:id/feedback', feedbackController.create);

module.exports = router;