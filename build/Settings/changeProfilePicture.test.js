var axios = require('axios')

it('"Passing" Test for changing Profile Picture', async () => {
    const new_profile_picture = "https://new_profile_pic.jpg"
    const token = "bvvhb60sd0giubi98h98b9o8bi98bu"
    await axios.get('http://localhost:9091/zelia/login')
        .then(async info => {
            const users = info.data
            const user = users.find(c => c.zelia_token === token)
            if (user) {
                user.profile_picture = new_profile_picture
                await axios.put('http://localhost:9091/zelia/data', {
                    token: token,
                    user: user
                })
                .then(info => {
                    expect(info.data.profile_picture).toEqual(new_profile_picture)
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

it('"Failing" Test for changing Profile Picture', async () => {
    const new_profile_picture = "https://new_profile_pic.jpg"
    const token = "bvvhb60sd0giubi98h98b9o8bi98bu"
    await axios.get('http://localhost:9091/zelia/login')
        .then(async info => {
            const users = info.data
            const user = users.find(c => c.zelia_token === token)
            if (user) {
                user.profile_picture = new_profile_picture
                await axios.put('http://localhost:9091/zelia/data', {
                    token: token,
                    user: user
                })
                .then(async info => {
                    expect(info.data.profile_picture).not.toEqual('https://new_profile_pic.png')
                })
                .catch(err => {
                    expect(err).toBeNull()
                })
            } else {
                expect(1).toBe(0)
            }
        })
});