const express = require('express')
const router = express.Router();
const issues = require('./issueModel')
const users = require('../users/userModel')
const roles = require('../roles/roleModel')
const orgs = require('../orgs/orgModel')
const restrict = require('../../auth/restrictedMiddleware')

router.get('/:id', async(req, res)=>{
    const {id} = req.params
    let orgs = await users.getOrgRoles(id)
    let roles = []
    let issues = []
    if (orgs && orgs.length > 0) {
        orgs.forEach(org=>{
            roles.push(org.rTitle)
            
        })
    }
})
