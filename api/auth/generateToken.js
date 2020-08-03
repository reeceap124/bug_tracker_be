const jwt = require('jsonwebtoken');
module.exports = user => {

    const payload = {
        id: user.id,
        username: user.username
    }
    
    const secret = process.env.SECRET

    const options = {
        expiresIn: '1d'
    }
    console.log('generating token')
    return jwt.sign(payload, secret, options)
}