'use strict'

// eslint-disable-next-line putout/long-properties-destructuring
const { postTranslationOptions, getTranslationOptions } = require('../schemas/translations')

// eslint-disable-next-line putout/putout
function translations(fastify) {
  fastify.post('/translations', postTranslationOptions)
  fastify.get('/translations/:arabicWord', getTranslationOptions)
}
module.exports = translations
