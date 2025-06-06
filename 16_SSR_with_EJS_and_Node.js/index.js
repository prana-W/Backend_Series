const express = require('express');
const app = express();
const path = require('path'); //! require this to use in app.set()
const connectDB = require('./connection');
const urlRoute = require('./routes/url.route');
const {handleAnalytics} = require("./controllers/url.controller");
const port = 8001;
const URL = require('./models/url.model');
const staticRoute = require('./routes/static.route');

//! Middleware (this is necessary as we are passing form data)
app.use(express.urlencoded({extended: false}));


app.use(express.json());

(async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    })
})();
////////////////////////////////////////

//! Setting up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))

//! This is just an example
app.get('/test', async (req, res) => {
    const allUrls = await URL.find({})
    console.log(allUrls);
    res.render('example.ejs', {
        urls: allUrls,
        name: "Pranaw Kumar",
        htmlContent: "<h1>Hello World</h1>",
    });
})

//! This is the static route (in root)
app.use('/', staticRoute)
/////////////////////////////////////////
app.use('/url', urlRoute)
app.get('/analytics', handleAnalytics)