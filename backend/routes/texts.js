'use strict'

const { getTextsOpts, getTextOpts, updateTextOpts, postTextOpts, deleteTextOpts, getTextsCategoriesOpts } = require('../schemas/texts')

async function texts(fastify) {
  fastify.get('/texts', getTextsOpts)
  fastify.get('/texts/categories/:id', getTextsCategoriesOpts)
  fastify.post('/texts', postTextOpts)
  fastify.get('/texts/:id', getTextOpts)
  fastify.put('/texts/:id', updateTextOpts)
  fastify.delete('/texts/:id', deleteTextOpts)
}
module.exports = texts
