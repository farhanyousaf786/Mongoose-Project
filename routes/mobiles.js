var express = require('express');
var router = express.Router();


const mobileController = require('../controllers/mobiles');
router.get('/', mobileController.index);
module.exports = router;
