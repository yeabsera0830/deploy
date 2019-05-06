var axios = require('axios')
var bcrypt = require('bcryptjs')

function rand() {
    return Math.random().toString(36).substr(2)
}

async function checkUser(phone) {
    return (
        await axios.get('http://localhost:9091/zelia/login')
        .then(info => {
            const Users = info.data
            const user = Users.find(c => c.phone === phone)
            if (user)
                return true
            else
                return false
        })
    )
}

async function signupPhone(phone, password) {
    const flag = await checkUser(phone)
    if (flag) {
        return {
            'type': 'failure',
            'message': 'User already exists'
        }
    }
    
    var salt = bcrypt.genSaltSync(10)
    const user = {
        name: 'User',
        fbID: null,
        zelia_token: rand(),
        email: null,
        phone: phone,
        password: bcrypt.hashSync(password),
        profile_picture: null,
        reviews: [],
        freinds: []
    }

    return ( 
        await axios.post('http://localhost:9091/zelia/signup', user)
            .then(info => {
                return {
                    'type': 'success',
                    'value': info.data.zelia_token
                }
            })
            .catch(err => {
                return {
                    'type': 'failure',
                    'message': 'could not sign up user'
                }
            })
    )

}

module.exports = signupPhone