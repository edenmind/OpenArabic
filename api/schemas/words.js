'use strict'

/* eslint-disable putout/long-properties-destructuring */

const { getWordId, getWords, updateWord, getWordTranslation, getWordsHome } = require('../controllers/words')

const getWordIdOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          arabic: { type: 'string' },
          english: { type: 'string' },
          lastLetter: { type: 'boolean' },
          sentence: { type: 'string' },
          arabicSentence: { type: 'string' },
          englishSentence: { type: 'string' },
          grammar: { type: 'string' },
          categoryLevel: { type: 'number' },
          id: { type: 'string' },
          filename: { type: 'string' },
          englishText: { type: 'string' },
          arabicText: { type: 'string' },
          publishDate: { type: 'string' },
          arabicSentenceFilename: { type: 'string' }
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
          lastLetter: { type: 'boolean' },
          sentence: { type: 'string' },
          id: { type: 'string' }
        }
      }
    }
  },
  handler: getWordTranslation
}

const getWordsHomeOptions = {
  schema: {
    response: {
      200: {
        type: 'array',

        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            arabic: { type: 'string' },
            english: { type: 'string' },
            wordId: { type: 'string' },
            category: { type: 'string' },
            publishDate: { type: 'string' },
            timeAgo: { type: 'string' },
            grammar: { type: 'string' },
            filename: { type: 'string' }
          }
        }
      }
    }
  },
  handler: getWordsHome
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
            lastLetter: { type: 'boolean' },
            sentence: { type: 'string' },
            alternative1: { type: 'string' },
            alternative2: { type: 'string' },
            arabicSentence: { type: 'string' },
            englishSentence: { type: 'string' },
            categoryLevel: { type: 'number' },
            author: { type: 'string', minLength: 1 },
            source: { type: 'string', minLength: 1 },
            id: { type: 'string' },
            textId: { type: 'string' },
            sentenceId: { type: 'string' },
            wordId: { type: 'string' },
            grammar: { type: 'string' },
            filename: { type: 'string' },
            date: { type: 'string' },
            publishDate: { type: 'string' },
            arabicSentenceFilename: { type: 'string' }
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
          lastLetter: { type: 'boolean' },
          sentence: { type: 'string', minLength: 5 },
          categoryLevel: { type: 'number' },
          grammar: { type: 'string' },
          filename: { type: 'string' },
          publishDate: { type: 'string' }
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
  getWordIdOptions,
  getWordsHomeOptions
}
