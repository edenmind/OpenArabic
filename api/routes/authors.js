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
  fastify.get('/authors', getAuthorsOptions)
  fastify.post('/authors', postAuthorOptions)
  fastify.get('/authors/:id', getAuthorOptions)
  fastify.put('/authors/:id', updateAuthorOptions)
  fastify.delete('/authors/:id', deleteAuthorOptions)
}
module.exports = authors
