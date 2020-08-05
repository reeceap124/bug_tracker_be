const express = require('express')
const router = express.Router();
const projects = require('./projectsModel')
const restrict = require('../../auth/restrictedMiddleware')

router.get('/:id', (req, res)=>{
    projects.find(req.params.id)
    .then(response=>{
        res.status(200).json(response)
    })
    .catch(err=>{
        res.status(500).json({message: 'failed to get projects', error: err})
    })
})
router.post('/:id', (req, res)=> {
    let project = req.body
    project.org_key = req.params.id
    console.log('project', project)
    projects.add(project)
    .then((added)=>{
        res.status(200).json(added)
    })
    .catch(err=>{
        res.status(500).json({message: "Failed to add project", error: err})
    })
}) 

module.exports = router
