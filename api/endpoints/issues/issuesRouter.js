const express = require('express')
const router = express.Router();
const issues = require('./issuesModel')
const users = require('../users/userModel')
const projects = require('../projects/projectsModel');
const { route } = require('../projects/projectsRouter');

router.post('/:id', async (req, res)=>{
    try {
        let issue = req.body
        console.log('MY ISSUE', issue)
        const newIssue = await issues.add(issue);
        res.status(201).json(newIssue)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'Failed to add issue', error})
    }
    

})

//Will need to a alter this to only get issues associated with the user.
//Currently getting all issues at an org.
router.get('/list/:id', async (req, res)=>{
    try{
        const {id} = req.params
        let user_issues = []
        let user_projects = []
        const user_orgs = await users.getOrgRoles(id)
        for (org in user_orgs) {
            const pros = await projects.find(user_orgs[org].oId)
            if (pros && pros.length > 0) {
                for (p in pros) {
                    pros[p].role = user_orgs[org].rTitle
                }
                const temp = user_projects.concat(pros)
                user_projects = temp
            }
        }
        // console.log('PROJECTS', user_projects)
        for (p in user_projects) {
            const i = await issues.find(user_projects[p].id)
            if(i && i.length > 0) {
                for (j in i){
                    i[j].org = user_projects[p].org
                    i[j].role = user_projects[p].role
                    
                }
                const temp = user_issues.concat(i)
                user_issues = temp
            }
        }
        res.status(200).json(user_issues)
    }
    catch (error) {
        res.status(200).json({message: 'failed to get issues', error})
    }
})

router.get('/specific/:id', async (req, res)=>{
    try {
        const issue = await issues.findById(req.params.id)
        if (issue) {
            res.status(200).json(issue)
        }
    }
    catch (error) {
        res.status(500).json({message: 'failed to get that issue', error})
    }
})


router.put('/:id', (req, res)=>{
    issues.update(req.params.id, req.body)
    .then((updated)=>{
        res.status(201).json(updated)
    })
    .catch(err=>{
        res.status(500).json({message: 'Failed to update that issue', error: err})
    })
})

router.delete('/:id', (req, res)=>{
    issues.remove(req.params.id)
    .then(()=>res.status(200).json({message: "Issue deleted"}))
    .catch(err=>res.status(500).json({message: "failed to delete issue", error: err}))
})


module.exports = router