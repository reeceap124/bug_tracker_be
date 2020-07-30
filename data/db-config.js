//Bridge between database and endpoints
const knex = require('knex')
const env = process.env.DB_ENV || 'development'
const config = require('../knexfile')
module.exports = knex(config[env])