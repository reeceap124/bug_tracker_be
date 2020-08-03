const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const generateToken = require('./generateToken')
const db = require('../endpoints/users/userModel')
router.post('/register', (req, res)=>{
    let person = req.body
    const {display_name, password} = person;


    if (!(display_name && password)) {
        return res.status(400).json({message: 'Missing valid credentials'})
    }
    const hash = bcrypt.hashSync(person.password, 12)
    person.password = hash
    
    db.add(person)
    .then(saved=>{
        console.log('in the then', saved)
        const token = generateToken(saved)
        console.log('your token', token)
        res.status(201).json(user, token)
    })
    .catch(err=>{
        res.status(500).json({message: 'Failed to register user', error: err})
    })
})

module.exports = router