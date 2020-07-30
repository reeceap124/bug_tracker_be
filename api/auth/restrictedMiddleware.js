const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    const secret = process.env.SECRET;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({message: 'Invalid Token'})
            } else {
                req.decodedToken = decodedToken
                next()
            }
        })
    } else {
        res.status(401).json({message: 'No token found'})
    }
}