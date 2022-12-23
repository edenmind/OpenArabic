'use strict'

/* eslint-disable prefer-arrow-callback */
const fastifyPlugin = require('fastify-plugin')
module.exports = fastifyPlugin(async function (fastify) {
  fastify.register(require('@fastify/rate-limit'), {
    max: 300,
    timeWindow: '1 minute',
    allowList: ['127.0.0.1']
  })
})
