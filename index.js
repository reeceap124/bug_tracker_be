const express = require('express');
const server = express();

const PORT = process.env.PORT ||5000;

server.listen(5000, ()=>{
    console.log(`We Up\nRunning on Port: ${PORT}`)
})