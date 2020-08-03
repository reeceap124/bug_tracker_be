const express = require('express')
const router = express.Router();
const db = require('./userModel')

router.get('/', (req, res)=>{
    db.getAll()
    .then(users=>{
        res.status(200).json(users)
    })
    .catch(err=>{
        console.log('woops')
        res.status(500).json({message: 'didnt got he', error: err})
    })
})

module.exports = router