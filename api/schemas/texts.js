'use strict'

const { title } = require('process')
const { listTexts, addText, getText, updateText, deleteText } = require('../controllers/Texts')

const getTextsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
      },
    },
  },
  handler: listTexts,
}

const getTextOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          status: { type: 'string' },
          author: { type: 'string' },
          category: { type: 'string' },
          source: { type: 'string' },
          sentences: { type: 'array' },
          texts: { arabic: { type: 'object' }, english: { type: 'object' } },
          vocabularyCollection: { arabic: { type: 'array' }, english: { type: 'array' } },
        },
      },
    },
  },
  handler: getText,
}

const updateTextOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'author', 'category', 'source', 'sentences', 'texts', 'status'],
      properties: {
        title: { type: 'string' },
        status: { type: 'string' },
        author: { type: 'string' },
        category: { type: 'string' },
        source: { type: 'string' },
        sentences: { type: 'array' },
        texts: { type: 'object' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: updateText,
}

const postTextOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'author', 'category', 'source', 'sentences', 'texts', 'status'],
      properties: {
        title: { type: 'string' },
        status: { type: 'string' },
        author: { type: 'string' },
        category: { type: 'string' },
        source: { type: 'string' },
        sentences: { type: 'array' },
        texts: { type: 'object' },
      },
    },
    response: {
      201: {
        type: 'string',
      },
    },
  },
  handler: addText,
}

const deleteTextOpts = {
  schema: {
    response: {
      200: {
        type: 'string',
      },
    },
  },
  handler: deleteText,
}

module.exports = { getTextsOpts, getTextOpts, updateTextOpts, postTextOpts, deleteTextOpts }
