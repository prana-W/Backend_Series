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

const {checkForAuthentication, restrictedTo} = require('./middlewares/auth.middleware') // Importing the auth middleware

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

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))



app.use(checkForAuthentication); //! We want to soft check for authentication on all routes

//! Adding strict checking to the url route
app.use('/url', restrictedTo(["NORMAL", "ADMIN"]), urlRoute)


app.use('/', staticRoute)
app.get('/analytics', handleAnalytics)

app.use('/user', userRoute)