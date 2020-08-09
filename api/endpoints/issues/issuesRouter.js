const express = require('express')
const router = express.Router();
const issues = require('./issuesModel')
const users = require('../users/userModel')
const projects = require('../projects/projectsModel')

router.post('/:id', async (req, res)=>{
    try {
        const {id} = req.params
        let issue = req.body
        issue.project_key = id
        const newIssue = await issues.add(issue);
        res.status(201).json(newIssue)
    }
    catch(error){
        res.status(500).json({message: 'Failed to add issue', error})
    }
    

})

//Will need to a alter this to only get issues associated with the user.
//Currently getting all issues at an org.
router.get('/:id', async (req, res)=>{
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
            // console.log('ISSUES: ', i)
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
        console.log('ERROR', error)
        res.status(200).json({message: 'failed to get issues', error})
    }

    
})


module.exports = router