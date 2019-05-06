var axios = require('axios')

it('"Passing" Test for Login with Facebook', async () => {
    const token = 'isdunbciusv89h9w8evnw98evn9w8nv9w8vvv3'
    await axios.get(`http://localhost:9090/facebook/${token}`)
        .then(async info => {
            const id = info.data.id
            await axios.get('http://localhost:9091/zelia/login')
                .then(info => {
                    const users = info.data
                    const user = users.find(c => c.fbID === id)
                    expect(user).toBeDefined()
                })
                .catch(err => {
                    expect(err).toBeNull()
                })
        })
});

it('"Failing" Test for Login with Facebook', async () => {
    const token = 'isdunbciusv89h9w8evnw98evn9w8nv9w8vvv3'
    await axios.get(`http://localhost:9090/facebook/${token}`)
        .then(async info => {
            const id = info.data.id
            await axios.get('http://localhost:9091/zelia/login')
                .then(info => {
                    const users = info.data
                    const user = users.find(c => c.fbID === 2213234234234234)
                    expect(user).not.toBeDefined()
                })
                .catch(err => {
                    expect(err).toBeNull()
                })
        })
        .catch(err => {
            expect(err).toBeNull()
        })
});