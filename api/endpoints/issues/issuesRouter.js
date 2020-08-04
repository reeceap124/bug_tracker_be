const express = require('express')
const router = express.Router();
const issues = require('./issuesModel')
const users = require('../users/userModel')
const roles = require('../roles/roleModel')
const orgs = require('../orgs/orgModel')
const projects = require('../projects/projectsModel')
const restrict = require('../../auth/restrictedMiddleware')

router.post('/:id')

router.get('/:id', async(req, res)=>{
    const {id} = req.params
    let o_roles = {}
    let o_projects = []
    let user_issues = []
    users.getOrgRoles(id)
    .then(orgRoles=>{
        if (orgRoles) {
            orgRoles.forEach(orgRole=>{
                // o_roles[orgRole.rTitle] = [...o_roles[orgRole.rTitle], orgRole.oTitle]
                projects.find(orgRole.oId)
                .then(orgProjects=>{
                    if (orgProjects) {
                        orgProjects.forEach(p=>{
                            // o_projects.push(p)
                            issues.find(p.id)
                            .then(p_issues=>{
                                p_issues.map(i=>{
                                    i.org = orgRole.oTitle
                                    i.role = orgRole.rTitle
                                    user_issues.push(i)
                                })
                            })
                            .catch(err=>{
                                res.status(500).json({message:'failed to get issues', error: err})
                            })
                        })
                    }
                    else {
                        console.log('This org has no projects.')
                    }
                })
                .catch(err=>{
                    res.status(500).json({message: "failed to get projects", error: err})
                })
            })
        }
        else {
            return res.status(400).json({message: "It looks like you're not apart of an organizations"})
        }
    })
    .catch(err=>{
        res.status(500).json({message: 'Failed to get orgRoles'})
    })
    // let userOrgs = await users.getOrgRoles(id)
    
    
    
    // if (userOrgs && userOrgs.length > 0) {
    //     userOrgs.forEach(org=>{
    //         o_roles.push(org.rTitle) 
    //         orgProjects = await projects.find(org.oId)
    //         if (orgProjects && orgProjects.length > 0) {
    //             o_projects = [...o_projects, ...orgProjects] //updates projects for filtering
    //         }
            

    //     })
    // }
})

module.exports = router