const express = require('express')
const fs = require('fs')
const app = express()
const port = 4000;

const userRouter = require('./routes/user.route')
const {connectMongoDB} = require("./connection");
const {logReqRes} = require('./middlewares/index.middleware')

// connectMongoDB is an async function and hence always returns a promise, since we are not explicitly returning something in connectMongoDB, it will return Promise.resolve(void) when promise is resolved. We just need Promise.resolve() to start our server.
connectMongoDB('mongodb://127.0.0.1:27017/rest_api_project')
    .then (() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`)
        })
    })
//! There is no need to catch as no error will be thrown in connectMongoDB, if there is an error, it will be caught in the connectMongoDB function itself and process will exit with code 1.


//! Middleware

app.use(express.urlencoded({extended: false}))
app.use(logReqRes('./logs.txt'))

//! Routes
app.use ('/api/users', userRouter)
