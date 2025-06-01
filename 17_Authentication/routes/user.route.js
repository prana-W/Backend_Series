const express = require('express');
const router = express.Router();
const { handleUserSignup, handleUserLogin, handleSignupPage } = require('../controllers/user.controller');

// Route for Singup
router.post('/signup', handleUserSignup)

// Route for Login
router.post('/login', handleUserLogin)

module.exports = router;