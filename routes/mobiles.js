var express = require('express');
var router = express.Router();
const isLoggedIn = require('../config/auth')
const mobileController = require('../controllers/mobiles');


// route to go to add device
router.get('/addDevice', isLoggedIn, mobileController.addDevice);
// route to create a new device in datbase
router.post('/', isLoggedIn, mobileController.create);
//route to go to index page
router.get('/', mobileController.index);
// route to show all detaisls of device
router.get('/:id', mobileController.mobileDetials);
// route to delete device
router.delete('/:id', isLoggedIn, mobileController.deleteDevice);
// route to edit device information
router.put('/:id', isLoggedIn, mobileController.edit);

module.exports = router;
