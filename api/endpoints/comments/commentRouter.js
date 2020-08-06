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

module.exports = router