'use strict'

const fastifyMongo = require('fastify-mongodb')
const fp = require('fastify-plugin')

module.exports = fp(async function dbConnector(fastify) {
  fastify.register(fastifyMongo, {
    url: 'mongodb://localhost:27017/test_database',
  })
})
