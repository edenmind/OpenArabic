'use strict'

const { addTranslation, getTranslation } = require('../controllers/translations')

const postTranslationOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['translatedWord'],
      properties: {
        translatedWord: { type: 'object' }
      }
    },
    response: {
      201: {
        type: 'string'
      }
    }
  },
  handler: addTranslation
}

const getTranslationOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          arabic: { type: 'string' },
          english: { type: 'string' }
        }
      }
    }
  },
  handler: getTranslation
}

module.exports = {
  postTranslationOptions,
  getTranslationOptions
}
