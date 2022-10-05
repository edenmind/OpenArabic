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
  fastify.post('/texts/tashkeel', getTashkeelOptions)
  fastify.get('/texts/categories/:id', getTextsWithIdOptions)
  fastify.post('/texts', postTextOptions)
  fastify.get('/texts/:id', getTextOptions)
  fastify.put('/texts/:id', updateTextOptions)
  fastify.delete('/texts/:id', deleteTextOptions)
}
module.exports = texts
