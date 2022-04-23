const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  fastify.register(require('fastify-swagger'), {
    routePrefix: '/swagger',
    swagger: {
      info: {
        title: 'OpenArabic API Endpoints',
        description: 'Discover the different API endpoints that can be used to interact with the OpenArabic API',
        version: '0.1.0',
      },
      host: 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: false,
  })
})
