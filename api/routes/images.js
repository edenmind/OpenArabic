'use strict'

const { getImagesOpts } = require('../schemas/images')

// eslint-disable-next-line putout/putout
async function images(fastify) {
  fastify.get('/images', getImagesOpts)
}
module.exports = images
