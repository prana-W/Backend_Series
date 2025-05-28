const http = require('http');
const fs = require('fs');
const url = require('url');

const port = 4000;
const server = http.createServer((req, res) => {

    if (req.url === '/favicon.ico') {
        res.end();
        return;
        //! We need to return here to stop the execution of the code below. res.end() does not stop the execution of the code. It just tells that the response is complete. If another res.end() is called after this, it will throw an error.
    }

    const myURl = url.parse(req.url, true); //true parses the query string into an object
    console.log(myURl);

    const log = `${Date.now()}: New Request received from ${req.url}\n`

    // appendFile takes a noParam callback
    fs.appendFile('log.txt', log, () => {
        console.log('Log updated!');
    })

    switch (myURl.pathname) {
        case '/':
            res.end('HomePage');
            break;
        case '/about':

            const name = myURl.query.name || 'Guest'; // if name is not provided, use Guest
            //ex: http://localhost:4000/about?name=Pranaw+Kumar gives Hello Pranaw Kumar!
            res.end(`Hello ${name}!`);
            break;
        default:
            res.end('404 Not Found');

    }
})

server.listen(port, () => {
    console.log(`Server is running. Check http://localhost:${port}`);
})

