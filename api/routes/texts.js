'use strict'

const {
  getTextsOptions,
  getTextsWithIdOptions,
  getTashkeelOptions,
  getTextOptions,
  updateTextOptions,
  postTextOptions,
  deleteTextOptions
} = require('../schemas/texts')

// eslint-disable-next-line putout/putout
async function texts(fastify) {
  fastify.get('/texts', getTextsOptions)
  fastify.get('/texts/categories/:id', getTextsWithIdOptions)
  fastify.get('/texts/:id', getTextOptions)
  fastify.post('/texts', postTextOptions)
  fastify.put('/texts/:id', updateTextOptions)
  fastify.delete('/texts/:id', deleteTextOptions)
  fastify.post('/texts/tashkeel', getTashkeelOptions)
}
module.exports = texts
