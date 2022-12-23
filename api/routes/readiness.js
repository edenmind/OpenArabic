'use strict'

const { getReadinessOptions } = require('../schemas/readiness')

// eslint-disable-next-line putout/putout
async function readiness(fastify) {
  fastify.get('/readiness', getReadinessOptions)
}
module.exports = readiness
