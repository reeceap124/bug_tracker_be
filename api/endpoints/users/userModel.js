const db = require('../../../data/db-config');

module.exports = {
    findBy,
    add,
    update,
    remove
}

function findBy(filter) {
    return db('users').where(filter).first()
}

function add(user) {
    return db('user').insert(user, 'id')
    .then(([id])=>{
        console.log('model then')
        return this.findBy({id})
    })
}

function update(id, changes) {
    return db('users').where({id}).update(changes, '*')
}

function remove(id) {
    return db('users').where({id}).del()
}