const URL = require("../models/url.model");

// Render home at /
const handleUserDefinedUrls = async (req, res) => {
    const userDefinedUrls = await URL.find({createdBy: req?.user?._id});
    return res.render('home.ejs', {
        userDefinedUrls
    })
}

const handleLoginUser = (req, res) => {
    return res.render('login.ejs')
}

const handleSignupUser = (req, res) => {
    return res.render('signup.ejs')
}

// This passes all the urls in the home.ejs
const handleAdminUrls = async (req, res) => {
    const allUrls = await URL.find({});
    return res.render('home.ejs', {
        userDefinedUrls: allUrls
    })
}
module.exports = {
    handleUserDefinedUrls,
    handleLoginUser,
    handleSignupUser,
    handleAdminUrls
}