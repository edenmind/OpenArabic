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
          required: [
            'arabic',
            'english',
            'arabicSentence',
            'englishSentence',
            'categoryLevel',
            'author',
            'source',
            'textId',
            'sentenceId',
            'wordId'
          ],
          properties: {
            arabic: { type: 'string', minLength: 1 },
            english: { type: 'string', minLength: 1 },
            arabicSentence: { type: 'string', minLength: 1 },
            englishSentence: { type: 'string', minLength: 1 },
            categoryLevel: { type: 'number', minimum: 1, maximum: 50 },
            author: { type: 'string', minLength: 1 },
            source: { type: 'string', minLength: 1 },
            textId: { type: 'string', minLength: 1 },
            sentenceId: { type: 'string', minLength: 1 },
            wordId: { type: 'string', minLength: 1 }
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
          english: { type: 'array' },
          alternative1: { type: 'string' },
          alternative2: { type: 'string' },
          arabicSentence: { type: 'string' },
          englishSentence: { type: 'string' },
          categoryLevel: { type: 'string' },
          author: { type: 'string' },
          source: { type: 'string' },
          textId: { type: 'string' },
          sentenceId: { type: 'string' },
          wordId: { type: 'string' }
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
            wordId: { type: 'string' }
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
          arabic: { type: 'string', minLength: 1 },
          english: { type: 'string', minLength: 1 },
          sentence: { type: 'string', minLength: 5 },
          author: { type: 'string', minLength: 1 },
          source: { type: 'string', minLength: 1 },
          categoryLevel: { type: 'number', minimum: 1, maximum: 50 }
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
