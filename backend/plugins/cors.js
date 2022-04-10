'use strict'

const fastifyPlugin = require('fastify-plugin')

module.exports = fastifyPlugin(async function (fastify) {
  fastify.register(require('fastify-cors'), {
    origin: (origin, cb) => {
      const hostname = new URL(origin).hostname
      if (hostname === 'localhost') {
        //  Request from localhost will pass
        cb(null, true)
        return
      }
      // Generate an error on other origins, disabling access
      cb(new Error('Not allowed'))
    },
  })
})
