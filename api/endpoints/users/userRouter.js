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

router.get('general/:id', restrict, async (req, res)=>{
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

router.get('/orgRole', async (req, res)=>{
    try{
        let orgroles = await users.getAllOrgRoles()
        if (orgroles) {
            res.status(200).json(orgroles)
        }
        else{
            console.log('no org roles')
            res.status(404).json({message: 'no org roles found'})
        }
    }
    catch(error){
        res.status(500).json(error)
    }
})

router.post('/orgRole/:id', async (req, res)=>{
    console.log('in the post')
    try{
        const {id} = req.params
        req.body.user_key = id
        let newRole = await users.addOrgRole(req.body)
        if (newRole) {
            res.status(201).json(newRole)
        }
        else {
            res.status(404).json({message: 'failed to create new role'})
        }
    }
    catch (error){
        res.status(500).json(error)
    }
})

router.get('/orgRole/:id', async (req, res)=>{
    try {
        console.log('in the try')
        const {id} = req.params
        let data = await users.getOrgRoles(id)
        if (data) {
            console.log('DATA: ', data)
            res.status(200).json(data)
        }
        else {
            res.status(400).json({message: 'Failed to get those org roles'})
        }
    }
    catch (error){
        console.log("ERROR:", error)
        res.status(500).json(error)
    }
})



module.exports = router