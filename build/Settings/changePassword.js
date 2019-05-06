var axios = require('axios')
var bcrypt = require('bcryptjs')

async function changePassword(token, new_password) {
    return (
        await axios.get('http://localhost:9091/zelia/login')
            .then(async info => {
                const users = info.data
                const user = users.find(c => c.zelia_token === token)
                if (user) {
                        const salt = bcrypt.genSaltSync(10)
                        user.password = bcrypt.hashSync(new_password)
                        return await axios.put('http://localhost:9091/zelia/data', {
                            token: token,
                            user: user
                        })
                        .then(info => {
                            return {
                                'type': 'success',
                                'value': new_password
                            }
                        })
                        .catch(err => err)
                } else {
                    return "Invalid Token"
                }
            })
            .catch(err => err)
    )
}

module.exports = changePassword

