'use strict'

const {
  getAuthorsOptions,
  getAuthorOptions,
  updateAuthorOptions,
  postAuthorOptions,
  deleteAuthorOptions
} = require('../schemas/authors')

// eslint-disable-next-line putout/putout
async function authors(fastify) {
  fastify.delete('/authors/:id', deleteAuthorOptions)
  fastify.get('/authors', getAuthorsOptions)
  fastify.get('/authors/:id', getAuthorOptions)
  fastify.post('/authors', postAuthorOptions)
  fastify.put('/authors/:id', updateAuthorOptions)
}
module.exports = authors
