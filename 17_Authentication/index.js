const express = require('express');
const app = express();
const path = require('path'); //! require this to use in app.set()
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

(async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    })
})();


//! Setting up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))

//! We have attached a middleware to /url route. THerefore, all the requests to /url will go through this middleware first
app.use('/url', restrictToLoggedInUserOnly, urlRoute) // Inline Middleware

//! This is the static route (in root)
app.use('/', getCurrentUser, staticRoute)
app.get('/analytics', getCurrentUser, handleAnalytics)
app.use('/user', userRoute)