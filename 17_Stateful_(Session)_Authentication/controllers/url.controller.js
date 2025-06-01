// Below is used to setup nanoid
const {customAlphabet} = require('nanoid');
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; // available characters for nanoid
const nanoid = customAlphabet(alphabet, 9); // Length of nanoid (more results in less chance of duplicates)

const URL = require('../models/url.model');

// Returns all url made by the logged-in user in /url route
const handleGetRequest = async (req, res) => {
    try {
        const allData = await URL.find({createdBy: req?.user?._id}); // Fetching all the URLs created by the user
        res.send(allData);
    } catch (err) {
        res.status(500).send({error: err});
    }
}

// Creates a URL at /url POST (takes redirectURL from form)
const handleGenerateShortUrl = async (req, res) => {

    try {
        const shortId = nanoid(8);
        if (!req.body.redirectUrl) {
            throw new Error('Redirect URL is not provided');
        }
        await URL.create({
            shortId, redirectUrl: req.body.redirectUrl, visitHistory: [], createdBy: req?.user?._id // req.user is set by auth.middleware
        })

        // If successful, re-render home.ejs and pass shortId
        return res.status(200).render('home.ejs', {
            shortId: shortId
        })

    } catch (error) {
        return res.status(400).render('home.ejs', {
            errMess: `Error while generating short URL. Error: ${error}`
        });
    }
}

// When shortURL is visited, first add history in URL and then redirect user to original ur;
const handleRedirect = async (req, res) => {
    try {
        const id = await req.params.id;

        //! See how we have pushed data
        const urlData = await URL.findOneAndUpdate({shortId: id}, {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        });
        res.redirect(urlData.redirectUrl) //redirecting to the original url
    } catch (err) {
        res.status(500).send({status: 'fail', message: 'Error while redirecting to URL', error: err});
    }
}

// Handle GET request in /analytics. Returns all analytics of url made by logged user
const handleAnalytics = async (req, res) => {
    try {

        const userDefinedData = await URL.find({createdBy: req?.user?._id}); // user object is passed in auth.middleware.js

        const analyticsData = await userDefinedData.map((data) => {
            return ({
                shortUrl: `http://localhost:8001/url/${data.shortId}`,
                redirectUrl: data.redirectUrl,
                total_clicks: data.visitHistory.length,
                last_time_visited: new Date(data.visitHistory[data.visitHistory.length - 1]?.timestamp).toLocaleTimeString()
            })
        })

        res.json(analyticsData);

    } catch (err) {
        console.log(err)
        res.status(500).json({error: err});
    }
}

module.exports = {handleGetRequest, handleGenerateShortUrl, handleRedirect, handleAnalytics}