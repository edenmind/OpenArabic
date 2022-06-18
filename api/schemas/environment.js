'use strict'

const schema = {
  type: 'object',
  required: ['API_MONGO_DB_URL'],
  properties: {
    API_MONGO_DB_URL: {
      type: 'string'
    },
    API_TASHKEEL_URL: {
      type: 'string'
    }
  }
}

module.exports = {
  schema
}
