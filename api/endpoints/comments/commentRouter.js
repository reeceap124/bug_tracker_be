const express = require('express')
const router = express.Router();
const comments = require('./commentModel')

router.get('/:id', async (req, res)=>{
    try {
        const list = await comments.findBy({issue_key: req.params.id})
        if (list) {
            res.status(200).json(list)
        }
    }
    catch (error) {
        res.status(500).json({message: 'failed to get comments', error})
    }
})

router.post('/:id', async (req, res)=>{
    try {
        const comment = await comments.add(req.body)
        if (comment) {
            res.status(201).json(comment)
        }
    }
    catch (error) {
        res.status(500).json({message: 'failed to add comment', error})
    }
})

module.exports = router