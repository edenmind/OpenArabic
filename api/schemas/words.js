'use strict'

const { addWord, getWord } = require('../controllers/words')

const postWordOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['translatedWord'],
      properties: {
        translatedWord: {
          type: 'object',
          required: ['arabic', 'english'],
          properties: {
            arabic: { type: 'string', minLength: 3 },
            english: { type: 'string', minLength: 3 }
          }
        }
      }
    },
    response: {
      201: {
        type: 'string'
      }
    }
  },
  handler: addWord
}

const getWordOptions = {
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
  handler: getWord
}

module.exports = {
  postWordOptions,
  getWordOptions
}
