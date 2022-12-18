'use strict'

const {
  postWordOptions,
  getWordOptions,
  getWordsOptions,
  deleteWordOptions,
  getWordTranslationOptions,
  updateWordOptions
} = require('../schemas/words')

// eslint-disable-next-line putout/putout
async function words(fastify) {
  fastify.delete('/words/:id', deleteWordOptions)
  fastify.get('/words', getWordsOptions)
  fastify.get('/words/:id', getWordOptions)
  fastify.get('/words/translation/:id', getWordTranslationOptions)
  fastify.post('/words', postWordOptions)
  fastify.put('/words/:id', updateWordOptions)
}
module.exports = words
