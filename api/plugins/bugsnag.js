'use strict'

/* eslint-disable prefer-arrow-callback */
const fastifyPlugin = require('fastify-plugin')

module.exports = fastifyPlugin(async function (fastify) {
  fastify.register(require('fastify-bugsnag'), {
    apiKey: '92e9d55c5c38b8fe2a5ad857cbe695c7'
  })
})
