'use strict'

const { getImagesOptions } = require('../schemas/images')

// eslint-disable-next-line putout/putout
async function images(fastify) {
  fastify.get('/images', getImagesOptions)
}
module.exports = images
