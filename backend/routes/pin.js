const express = require('express');
const {isAuthenticated} = require ('../middlewares/auth')
const router = express.Router();


const   Pin = require('../models/pin');
const {newPin,getAllPins} = require('../controller/pinController');


router.route('/pins').post(newPin);
router.route('/pins').get(getAllPins);


module.exports = router