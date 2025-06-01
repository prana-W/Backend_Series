const express = require('express')
const users = require('./users.json')
const fs = require('fs')
const app = express()
const port = 4000;

app.use(express.urlencoded({extended: false}))
app.use((req, res, next) => {
    fs.appendFile('./log.txt',
        `${new Date().toLocaleTimeString()} - ${req.method} ${req.path}\n`, (err, data) => {
            next();
        }
    )
})

app.get('/', (req, res) => {
    return res.send('Welcome to the REST API Project!')
})
app.get('/users', (req, res) => {

    const html = `
    <ul>${users.map((user) => `<li>${user.first_name} ${user.last_name}</li>`).join('')}</ul>`


    return res.send(html)
})
app.get('/api/users', (req, res) => {

    //! Request Headers can be added through Postman (or Frontend)
    console.log(req.headers)
    //! We are adding a response Header (can be checked through Postman or browser dev tools)
    res.setHeader('X-MyName', 'Pranaw Kumar') //custom header
    //! NOTE:
    // It is a good practice to add X to a custom header in the start
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

app.route('/api/users/:userId')
    .get((req, res) => {

        const id = Number(req.params.createdBy);
        const user = users.find((user) => user.id === id)
        if (!user) {
            return res.json({status: 'fail', error: 'User not found'})
        }

        res.json([user])
    })
    .patch((req, res) => {
        const newUsers = users.map((user) => {
            if (user.id === Number(req.params.createdBy)) {
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
        const newUsers = users.filter((user) => user.id !== Number(req.params.createdBy))

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