const db = require('../../../data/db-config');

module.exports = {
    getAll,
    findBy,
    getAllOrgRoles,
    getOrgRoles,
    addOrgRole,
    add,
    update,
    remove
}

function getAll(){
    return db('users')
};

function findBy(filter) {
    return db('users').where(filter).first()
};

function getAllOrgRoles(){
    return db('user_org_roles')
}

function getOrgRoles(id) {
    return db
    .select(
        'roles.id as rId',
        'roles.title as rTitle',
        'organizations.id as oId',
        'organizations.title as oTitle',
        'user_org_roles.description as description'
        )
    .from('user_org_roles')
    .join('roles', 'user_org_roles.role_key', 'roles.id')
    .join('organizations', 'user_org_roles.org_key', 'organizations.id')
    .where('user_key', id)
}

function addOrgRole(org_role) {
    return db('user_org_roles').insert(org_role)
}

function add(user) {
    return db('users').insert(user, 'id')
    .then(([id])=>{
        return this.findBy({id})
    })
}

function update(id, changes) {
    return db('users').where({id}).update(changes, '*')
}

function remove(id) {
    return db('users').where({id}).del()
}