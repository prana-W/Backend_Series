const {getUser} = require('../services/auth.service');

// This middleware restricts unauthorized user from accessing certain routes (/url) and returns back the user to login page if not logged in
const restrictToLoggedInUserOnly = async (req, res, next) => {
    try {

        //! Optional chaining is done almost everywhere, to prevent app from crashing, in case the property doesn't exist
        const userUid = req.cookies?.uid;
        if (!userUid) {
            return res.redirect('/user/login');
        }

        const user = await getUser(userUid);

        if (!user) {
            return res.redirect('/user/login');
        }

        req.user = user; // pass the user object into request object for use in controllers

        next() // successfully passes on the request

    } catch (error) {
        res.json({
            status: 'fail',
            message: 'There was an error in auth.middleware1',
            error: error
        })
    }
}

// This simply pass the user object to req object, if logged in else does nothing. This is used to pass on /analytics and / (home route), which we are allowing unauthorized users to access but not showing any result
const getCurrentUser = async (req, res, next) => {
    try {
        const userUid = req.cookies?.uid;
        const user = await getUser(userUid);
        req.user = user;
        next()
    } catch (error) {
        res.json({
            status: 'fail',
            message: 'There was an error in auth.middleware2',
            error: error
        })
    }
}

module.exports = {restrictToLoggedInUserOnly, getCurrentUser};