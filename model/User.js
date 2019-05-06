var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    name: {type: String, default: null},
    fbID: {type: String, default: null},
    zelia_token: {type: String, unique: true},
    email: {type: String, unique: true, default: null},
    phone: {type: String, unique: false, default: null},
    password: {type: String, unique: false, default: null},
    profile_picture: {type: String, default: null},
    reviews: [
        {type: String}
    ],
    friends: [
        {type: String}
    ]
})

var User = mongoose.model('myusers', userSchema)
module.exports = User