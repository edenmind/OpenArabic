'use strict'

const { listTexts, addText, getText, updateText, deleteText } = require('../controllers/Texts')

const getTextsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            id: { type: 'string' },
            name: { type: 'string' },
          },
        },
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
          _id: { type: 'string' },
          id: { type: 'string' },

          title: { type: 'string' },
          author: { type: 'string' },
          category: { type: 'string' },
          source: { type: 'string' },
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
      required: ['name'],
      properties: {
        name: { type: 'string' },
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
      required: ['title', 'author', 'category', 'source'],
      properties: {
        title: { type: 'string' },
        author: { type: 'string' },
        category: { type: 'string' },
        source: { type: 'string' },
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
