const User = require('../models/user.model');
const {v4: uuidv4} = require('uuid');
const {setUser} = require('../services/auth.service')

const handleUserSignup = async (req, res) => {

    try {
        const {name, email, password} = req.body;

        //TODO: Validate the input data

        await User.create({
            name,
            email,
            password
        })

        return res.redirect('/')
    }
    catch (error) {
        console.error('Error during user signup:', error);
        return res.status(500).send('Internal Server Error');
    }

}

const handleUserLogin = async (req, res) => {

     try {

         const {email, password} = req.body;

         const user = await User.findOne({email, password})

         if (!user) {
             return res.render('login.ejs', {
                 errorMess: 'Invalid email or password'
             })
         }

         //! Generate a session ID (or token) for the user using uuid package
         const sessionId = uuidv4();
         setUser(sessionId, user); // Mapping sessionId with user
         res.cookie('uid', sessionId); // sending a cookie as a response with cookie name 'uid' and value as sessionId
         //! This cookie doesn't reset even when the browser is closed.

         return res.redirect('/')

     }
     catch (error) {
    res.status(500).send('Unable to login user! Error:', error);
     }

}

module.exports = {handleUserSignup, handleUserLogin }