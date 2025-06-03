const express = require('express');
const router = express.Router();
const {
    handleUserDefinedUrls, handleLoginUser, handleSignupUser, handleAdminUrls
} = require('../controllers/static.controller')
const {restrictedTo} = require("../middlewares/auth.middleware");

//! Adding a inline middleware to check for authentication and authorization
router.get('/', restrictedTo(["NORMAL", "ADMIN"]), handleUserDefinedUrls)
router.get('/user/signup', handleSignupUser)
router.get('/user/login', handleLoginUser)

//! Adding a admin specific route
// Adding inline middleware to check for admin authorization
router.get('/admin/urls', restrictedTo(["ADMIN"]), handleAdminUrls)

module.exports = router;