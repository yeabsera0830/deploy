var axios = require('axios')

async function changeEmail(token, new_email) {
    return (
        await axios.get('http://localhost:9091/zelia/login')
            .then(async info => {
                const users = info.data
                const user = users.find(c => c.zelia_token === token)
                if (user) {
                        user.email = new_email
                        return await axios.put('http://localhost:9091/zelia/data', {
                            token: token,
                            user: user
                        })
                        .then(info => {
                            return {
                                'type': 'success',
                                'value': info.data.email
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

module.exports = changeEmail