const http = require('http');
const fs = require('fs');
const url = require('url');

const port = 4000;
const server = http.createServer((req, res) => {

    if (req.url === '/favicon.ico') {
        res.end();
        return;
    }

    const myURl = url.parse(req.url, true);

    const log = `${new Date().toLocaleTimeString()}: ${req.method} HTTP method was made.\n`

    fs.appendFile('log.txt', log, () => {
        console.log('Log updated!');
    })

    switch (myURl.pathname) {
        case '/':
            res.end('HomePage');
            break;
        case '/about':
            const name = myURl.query.name || 'Guest';
            res.end(`Hello ${name}!`);
            break;
        case '/signup':
            if (req.method === 'GET') {
                res.end('Signup Page');
            } else if (req.method === 'POST') {
                //DB query
                res.end('Successfully signed up!');
            }
            break;
        default:
            res.end('404 Not Found');

    }
})

server.listen(port, () => {
    console.log(`Server is running. Check http://localhost:${port}`);
})

