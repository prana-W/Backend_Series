const express = require('express');
const router = express.Router();
const {
    handleUserDefinedUrls, handleLoginUser, handleSignupUser
} = require('../controllers/static.controller')

router.get('/', handleUserDefinedUrls)
router.get('/user/signup', handleSignupUser)
router.get('/user/login', handleLoginUser)


module.exports = router;