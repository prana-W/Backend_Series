const {getUser} = require('../services/auth.service');

const restrictToLoggedInUserOnly = async (req, res, next) => {
    try {

        //! Note: Check how we are getting the uid from the cookie. ? is preventing the app from crashing if cookie is not present
        const userUid = req.cookies?.uid;
        if (!userUid) {
            return res.redirect('/user/login');
        }

        const sessionObj = await getUser(userUid);

        if (!sessionObj) {
            return res.redirect('/user/login');
        }

        req.userId = sessionObj.createdBy; // passes the user Object from the backend to req object. Now whenever we make a request, we can access the user object using req.user

        next()

    } catch (error) {
        res.json({
            status: 'fail',
            message: 'There was an error in auth.middleware1',
            error: error
        })
    }
}

// This only adds user object into the request object, if available else puts null
const getCurrentUser = async (req, res, next) => {
    try {
        const userUid = req.cookies?.uid;
        const sessionObj = await getUser(userUid);
        req.userId = sessionObj?.createdBy;
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