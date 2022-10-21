/* eslint-disable putout/long-properties-destructuring */

'use strict'

const { addWord, getWord, getWords, deleteWord, updateWord, getWordTranslation } = require('../controllers/words')

const postWordOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['word'],
      properties: {
        word: {
          type: 'object',
          required: ['arabic', 'english', 'sentence'],
          properties: {
            arabic: { type: 'string', minLength: 3 },
            english: { type: 'string', minLength: 3 },
            sentence: { type: 'string', minLength: 5 }
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
          english: { type: 'string' },
          sentence: { type: 'string' },
          id: { type: 'string' }
        }
      }
    }
  },
  handler: getWord
}

const getWordTranslationOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          arabic: { type: 'string' },
          english: { type: 'string' },
          sentence: { type: 'string' },
          id: { type: 'string' }
        }
      }
    }
  },
  handler: getWordTranslation
}

const getWordsOptions = {
  schema: {
    response: {
      200: {
        type: 'array',

        items: {
          type: 'object',
          properties: {
            arabic: { type: 'string' },
            english: { type: 'string' },
            sentence: { type: 'string' },
            id: { type: 'string' }
          }
        }
      }
    }
  },
  handler: getWords
}

const deleteWordOptions = {
  schema: {
    response: {
      200: {
        type: 'string'
      }
    }
  },
  handler: deleteWord
}

const updateWordOptions = {
  body: {
    type: 'object',
    required: ['word'],
    properties: {
      word: {
        type: 'object',
        required: ['arabic', 'english'],
        properties: {
          arabic: { type: 'string', minLength: 3 },
          english: { type: 'string', minLength: 3 },
          sentence: { type: 'string', minLength: 5 }
        }
      }
    }
  },
  schema: {
    response: {
      200: {
        type: 'string'
      }
    }
  },
  handler: updateWord
}

module.exports = {
  postWordOptions,
  getWordOptions,
  getWordsOptions,
  deleteWordOptions,
  updateWordOptions,
  getWordTranslationOptions
}
