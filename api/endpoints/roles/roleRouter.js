const express = require('express')
const router = express.Router();
const roles = require('./roleModel')
const restrict = require('../../auth/restrictedMiddleware')

router.get('/:id', (req, res)=>{
    const {id} = req.params
    console.log(id)
    roles.findBy({id})
    .then(role=>{
        console.log(role)
        res.status(200).json(role)
    })
    .catch(err=>{
        res.status(500).json({error: err})
    })
})

router.post('/', async (req, res)=>{
    try {
        const role = await roles.add(req.body)
        if (role) {
            res.status(201).json(role)
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router