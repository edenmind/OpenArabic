'use strict'

/* eslint-disable prefer-arrow-callback */
const fastifyPlugin = require('fastify-plugin')
const path = require('path')

module.exports = fastifyPlugin(async function (fastify) {
  fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, '../public'),
    prefix: '/public/' // optional: default '/'
  })
})
