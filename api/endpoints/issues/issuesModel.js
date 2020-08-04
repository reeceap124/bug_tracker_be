const db = require('../../../data/db-config');

module.exports = {
    find,
    add
}

function find(project){
    return db('issues')
    .join('projects', 'issues.project_key', 'projects.id')
    .where({project_key: project})
}

function add(issue){
    return db('issues').insert(issue)
}
