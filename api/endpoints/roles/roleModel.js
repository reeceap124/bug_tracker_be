const db = require('../../../data/db-config');

module.exports = {
    findBy,
    add,
    // update,
    // remove
}

function findBy(filter) {
    return db('roles').where(filter).first()
}

function add(role) {
    return db('roles').insert(role, 'id')
    .then(([id])=>{
        return this.findBy({id})
    })
}