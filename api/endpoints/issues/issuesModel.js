const db = require('../../../data/db-config');

module.exports = {
    find,
    add
}

function find(project){
    return db('issues')
    .where({project_key: project})
}

function add(issue){
    return db('issues').insert(issue)
}
