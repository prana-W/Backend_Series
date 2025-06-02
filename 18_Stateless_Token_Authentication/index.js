const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./connection');
const {handleAnalytics} = require("./controllers/url.controller");
const port = 8001;
const staticRoute = require('./routes/static.route');
const urlRoute = require('./routes/url.route');
const userRoute = require('./routes/user.route');
const cookieParser = require('cookie-parser');


const {restrictToLoggedInUserOnly, getCurrentUser} = require('./middlewares/auth.middleware') // Importing the auth middleware

//! Middleware (this is necessary as we are passing form data)
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(express.json());

// DB connection
(async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    })
})();


//! Setting up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))

//! Using Inline middleware to restrict unauthorized users from accessing /url routes
app.use('/url', restrictToLoggedInUserOnly, urlRoute)

//! Using Inline middleware (getCurrentUser) to pass the current user into request body (if exists)
app.use('/', getCurrentUser, staticRoute)
app.get('/analytics', getCurrentUser, handleAnalytics)

app.use('/user', userRoute)