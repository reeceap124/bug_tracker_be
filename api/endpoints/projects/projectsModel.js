const db = require('../../../data/db-config');

module.exports = {
    find,
    add
}

function find(org) {
    return db('projects').where({org_key: org})
}

function add(project) {
    return db('projects').insert(project)
}