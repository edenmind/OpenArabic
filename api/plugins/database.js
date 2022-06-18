'use strict'

/* eslint-disable prefer-arrow-callback */
const fastifyMongo = require('@fastify/mongodb')
const fastifyPlugin = require('fastify-plugin')

module.exports = fastifyPlugin(async function databaseConnector(fastify) {
  fastify.register(fastifyMongo, {
    forceClose: true,
    url: fastify.config.API_MONGO_DB_URL
  })
})
