'use strict'

const { getImages } = require('../controllers/images')

const getImagesOptions = {
  schema: {
    response: {
      200: {
        type: 'array'
      }
    }
  },
  handler: getImages
}

module.exports = {
  getImagesOpts: getImagesOptions
}
