const express = require('express')
const server = express()
const cors = require('cors')
const helmet = require('helmet')

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use((req, res) => {
    res.status(404).send("I think we're lost...")
})

module.exports = server;