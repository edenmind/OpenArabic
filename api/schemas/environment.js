'use strict'

const schema = {
  type: 'object',
  required: ['MONGO_DB_URL'],
  properties: {
    MONGO_DB_URL: {
      type: 'string'
    },
    TASHKEEL_URL: {
      type: 'string'
    }
  }
}

module.exports = {
  schema
}
