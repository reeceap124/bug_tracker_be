const db = require('../../../data/db-config');

module.exports = {
    find,
    add
}

function find(project){
    return db
    .select(
        'issues.id as id',
        'content',
        'create_at',
        'users.display_name as created_by', //join users
        'importance.level as importance', //join importance
        'open',
        'projects.title as project', //join projects
        'issues.title as title',
        'updated_at'

    )
    .from('issues')
    .join('users', 'issues.created_by', 'users.id')
    .join('importance', 'issues.importance', 'importance.id')
    .join('projects', 'issues.project_key', 'projects.id')
    .where({project_key: project})
}

function add(issue){
    return db('issues').insert(issue)
}
