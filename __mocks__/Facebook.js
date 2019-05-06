var express = require('express')
var app = express()
var Facebook_Users = require('./Facebook-Users')

app.listen(9090, () => console.log("Facebook Server Running on *:9090"))

app.use(express.json())

// For Signup and Login Purposes
app.get('/facebook/:token', (req, res) => {
    const token = req.params.token
    const item = Facebook_Users.find(user => user.token === token)
    if (item != null)
        return res.send(item)
    else
        return res.status(400).send("Could not find the user")
})