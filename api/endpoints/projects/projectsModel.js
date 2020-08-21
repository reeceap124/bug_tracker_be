const db = require('../../../data/db-config');

module.exports = {
    find,
    add
}

function find(org) {
    return db
    .select(
        'projects.id as id',
        'projects.title as title',
        'projects.description as description',
        'active',
        'organizations.title as org'
    )
    .from('projects')
    .join('organizations', 'projects.org_key', 'organizations.id')
    .where({org_key: org})
}

function add(project) {
    return db('projects').insert(project, 'id')
    .then(([id])=>{
        return db('projects').where({id}).first()
    })
}