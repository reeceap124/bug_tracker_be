const db = require('../../../data/db-config');

module.exports = {
    getAll,
    findBy,
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

function add(user) {
    console.log('in the add', user)
    return db('users').insert(user, 'id')
    .then(([id])=>{
        console.log('model then')
        return this.findBy({id})
    })
    .catch(()=>{
        console.log('added, but faile to get by id')
    })
}

function update(id, changes) {
    return db('users').where({id}).update(changes, '*')
}

function remove(id) {
    return db('users').where({id}).del()
}