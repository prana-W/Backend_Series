const express = require('express');
const router = express.Router();
const URL = require('../models/url.model');

router.get('/', async (req, res) => {
    const allUrls = await URL.find({})
    return res.render('home.ejs', {
        allUrls
    })
})


module.exports = router;