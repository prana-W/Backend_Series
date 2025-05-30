const express = require('express');
const app = express();
const connectDB = require('./connection');
const urlRoute = require('./routes/url.route');
const {handleAnalytics} = require("./controllers/url.controller");
const port = 8001;

app.use(express.urlencoded());
app.use(express.json());

(async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    })
})();

app.use('/url', urlRoute)
app.get('/analytics', handleAnalytics)