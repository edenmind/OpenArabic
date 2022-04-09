'use strict'

const { getUsersopts, getUserOpts, updateItemOpts, postUserOpts, deleteUserOpts } = require('../schemas/users')

async function users(fastify) {
  fastify.get('/users', getUsersopts)
  fastify.post('/users', postUserOpts)
  fastify.get('/users/:id', getUserOpts)
  fastify.put('/users/:id', updateItemOpts)
  fastify.delete('/users/:id', deleteUserOpts)
}
module.exports = users
