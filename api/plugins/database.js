'use strict'

const fastifyMongo = require('@fastify/mongodb')
const fastifyPlugin = require('fastify-plugin')

module.exports = fastifyPlugin(async function dbConnector(fastify) {
  fastify.register(fastifyMongo, {
    forceClose: true,
    url: fastify.config.MONGO_DB_URL,
  })
})
