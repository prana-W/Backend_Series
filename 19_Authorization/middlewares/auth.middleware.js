const {getUser} = require('../services/auth.service');

//! Soft check for authentication. Doesn't restrict access if not loggin in or not allowed.
// This is used to simply add user to req body, if they exist else add null.
const checkForAuthentication = (req, res, next) => {
    const token = req.cookies?.token;
    req.user = null;

    if (!token) return next();

    const user = getUser(token);

    req.user = user;
    return next();
}

//! This is a strict check for authentication and authorization.
// It returns a middleware function that returns user to login if not logged in and ends the request if user is not authorized.

// roles is an array of roles that are allowed to access the resource.

//? We are using callback here, as we will be passing data (roles array) to the middleware function.
const restrictedTo = (roles = []) => {
    return (req, res, next) => {
        if (!req.user) return res.redirect('/user/login');
        if(!roles.includes(req.user.role)) return res.end('You are not allowed to access this resource');
        return next();
    }
}


module.exports = {checkForAuthentication, restrictedTo};