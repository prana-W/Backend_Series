const express = require('express')
const users = require('./users.json')
const app = express()
const port = 4000;

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
app.post('/api/users', (req, res) => {
    //TODO: create new user
    return res.json({status: 'pending'})
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
    //TODO: edit user
    res.json({status: 'pending'})
})
app.delete('/api/users/:userId', (req, res) => {
    //TODO: delete user
    res.json({status: 'pending'})
})

//! NOTE:
// The above three methods are implemented on the same route. Therefore, we can shorten the code by doing:
app.route('/api/v2/users/:userId')
    .get ((req, res) => {
        //add above get method code here
    })
    .patch ((req, res) => {
        //add above put method code here
    })
    .delete ((req, res) => {
        //add above delete method code here
    })

/////////////////////////////////////////////////////////////////////////


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

