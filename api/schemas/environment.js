'use strict'

const schema = {
  type: 'object',
  properties: {
    MONGO_DB_URL: {
      type: 'string'
    },
    TASHKEEL_URL: {
      type: 'string'
    },
    IMAGES_URL: {
      type: 'string'
    }
  }
}

module.exports = {
  schema
}
