var axios = require('axios')

async function loginFacebook(token) {
    var respond = null
    await axios.get(`http://localhost:9090/facebook/${token}`)
            .then(async info => {
                const id = info.data.id
                await axios.get('http://localhost:9091/zelia/login')
                    .then(info => {
                        const users = info.data
                        const user = users.find(c => c.fbID === id)
                        if (user) {
                            respond = {
                                'type': 'success',
                                'value': user.zelia_token
                            }
                        }
                        else {
                            respond = {
                                type: 'failure',
                                message: 'Could not find user'
                            }
                        }
                    })
            })
            .catch(err => {
                respond = {
                    type: 'failure',
                    message: 'Invalid Token'
                }
            })
    return respond
}

module.exports = loginFacebook