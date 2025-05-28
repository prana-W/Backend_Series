const express = require('express');

// Here app is similar to myHandler function in 02_index.js
const app = express();
const port = 5000;

// It means that we want to have a method for GET request in the root path
app.get('/', (req, res) => {
    res.send('Hello From Home Page')
})

app.get('/about', (req, res) => {
    res.send('About Page' + req.query.name + req.query.age)
    // req.query is also built in here
})

app.listen(port, () => {
    console.log(`Visit http://localhost:${port}`);
})


/*

BASIC ROUTING

app.method(path, handler)
where,

app is an instance of express application,
method is the HTTP method (GET, POST, PUT, DELETE, etc.),
path is the URL path for the route,
handler is a function that handles the request and response.

  */