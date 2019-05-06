var axios = require('axios')
var bcrypt = require('bcryptjs')

it('"Passing" Test for Login with Phone', async () => {
    const phone = 944701899
    const password = 'lumberjack'
    await axios.get('http://localhost:9091/zelia/login')
            .then(info => {
                const users = info.data
                const user = users.find(c => c.phone === phone)
                if (bcrypt.compareSync(password, user.password)) 
                    expect(1).toBe(1)
                else
                    expect(1).toBe(0)
            })
});

it('"Failing" Test for Login with Phone', async () => {
    const phone = 944701899
    const password = 'lumberjackk'
    await axios.get('http://localhost:9091/zelia/login')
            .then(info => {
                const users = info.data
                const user = users.find(c => c.phone === phone)
                if (bcrypt.compareSync(password, user.password)) 
                    expect(1).toBe(0)
                else
                    expect(1).toBe(1)
            })
});