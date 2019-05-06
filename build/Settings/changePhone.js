var axios = require('axios')

async function changePhone(token, new_phone) {
    return (
        await axios.get('http://localhost:9091/zelia/login')
            .then(async info => {
                const users = info.data
                const user = users.find(c => c.zelia_token === token)
                if (user) {
                        user.phone = new_phone
                        return await axios.put('http://localhost:9091/zelia/data', {
                            token: token,
                            user: user
                        })
                        .then(info => {
                            return {
                                'type': 'success',
                                'value': info.data.phone
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

module.exports = changePhone

