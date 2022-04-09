'use strict'

const fastifyPlugin = require('fastify-plugin')

module.exports = fastifyPlugin(async function (fastify) {
  fastify.register(require('fastify-rate-limit'), {
    max: 100,
    timeWindow: '1 minute',
  })
})
