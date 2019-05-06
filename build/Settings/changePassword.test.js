var axios = require('axios')
var bcrypt = require('bcryptjs')

it('"Passing" Test for changing Password', async () => {
    const new_password = "killmenow"
    const token = "bvvhb60sd0giubi98h98b9o8bi98bu"
    await axios.get('http://localhost:9091/zelia/login')
        .then(async info => {
            const users = info.data
            const user = users.find(c => c.zelia_token === token)
            if (user) {
                const salt = bcrypt.genSaltSync(10)
                const hashed  = bcrypt.hashSync(new_password)
                user.password = hashed
                await axios.put('http://localhost:9091/zelia/data', {
                    token: token,
                    user: user
                })
                .then(info => {
                    expect(info.data.password).toEqual(hashed)
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

it('"Failing" Test for changing Password', async () => {
    const new_password = "https://new_profile_pic.jpg"
    const token = "bvvhb60sd0giubi98h98b9o8bi98bu"
    await axios.get('http://localhost:9091/zelia/login')
        .then(async info => {
            const users = info.data
            const user = users.find(c => c.zelia_token === token)
            if (user) {
                const salt = bcrypt.genSaltSync(10)
                const hashed  = bcrypt.hashSync(new_password)
                user.password = hashed
                await axios.put('http://localhost:9091/zelia/data', {
                    token: token,
                    user: user
                })
                .then(info => {
                    expect(info.data.password).not.toEqual('password')
                })
                .catch(err => {
                    expect(err).tobBeNull()
                })
            } else {
                expect(1).toBe(0)
            }
        })
        .catch(err => {
            expect(err).not.toBeNull()
        })
});