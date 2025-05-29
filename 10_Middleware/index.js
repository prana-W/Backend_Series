const express = require('express')
const users = require('./users.json')
const fs = require('fs')
const app = express()
const port = 4000;

//! Middlewares
//? app.use() is used to register middleware functions in Express.

// this has next() in it by default

// it does some processing on the incoming data and then store it in req.body (just like we added a custom property in middleware 2, which makes the req.body give the form data and not undefined)
app.use(express.urlencoded({extended: false}))

// Below is a middleware that logs
app.use((req, res, next) => {
    fs.appendFile('./log.txt',
        `${new Date().toLocaleTimeString()} - ${req.method} ${req.path}\n`, (err, data) => {
            next(); //we are doing next() to continue to the next middleware or route handler when appended
        }
    )
})

app.use((req, res, next) => {
    console.log('Hello Middleware 1');
    next() // this is a reference to the next middleware function in the stack (or next route if none)
})

app.use((req, res, next) => {
    console.log('Hello Middleware 2');
    // We can add custom properties or methods to request or response objects and use it anywhere below (in middlewares or routes)
    req.customProperty2 = 'This is a custom property added by Middleware 2';
    next()
})

app.use((req, res, next) => {
    console.log(req.customProperty2);
    console.log('Hello Middleware 3');
    // next()
    //! Since we didn't use next(), we won't be able to reach the next middleware or route handler. Page will try to load forever.
})

// will only reach here if used next() in the previous middleware
app.use((req, res, next) => {
    console.log('Hello Middleware 4');
    return res.end() //This ends the response, so no further middleware or route handlers will be executed.

    // For normal flow - remove the res.end() from the above and add next() in this and all the previous middlewares
    // next()

})

//! Routes

// will only reach here if used next() in the previous middleware
app.get('/', (req, res) => {
    console.log(req.customProperty2);
    return res.send('Welcome to the REST API Project!')
})

app.get('/users', (req, res) => {

    const html = `
    <ul>${users.map((user) => `<li>${user.first_name} ${user.last_name}</li>`).join('')}</ul>`


    return res.send(html)
})

//! REST API Points

app.get('/api/users', (req, res) => {
    return res.json(users)
})

app.post('/api/users', (req, res) => {
    const body = req.body;
    users.push({id: users.length + 1, ...body});
    fs.writeFile('./users.json', JSON.stringify(users), (err, data) => {
        if (err) {
            return res.json({status: 'fail', error: 'Could not save user.'})
        }
        console.log('User saved successfully')
        return res.json({status: 'success', message: `id: ${users.length} User added successfully!`})
    })

})

app.route('/api/v2/users/:userId')
    .get((req, res) => {

        const id = Number(req.params.userId);
        const user = users.find((user) => user.id === id)
        if (!user) {
            return res.json({status: 'fail', error: 'User not found'})
        }

        res.json([user])
    })
    .patch((req, res) => {
        const newUsers = users.map((user) => {
            if (user.id === Number(req.params.userId)) {
                return {...user, ...req.body};
            }
            return user;
        })

        fs.writeFile('./users.json', JSON.stringify(newUsers), (err, data) => {

            if (err) {
                return res.json({status: 'fail', error: 'Could not update user.'})
            }
            console.log('User updated successfully')
            return res.json({status: 'success', message: `User was updated successfully!`})

        })
    })
    .delete((req, res) => {
        const newUsers = users.filter((user) => user.id !== Number(req.params.userId))

        if (newUsers.length === users.length) {
            return res.json({status: 'fail', error: 'User not found'})
        }

        fs.writeFile('./users.json', JSON.stringify(newUsers), (err, data) => {
            if (err) {
                return res.json({status: 'fail', error: 'Could not delete user.'})
            }
            console.log('User deleted successfully')
            return res.json({status: 'success', message: `User was deleted successfully!`})

        })
    })


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

