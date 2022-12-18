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
  fastify.delete('/texts/:id', deleteTextOptions)
  fastify.get('/texts', getTextsOptions)
  fastify.get('/texts/:id', getTextOptions)
  fastify.get('/texts/categories/:id', getTextsWithIdOptions)
  fastify.post('/texts', postTextOptions)
  fastify.post('/texts/tashkeel', getTashkeelOptions)
  fastify.put('/texts/:id', updateTextOptions)
}
module.exports = texts
