const express = require('express');
const router = express.Router();

const user = require('../controller/user')

router.post('/send-otp',user.sendOtp)

module.exports = router