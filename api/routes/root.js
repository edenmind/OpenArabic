'use strict'

module.exports = async function (fastify) {
  fastify.get('/', async function () {
    return { status: 'alHamdulillah' }
  })
}
