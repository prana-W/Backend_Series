const express = require('express');
const router = express.Router();
const {handleGetRequest, handleGenerateShortUrl, handleRedirect} = require('../controllers/url.controller');

router.route('/')
    .get(handleGetRequest)
    .post(handleGenerateShortUrl)

router.get('/:id', handleRedirect)

module.exports = router;