'use strict'

const {
  getAuthorsOpts,
  getAuthorOpts,
  updateAuthorOpts,
  postAuthorOpts,
  deleteAuthorOpts
} = require('../schemas/authors')

// eslint-disable-next-line putout/putout
async function authors(fastify) {
  fastify.get('/authors', getAuthorsOpts)
  fastify.post('/authors', postAuthorOpts)
  fastify.get('/authors/:id', getAuthorOpts)
  fastify.put('/authors/:id', updateAuthorOpts)
  fastify.delete('/authors/:id', deleteAuthorOpts)
}
module.exports = authors
