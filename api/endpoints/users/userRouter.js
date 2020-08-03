const express = require('express')
const router = express.Router();
const users = require('./userModel')
const restrict = require('../../auth/restrictedMiddleware')

router.get('/', restrict, (req, res)=>{
    users.getAll()
    .then(users=>{
        res.status(200).json(users)
    })
    .catch(err=>{
        console.log('woops')
        res.status(500).json({message: 'didnt got he', error: err})
    })
})

router.get('/:id', restrict, async (req, res)=>{
    try {
        const {id} = req.params;
        let user = await users.findBy({id})
        if (user) {
            delete user.password;
        }
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json({message: "Couldn't get that user", error: err})
    }
})

router.get('/:id', async (req, res)=>{
    try {
        const {id} = req.params
        let user = await user.getUser({user_key: id})
        if (user){
            delete user.password
            res.status(200).json(user)
        }
    }
    catch (error){
        res.status(500).json(error)
    }
})



module.exports = router