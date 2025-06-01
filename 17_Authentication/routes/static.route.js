const express = require('express');
const router = express.Router();
const URL = require('../models/url.model');

router.get('/', async (req, res) => {
    const allUrls = await URL.find({})
    return res.render('home.ejs', {
        allUrls
    })
})

router.get('/user/signup', (req, res) => {
    return res.render('signup.ejs')
})

router.get('/user/login', (req, res) => {
    return res.render('login.ejs')
})



module.exports = router;