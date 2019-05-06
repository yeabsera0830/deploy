var express = require('express')
var app = express()

// Sign Up
const signupPhone = require('./build/Sign-Up/signup_phone')
const signupFacebook = require('./build/Sign-Up/signup_facebook')

// Log In
const loginPhone = require('./build/Login/login_phone')
const loginFacebook = require('./build/Login/login_facebook')

// Profiles
const getName = require('./build/Profile/name')
const getEmail = require('./build/Profile/email')
const getPhone = require('./build/Profile/phone')
const getProfilePic = require('./build/Profile/profile_pic')
const getFriends = require('./build/Profile/friends')
const getReviews = require('./build/Profile/reviews')


// Settings
const changeName = require('./build/Settings/changeName')
const changeEmail = require('./build/Settings/changeEmail')
const changePassword = require('./build/Settings/changePassword')
const changePhone = require('./build/Settings/changePhone')
const changeProfilePicture = require('./build/Settings/changeProfilePicture')


// The Faked Facbook Server
var fb = express()
var Facebook_Users = require('./__mocks__/Facebook-Users')

fb.listen(9090, () => console.log("Facebook Server Running on *:9090"))

fb.use(express.json())

// For Signup and Login Purposes
fb.get('/facebook/:token', (req, res) => {
    const token = req.params.token
    const item = Facebook_Users.find(user => user.token === token)
    if (item != null)
        return res.send(item)
    else
        return res.status(400).send("Could not find the user")
})
// -==========================================================
// The Faked Zelia Server
var Zelia_Users = require('./__mocks__/Zelia_Users')
var zelia = express()

zelia.use(express.json())

zelia.listen(9091, () => console.log("Zelia Server Running on *:9091"))

// Get Request Handler
zelia.get('/zelia/login', (req, res) => {
    res.send(Zelia_Users)
})

// Post Request Handler
zelia.post('/zelia/signup', (req, res) => {
    const user = req.body
    Zelia_Users.push(user)
    res.send(user)
})

// Put Request Handler
zelia.put('/zelia/data', (req, res) => {
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
zelia.delete('/zelia/data', (req, res) => {
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
// -============================================================

// The Main Server That Holds Both
app.use(express.json())
app.listen(8081, () => console.log("Main Server Running on *:8081"))

// Sign up using phone
app.post('/zelia/signup', async (req, res) => {
    const phone = req.body.phone
    const password = req.body.password
    const response = await signupPhone(phone, password)
    res.send(response)
})

// Sign up using Facebook
app.post('/zelia/signup/facebook', async (req, res) => {
    const token = req.body.token
    const response = await signupFacebook(token)
    res.send(response)
})

// Login using phone
app.post('/zelia/login/phone', async (req, res) => {
    const phone = req.body.phone
    const password = req.body.password
    const response = await loginPhone(phone, password)
    res.send(response)
})

// Login using Facebook
app.post('/zelia/login/facebook', async (req, res) => {
    const token = req.body.token
    const response = await loginFacebook(token)
    res.send(response)
})

// Profiles Section
app.get('/name', async (req, res) => {
    const token = req.body.token
    const response = await getName(token)
    res.send(response)
})

app.get('/email', async (req, res) => {
    const token = req.body.token
    const response = await getEmail(token)
    res.send(response)
})

app.get('/phone', async (req, res) => {
    const token = req.body.token
    const response = await getPhone(token)
    res.send(response)
})

app.get('/profile_pic', async (req, res) => {
    const token = req.body.token
    const response = await getProfilePic(token)
    res.send(response)
})

app.get('/friends', async (req, res) => {
    const token = req.body.token
    const response = await getFriends(token)
    res.send(response)
})

app.get('/reviews', async (req, res) => {
    const token = req.body.token
    const response = await getReviews(token)
    res.send(response)
})

// Settings Section
app.put('/change/name', async (req, res) => {
    const token = req.body.token
    const new_name = req.body.new_name
    const response = await changeName(token, new_name)
    res.send(response)
})

app.put('/change/email', async (req, res) => {
    const token = req.body.token
    const new_email = req.body.new_email
    const response = await changeEmail(token, new_email)
    res.send(response)
})

app.put('/change/phone', async (req, res) => {
    const token = req.body.token
    const new_phone = req.body.new_phone
    const response = await changePhone(token, new_phone)
    res.send(response)
})

app.put('/change/password', async (req, res) => {
    const token = req.body.token
    const new_password = req.body.new_password
    const response = await changePassword(token, new_password)
    res.send(response)
})

app.put('/change/profile-picture', async (req, res) => {
    const token = req.body.token
    const new_profile_picture = req.body.new_profile_picture
    const response = await changeProfilePicture(token, new_profile_picture)
    res.send(response)
})