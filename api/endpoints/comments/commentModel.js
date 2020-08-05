const db = require('../../../data/db-config');

module.exports = {
    findBy,
    add
}

function findBy(filter) {
    return db('comments').where(filter)
}

function add(comment) {
    return db('comments').insert(comment)
}