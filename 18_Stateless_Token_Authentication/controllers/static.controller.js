const URL = require("../models/url.model");

// Render home at /
const handleUserDefinedUrls = async (req, res) => {
    if (!req?.user) return res.redirect('/user/login');
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

module.exports = {
    handleUserDefinedUrls,
    handleLoginUser,
    handleSignupUser
}