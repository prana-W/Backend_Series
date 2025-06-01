const express = require('express');
const router = express.Router();
const { handleUserSignup, handleUserLogin, handleSignupPage } = require('../controllers/user.controller');

router.post('/signup', handleUserSignup)
router.post('/login', handleUserLogin)

module.exports = router;