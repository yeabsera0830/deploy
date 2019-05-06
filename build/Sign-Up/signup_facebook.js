var axios = require('axios')

function rand() {
    return Math.random().toString(36).substr(2)
}

async function checkUser(token) {
    return (
        await axios.get(`http://localhost:9090/facebook/${token}`)
        .then(async info => {
            id = info.data.id
            return (
                await axios.get('http://localhost:9091/zelia/login')
                .then(response => {
                    const Users = response.data
                    const user = Users.find(c => c.fbID === id)
                    if (user)
                        return true
                    else
                        return false
                })
            )
        })
    )
}

async function signupFacebook(token) {
    const flag = await checkUser(token)
    if (flag) {
        return {
            'type': 'failure',
            'message': 'User already exists'
        }
    }
    var respond = null
    await axios.get(`http://localhost:9090/facebook/${token}`)
                    .then(async info => {
                        await axios.post('http://localhost:9091/zelia/signup', 
                            {
                                fbID: info.data.id,
                                name: info.data.name,
                                email: info.data.email,
                                profile_pic: info.data.profile_pic,
                                zelia_token: rand() + rand(),
                                password: null,
                                reviews: [],
                                friends: []
                            }
                        )
                        .then(response =>  {
                            respond = {
                                'type': 'success',
                                'value': response.data.zelia_token
                            }
                        })
                    })
                    .catch(error => {
                        respond =  {
                            'type': 'failure',
                            'message': 'Invalid token'
                        }
                    })
    return respond
}

module.exports = signupFacebook
