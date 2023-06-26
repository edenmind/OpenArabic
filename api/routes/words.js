'use strict'

const {
  getWordsOptions,
  getWordTranslationOptions,
  updateWordOptions,
  getWordIdOptions,
  getWordsHomeOptions
} = require('../schemas/words')

// eslint-disable-next-line putout/putout
async function words(fastify) {
  fastify.get('/words/home', getWordsHomeOptions)
  fastify.get('/words', getWordsOptions)
  fastify.get('/words/id/:textId/:sentenceId/:wordId', getWordIdOptions)
  fastify.get('/words/translation/:id', getWordTranslationOptions)
  fastify.put('/words/id/', updateWordOptions)
}
module.exports = words
