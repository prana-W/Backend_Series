const URL = require("../models/url.model");

const handleUserDefinedUrls = async (req, res) => {
    const userDefinedUrls = await URL.find({createdBy: req.userId});
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