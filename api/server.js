const express = require('express')
const server = express()
const cors = require('cors')
const helmet = require('helmet')

const authRouter = require('./auth/authRoutes');
const userRouter = require('./endpoints/users/userRouter')

server.use(express.json());
server.use(cors());
server.use(helmet());
console.log('in the server')

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);
server.use('/', (req, res) => {
    return res.status(404).send("I think we're lost...")
})

module.exports = server;