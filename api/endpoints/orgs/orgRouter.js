const express = require('express')
const router = express.Router();
const orgs = require('./orgModel')
const restrict = require('../../auth/restrictedMiddleware')

router.get('/:id', (req, res)=>{
    const {id} = req.params
    orgs.findBy({id})
    .then(org=>{
        res.status(200).json(org)
    })
    .catch(err=>{
        res.status(500).json({error: err})
    })
})

router.post('/', async (req, res)=>{
    try {
        const org = await orgs.add(req.body)
        if (org) {
            res.status(201).json(org)
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router