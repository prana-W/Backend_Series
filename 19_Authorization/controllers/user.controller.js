const User = require('../models/user.model');
const {v4: uuidv4} = require('uuid'); // requiring uuid syntax
const {setUser} = require('../services/auth.service')

// Handles user signup logic
const handleUserSignup = async (req, res) => {

    try {
        const {name, email, password} = req.body; // destructure the object from req.body (passed data from form)

        //TODO: Validate the input data

        await User.create({
            name,
            email,
            password
        })

        return res.redirect('/user/login') // Redirect to login route after successful signup
    }
    catch (error) {
        console.error('Error during user signup:', error);
        return res.status(500).send('Internal Server Error');
    }

}

// Handle Login
const handleUserLogin = async (req, res) => {

     try {

         const {email, password} = req.body;

         const user = await User.findOne({email, password}) // Find one user

         if (!user) {
             return res.render('login.ejs', {
                 errorMess: 'Invalid email or password' //pass error incase of wrong credentials, to login.ejs, where the error message gets rendered in the page
             })
         }


         //! Getting a JWT token for the user
         const token = setUser(user);
         res.cookie('token', token); // sending a cookie as a response with cookie name 'uid' and value as jwt token

         return res.redirect('/') //Redirect to home

     }
     catch (error) {
         console.log(error)
    res.status(500).send('Unable to login user! Error:', error.message);
     }

}

module.exports = {handleUserSignup, handleUserLogin }