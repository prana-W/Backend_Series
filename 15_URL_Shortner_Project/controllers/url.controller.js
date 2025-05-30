const { customAlphabet } = require('nanoid');
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 9);

const URL = require('../models/url.model');

const handleGetRequest = async (req, res) => {
    try {
        const allData = await URL.find({});
        res.send(allData);
    } catch (err) {
        res.status(500).send({error: err});
    }
}
const handleGenerateShortUrl = async (req, res) => {

    try {
        const shortId = nanoid(8);
        if (!req.body.redirectUrl) {
            //! throwing the error in catch block will custom error message
            throw new Error('Redirect URL is not provided');
        }
        await URL.create({
            shortId, redirectUrl: req.body.redirectUrl, visitHistory: []
        })

        return res.status(200).json({status: 'success', shortId: shortId});

    } catch (error) {
        res.status(400).json({status: 'fail', message: 'Error while generating short URL', error: error.message});
    }
}

//! NOTE
// The below handler function firstly gets parameter from the url, which is our shortID. Then we find the URL document in the database having this shortId and also update visitHistory in the database by pushing the current timestamp into it. Finally, we fetch the redirectUrl from the DB and redirect the user to that URL.

const handleRedirect = async (req, res) => {
    try {
        const id = await req.params.id;
        const urlData = await URL.findOneAndUpdate({shortId: id}, {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        });
        res.redirect(urlData.redirectUrl)
    } catch (err) {
        res.status(500).send({status: 'fail', message: 'Error while redirecting to URL', error: err});
    }
}

const handleAnalytics = async (req, res) => {
    try {

        const allData = await URL.find({});

        const analyticsData = await allData.map((data) => {
            return ({
                shortUrl: `http://localhost:8001/url/${data.shortId}`,
                redirectUrl: data.redirectUrl,
                total_clicks: data.visitHistory.length,
                last_time_visited: new Date(data.visitHistory[data.visitHistory.length - 1].timestamp).toLocaleTimeString()
            })
        })

        res.json(analyticsData);

    }
    catch (err) {
res.status(500).send({error: err});
    }
}

module.exports = {handleGetRequest, handleGenerateShortUrl, handleRedirect, handleAnalytics}