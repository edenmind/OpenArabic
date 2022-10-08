'use strict'

// eslint-disable-next-line putout/long-properties-destructuring
const { postWordOptions, getWordOptions } = require('../schemas/words')

// eslint-disable-next-line putout/putout
async function words(fastify) {
  fastify.post('/words', postWordOptions)
  fastify.get('/words/:id', getWordOptions)
}
module.exports = words
