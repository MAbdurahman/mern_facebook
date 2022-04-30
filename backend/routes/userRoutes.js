const express = require('express');
const { register } = require('./../controllers/authController')

//**************** variables ****************//
const router = express.Router();

//**************** auth routes ****************//
router.post('/register', register);

module.exports = router;
