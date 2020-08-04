const db = require('../../../data/db-config');

module.exports = {
    find,
    add
}

function find(org) {
    return db('projects')
    .join('organizations', 'projects.org_key', 'organizations.id')//join needs work
    .where({org_key: org})
}

function add(project) {
    return db('projects').insert(project)
}