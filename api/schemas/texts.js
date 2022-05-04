'use strict'

const { listTexts, addText, getText, updateText, deleteText } = require('../controllers/Texts')

const getTextsOptions = {
  schema: {
    response: {
      200: {
        type: 'array'
      }
    }
  },
  handler: listTexts
}

const getTextOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          status: { type: 'string' },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
          author: { type: 'string' },
          category: { type: 'string' },
          source: { type: 'string' },
          sentences: { type: 'array' },
          texts: { arabic: { type: 'object' }, english: { type: 'object' } },
          vocabularyCollection: { arabic: { type: 'array' }, english: { type: 'array' } }
        }
      }
    }
  },
  handler: getText
}

const updateTextOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'author', 'category', 'source', 'sentences', 'texts', 'status'],
      properties: {
        title: { type: 'string' },
        status: { type: 'string' },
        author: { type: 'string' },
        updatedAt: { type: 'string' },
        category: { type: 'string' },
        source: { type: 'string' },
        sentences: { type: 'array' },
        texts: { type: 'object' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  },
  handler: updateText
}

const postTextOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'author', 'category', 'source', 'sentences', 'texts', 'status'],
      properties: {
        title: { type: 'string' },
        status: { type: 'string' },
        createdAt: { type: 'string' },
        author: { type: 'string' },
        category: { type: 'string' },
        source: { type: 'string' },
        sentences: { type: 'array' },
        texts: { type: 'object' }
      }
    },
    response: {
      201: {
        type: 'string'
      }
    }
  },
  handler: addText
}

const deleteTextOptions = {
  schema: {
    response: {
      200: {
        type: 'string'
      }
    }
  },
  handler: deleteText
}

module.exports = {
  getTextsOpts: getTextsOptions,
  getTextOpts: getTextOptions,
  updateTextOpts: updateTextOptions,
  postTextOpts: postTextOptions,
  deleteTextOpts: deleteTextOptions
}
