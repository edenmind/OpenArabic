'use strict'

/* eslint-disable putout/long-properties-destructuring */

const { getWordId, getWords, updateWord, getWordTranslation } = require('../controllers/words')

const getWordIdOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          arabic: { type: 'string' },
          english: { type: 'string' },
          sentence: { type: 'string' },
          arabicSentence: { type: 'string' },
          englishSentence: { type: 'string' },
          grammar: { type: 'string' },
          id: { type: 'string' }
        }
      }
    }
  },
  handler: getWordId
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
            alternative1: { type: 'string' },
            alternative2: { type: 'string' },
            arabicSentence: { type: 'string' },
            englishSentence: { type: 'string' },
            categoryLevel: { type: 'string' },
            author: { type: 'string', minLength: 1 },
            source: { type: 'string', minLength: 1 },
            id: { type: 'string' },
            textId: { type: 'string' },
            sentenceId: { type: 'string' },
            wordId: { type: 'string' },
            quiz: { type: 'boolean' },
            grammar: { type: 'string' }
          }
        }
      }
    }
  },
  handler: getWords
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
          arabic: { type: 'string', minLength: 1 },
          english: { type: 'string', minLength: 1 },
          sentence: { type: 'string', minLength: 5 },
          grammar: { type: 'string' }
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
  getWordsOptions,
  updateWordOptions,
  getWordTranslationOptions,
  getWordIdOptions
}
