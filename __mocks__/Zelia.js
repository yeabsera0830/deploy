var Zelia_Users = require('./Zelia_Users')
var express = require('express')
var app = express()

app.use(express.json())

app.listen(9091, () => console.log("Zelia Server Running on *:9091"))


// Get Request Handler
app.get('/zelia/login', (req, res) => {
    res.send(Zelia_Users)
})

// Post Request Handler
app.post('/zelia/signup', (req, res) => {
    const user = req.body
    Zelia_Users.push(user)
    res.send(user)
})

// Put Request Handler
app.put('/zelia/data', (req, res) => {
    const updatedUserToken = req.body.token
    const updatedUser = req.body.user
    const user = Zelia_Users.find(c => c.zelia_token === updatedUserToken)
    if (user) {
        const index = Zelia_Users.indexOf(user)
        Zelia_Users[index] = updatedUser
        res.send(updatedUser)
    } else {
        return res.status(400).send("Could not find user")
    }
})

// Delete Request Handler
app.delete('/zelia/data', (req, res) => {
    const updatedUserToken = req.body.token
    const updatedUser = req.body.user
    const user = Zelia_Users.find(c => c.zelia_token === updatedUserToken)
    if (user) {
        const index = Zelia_Users.indexOf(user)
        Zelia_Users.splice(index, 1)
        res.send("User has been deleted")
    } else {
        return res.status(400).send("Could not find user")
    }
})