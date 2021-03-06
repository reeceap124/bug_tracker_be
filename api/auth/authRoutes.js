const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const generateToken = require('./generateToken')
const db = require('../endpoints/users/userModel')
router.post('/register', (req, res)=>{
    let person = req.body
    const {email, password, display_name} = person;
    if (!(email && display_name && password)) {
        return res.status(400).json({message: 'Missing required fields'})
    }
    const hash = bcrypt.hashSync(person.password, 12)
    person.password = hash
    
    db.add(person)
    .then(user=>{
        delete user.password
        const token = generateToken(user)
        res.status(201).json({user, token})
    })
    .catch(err=>{
        console.log("ERROR: ", err)
        res.status(500).json({message: 'Failed to register user', error: err})
    })
})

router.post('/login', (req, res)=>{
    const {email, password} = req.body

    if(!(email && password)) {
        return res.status(400).json({message: 'Missing valid credentials'})
    }
    db.findBy({email})
    .then(user=>{
        if (user && bcrypt.compareSync(password, user.password)) {
            delete user.password
            const token = generateToken(user)
            res.status(200).json({user, token})
        } 
        else {
            res.status(401).json({message: "Sorry, those credentials didn't work"})
        }
    })
    .catch(err=>{
        res.status(500).json({message: 'Failed to log in', error: err})
    })

})

module.exports = router