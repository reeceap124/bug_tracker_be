const db = require('../../../data/db-config');

module.exports = {
    findBy,
    add,
    // update,
    // remove
}

function findBy(filter) {
    return db('organizations').where(filter).first()
}

function add(role) {
    return db('organizations').insert(role, 'id')
    .then(([id])=>{
        return this.findBy({id})
    })
}