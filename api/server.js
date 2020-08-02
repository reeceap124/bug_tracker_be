const express = require('express')
const server = express()
const cors = require('cors')
const helmet = require('helmet')

const authRouter = require('./auth/authRoutes');

server.use(express.json());
server.use(cors());
server.use(helmet());
console.log('in the server')

server.use('/api/auth', authRouter);
server.use((req, res) => {
    console.log('server.use')
    res.status(404).send("I think we're lost...")
})

module.exports = server;