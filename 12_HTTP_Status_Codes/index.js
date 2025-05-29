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
    res.setHeader('X-MyName', 'Pranaw Kumar') //custom header
    return res.json(users)
})
app.post('/api/users', (req, res) => {
    const body = req.body;

    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({status: 'fail', error: 'Please provide all required fields.'})
        //! 400 means Bad Request
        // That means some field is missing in the request body or bad syntax from the frontend
    }
    users.push({id: users.length + 1, ...body});
    fs.writeFile('./users.json', JSON.stringify(users), (err, data) => {
        if (err) {
            return res.json({status: 'fail', error: 'Could not save user.'})
        }
        console.log('User saved successfully')

        //! To sent custom status code
        // Add .status(code) before sending it like below
        return res.status(201).json({status: 'success', message: `id: ${users.length} User added successfully!`})
        // 201 means created successfully
    })
})

app.route('/api/users/:userId')
    .get((req, res) => {
        const id = Number(req.params.userId);
        const user = users.find((user) => user.id === id)
        if (!user) {
            return res.status(404).json({status: 'fail', error: 'User not found'})
            //! It means NOT FOUND
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