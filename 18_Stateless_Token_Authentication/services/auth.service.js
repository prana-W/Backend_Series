require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET

// Return a JWT Token with user payload and signed by secret Key
const setUser = (user) => {
    const payload = {
        _id: user._id,
        email: user.email
        //! We don't store password in the token for security reasons
    }
    // console.log(secretKey)
    return jwt.sign(payload, secretKey)
}

// Return user payload using JWT Token and secret Key
const getUser = (token) => {

    try {
        if (!token) {
            return null; // To avoid crashing if token is not provided
        }
        return jwt.verify(token, secretKey);
        // this verifies if the given token has the secretKey or is tampered.
    }
    catch (error) {
        return null;
    }

}

module.exports = {
    setUser,
    getUser
}