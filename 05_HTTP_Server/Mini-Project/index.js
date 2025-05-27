const http = require('http');
const fs = require('fs');

const port = 8080;
const myServer = http.createServer((req, res) => {

    const log = `${Date.now()}: New Request received from ${req.url}\n`

    // appendFile takes a noParam callback
    fs.appendFile('log.txt', log, () => {
        console.log('Log updated');
    })

    switch (req.url) {
        case '/':
            res.end('HomePage');
            break;
        case '/about':
            res.end('AboutPage');
            break;
        default:
            res.end('404 Not Found');

    }
})

myServer.listen(port, () => {
    console.log(`Server is running. Check http://localhost:${port}`);
})


//! Note:
// In log.txt, we see requests coming from favicon.ico on addition to our request, which is a default request made by the browser to fetch the favicon of the website. This can be ignored.