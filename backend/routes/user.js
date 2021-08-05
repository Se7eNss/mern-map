const express = require('express');
const router = express.Router();

const {registerUser,userLogin,logout} = require('../controller/userController');
const { route } = require('./pin');

router.route('/register').post(registerUser)
router.route('/login').post(userLogin)
router.route('/logout').get(logout)

module.exports = router