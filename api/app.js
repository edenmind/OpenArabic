'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const fastifyEnv = require('fastify-env')
const { schema } = require('./schemas/fastifyEnv')

module.exports = async function (fastify, opts) {
  fastify.register(fastifyEnv, {
    schema,
    dotenv: true,
    data: process.env,
  })
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts),
  })
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts),
  })
}
