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
            throw new Error('Redirect URL is not provided');
        }
        await URL.create({
            shortId, redirectUrl: req.body.redirectUrl, visitHistory: []
        })

        //! We send the response as a rendered EJS page
        return res.status(200).render('home.ejs', {
            shortId: shortId,
            req: req
        })

    } catch (error) {
        return res.status(400).render('home.ejs', {
            errMess: `Error while generating short URL. Error: ${error}`
        });
    }
}

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