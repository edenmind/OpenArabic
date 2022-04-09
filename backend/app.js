'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const dotenv = require('dotenv')

dotenv.config()

module.exports = async function (fastify, opts) {
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts),
  })
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts),
  })
}
