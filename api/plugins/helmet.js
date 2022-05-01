const fastifyPlugin = require('fastify-plugin')

module.exports = fastifyPlugin(async function (fastify) {
  fastify.register(require('@fastify/helmet'), {})
})
