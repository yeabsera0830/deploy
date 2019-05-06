var axios = require('axios')

async function changeProfilePicture(token, new_profile_picture) {
    return (
        await axios.get('http://localhost:9091/zelia/login')
            .then(async info => {
                const users = info.data
                const user = users.find(c => c.zelia_token === token)
                if (user) {
                        user.profile_picture = new_profile_picture
                        return await axios.put('http://localhost:9091/zelia/data', {
                            token: token,
                            user: user
                        })
                        .then(info => {
                            return {
                                'type': 'success',
                                'value': info.data.profile_picture
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

module.exports = changeProfilePicture