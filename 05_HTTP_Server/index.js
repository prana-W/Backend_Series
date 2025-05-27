// Use npm init to initialize the template (package.json) and add start script to run the server

const http = require('http')

//createServer is a method of the http module that creates an HTTP server, it takes a callback function (requestHandler) as an argument, which has access to req and res.
const myServer = http.createServer ((req, res) => {
    console.log(req); //this is the request object that contains information about the incoming request from the client
    res.end('Hello from Server'); //this means we are ending the response by sending a message
})


// Below is the code to start the server and listen for incoming requests on a specific port
myServer.listen(8000, () => {
    console.log('Server has started!')
});

// To run a server, we need a port number, on which our server will listen for incoming requests

// Port is like a door and we can operate our server on any free port.