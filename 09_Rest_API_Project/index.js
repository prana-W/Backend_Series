const express = require('express')
const users = require('./users.json')
const fs = require('fs')
const app = express()
const port = 4000;
// Middlewares

// The below middleware operates on every request and is used to put the urlencoded data (form data) into the body of the request
app.use(express.urlencoded({extended: false}))

//Routes

app.get('/', (req, res) => {
    return res.send('Welcome to the REST API Project!')
})

app.get('/users', (req, res) => {

    const html = `
    <ul>${users.map((user) => `<li>${user.first_name} ${user.last_name}</li>`).join('')}</ul>
    
    `
    //similarly, put all the details in the html

    return res.send(html) // res.send() sends the HTML response (this is called Server-Side Rendering)
})

// REST API Points

app.get('/api/users', (req, res) => {
    return res.json(users) // res.json() sends a JSON response
})

//! NOTE:
// urlencoded data is sent from the postman which needs to be parsed by the express middleware and pass into the body of the request
app.post('/api/users', (req, res) => {
    const body = req.body; // req.body gets the body of the request from frontend (here from postman)
    users.push({id: users.length + 1, ...body});

    //! Remember to JSON.stringify
    fs.writeFile('./users.json', JSON.stringify(users), (err, data) => {
        if (err) {
            return res.json({status: 'fail', error: 'Could not save user.'})
        }
        console.log('User saved successfully')
        return res.json({status: 'success', message: `id: ${users.length} User added successfully!`})
    })

})

///////////////////////////////////////////////////////////////////////////

// :id is for variable id
app.get('/api/users/:userId', (req, res) => {

    const id = Number(req.params.userId); // req.params.id gets the id from the URL
    const user = users.find((user) => user.id === id)
    if (!user) {
        return res.json({status: 'fail', error: 'User not found'})
    }

    res.json([user])
})
app.patch('/api/users/:userId', (req, res) => {

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
app.delete('/api/users/:userId', (req, res) => {

    const newUsers = users.filter((user) => user.id !== Number(req.params.userId))

    if (newUsers.length === users.length) {
        return res.json ({status: 'fail', error: 'User not found'})
    }

    fs.writeFile('./users.json', JSON.stringify(newUsers), (err, data) => {
        if (err) {
            return res.json({status: 'fail', error: 'Could not delete user.'})
        }
        console.log('User deleted successfully')
        return res.json({status: 'success', message: `User was deleted successfully!`})

    })
})

//! NOTE:
// The above three methods are implemented on the same route. Therefore, we can shorten the code by doing:
app.route('/api/v2/users/:userId')
    .get((req, res) => {
        //add above get method code here
    })
    .patch((req, res) => {
        //add above put method code here
    })
    .delete((req, res) => {
        //add above delete method code here
    })

/////////////////////////////////////////////////////////////////////////


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

