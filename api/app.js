'use strict'

const path = require('node:path')
const AutoLoad = require('@fastify/autoload')
const fastifyEnv = require('@fastify/env')
const { schema } = require('./schemas/environment')

module.exports = async function (fastify, options) {
  fastify.register(fastifyEnv, {
    schema,
    dotenv: true,
    data: process.env
  })
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, options)
  })
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, options)
  })
}
