var axios = require('axios')

it('"Passing" Test for Sign Up with Phone', async () => {
    const user = {
        name: 'User',
        fbID: null,
        zelia_token: 'hiuhb98n98n9887bn87b876v',
        email: null,
        phone: '946682692',
        password: '12345678',
        profile_picture: null,
        reviews: [],
        freinds: []
    }
    await axios.post('http://localhost:9091/zelia/signup', user)
            .then(info => {
                expect(info.data).toEqual(user)
            })
            .catch(err => {
                expect(err).toBeNull()
            })
});

it('"Failing" Test for Sign Up with Phone', async () => {
    const user = {
        name: 'User',
        fbID: null,
        zelia_token: 'hiuhb98n98n9887bn87b876v',
        email: null,
        phone: '946682692',
        password: '12345678',
        profile_picture: null,
        reviews: [],
        freinds: []
    }
    await axios.post('http://localhost:9091/zelia/signup', user)
            .then(info => {
                expect(info.data).not.toEqual({
                    name: 'non sense',
                    fbID: null,
                    zelia_token: 'hiuhb98n98n9887bn87b876v',
                    email: null,
                    phone: '946682692',
                    password: '12345678',
                    profile_picture: null,
                    reviews: [],
                    freinds: []
                })
            })
            .catch(err => {
                expect(err).toBeNull()
            })
});