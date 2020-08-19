const express = require('express')
const router = express.Router();
const users = require('./userModel')

router.get('general/:id', async (req, res)=>{
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

router.post('/orgRole/:id', async (req, res)=>{
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

        const {id} = req.params
        let data = await users.getOrgRoles(id)
        if (data) {
            res.status(200).json(data)
        }
        else {
            res.status(400).json({message: 'Failed to get those org roles'})
        }
    }
    catch (error){
        res.status(500).json(error)
    }
})



module.exports = router