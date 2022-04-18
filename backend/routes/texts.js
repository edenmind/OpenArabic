'use strict'

const { getTextsOpts, getTextOpts, updateTextOpts, postTextOpts, deleteTextOpts } = require('../schemas/texts')

async function texts(fastify) {
  fastify.get('/texts', getTextsOpts)
  fastify.get('/texts/categories/:id', getTextsOpts)
  fastify.post('/texts', postTextOpts)
  fastify.get('/texts/:id', getTextOpts)
  fastify.put('/texts/:id', updateTextOpts)
  fastify.delete('/texts/:id', deleteTextOpts)
}
module.exports = texts
