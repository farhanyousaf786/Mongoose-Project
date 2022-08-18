var express = require('express');
var router = express.Router();
const isLoggedIn = require('../config/auth')



const mobileController = require('../controllers/mobiles');


router.get('/addDevice', isLoggedIn, mobileController.addDevice);

router.post('/', isLoggedIn, mobileController.create);

router.get('/', mobileController.index);

router.get('/:id', mobileController.mobileDetials);

router.delete('/:id', isLoggedIn, mobileController.deleteDevice);

router.put('/:id', isLoggedIn, mobileController.edit);


module.exports = router;
