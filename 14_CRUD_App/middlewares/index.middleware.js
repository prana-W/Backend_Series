const fs = require('fs');

// The below function logs data about the request and response.
function logReqRes(fileName) {
    return (req, res, next) => {
        fs.appendFile(fileName,
            `${new Date().toLocaleTimeString()} - ${req.method} ${req.path}\n`, (err, data) => {
                next();
            }
        )
    }

}

module.exports = {
    logReqRes
}