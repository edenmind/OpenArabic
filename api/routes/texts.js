'use strict'

const {
  getTextsOpts,
  getTashkeelOpts,
  getTextOpts,
  updateTextOpts,
  postTextOpts,
  deleteTextOpts
} = require('../schemas/texts')

// eslint-disable-next-line putout/putout
async function texts(fastify) {
  fastify.get('/texts', getTextsOpts)
  fastify.post('/texts/tashkeel', getTashkeelOpts)
  fastify.get('/texts/categories/:id', getTextsOpts)
  fastify.post('/texts', postTextOpts)
  fastify.get('/texts/:id', getTextOpts)
  fastify.put('/texts/:id', updateTextOpts)
  fastify.delete('/texts/:id', deleteTextOpts)
}
module.exports = texts
