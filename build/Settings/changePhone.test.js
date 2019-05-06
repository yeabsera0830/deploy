var axios = require('axios')

it('"Passing" Test for changing Phone', async () => {
    const new_phone = "956565656"
    const token = "bvvhb60sd0giubi98h98b9o8bi98bu"
    await axios.get('http://localhost:9091/zelia/login')
        .then(async info => {
            const users = info.data
            const user = users.find(c => c.zelia_token === token)
            if (user) {
                user.phone = new_phone
                await axios.put('http://localhost:9091/zelia/data', {
                    token: token,
                    user: user
                })
                .then(info => {
                    expect(info.data.phone).toEqual(new_phone)
                })
                .catch(err => {
                    expect(err).tobBeNull()
                })
            } else {
                expect(1).toBe(0)
            }
        })
        .catch(err => {
            expect(err).toBeNull()
        })
});

it('"Failing" Test for changing Phone', async () => {
    const new_phone = "956565656"
    const token = "bvvhb60sd0giubi98h98b9o8bi98bu"
    await axios.get('http://localhost:9091/zelia/login')
        .then(async info => {
            const users = info.data
            const user = users.find(c => c.zelia_token === token)
            if (user) {
                user.phone = new_phone
                await axios.put('http://localhost:9091/zelia/data', {
                    token: token,
                    user: user
                })
                .then(async info => {
                    expect(info.data.phone).not.toEqual('989898989')
                })
                .catch(err => {
                    expect(err).toBeNull()
                })
            } else {
                expect(1).toBe(0)
            }
        })
});