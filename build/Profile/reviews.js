var axios = require('axios')

async function reviews(token) {
    return (
        await axios.get('http://localhost:9091/zelia/login')
            .then(info => {
                const users = info.data
                const user = users.find(c => c.zelia_token === token)
                if (user) {
                    return {
                        type: 'success',
                        value: user.reviews
                    }
                } else {
                    return {
                        type: 'failure',
                        message: 'Invalid Token'
                    }
                }
            })
    )
}

module.exports = reviews

