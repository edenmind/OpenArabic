'use strict'

const schema = {
  type: 'object',
  required: [
    'MONGO_DB_URL',
    'IMAGES_URL',
    'AUDIO_URL',
    'GOOGLE_APPLICATION_CREDENTIALS',
    'API_KEY',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY'
  ],
  properties: {
    MONGO_DB_URL: {
      type: 'string'
    },
    TASHKEEL_URL: {
      type: 'string'
    },
    IMAGES_URL: {
      type: 'string'
    },
    AUDIO_URL: {
      type: 'string'
    },
    GOOGLE_APPLICATION_CREDENTIALS: {
      type: 'string'
    },
    API_KEY: {
      type: 'string'
    },
    AWS_ACCESS_KEY_ID: {
      type: 'string'
    },
    AWS_SECRET_ACCESS_KEY: {
      type: 'string'
    }
  }
}

module.exports = {
  schema
}
